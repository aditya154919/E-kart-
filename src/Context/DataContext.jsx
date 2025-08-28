
import axios from 'axios';
import React, { createContext, useState } from 'react';
import { useContext } from 'react';
// import Category from '../Components/Category';    

export const DataContext = createContext(null);

export const DataProvider = ({children}) =>{
    const [data ,setData] = useState()

    const fetchData = async() =>{
     try{
      const res = await axios.get('https://fakestoreapi.in/api/products?limit=150');
      const output = res.data.products;
      setData(output);
    //    console.log(output);
     }
     catch(error){
          console.log(error);
     }
    }

    const getUniqueCategories = (data, property) => {
             let newVal = data?.map((curElm) =>{
                return curElm[property];
             })
            
            newVal = ["All",...new Set(newVal)];
            return newVal;
        }
    
        const categoryData = getUniqueCategories(data, "category");
        const brandData = getUniqueCategories(data,"brand");

    return  <DataContext.Provider value={{data, setData, fetchData, categoryData,brandData}}>
         {children}
    </DataContext.Provider>
    
}

export const getData = () => useContext(DataContext);