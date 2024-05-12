import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../Redux/CategorySlice";
import { Circles } from 'react-loader-spinner';



export default function Categories() {
  let {loading , isError , categories} = useSelector((state) =>state.categories)

  console.log(categories);
 
  let dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(getCategories())
  },[])
  
  return (
    <>
      <h1 className="mt-5">Categories</h1>
      {loading? 
        <div className="loading">
           <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
     : <div className="row">
      {categories.map((category)=>
        <div className="col-md-3">
          <div className="category w-100 h-100 cursor-pointer">
            <img className="w-100 h-100  py-4" src={category.image} alt="" />
            <h4 className="h6">{category.name}</h4>
          </div>
        </div>
      )}
     </div>
      }
    </>
  );
}
