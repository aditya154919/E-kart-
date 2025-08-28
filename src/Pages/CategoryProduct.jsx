import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { TiArrowBack } from "react-icons/ti";
import ProductList from '../Components/ProductList';
import Loading from "../assets/loading4.webm";

const CategoryProduct = () => {
  const [searchData, setsearchData] = useState([]);
  const param = useParams();
  const category = param.category
  console.log(category)

  const getCategory= async () =>{
    try{
      const url  = await axios.get(`https://fakestoreapi.in/api/products/category?type=${category}`)
      const res = url.data.products
      console.log(res)
      setsearchData(res)
    }
    catch(error){
      console.log(error);
    }
  }

   useEffect(() =>{
    getCategory()
    window.scroll(0,0)
  },[])

  const navigate = useNavigate()
  return (
    <div>
      {
        searchData.length  > 0 ? (
        <div className='mt-10 max-w-6xl mx-auto px-4 '>
          <button className=' cursor-pointer flex flex-row gap-2 rounded-md bg-gray-700 text-white mb-5 px-3 py-1 
          items-center ' onClick={()=> navigate('/')}><TiArrowBack />Back</button>
          {
            searchData.map((product,index) =>{
              return(
                <div>
                  <ProductList key={index} product = {product}/>
                </div>
              )
            })
          }
        </div>
      ):
      (
        <div className='flex items-center justify-center h-[400px]'>
             <video muted autoPlay loop>
              <source src={Loading} type='video/webm'/>
             </video>
          </div>
      )
      }
    </div>
  )
}

export default CategoryProduct
