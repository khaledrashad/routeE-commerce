import React from 'react'
import styles from './AllOrders.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { DNA } from 'react-loader-spinner'
export default function AllOrders() {

  let { id } = jwtDecode(localStorage.getItem("token"))

  function getAllOrders() {
    return axios.get(`https://route-ecommerce.onrender.com/api/v1/orders/user/${id}`)
  }

  let { data, isLoading, isError } = useQuery("getAllOrders", getAllOrders)
  console.log(data);

  return <>
    {isLoading ? <div className='vh-100 d-flex justify-content-center align-items-center'><DNA
      visible={true}
      height="200"
      width="200"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    /></div> : <div className='bg-main-light p-3'>
      <div className='p-2 cartHeader'>
        <h3 className='fw-bold'>Order ID:</h3>
        <h4 className='text-main font-sm'>Total Order Price: { } EGP</h4>
      </div>
      <div className='cardBody'>
        <div className="row align-items-center m-0 mb-2 g-3">
          {data?.data[0].cartItems.map(product =>
            <div className="col-md-6 d-flex align-items-center">
              <div className="col-md-4">
                <img src={product.product.imageCover} alt="" className='w-100' />
              </div>
              <div className="col-md-8 mx-3">
                <h4>{product.product.title}</h4>
                <h5 className='text-main'>Count : {product.count}</h5>
                <h5 className='text-main'>Price : {product.price}</h5>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

    }

  </>
}
