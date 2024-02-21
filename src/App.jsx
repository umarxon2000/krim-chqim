import React from 'react'
import './App.css'
import About from "./pages/About"
import Blog from "./pages/Blog"
import Login from "./pages/Login"
import Service from "./pages/Service"
import Dashboard from './pages/dashboard/dashboard'

import { Routes, Route } from 'react-router-dom'
import Products from './pages/dashboard/Products'
import Order from './pages/dashboard/Order'
import Expenses from './pages/dashboard/Expenses'
import MainPage from './pages/Main'


function App() {



   

  return (
    <div >
      <div className='container'>


      <Routes>
        <Route  path='/' element={<MainPage/>} />
        <Route path='/about/*' element={<About />} />
        <Route path='/blog' element={<Blog />} />

           
        <Route path='/dashboard' element={<Dashboard />} />
            
        
        <Route path='/service/' element={<Service />} />
        <Route path='/login' element={< Login />} />
        <Route path='/products' element={<Products />} />
        <Route path='/order' element={<Order />} />
        <Route path='/expense' element={<Expenses />} />

      </Routes>

     



      </div>
    </div>
  )
}

export default App
