const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Posts" }],
});

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  userId: String,
});

const User = mongoose.model("User", userSchema);
const Posts = mongoose.model("Posts", postSchema);

module.exports = { User, Posts };
