import React from 'react';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import Terminal from './Terminal/Terminal'; // Import your Terminal component
import "./Newpage.css";
import { useNavigate } from 'react-router-dom';
function Newpage() {
  const location = useLocation();
  const data = location.state?.data;
//console.log(data)
  //const skillsContent="🎭 gaming\n📖 reading\n🎥 movies\n🌶 cooking";
  const navigate=useNavigate();
  const landToNew=()=>{
    navigate('/showpost', { state: { data: data } });
  }
  return (
    <div className='content-box'>
      <div className='T'>
        {data.title}
      </div>
      <div className='img-box'>
        <img className="img-id" src={data.imageUrl ? data.imageUrl : ""} alt="" />
      </div>
      {/* <div className='D'>
        <p>{data.description}</p>
      </div> */}
        <Terminal heading="balrajsingh $"
         heading2="cd skills/tools"  
         content="aboutbalraj" 
         content1="(main)" 
         content2="$" 
         maincontent={data.description}
         formatNewline={true}
          />
      <Button size="small">Share</Button>
      <Button size="small" onClick={() => landToNew(data)}>Read Less</Button>

      {/* Display data in the custom terminal */}

    </div>
  );
}

export default Newpage;