import { useState } from "react";
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
import Button from "@mui/material/Button";
import axios from "axios";
//import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
import "./GetPost.css"
function Posts() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const[image,setImage]=useState();
 const navigate=useNavigate();

const handleImage=(e)=>{
  //as we are uploading only one file 
  const file=e.target.files[0];
  setImage(file)
}

  const fetchData = async () => {
    try {
      const formData=new FormData();
      formData.append('title',title);
      formData.append('description',description);
      formData.append('image',image)
      const res=await axios.post(
        "http://localhost:3000/myposts",formData,{
          withCredentials:true,
          headers:{
            'Content-Type':'multipart/form-data'
          }
        }
      )
      navigate('/showpost')
     // console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "70px",
      }}
    >
      <TextField
        id="standard-helperText"
        label="title"
        variant="standard"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <br />
      <form>
        <textarea  className="text-area" rows="40" cols="100"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
      </form>
      <form action="/uploads" method="post" enctype="multipart/form-data" onSubmit={(e)=>{
        e.preventDefault();
      }}>
            <input type="file" name="image" onChange={handleImage} />
      </form>
      <Button size="small" onClick={fetchData}>
        Add post
      </Button>
    </div>
  );
}

export default Posts;
