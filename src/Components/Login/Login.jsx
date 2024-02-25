import React, { useState } from 'react'
import styles from './Login.css'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function Login() {

  const [apiError, setApiError] = useState(null)
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate()

  function loginSubmit(value) {
    setLoading(true)
    axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signin", value).
      then((user) => {
        localStorage.setItem("token", user.data.token)
        navigate("/home")
      })
      .catch((err) => {
        setApiError(err.response.data.message)
        setLoading(false)
      })
  }

  const formik = useFormik(
    {
      initialValues: {
        email: "",
        password: ""
      },
      onSubmit: loginSubmit
    })


  return <>
    <div className='w-75 mx-auto'>
      {apiError ? <div className='alert alert-danger py-2'>{apiError}</div> : null}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor='email'>email:</label>
        <input type="email" className='form-control' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} id="email" />
        <label htmlFor='password'>password:</label>
        <input type="password" className='form-control' name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} id='password' />
        {!loading ? <button className='btn bg-main mt-2' type='submit'>Login</button> : <button className='btn bg-main mt-2'><i class="fa-solid fa-spinner fa-spin"></i></button>}
      </form>
    </div>
  </>
}
