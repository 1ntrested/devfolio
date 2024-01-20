import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GetPost from './GetPost';
import './GetPost.css';

function Showpost() {
  const [arr, setData] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const myposts = await axios.get('http://localhost:3000/users/posts');
        setData(myposts.data.posts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  const handleDeletePost = (postId) => {
    setData((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  return (
    <div>
      <h1>easteregg</h1>
      {arr.map((obj) => (
        <GetPost key={obj._id} data={obj} onDelete={handleDeletePost} />
      ))}
    </div>
  );
}

export default Showpost;
