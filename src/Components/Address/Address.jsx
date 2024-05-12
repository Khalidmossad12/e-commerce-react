import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { cartContext } from '../../Context/CartContext';

export default function Address() {
    let {onlinePayment , cardId} = useContext(cartContext);

   async function handelSubmit(values) {
        let response = await onlinePayment(cardId , 'http://localhost:3000' , values)
        console.log(response.data.session.url);
        window.location.href= response.data.session.url
    }
    let formik = useFormik({
        initialValues:{
            details: "",
            phone:"",
            city:""
        },
        onSubmit:handelSubmit
    }) 
  return (
    <div className="container mt-5">
        <form onSubmit={formik.handleSubmit} action="">
            <label htmlFor="details">Details</label>
            <input value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className='form-control mb-2' name='details' id='details' />

            <label htmlFor="phone">Phone</label>
            <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" className='form-control mb-2' name='phone' id='phone' />

            <label htmlFor="city">City</label>
            <input value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className='form-control mb-2' name='city' id='city' />

            <button type='submit' className='btn bg-main text-white' >Pay Now</button>
        </form>
    </div>
  )
}
