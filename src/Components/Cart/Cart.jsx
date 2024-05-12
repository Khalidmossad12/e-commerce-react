import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContext'
import { Circles } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from '../../Redux/CounterSlice';
 

export default function Cart() {

  //Redux
  let {counter} = useSelector((state)=>state.counter)
  console.log(counter);

  let dispatch = useDispatch()

  
  function handleDecrement() {
    dispatch(decrease())
    console.log(counter);
  }

  const [cartDetails, setCartDetails] = useState(null)
  let {getLoggedUserCart , removeCartItem , updateProductQuantity} = useContext(cartContext);

  async function getCart(){
    let {data} = await getLoggedUserCart();
    console.log(data);
    setCartDetails(data)
  }

  async function updateCount(id , count){
    let {data} = await updateProductQuantity(id , count);
    setCartDetails(data)
  }
  
  async function removeItem(id){
    let {data} = await removeCartItem(id)
    setCartDetails(data)
    handleDecrement()
  }

  useEffect(()=>{
    getCart()
  }, [])
  return (
    <>
      {cartDetails ?<div className="w-90 my-2 p-3 mx-auto bg-main-light mt-5">
          <h3>Shopping Cart</h3>
          <h4 className='h6 text-main fw-bolder'>Cart Items : {cartDetails.numOfCartItems}</h4>
          <h4 className='h6 text-main fw-bolder mb-4'>Total Cart Price : {cartDetails.data.totalCartPrice} EGP</h4>
          {cartDetails.data.products.map((product)=> <div key={product.product.id} className='row border-bottom py-2 px-2'>
            
              <div className="col-md-1">
                <img className='w-100' src={product.product.imageCover} alt="" />
              </div>
              <div className="col-md-11">

                <div className="d-flex justify-content-between align-items-center">

                    <div>
                      <h3 className='h6 '>{product.product.title.split(' ').slice(0,3).join(' ')}</h3>
                      <h6 className='text-main'> Price : {product.price} EGP</h6>
                    </div>

                    <div>
                      <button onClick={()=>updateCount(product.product.id , product.count + 1 )} className='btn brdr-main p-1'>+</button>
                      <span className='mx-2'>{product.count}</span>
                      <button onClick={()=>updateCount(product.product.id , product.count - 1 )} className='btn brdr-main p-1'>-</button>
                    </div>

                </div>

                <button onClick={()=>removeItem(product.product.id)} className='btn p-0'><i className='fas fa-trash-can font-sm text-danger'></i> Remove</button>
              </div>

            </div>)}

            <Link to={`/address`} className='btn bg-main w-25 text-white m-2 '>Online Payment</Link>
            <button  className='btn bg-main w-25 text-white m-2 '>Cach On Delivery </button>
       </div>:
       <section id='loading' className='d-flex justify-content-center align-items-center mt-5'>
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
       </section> }
       
    </>
  )
}
