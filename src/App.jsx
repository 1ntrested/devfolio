import React from 'react';
import Signup  from './components/Signup'
import Navbar from './components/Navbar'
import Login from './components/Login';
import Experience from "./components/Experience/Experience.jsx";
import Posts from './components/Create';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Showpost from './components/Showpost';
import Newpage from './components/Newpage';

import { createContext } from "react";
export const ThemeContext=createContext(null);

function App() {
  return (
   <div className="App">
   <BrowserRouter>
     <Navbar />
     
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/createpost' element={<Posts />} />
        <Route path='/showpost' element={<Showpost />} />
        <Route path='/newpage' element={<Newpage />} /> 
        <Route path="/experience" element={<Experience />} />     
        <Route path='*' element={<h1>PAGE NOT FOUND</h1>} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App