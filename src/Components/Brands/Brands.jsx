import axios from 'axios'
import React from 'react'
import { Circles } from 'react-loader-spinner'
import { useQuery } from 'react-query'

export default function Brands() {

  function getBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }

  let {isLoading , data} = useQuery("brandProduct" , getBrands)
  console.log(data);
  return (
    <>
        <h2 className='pt-5 fw-bolder'>Fresh Cart Brands</h2>
        {isLoading?<div className="w-100 py-2 mt-2 d-flex justify-content-center">
        <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
        </div>:<div className="container py-2">
            <div className="row">
                {data?.data.data.map((brands)=><div key={brands.id} className='col-md-2'>  
                  <div className="product cursor-pointer py-3 mt-2 ">                           
                      <img className='w-100' src={brands.image} alt={brands.title} />
                      <span className='text-main font-sm fw-bold'>{brands.name}</span>                     
                  </div>
                </div> )}
            </div>
        </div>}
        
    </>
  )
}
