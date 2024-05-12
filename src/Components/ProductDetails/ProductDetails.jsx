import axios from 'axios';
import React, { useContext } from 'react'
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { increase } from '../../Redux/CounterSlice';


export default function ProductDetails() {
    let {id} = useParams();

     // Redux
    let {counter} = useSelector((state)=>state.counter)
    console.log(counter);

    let dispatch = useDispatch()

    
    function handelIncrement() {
        dispatch(increase())
        console.log(counter);
    }

    let {addToCart} = useContext(cartContext)
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

    function getProductDetails(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
   let {data} = useQuery('productDetails' , ()=> getProductDetails(id))
   console.log(data?.data.data);
 
  return (
   <>
    {data?.data.data ? <div className="row py-2 align-items-center">
        <Helmet>
            <title>{data?.data.data.title}</title>
        </Helmet>
            <div className="col-md-4">
                <img className='w-100' src={data?.data.data.imageCover} alt= {data?.data.data.title} />
            </div>
            <div className="col-md-8">
                <h2 className='h5'> {data?.data.data.title}</h2>
                <p>{data?.data.data.description}</p>

                <h6 className='text-main'>{data?.data.data.category?.name}</h6>
                <h6 className='text-main'>Price : {data?.data.data.price} EGY</h6>

                <div className='d-flex justify-content-between'>
                    <span>Rating Quantity: {data?.data.data.ratingsQuantity}</span>
                    <span> <i className='fas fa-star rating-color'></i>{data?.data.data.ratingsAverage} </span>
                </div>

                <button onClick={()=>handleClick(data?.data.data.id)} className=' btn bg-main text-white w-100 mt-2'>Add to Cart</button>
            </div>
        </div>:''}
    
   </>
  )
}
