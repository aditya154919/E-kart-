import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Products from './Pages/Products'
import Cart from './Pages/Cart'
import Navbar from './Components/Navbar'
import axios from 'axios'
import Footer from './Components/Footer'
import SingleProduct from './Pages/SingleProduct'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import CategoryProduct from './Pages/CategoryProduct'


const App = () => {
  const [location, setLocation] = useState();
  const [isDropDown, setIsDropDown] = useState(false);
  const [cartItem, setCartItem] = useState([])

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async position => {
      const { latitude, longitude } = position.coords

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      try {
        const location = await axios.get(url);
        const exactLocation = location.data.address;
        setLocation(exactLocation);
        setIsDropDown(false);
      }
      catch (error) {
        console.log(error)
      }
    })
  }

  useEffect(() => {
    getLocation();
  }, [])

 // Load cart from localStorage on first render
useEffect(() => {
  const storedCart = localStorage.getItem("cartItem");
  if (storedCart) {
    try {
      setCartItem(JSON.parse(storedCart));
    } catch (error) {
      console.error("Invalid cart data in localStorage:", error);
      setCartItem([]);
    }
  }
}, []);

// Save cart to localStorage whenever it changes
useEffect(() => {
  localStorage.setItem("cartItem", JSON.stringify(cartItem));
}, [cartItem]);



  useEffect(() => {
  if (cartItem.length > 0) {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }
}, [cartItem]);

  return (
    <BrowserRouter basename='/E-kart-/'>
      <Navbar
        location={location}
        geolocation={getLocation}
        isDropDown={isDropDown}
        setIsDropDown={setIsDropDown}
      />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/category/:category' element={<CategoryProduct />} />
        <Route path='/products/:id' element={<SingleProduct />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart location = {location} getLocation = {getLocation} />} />
      </Routes>

      <Footer />

      {/* ✅ Toast container must be inside the JSX tree once */}
      <ToastContainer position="bottom-right" autoClose={2000} />
    </BrowserRouter>
  )
}

export default App
