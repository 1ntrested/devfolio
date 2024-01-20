const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
var cors = require("cors");
const multer  = require('multer')
const path=require("path")
const { User, Posts } = require('./models/model');
const { uploadOnCloudinary } = require("./utils/cloudinary.js")
require('dotenv').config();
const salt = bcrypt.genSaltSync(10);
const dbConnection=process.env.DB_CONNECTION_STRING;
const secretKey =process.env.SECRET_KEY;
//Database Connections
const db = async () => {
  await mongoose.connect(dbConnection,
    { dbName: "Blog-Database" }
  );
};
db()

//Middlewares
const storage=multer.diskStorage({
  destination:function(req,file,cb){
     cb(null,"./uploads")
  },
  filename:function(req,file,cb){
     cb(null,`${Date.now()}-${file.originalname}`)
  },
})
const upload=multer({storage})

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      const allowedOrigins = ["http://localhost:5173"];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


//create post
app.post("/myposts", verifyToken, upload.single("image") , async (req, res) => {
  try {

    const userId = req.userId.obj.userId;

    const localFilePath  = req.file?.path;
    let imageUrl = "";

    console.log(localFilePath)

    if(localFilePath){
      try {
        const response = await uploadOnCloudinary(localFilePath);
        imageUrl = response; 
      } catch (error) {
        console.log(error.message);
      }
    }

    const post = new Posts({
      title: req.body.title,
      description: req.body.description,
      imageUrl:imageUrl,
      userId: userId,
    });

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const savedPost = await post.save();
    user.posts.push(savedPost._id);

    await user.save();

    console.log(post);

    res.status(201).json({
      message: "post created successfully",
      post: {
       post
      },
    });
  } catch (e) {
    res.status(500).json({ message: "internal server error" });
  }
});


// users backend

//post the users signup
app.post("/users", async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, salt),
      // posts:[{type:mongoose.Schema.Types.ObjectId,ref:'Posts'}]
    });
    await user.save();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//login api and verification
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (user) {
    const passOk = bcrypt.compareSync(password, user.password);

    if (passOk) {
      const obj = {
        userId: user._id,
      };
      const token = jwt.sign({ obj }, secretKey, { expiresIn: "3hr" });
      const options = {
        httpOnly: true,
      };
      res.status(201).cookie("token", token, options).json({ userId: user._id });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } else {
    res.status(401).json({ message: "user not found" });
  }
});
function verifyToken(req, res, next) {
  let x = req.cookies;
  if (!x.token) {
    res.status(404).json({
      message: "token not found",
    });
  }
  const decode = jwt.verify(x.token, secretKey);
  if (!decode) {
    res.status(404).json({
      message: "token in invalid",
    });
  }
  req.userId = decode; //now we can use the token further
  next();
}

//get users posts
app.get("/users/posts", async (req, res) => {
  try {
    const posts = await Posts.find({});
    if (posts) {
      res.json({
        posts: posts,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});
// // we get the posts according to the user
// app.get("/users/posts/:userId", async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     // populate lets you reference documents in other collections
//     const user = await User.findById(userId).populate({
//       path: "posts",
//       select: "title description imageUrl",
//     });
//     if (!user) {
//       return res.status(404).json({ message: "user not found" });
//     }
//     const userPosts = user.posts; //access the posts associated with user
//     res.status(200).json({
//       message: "posts retrieved successfully",
//       userPosts: userPosts,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });


//delete the users
app.delete("/myposts/:id", verifyToken,async (req, res) => {
  try {
    const postId=req.params.id;
    const userId = req.userId.obj.userId;
    const userExist=await User.findById({_id:userId});
    if(userExist){
      const postExist = await Posts.findOne({userId:userId,_id:postId});
      if (!postExist) {
        return res.status(404).json({
          message: "Post doesnt exist or you dont have permission to delete it",
        });
      }
      await Posts.findByIdAndDelete(postId);
      res.status(200).json({ message: "Post deleted" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//update the users
app.put('/update_post/:postId',upload.single('image'),async(req,res)=>{
  const postId=req.params.postId;
  const {title,description}=req.body;
  try {
    const post=await Posts.findById(postId);
    if(!post){
      return res.status(404).json({error:'post not found'})
    }
    //update the posts
    post.title=title ||post.title;
    post.description=description ?? post.description;
    //uplaod the new image
    if(req.file){
      post.image=req.file.filename;
    }
    await post.save();
    res.json({message:"post update successfully"});
  } catch (error) {
    res.status(500).json({message:'internal server error'})
  }
})

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
