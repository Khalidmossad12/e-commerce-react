import React from 'react'
import errorImage from '../../Assets/images/error.svg'
export default function Notfound() {
  return (
    <div>
      <div className="row mt-5">
        <div className="col-md-12 d-flex justify-content-center align-items-center">
          <img src={errorImage} alt="" />
        </div>
      </div>
    </div>
  )
}
