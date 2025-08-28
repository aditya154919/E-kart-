import React, { useEffect } from 'react'
import { DataContext, getData } from '../Context/DataContext';
import { useContext } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { Blocks } from 'lucide-react';
import Category from './Category';
import { useNavigate } from 'react-router-dom';
import Products from '../Pages/Products';


const Carousal = () => {

  const {data,fetchData} = getData()
  useEffect(() =>{
    fetchData();
  },[])

// Custom Prev Arrow
const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      onClick={onClick}
      className={`arrow ${className}`}
      style={{ ...style, zIndex: 3 , marginLeft: "20px" }}
    >
      <AiOutlineArrowLeft
        className="arrows"
        style={{
          display: "block",
          borderRadius: "50px",
          background: "#f53347",
          color: "white",
          padding: "6px",
          position: "absolute",
          left: "20px",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#555")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f53347")}
      />
    </div>
  );
};

// Custom Next Arrow
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div onClick={onClick} className={`arrow ${className}`} style={{ ...style, zIndex: 3, marginRight: "20px" }}>
      <AiOutlineArrowRight
        className="arrows"
        style={{
          display: "block",
          borderRadius: "50px",
          background: "#f53347",
          color: "white",
          padding: "6px",
          position: "absolute",
          right: "20px",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#555")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f53347")}
      />
    </div>
  );
};

// Slider settings
const settings = {
  dots: false,
  autoplay: true,
  autoplaySpeed: 2000,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  pauseOnHover:false,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};
const navigate = useNavigate()


  return (
    
    <div>
      <Slider {...settings}>
        {
            data?.slice(0,7).map((items,index) =>{
                return (
                    <div key={index} className='bg-gradient-to-r from-[#0f0c29] via-[#292184] to-[#27207c]  -z-10 '>
                     <div className='flex flex-col md:flex-row  md:my-0 my-10 gap-10 justify-center h-[600px] items-center px-4'>
                         <div className='md:space-y-6 space-y-2'>
                            <h3 className='text-red-500 font-semibold font-sans text-sm'>Powering your world with the Best in Electronics</h3>
                            <h1 className='md:text-4xl text-xl font-bold uppercase line-clamp-2 md:line-clamp-3 md:w-[500px] text-white'>{items.title}</h1>
                            <p className='md:w-[500px] text-gray-400 line-clamp-3 pr-7'>{items.description}</p>
                            <button className='bg-gradient-to-r from-red-500 to-purple-500 text-white px-4 py-2 rounded-md  mt-2 cursor-pointer' onClick={() =>navigate(`/Products/${items.id}`)}>Shop Now</button>
                         </div>
                         <div>
                            <img src={items.image} alt={items.title} className='w-[430px]  rounded-full hover:scale-[1.1] transition-all duration-200 shadow-2xl shadow-red-400' />
                         </div>
                     </div>
                    </div>
                )
            })
        }
     
      
    </Slider>

    <Category />

   
    </div>
  )
}

export default Carousal
