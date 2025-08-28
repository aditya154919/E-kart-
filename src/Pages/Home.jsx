import React from 'react'
import Carousal from '../Components/Carousal'
import MidBanner from '../Components/midBanner'
import Features from '../Components/Features'
import Footer from '../Components/Footer'

const Home = () => {
  
  return (
    <div className='overflow-x-hidden'>
     <Carousal />
     <MidBanner/>
     <Features/>
    
    </div>
  )
}

export default Home
