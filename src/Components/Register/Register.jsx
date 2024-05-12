import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
 
export default function Register() {
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
 
  async function submitRegister(values) {
      setIsLoading(true)
   let {data} = await  axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
   .catch((error)=>{
    setIsLoading(false)
    setError(error.response.data.message)})
    if (data.message === "success") {
      setIsLoading(false);
      navigate('/login');
    }
  }

  // function validate(values) {
  //   let phoneRegex = /^(?:\+?20|0)?1[0-9]{9}$/;
  //   let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   let errors = {};
  //   if (!values.name) {
  //     errors.name = "Name is Required";
  //   } else if (values.name.length < 3) {
  //     errors.name = "Name must be at least 3 characters.";
  //   }
  //   console.log(values);
  // }

  let phoneRegex = /^(?:\+?20|0)?1[0-9]{9}$/;
  let validateSchema = Yup.object({
    name: Yup.string().min(3, "name min length is 3").max(10, "name max length is 10").required("name is required"),
    email: Yup.string().email("invalid email").required("email is required"),
    phone: Yup.string().matches(phoneRegex, "invalid phone").required("phone is required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, "password start with uppercase").required("password is required"),
    rePassword: Yup.string().oneOf([Yup.ref("password")], "password and repassword is not match ").required("repassword is required"),
  });
  let formiK = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: validateSchema,
    onSubmit: submitRegister,
  });
  return (
    <>
      <div className="w-75 mx-auto py-5">
        {error?<div className="alert alert-danger">{error}</div>:""}
        <h3>Register Now</h3>
        <form onSubmit={formiK.handleSubmit}>
          <label htmlFor="name"> Name :</label>
          <input value={formiK.values.name} onChange={formiK.handleChange} onBlur={formiK.handleBlur} className="form-control mb-2" id="name" type="text" name="name"/>
          {formiK.errors.name && formiK.touched.name?<div className="alert alert-danger p-2 m-2">{formiK.errors.name}</div>:""}

          <label htmlFor="email"> Email :</label>
          <input value={formiK.values.email} onChange={formiK.handleChange} onBlur={formiK.handleBlur} className="form-control mb-2" id="email" type="email" name="email"/>
          {formiK.errors.email && formiK.touched.email?<div className="alert alert-danger p-2 m-2">{formiK.errors.email}</div>:""}
          
          <label htmlFor="phone"> phone :</label>
          <input value={formiK.values.phone} onChange={formiK.handleChange} onBlur={formiK.handleBlur} className="form-control mb-2" id="phone" type="tel " name="phone"/>
          {formiK.errors.phone && formiK.touched.phone?<div className="alert alert-danger p-2 m-2">{formiK.errors.phone}</div>:""}

          <label htmlFor="password"> Password :</label>
          <input value={formiK.values.password} onChange={formiK.handleChange} onBlur={formiK.handleBlur} className="form-control mb-2" id="password" type="password" name="password"/>
          {formiK.errors.password && formiK.touched.password?<div className="alert alert-danger p-2 m-2">{formiK.errors.password}</div>:""}


          <label htmlFor="rePassword"> Repassword :</label>
          <input value={formiK.values.rePassword} onChange={formiK.handleChange} onBlur={formiK.handleBlur} className="form-control mb-2" id="rePassword" type="password" name="rePassword"/>
          {formiK.errors.rePassword && formiK.touched.rePassword?<div className="alert alert-danger p-2 m-2">{formiK.errors.rePassword}</div>:""}

          {isLoading?<button type="button" className="btn bg-main text-white">
            <FallingLines height="20"
                          width="25"
                          radius="9"
                          color="white"
                          ariaLabel="three-dots-loading"
                          wrapperStyle
                          wrapperClass>
            </FallingLines>
          </button>:
           <button disabled={!(formiK.isValid && formiK.dirty)} type="submit" className="btn bg-main text-white mt-2">Register</button>
           }
         
          
        </form>
      </div>
    </>
  );
}
