import React from 'react'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../Context/CartContext';

const ProductCart = ({product}) => {
     
  const {addToCart,cartItem} = useCart();  
  console.log(cartItem);

    function handleCart() {
      addToCart(product)
    //  toast.success(`Product added successfully!`, {
    //   position: "bottom-right",
    // });
  }

  const navigate = useNavigate();
  
  
  return (
    <div className='border relative  h-max md:w-[200px] p-1   border-gray-100 shadow-2xl bg-white rounded-md
    hover:scale-[1.04] hover:shadow-2xl transition-all'>
      <img src={product.image} className='bg-gray-100 aspect-square cursor-pointer ' onClick={() =>navigate(`/products/${product.id}`)}></img>
      <div className='px-1'>
      <h1 className='line-clamp-2 font-semibold uppercase text-xl'>{product.title}</h1>
      <h1 className='font-bold text-2xl mt-1'>${product.price}</h1>
      </div>
      <button className='bg-red-500 text-white flex ml-2  mb-2 flex-row gap-1 p-3 px-2 cursor-pointer max-w-max mt-2 font-bold rounded-md' onClick={handleCart} ><AiOutlineShoppingCart className='text-2xl font-bold'/>Add to Cart</button>
      
    </div>
  )
}

export default ProductCart



