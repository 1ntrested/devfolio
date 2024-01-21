import React from 'react'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import {Link} from "react-router-dom";

function Navbar() {
  return (
    <AppBar style={{ background: '#3C4142' }}> 
        <Toolbar position="static" style={{display:'flex',justifyContent:'space-evenly'}}>
     <Button variant="text" style={{color:'white'}}> 
     <Typography variant="h5">
         <i onClick={()=>{
        location.href = '/showpost'}}>1NITIALS</i> 
      </Typography>
      </Button>


<div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}} className="bg-green-800">
    <div>
     <Button variant="text"  style={{color:'white',marginRight:'10px'}}  onClick={()=>{
        location.href = '/createpost' 
     }} className="text-6xl">createPost</Button>
     </div>
     <div>
     <Button variant="text"  style={{color:'white',marginRight:'10px'}} size="small" onClick={()=>{
        location.href = '/showpost'
     }}>showPost</Button>
     </div>
    <div style={{display:'flex',marginRight:'10px'}}>
     <Button variant="text"  style={{color:'white'}} size="small" onClick={()=>{
        location.href = '/Signup'
     }}>Signup</Button>
     </div>
     <div>
     <Button variant="text"  style={{color:'white'}} size="small" onClick={()=>{
        location.href = '/login'
     }}>Login</Button>

     </div>
     <div><Button><Link className='nav-tags' to='/experience' style={{textDecoration:'none',color:'white'}}>StartFromhere</Link></Button></div>

  </div>

  </Toolbar>

  </AppBar>
  )
}

export default Navbar