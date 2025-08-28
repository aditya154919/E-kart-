import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../assets/loading4.webm";
import Breadcrums from "../Components/Breadcurms";
import { useCart } from "../Context/CartContext";
import { IoCartOutline } from "react-icons/io5";

const SingleProduct = () => {
  const params = useParams();
  // console.log(params)
  const [singleProduct, setSingleProduct] = useState("");
  const [quantity, setQuantity] = useState(1);


  const getProduct = async () => {
    try {
      const url = await axios.get(
        `https://fakestoreapi.in/api/products/${params.id}`
      );

      const product = url.data.product;
      setSingleProduct(product);

      console.log(product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const { addToCart, cartItem } = useCart();
  function handleCart() {
    addToCart({ ...singleProduct, quantity });
  }

  const OriginalPrice = Math.round(
    singleProduct.price + (singleProduct.price * singleProduct.discount) / 100
  );
  return (
    <>
      {SingleProduct ? (
        <div className="p-5 md:p-0">
          <Breadcrums title={singleProduct.title} />
          <div className="max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <img
                src={singleProduct.image}
                className="rounded-2xl w-full object-cover"
              ></img>
            </div>
            <div>
              <h1 className="mt-1 font-bold text-xl md:text-3xl">
                {singleProduct.title}
              </h1>
              <div className="text-gray-700 mt-6 mb-5">
                {singleProduct.brand?.toUpperCase()} /
                {singleProduct.category?.toUpperCase()} /{singleProduct.model}
              </div>
              <p className="text-xl text-red-500 flex flex-row gap-2 font-bold mt-1 mb-4">
                ${singleProduct.price}
                <span className="line-through text-gray-700 ">
                  ${OriginalPrice}
                </span>
                <span className="bg-red-500 text-white px-4 py-1 rounded-full">
                  {singleProduct.discount}% discount
                </span>
              </p>
              <p className="text-gray-600">{singleProduct.description}</p>

              <div className="flex items-center gap-4 mt-5">
                <label htmlFor="" className="text-md font-medium text-gray-700">
                  Quantity:
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-20 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 foucs:ring-red-500"
                />
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleCart}
                  className="px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md cursor-pointer mb-2"
                >
                  <IoCartOutline className="w-6 h-6" /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <video muted autoPlay loop>
            <source src={Loading} type="video/webm" />
          </video>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
