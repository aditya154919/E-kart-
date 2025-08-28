import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useCart } from '../Context/CartContext';

const ProductList = ({key,product}) => {
    const navigate = useNavigate()
    const {addToCart,cartItem} = useCart();  
      
    
        function handleCart() {
          addToCart(product)
         
      }
  return (
    <div className='space-y-4 mt-2 rounded-md'>
      <div className='bg-gray-100 flex gap-7 items-center p-2 rounded-md overflow-hidden'>
        <img src={product.image} alt={product.title} className='md:h-60 md:w-60 h-25 w-25 rounded-md cursor-pointer' onClick={()=>navigate(`/products/${product.id}`)}/>
        <div className='space-y-2 md:space-y-4'>
          <h1 className='font-bold md:text-xl text-[1rem] line-clamp-2 md:line-clamp-3 hover:text-red-400 md:w-full w-[220px]'>{product.title}</h1>
          <p className='font-semibold flex items-center md:text-3xl text-xl'>$<span className='md:text-3xl text-2xl'>{product.price}</span> ({product.discount}% off)</p>
          <p>Fastest delivery<span className='font-bold'> In 4 days</span></p>
          <button onClick={handleCart} className='bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer'>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default ProductList
