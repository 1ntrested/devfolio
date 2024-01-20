import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
//import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
//import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./GetPost.css";

function truncateDescription(description){
  const maxLength=120;
  if(description.length>maxLength){
    return description.substring(0,maxLength)+'...';
  }
  return description;
}


function GetPost({data,onDelete}) {

  const deletePost=async()=>{
    try {
      const response=await axios.delete(`http://localhost:3000/myposts/${data._id}`,
      { withCredentials: true });
      onDelete(data._id);
    } catch (error) {
      console.log(error);
    }
  }
  const navigate=useNavigate();
  const landToNew=()=>{
    navigate('/newpage',{state:{data}});
  }
  return (
    <div  className="containerStyle">
    <Card sx={{width:'1200px',height:'400px'}} style={{borderRadius:'0px'}}>
      <div className='content-style'>
        <div className='post-img'>
         <img className="post-img-id" src={data.imageUrl? data.imageUrl : ""} alt="" />
      </div>
      <div className='both'>
        <div className='title'>
         {data.title}
        </div>
        <div className='description'>
         <p>{truncateDescription(data.description)}</p>
        </div>
        </div>
      </div>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small" onClick={landToNew}>Read More</Button>
        <Button size="small" onClick={deletePost}>Delete</Button>
      </CardActions>
    </Card>
   </div>
  )
}

export default GetPost