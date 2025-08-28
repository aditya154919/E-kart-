import React from 'react'

const Pagination = ({page,setPage,handlePage,dynamicPage}) => {

    const getPages = (current, total) =>{
    const pages = [];
    if(total <= 5){
        for (let i =1; i <= total; i++){
            pages.push(i)
        }
    }else {
        if(current <= 3) {
            pages.push(1,2,3,'...', total)
        } else if (current >= total-2){
            pages.push(1,'...', total-2, total-1, total)
        } else {
            pages.push(1, '...', current-1, current, current+1, '...', total)
        }
    }
    return pages;
}

  return (
    <div className='mt-11 space-x-4 '>
      <button disabled={page==1} className={`${page == 1 ? 'bg-red-400':'bg-red-500'} px-3 py-1 text-white rounded-md cursor-pointer text-md`}
      onClick={()=>handlePage(page - 1)}
      >Prev</button>
      {
            getPages(page, dynamicPage)?.map((item, index) =>{
                return (
                    <span key={index} 
                    onClick={()=> typeof item === "number" && handlePage(item)}
                    className={`cursor-pointer ${item === page ? "font-bold text-red-600": "text-black"}`}
                    >
                        {item}
                    </span>
                )
            })
        }
      <button disabled={page==dynamicPage} className={`${page == dynamicPage ? 'bg-red-400':'bg-red-500'} px-3 py-1 text-white rounded-md cursor-pointer text-md`}
      onClick={()=>handlePage(page + 1)}
      >Next</button>
    </div>
  )
}

export default Pagination
