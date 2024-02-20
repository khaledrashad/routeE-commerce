import React from 'react'
import styles from './Cart.css'
export default function Cart() {
  return <>
    <div className='bg-main-light'>
      <div className='p-2 cartHeader'>
        <h3 className='fw-bold'>Shop Cart:</h3>
        <h4 className='text-main font-sm'>Total Cart Price: </h4>
      </div>
      <div className='cardBody'>
        <div className="row">
          <div className="col-2">
            <img src="" alt="" className='w-100'/>
          </div>
          <div className="col-8">
            <p></p>
            <h5></h5>
            <span></span>
          </div>
          <div className="col-2">
            <span><button className="cartBtn">+</button> 0 <button className='cartBtn'>-</button></span>
          </div>
        </div>
      </div>
    </div>
  </>
}
