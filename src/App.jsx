import React, { useState } from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Main from "./pages/Main"
import About from "./pages/About"
import Blog from "./pages/Blog"
import Login from "./pages/Login"
import Service from "./pages/Service"
import Dashboard from './pages/dashboard/dashboard'

import { Routes, Route } from 'react-router-dom'
import Products from './pages/dashboard/Products'


function App() {

  const [isUser, setisUser] = useState(false)


   

  return (
    <div >
      <div className='container'>


      <Routes>
        <Route  path='/' element={<Main/>} />
        <Route path='/about/*' element={<About />} />
        <Route path='/blog' element={<Blog />} />

           
           <Route path='/dashboard' element={<Dashboard />} />
            
        
        <Route path='/service/' element={<Service />} />
        <Route path='/login' element={< Login />} />
        <Route path='/products' element={<Products />} />

      </Routes>



      </div>
    </div>
  )
}

export default App
