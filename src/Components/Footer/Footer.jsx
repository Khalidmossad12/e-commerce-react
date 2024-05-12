import React from 'react'
import payentImage from '../../Assets/images/images.png'
import downloadImage from '../../Assets/images/download.png'
export default function Footer() {
  return <>
    <footer className='footer '>
      <div className="row g-4 d-flex justify-content-start mx-2 pt-5">
        <div className='col-md-11'>
          <h2 className='h4 fw-bolder'>Get The Fresh Cart App</h2>
          <p>we will send you a link, open it on your phone to download the app</p>
        </div>
      </div>

      <div className="row d-flex justify-content-center pt-3">
        <div className="col-md-9">
          <input className='rounded-4 w-100' type="email" placeholder='Email...'/>
        </div>
        <div className="col-md-2">
          <button className='btn bg-main text-white rounded-4'>Share App Link</button>
        </div>
      </div>

      <div className="row d-flex justify-content-evenly align-items-center pt-3">
        <div className="col-md-6 ml-3">
          <span>Payment Prteners</span>
          <img width={250} src={payentImage} alt="" />
        </div>
        <div className="col-md-5 d-flex align-items-center">
          <span className='font-sm'>Get deliveries with fresh cart</span>
          <img  width={250} src={downloadImage} alt="" /> 
        </div>
      </div>
    </footer>
  </>
}
