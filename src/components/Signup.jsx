import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
//import { CopyToClipboard } from 'react-copy-to-clipboard';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Signup() {
  const name="this is test";
  const[inputValue ,setInputValue]=useState('');
  const[username,setUsername]=useState('');
  const[password,setPassword]=useState('');
  const navigate=useNavigate();
  const handleClick=async()=>{
    try {
      const response=await axios.post('http://localhost:3000/users',
      {
        username:username,
        password:password
       },
      {
        withCredentials:true
      })
     // console.log(response)
     navigate('/showpost')
    } catch (error) {
      console.log(error)
    }
  }
  return (
  <div style={{display:'flex',justifyContent:'center',paddingTop:'40px'}}>
       <Card variant='outlined' style={{display:'flex',
       justifyContent:'center',
       width:'400px',
       padding:'100px',
       margin:'100px'}}>
        
      <form>
      <Typography  variant='h5'>Welcome to bloggare Signup</Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" >
          email
          <br></br>
          <TextField id="outlined-basic" label="email" variant="outlined" onChange={(e)=>{
            setUsername(e.target.value);
          }}/>
        </Typography>
      
      <Typography   color="text.secondary" gutterBottom>
          password
          <br></br>
          <TextField  id="outlined-basic" label="password" variant="outlined" onChange={(e)=>{
            setPassword(e.target.value)
          }} />
        </Typography>
   
    <div style={{display:'flex',marginTop:'20px'}}>
    <Button variant="contained" onClick={handleClick}>Signup</Button>
    </div>
      </form>
    </Card>

    </div>
  )
}

export default Signup