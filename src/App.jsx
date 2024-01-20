import Signup  from './components/Signup'
import Navbar from './components/Navbar'
import Login from './components/Login';
//import ReactDOM from "react-dom/client";
import Posts from './components/Create';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Showpost from './components/Showpost';
import Getimages from './components/Getimages';
import Newpage from './components/Newpage';
//import BlogEditor from './components/CreatePost'
import { createContext } from "react";
export const ThemeContext=createContext(null);
import { useState } from 'react';
import PostBody from './components/Terminal/postBody';
function App() {
  const [theme,setTheme]=useState("dark");

  const toggleTheme=()=>{
    setTheme((curr)=>curr==="dark"?"light":"dark")
  }
  return (
    <ThemeContext.Provider value={{theme,toggleTheme}}>
   <div className="App" id={theme}>
   <BrowserRouter>
     <Navbar />
     
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/createpost' element={<Posts />} />
        <Route path='/showpost' element={<Showpost />} />
        <Route path='/newpage' element={<Newpage />} /> 
        <Route path='/new' element={<PostBody />} /> 
        {/* <Route path='/createagain' element={<BlogEditor />} /> */}
        <Route path='*' element={<h1>PAGE NOT FOUND</h1>} />
      </Routes>
    </BrowserRouter>
    </div>
    </ThemeContext.Provider>
  )
}

export default App
