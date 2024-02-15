import React from 'react'
import MiniDrawer from '../../components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Products from './Products'

const Dashboard = () => {
  return (
    <div>
        <MiniDrawer />
        <Routes>
          <Route path='/products' element={<Products />} />
        </Routes>
        
    </div>
  )
}

export default Dashboard