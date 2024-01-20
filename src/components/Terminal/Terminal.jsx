
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import "./Terminal.css";
import React, { useState } from 'react';
function Terminal(props) {  
  const [textToCopy, setTextToCopy] = useState(''); // The text you want to copy
  const [copyStatus, setCopyStatus] = useState(false); // To indicate if the text was copied
  const formatMainContent=(content)=>{
    if(props.formatNewline){
      const contentArray=content.split('\n');
      return(
        <div>
          {contentArray.map((item,index)=>{
            return(<span key={index}>
              {item}
              <br />
            </span>
            );
          })}
        </div>
      )
    }
    return content;
  }  
  return (
      <Card className="custom-card" style={{backgroundColor:'rgb(39, 36, 47)',boxShadow:''}}>
        <div className='Terminal-nav'>
        <i class="fa-solid fa-circle Terminal-red"></i>
        <i class="fa-solid fa-circle Terminal-amber"></i>
        <i class="fa-solid fa-circle Terminal-green"></i>
        </div>
        <CardContent>
          <p className="card-heading">
            {props.heading} <span className='heading2'>{props.heading2}</span>
          </p>
          <p className="card-content" >
           <span style={{color:'rgb(0, 255, 164)'}}>{props.content}</span>
            <span style={{color:'#27c93f'}}>{props.content1}</span> <span style={{color:'rgb(0, 255, 164)'}}>{props.content2}</span> 
            {formatMainContent(props.maincontent)}
          </p>
        </CardContent>
      </Card>
  )
}

export default Terminal;