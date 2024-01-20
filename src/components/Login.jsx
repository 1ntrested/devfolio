import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function Login() {
  const[username,setUsername]=useState('');
  const[password,setPassword]=useState('');
  const navigate=useNavigate();
  const handleLogin=async()=>{
    try {
      const response=await axios.post('http://localhost:3000/login',{
        username:username,
        password:password
      },{ withCredentials: true })
      navigate('/showpost')
     console.log(response)
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
      <Typography  variant='h5'>Welcome back</Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" >
          email
          <br></br>
          <TextField id="outlined-basic" label="email" variant="outlined" onChange={(e)=>{setUsername(e.target.value)}}/>
        </Typography>
      
      <Typography   color="text.secondary" gutterBottom>
          password
          <br></br>
          <TextField  id="outlined-basic" label="password" variant="outlined" onChange={(e)=>{setPassword(e.target.value)}}/>
        </Typography>
   
    <div style={{display:'flex',marginTop:'20px'}}>
    <Button variant="contained" onClick={handleLogin}>Login</Button>
    </div>
      </form>
    </Card>
    </div>
  )
}

export default Login