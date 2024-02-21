import React from 'react'
import PrimarySearchAppBar from "../components/navbar/Navbar"
import MyCarousel from '../components/swiper/Swiper'

const MainPage = () => {
  return (
    <div>

      <PrimarySearchAppBar />
      <div>
        <MyCarousel />
      </div>
    </div>
  )
}

export default MainPage