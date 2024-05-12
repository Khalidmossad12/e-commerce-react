import React, { useContext, useEffect } from 'react'
import { cartContext } from '../../Context/CartContext'

export default function Order() {
   let{getAllOrders} = useContext(cartContext)

   async function getOrders() {
    let response = await getAllOrders('66055e64be8b52323596b862');
    console.log(response);
   }

   useEffect(()=>{
    getOrders();
   },[])
  return (
    <div className='mt-5'>
      <h2>Orders</h2>
    </div>
  )
}
