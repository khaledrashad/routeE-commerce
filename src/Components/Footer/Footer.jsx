import React from 'react'
import styles from './Footer.css'
export default function Footer() {
  return <>
    <div className="footer bg-main-light p-5">
      <h4>Get the FreshCart app</h4>
      <h6 className='text-secondary'>We will send you a link, open it on your phone to download the app</h6>
      <div className='d-flex px-4  border-bottom py-3'>
        <input type="email" className='form-control w-75 me-3' placeholder='Email ..' />
        <button type='submit' className='btn bg-main text-white'>Share App Link</button>
      </div>
      <div className='d-flex px-4  border-bottom py-3 justify-content-between'>
        <div>
          <span className='h5 me-1'>Payment Partners</span>
          <i class="fa-brands fa-cc-stripe fs-4 mx-1"></i>
          <i class="fa-brands fa-cc-amazon-pay fs-4 mx-1"></i>
          <i class="fa-brands fa-cc-mastercard fs-4 mx-1"></i>
          <i class="fa-brands fa-cc-paypal fs-4 mx-1"></i> 
        </div>
        <div>
          <span className='h5 me-1'>Get deliveries with FreshCart </span>
          <button className='btn bg-black text-white mx-1 text-capitalize'><i class="fa-brands fa-google-play"> Google play</i></button>
          <button className='btn bg-black text-white'><i class="fa-brands fa-app-store"> App store</i></button>
        </div>
      </div>


    </div>

  </>
}
