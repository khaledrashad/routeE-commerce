import React, { useContext } from 'react'
import styles from './PaymentAddress.css'
import { useFormik } from 'formik'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { CartContext } from '../../Context/CartContext'

export default function PaymentAddress() {

  let token = localStorage.getItem("token")
  let {CartId} = useContext(CartContext)

  function shippingSubmit(value) {
    console.log(value);
    axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${CartId}?url=http://localhost:3000`, value, {
      headers: {
        token
      }
    }).
      then((res) => {
        window.location.href = res.data.session.url ;
      })
      .catch((err) => {
        console.log(err);
      })
  }

  let formik = useFormik({
    initialValues: {
      shippingAddress : {
        details: "",
        phone: "",
        city: ""
      }
    },
    onSubmit: shippingSubmit
  })
  return <>
    <h2 className='text-center'>Enter your address</h2>
    <div className='w-75 mx-auto'>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor='details'>details:</label>
        <input type="text" className='form-control' name='details' onChange={formik.handleChange} onBlur={formik.handleBlur} id="details" />
        <label htmlFor='phone'>phone:</label>
        <input type="tel" className='form-control' name='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} id='phone' />
        <label htmlFor='city'>city:</label>
        <input type="text" className='form-control' name='city' onChange={formik.handleChange} onBlur={formik.handleBlur} id='city' />
        <button type='submit' className='btn bg-main mt-2 fw-bold text-white'> Proceed Your Payment</button>
      </form>
    </div>
  </>
}
