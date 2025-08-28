import React, { useEffect, useState } from "react";
import { getData } from "../Context/DataContext";
import FilterSection from "../Components/FilterSection";
import Loading from "../assets/loading4.webm";
import ProductCart from "../Components/ProductCart";
import Pagination from "../Components/Pagination";
import Lottie from "lottie-react";
import notfound from "../assets/notfound.json";
import MobileFilter from "../Components/MobileFilter";

const Products = () => {
  const { data, fetchData } = getData();

  const [search, setSearch] = useState(""); // ✅ start with empty string
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState([0, 5000]);
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);

  const handleBrand = (e) => {
    setBrand(e.target.value);
    setPage(1);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setPage(1);
    // console.log(e.target.value);
  };

  const filteredData = data?.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category === category) &&
      (brand === "All" || item.brand === brand) &&
      item.price >= price[0] &&
      item.price <= price[1]
  );
  const dynamicPage = Math.ceil(filteredData?.length / 8);

  const handlePage = (selectPage) => {
    setPage(selectPage);
  };

  useEffect(() => {
    fetchData();
    window.scroll(0, 0);
  }, []);

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <MobileFilter
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          brand={brand}
          setBrand={setBrand}
          price={price}
          setPrice={setPrice}
          handleBrand={handleBrand}
          handleCategory={handleCategory}
        />
        {data?.length > 0 ? (
          <>
            <div className="flex gap-8 ">
              {/* Left side filter */}
              <FilterSection
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                brand={brand}
                setBrand={setBrand}
                price={price}
                setPrice={setPrice}
                handleBrand={handleBrand}
                handleCategory={handleCategory}
              />

              {filteredData?.length > 0 ? (
                <div className="flex flex-col justify-center items-center">
                  <div className="grid md:grid-cols-4 grid-cols-2  mt-10 gap-2 md:gap-3">
                    {filteredData
                      ?.slice(page * 8 - 8, page * 8)
                      .map((product, index) => (
                        <ProductCart
                          key={product.id || index}
                          product={product}
                          index={index}
                        />
                      ))}
                  </div>
                  <Pagination
                    setPage={setPage}
                    page={page}
                    handlePage={handlePage}
                    dynamicPage={dynamicPage}
                  />
                </div>
              ) : (
                <div className="flex justify-center items-center md:h-[600px] md:w-[900px] mt-10">
                  <Lottie animationData={notfound} classID="w-[500px]" />
                </div>
              )}
              {/* Right side products */}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-[400px]">
            <video muted autoPlay loop>
              <source src={Loading} type="video/webm" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

// function getOtp(num){
//     let otp= ''
//     for(let i=0;i<num;i++){
//        otp += Math.floor(Math.random() * 10)
//     }
//     return otp
// }

//  const otp = getOtp(6);
//  console.log(otp)
