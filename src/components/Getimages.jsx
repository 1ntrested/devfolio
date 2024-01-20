import React, { useEffect, useState } from 'react'
import axios from 'axios'
function Getimages() {
    const[imagesPaths,setImagePath]=useState([]);

    useEffect(()=>{
        const fetchPosts=async()=>{
            try {
                const response=await axios.get('http://localhost:3000/users/posts');
                const posts=response.data.posts;
                const paths=posts.map(post=>post.imagePath)
                setImagePath(paths)
            } catch (error) {
                console.log(error)
            }
        }
        fetchPosts();
    },[])
  return (
    <div>
        {imagesPaths.map((obj,key)=>{
           return <img key={key} src={`http://localhost:3000/${obj}`} alt=''></img>
        })}
    </div>
  )
}

export default Getimages