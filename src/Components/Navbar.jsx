import { MapPin } from "lucide-react";
import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { CgClose } from "react-icons/cg";
import { useCart } from "../Context/CartContext";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";

const Navbar = ({location,getlocation,isDropDown ,setIsDropDown}) => {
  
  const {cartItem} = useCart()
  const[opennav,setOpenNav] = useState(false)
  const toggle = () => {
    setIsDropDown(!isDropDown);
  };

  return (
    <div className="bg-white py-3 shadow-2xl px-4 md:px-0">
      <div className="flex justify-between md:justify-around items-center max-w-6xl mx-auto">
        {/* logo */}
        <div className="text-2xl font-bold flex gap-7 items-center">
          <Link to={"/"}>
            <h1 className=" font-semibold text-3xl">
              <span className=" text-red-500 font-serif font-bold">E</span>kart
            </h1>
          </Link>
          <div className="md:flex gap-1 cursor-pointer text-gray-600 items-center hidden">
            <MapPin className="text-red-600"></MapPin>
            <span className="font-semibold">
              {location ? <div className=" text-[12px]">
                <p>
                  {location.county}, 
                  <span>{location.postcode}</span>
                </p>
                <p>{location.state}</p>
              </div> : "Add Address"}
            </span>
            <FaCaretDown className="text-gray-600" onClick={toggle}></FaCaretDown>
          </div>
          {
            isDropDown ? <div className="w-[250px] h-max bg-white shadow-2xl z-50 top-16 left-60 border-2 p-5 border-gray-200 rounded-md absolute">
           <h1 className="font-semibold mb-4 text-xl flex justify-between">Change location <span>
            <CgClose className="cursor-pointer text-xl" onClick={() =>{setIsDropDown(false)}}/>
            </span></h1>
            <button className="text-sm p-2 bg-red-500 text-white  rounded-md cursor-pointer hover:bg-red-400" onClick={getlocation}>Detect my location</button>
            </div> : null
          }
        </div>
        {/* menu items */}
        <nav className="flex items-center gap-6 ">
          <ul className="md:flex gap-6 text-xl font-sans font-semibold hidden">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `${isActive
                  ? "text-red-500 transition-all duration-100"
                  : "text-black"
                } cursor-pointer`
              }
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to={"/products"}
              className={({ isActive }) =>
                `${isActive
                  ? "text-red-500 transition-all duration-100"
                  : "text-black"
                } cursor-pointer`
              }
            >
              <li>Products</li>
            </NavLink>
            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                `${isActive
                  ? "text-red-500 transition-all duration-100"
                  : "text-black"
                } cursor-pointer`
              }
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to={"/contact"}
              className={({ isActive }) =>
                `${isActive
                  ? "text-red-500 transition-all duration-100"
                  : "text-black"
                } cursor-pointer`
              }
            >
              <li>Contact</li>
            </NavLink>
          </ul>
          <Link to={"/cart"} className="relative">
            <IoCartOutline className="h-7 w-7"></IoCartOutline>
            <span className="bg-red-500  px-2 rounded-full absolute -top-3 -right-3 text-white">
              {cartItem.length}
            </span>
          </Link>
          <div className="hidden md:block">
            <SignedOut>
              <SignInButton className = "bg-red-500 px-3 py-1 cursor-pointer rounded-md text-white font-semibold"/>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          {
            opennav ? <HiMenuAlt3 onClick={()=>setOpenNav(false)} className="h-7 w-7 md:hidden"/>:<HiMenuAlt1 onClick={()=>setOpenNav(true)}className="h-7 w-7 md:hidden"/>
          }
        </nav>
        <ResponsiveMenu opennav={opennav} setOpenNav={setOpenNav}/>
      </div>
    </div>
  );
};

export default Navbar;
