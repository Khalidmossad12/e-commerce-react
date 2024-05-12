import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Circles } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { increase } from '../../Redux/CounterSlice';
import { useDispatch, useSelector } from 'react-redux';

 

export default function FeaturedProducts() {
  let itemsPerPage = 10;
  const [currentPage, setcurrentPage] = useState(1)
  const [isPrevDisabled, setPrevDisabled] = useState(false);
  const [isNextDisabled, setNextDisabled] = useState(false);
  let numberPages = 1;
  let nextPage = 1;

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

      
  }

  // Handel Click
  async function handleClick (productId){
    handelIncrement();
    await addProduct(productId)
  }

 

  function getFeaturedProducts(){

      return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }
  let{ isLoading , data } = useQuery('FeaturedProducts' , getFeaturedProducts)

   // calc first item and last item to display the page
   let lastItem = currentPage * itemsPerPage;
   let firstItem  = lastItem - itemsPerPage;
   let currentItems = data?.data.data.slice(firstItem ,lastItem)

   // Next Page Button
   function nextbtn() {
    numberPages = data?.data.metadata.limit / itemsPerPage;
    let next = document.getElementsByClassName("next");
      if (numberPages > currentPage) {
        setNextDisabled(false);
        nextPage = setcurrentPage(currentPage + 1);
        setPrevDisabled(false)
      }else{
        setNextDisabled(true);
      }
   }

   // Previous Page Button
    function prevbtn(){
      let previous = document.querySelectorAll("previous")
      if (currentPage == 1) {
        setPrevDisabled(true)
      }else{
        setNextDisabled(false);
        setPrevDisabled(false)
        previous = currentPage - 1;
        setcurrentPage(previous)
      }
    }

      
  return (
    <>
        {isLoading?<div className="w-100 py-2 mt-2 d-flex justify-content-center mt-5">
        <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
        </div>:<div className="container py-2 mt-5">
            <div className="row">
                {currentItems.map((product)=><div key={product.id} className='col-md-2'>  
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
                      <button onClick={()=> handleClick(product._id)} className='btn bg-main text-white w-100 btn-sm mt-2'>Add Cart</button>
                  </div>    
                </div> )}
            </div>

            {/* Pagination buttons */}
            <div className="d-flex justify-content-center mt-5">
                <nav aria-label=" Page navigation example d-flex justify-content-center align-itemes-center">
                  <ul className="pagination cursor-pointer"> 
                    <button disabled={isPrevDisabled} onClick={()=>prevbtn()} className="btn border-0 p-0 previous page-item"><a className=" page-link">Previous</a></button>
                    <li className="page-item"><a className="page-link">{currentPage}</a></li>
                    <button disabled={isNextDisabled} onClick={()=>nextbtn()} className="next btn border-0 p-0  page-item"><a className="page-link">Next</a></button>
                  </ul>
                </nav>  
            </div>


        </div>}
        
        
    </>
  )
}

