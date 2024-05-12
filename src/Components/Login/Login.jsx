import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from './../../Context/UserContext';


export default function Login() {
  let navigate = useNavigate();
  // use Context
  let {setUserToken} = useContext(UserContext)
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
 
  async function loginSubmit(values) {
      setIsLoading(true)
   let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
   .catch((error)=>{
    setIsLoading(false)
    setError(error.response.data.message)})
    if (data.message === "success") {
      setIsLoading(false);
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token)
      navigate('/');
    }
  }



  // Use Yup
  let validateSchema = Yup.object({   
    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, "password start with uppercase").required("password is required"),
  });

  //Use Fomik
  let formiK = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateSchema,
    onSubmit: loginSubmit,
  });
  return (
    <>
      <div className="w-75 mx-auto py-5">
        {error?<div className="alert alert-danger">{error}</div>:""}
        <h3>Login Now</h3>
        <form onSubmit={formiK.handleSubmit}>
    
          <label htmlFor="email"> Email :</label>
          <input value={formiK.values.email} onChange={formiK.handleChange} onBlur={formiK.handleBlur} className="form-control mb-2" id="email" type="email" name="email"/>
          {formiK.errors.email && formiK.touched.email?<div className="alert alert-danger p-2 m-2">{formiK.errors.email}</div>:""}
          
          <label htmlFor="password"> Password :</label>
          <input value={formiK.values.password} onChange={formiK.handleChange} onBlur={formiK.handleBlur} className="form-control mb-2" id="password" type="password" name="password"/>
          {formiK.errors.password && formiK.touched.password?<div className="alert alert-danger p-2 m-2">{formiK.errors.password}</div>:""}

          {isLoading?<button type="button" className="btn bg-main text-white">
            <FallingLines height="20"
                          width="25"
                          radius="9"
                          color="white"
                          ariaLabel="three-dots-loading"
                          wrapperStyle
                          wrapperClass>
            </FallingLines>
          </button>:<>
          <div className="d-flex align-items-center">
            <button disabled={!(formiK.isValid && formiK.dirty)} type="submit" className="btn bg-main text-white mt-2 mx-2">Login</button>
            <Link className="btn" to="/register">Register Now</Link>
          </div>
          
          </>
           
           }
         
          
        </form>
      </div>
    </>
  );
}

