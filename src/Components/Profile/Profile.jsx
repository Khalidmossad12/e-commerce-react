import { jwtDecode } from 'jwt-decode'
import React from 'react'

export default function Profile() {
    let encodedToken = localStorage.getItem('userToken');   
    let decodedToken =jwtDecode(encodedToken)
    
  return (
    <>
      <h2>Hello : {decodedToken.name}</h2>
    </>
  )
}
