import React, { useState } from 'react'
import styles from './Register.css'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Register() {

  const [apiError, setApiError] = useState(null)
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate()


  function registerPostData(value) {
    setLoading(true)
    axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signup", value).
      then((user) => {
        navigate("/login")
      })
      .catch((err) => {
        setApiError(err.response.data.message);
        setLoading(false)
      })
  }
  function registerSubmit(values) {
    registerPostData(values)
  }
  let validationSchema = Yup.object({
    name: Yup.string().min(3, "name should be more than 3 letters").max(10, "name should be less than 10 letters").required("name is required"),
    email: Yup.string().email("e-mail is invalid").required("e-mail is required"),
    password: Yup.string().required("password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, "password should contain Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"),
    rePassword: Yup.string().required("rePassword is required").oneOf([Yup.ref("password")], "password does not match"),
    phone: Yup.string().required("phone is required").matches(/^01[0125][0-9]{8}$/, "enter egyptian number")
  })
  const formik = useFormik(
    {
      initialValues: {
        name: "",
        email: "",
        password: "",
        rePassword: "",
        phone: ""
      }, validationSchema,
      onSubmit: registerSubmit
    })


  return <>
    <div className='w-75 mx-auto'>
      <h3>Register Now: </h3>
      {apiError ? <div className='alert alert-danger py-2'>{apiError}</div> : null}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">name</label>
        <input type="text" className='form-control' name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} id='name' />
        {formik.errors.name && formik.touched.name ? <div className='alert alert-danger py-2'>{formik.errors.name}</div> : null}
        <label htmlFor='email'>email:</label>
        <input type="email" className='form-control' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} id="email" />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger py-2'>{formik.errors.email}</div> : null}
        <label htmlFor='password'>password:</label>
        <input type="password" className='form-control' name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} id='password' />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger py-2'>{formik.errors.password}</div> : null}
        <label htmlFor='rePassword'>rePassword:</label>
        <input type="password" className='form-control' name='rePassword' onChange={formik.handleChange} onBlur={formik.handleBlur} id='rePassword' />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger py-2'>{formik.errors.rePassword}</div> : null}
        <label htmlFor='phone'>phone:</label>
        <input type="text" className='form-control' name='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} id='phone' />
        {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger py-2'>{formik.errors.phone}</div> : null}
        <div className='text-end'>
          {!loading ? <button className='btn bg-main mt-2' type='submit'>Register</button> : <button className='btn bg-main mt-2'><i class="fa-solid fa-spinner fa-spin"></i></button>}
        </div>
      </form>
    </div>
  </>
}
