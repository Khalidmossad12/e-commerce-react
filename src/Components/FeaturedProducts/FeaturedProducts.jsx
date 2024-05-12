import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Circles } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { increase } from '../../Redux/CounterSlice';

 

export default function FeaturedProducts() {

      // Redux
      let {counter} = useSelector((state)=>state.counter)
      console.log(counter);
  
      let dispatch = useDispatch()
  
      
      function handelIncrement() {
          dispatch(increase())
          console.log(counter);
      }
  
    //Context
    let {addToCart} = useContext(cartContext)
    let {numOfCartItems} = useContext(cartContext)

    async function addProduct(productId) { 
        let response = await addToCart(productId);
        if (response.data.status === 'success') {
            toast.success('Product Successfully Added')
        }else{
            toast.error('Error Adding Product')
        }

        console.log(response);
    }

    // Handel Click
    async function handleClick (productId){
        handelIncrement();
        await addProduct(productId)
    }

    function getFeaturedProducts(){

        return axios.get('https://ecommerce.routemisr.com/api/v1/products');
    }
    let{ isLoading , data} = useQuery('FeaturedProducts' , getFeaturedProducts)

      
  return (
    <>
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
                {data?.data.data.map((product)=><div key={product.id} className='col-md-2'>
                    
                        <div className="product cursor-pointer py-3 mt-2 ">
                            <Link to={`/productdetails/${product._id}`}>
                                <img className='w-100' src={product.imageCover} alt={product.title} />
                                <span className='text-main font-sm fw-bold'>{product.category.name}</span>
                                <h3 className='h6'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
                                <div className='d-flex justify-content-between mt-3'>
                                    <span>{product.price} EGY</span>
                                    <span> <i className='fas fa-star rating-color'></i> {product.ratingsAverage}</span>
                                </div>
                            </Link>
                            <button onClick={()=>handleClick(product._id) } className='btn bg-main text-white w-100 btn-sm mt-2'>Add Cart</button>
                        </div>
                    
                        
                </div> )}
            </div>
        </div>}
        
        
    </>
  )
}
