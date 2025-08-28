
import { getData } from '../Context/DataContext'

const FilterSection = ({setBrand,setSearch,category,setCategory,price,setPrice,handleCategory,handleBrand}) => {
  const {categoryData,brandData} = getData()

  

  return (
    <div className='bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block'>
      <input type='text'
      placeholder='Search..' 
      onChange={(e) =>setSearch(e.target.value)}
      className='p-2 bg-white border-2 border-gray-400 rounded-md'></input>
      <h1 className='font-semibold text-[21px] mt-3'>Category</h1>
      <div>
        {
          categoryData?.map((items,index) =>{
            return(
              <div className='flex flex-row gap-2 mt-2 text-xl font-sans'>
               <input type='radio' name={items} checked={category === items} value={items} onChange={handleCategory}  className=''/>
               <button className='uppercase cursor-pointer'>{items}</button>
              </div>
             
            )
          })
        }
      </div>

      <h1 className='font-semibold text-[21px] mt-3'>Brands</h1>
      
      <select className='mt-3 border-2 lowercase bg-white border-gray-400 p-2 rounded-md' onChange={handleBrand}>
        {
          brandData?.map((brand,index) =>{
            return(
              <option key={index} value={brand}>{brand.toUpperCase()}</option>
            )
          })
        }
      </select>

      <h1 className='font-semibold text-[21px] mt-3'>Price Range:</h1>
      <div className='flex flex-col gap-4'>
        <label >Price Range:${price[0]} - ${price[1]}:</label>
        <input type='range'min='0' max='5000' className='bg-red-500' value={price[1]} onChange={(e) => setPrice([price[0],Number(e.target.value)])}></input>
        <button className='p-2 bg-red-500 text-white rounded-md w-max px-3 font-semibold cursor-pointer '
          onClick={()=>{setSearch(''); setCategory('All'); setBrand('All'); setPrice([0,5000])}}
        >Reset Filters</button>
      </div>


    </div>
  )
}

export default FilterSection
