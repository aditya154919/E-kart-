import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

const ResponsiveMenu = ({ opennav, setOpenNav }) => {
  const { user } = useUser();

  return (
    <div
      className={`${
        opennav ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white px-8 pb-6 pt-16 text-black md:hidden rounded-r-xl shadow-md transition-all`}
    >
      <div>
        {/* User Info */}
        <div className="flex items-center justify-start gap-3">
          {user ? <UserButton /> : <FaUserCircle size={50} />}
          <div>
            <h1>Hello, {user?.firstName || "Guest"}</h1>
            <h1 className="text-sm text-slate-500">
              {user ? "Premium User" : "Please Sign In"}
            </h1>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-12">
          <ul className="flex flex-col gap-7 text-2xl font-semibold">
            <Link to="/" onClick={() => setOpenNav(false)}>
              Home
            </Link>
            <Link to="/products" onClick={() => setOpenNav(false)}>
              Products
            </Link>
            <Link to="/about" onClick={() => setOpenNav(false)}>
              About
            </Link>
            <Link to="/contact" onClick={() => setOpenNav(false)}>
              Contact
            </Link>
          </ul>
        </nav>

        {/* Auth Section */}
        <div className="mt-10">
          {/* <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-red-500 px-4 py-2 rounded-md text-white font-semibold w-full">
                Sign In
              </button>
            </SignInButton>
            <SignOutButton >
                <button className="bg-red-500 px-4 py-2 rounded-md text-white font-semibold w-full">
               log out
              </button>
            </SignOutButton>
          </SignedOut> */}

          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-red-500 px-4 py-2 rounded-md text-white font-semibold w-full">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <SignOutButton>
              <button className="bg-red-500 px-4 py-2 rounded-md text-white font-semibold w-full">
                Log Out
              </button>
            </SignOutButton>
          </SignedIn>
        </div>

        <p className=" px-2 mt-50">
          Made by <span className="font-bold"> Aditya ❤️</span>
        </p>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
