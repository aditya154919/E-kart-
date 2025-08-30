import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useCart } from "../Context/CartContext";
import { LuNotebookText } from "react-icons/lu";
import { CiDeliveryTruck } from "react-icons/ci";
import { GiShoppingBag } from "react-icons/gi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import emptycart from "../assets/emptycart.png";

const Cart = ({ getLocation, location }) => {
  const { cartItem, updateQuantity, deleteItem } = useCart();

  const totalPrice = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const { user } = useUser();
  console.log(user);
  const navigate = useNavigate();

  function getLocation() {}
  return (
    <div className="mt-10 max-w-6xl mb-5 mx-auto px-4 md:px-0">
      {cartItem?.length > 0 ? (
        <div>
          <h1 className="font-bold text-2xl ">
            My Cart <span>({cartItem.length})</span>
          </h1>
          <div className="mt-10">
            {cartItem?.map((item, index) => {
              return (
                <div className="bg-gray-100 rounded-md md:p-5 p-3 flex item-center justify-between  mt-3 md:w-full overflow-hidden md:gap-10 gap-2 "> 
                  <div className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 rounded-md"
                    ></img>
                    <div>
                      <h1 className="font-serif md:w-[300px] md:text-xl text-[1rem] line-clamp-2">
                        {item.title}
                      </h1>
                      <p className="text-red-500 font-semibold mt-2 text-xl">
                        ${item.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex mt-7 h-[60%] max-w-auto gap-2 justify-center items-center bg-red-500 md:px-5 px-2 rounded-md text-white text-xl py-1">
                    <button
                      onClick={() =>
                        updateQuantity(cartItem, item.id, "decrease")
                      }
                      className="cursor-pointer"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(cartItem, item.id, "increase")
                      }
                      className="cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <div className="">
                    <RiDeleteBin6Line
                      className="text-red-500 text-2xl mt-8 "
                      onClick={() => deleteItem(item.id)}
                    ></RiDeleteBin6Line>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="  flex flex-col md:flex-row mt-6 gap-8 md:gap-20 ">
            {/* Address */}

            <div className="w-full">
              <div className="bg-gray-100 rounded-md p-7 mt-4 space-y-2  ">
                <h1 className="text-gray-800 font-bold text-xl">
                  Delivery Info
                </h1>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="p-2 rounded-md border-2 border-gray-400 bg-white "
                    value={user?.fullName}
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="">Address</label>
                  <input
                    type="text"
                    placeholder="Enter your address"
                    className="p-2 rounded-md border-2 border-gray-400 bg-white"
                    value={location?.county}
                  />
                </div>
                <div className="flex w-full gap-5">
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">State</label>
                    <input
                      type="text"
                      placeholder="Enter your state"
                      className="p-2 rounded-md w-full border-2 border-gray-400 bg-white"
                      value={location?.state}
                    />
                  </div>
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">PostCode</label>
                    <input
                      type="text"
                      placeholder="Enter your postcode"
                      className="p-2 rounded-md w-full border-2 border-gray-400 bg-white"
                      value={location?.postcode}
                    />
                  </div>
                </div>
                <div className="flex w-full gap-5">
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">Country</label>
                    <input
                      type="text"
                      placeholder="Enter your country"
                      className="p-2 rounded-md w-full border-2 border-gray-400 bg-white"
                      value={location?.country}
                    />
                  </div>
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">Phone No</label>
                    <input
                      type="text"
                      placeholder="Enter your Number"
                      className="p-2 rounded-md w-full border-2 border-gray-400 bg-white"
                    />
                  </div>
                </div>
                <button className="bg-red-500 text-white px-3 py-1 rounded-md mt-3 cursor-pointer">
                  Submit
                </button>
                <div className="flex items-center justify-center w-full text-gray-700">
                  ---------OR-----------
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={getLocation}
                    className="bg-red-500 text-white px-3 py-2 rounded-md"
                  >
                    Detect Location
                  </button>
                </div>
              </div>
            </div>

            <div className=" w-full bg-white rounded-md shadow-2xl  border border-gray-200  p-7 mt-6 space-y-2 h-max">
              <h1 className="text-xl font-bold">Bill details</h1>
              <div className="flex justify-between items-center">
                <h1 className="flex items-center gap-1 text-gray-700">
                  <span>
                    <LuNotebookText />
                  </span>
                  Total Price
                </h1>
                <p>${totalPrice}</p>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="flex items-center gap-1 text-gray-700">
                  <span>
                    <CiDeliveryTruck />
                  </span>
                  Delivery charge
                </h1>
                <p className="text-rose-500">
                  {totalPrice > 100 ? "Free" : "$5"}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="flex items-center gap-1 text-gray-700">
                  <span>
                    <GiShoppingBag />
                  </span>
                  Handling Charge
                </h1>
                <p className="">$7</p>
              </div>
              <hr className="text-gray-200 mt-2" />
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">Grand Total</h1>
                <p>${totalPrice > 100 ? totalPrice + 7 : totalPrice + 12}</p>
              </div>
              <div className="flex flex-col gap-2 mt-7">
                <p>Apply promo code</p>
                <div className="flex flex-row justify-between">
                  <input
                    required
                    type="text"
                    placeholder="PROMO CODE"
                    className="mt-2 border-2 border-gray-400 p-2 rounded-md md:w-full w-[185px]  bg-white"
                  ></input>
                  <button className="bg-white text-black border border-gray-200 px-4 cursor-pointer py-1 rounded-md ml-1 ">
                    Apply
                  </button>
                </div>
              </div>
              <button className="bg-red-500 text-white px-3 py-2 rounded-md w-full cursor-pointer mt-3">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 justify-center items-center h-[600px]">
          <h1 className="text-red-500/80 font-bold text-5xl text-muted">
            Oh no! Your cart is empty
          </h1>
          <img src={emptycart} alt="" className="w-[400px]" />
          <button
            onClick={() => navigate("/products")}
            className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer "
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
