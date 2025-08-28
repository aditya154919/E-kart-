import React, { useEffect } from "react";
import { getData } from "../Context/DataContext";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  const {data} = getData()
  const getUniqueCategories = (data, property) => {
    let newVal = data?.map((curElm) => {
      return curElm[property];
    });

    newVal = [...new Set(newVal)];
    return newVal;
  };

  const categoryData = getUniqueCategories(data, "category");

  return (
    <div className="px-4 py-5 flex flex-wrap justify-center md:justify-around gap-4 bg-[#101829]">
      {categoryData?.map((items, index) => {
        return (
          <button
            onClick={() => navigate(`/Category/${items}`)}
            key={index}
            className="bg-gradient-to-r from-red-500 to-purple-500 text-white px-4 py-2 rounded-md  mt-2 cursor-pointer uppercase"
          >
            {items}
          </button>
        );
      })}
    </div>
  );
};

export default Category;
