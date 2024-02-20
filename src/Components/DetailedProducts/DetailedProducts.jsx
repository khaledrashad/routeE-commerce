import React, { useEffect, useState } from 'react'
import styles from './DetailedProducts.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { DNA } from 'react-loader-spinner'
export default function DetailedProducts(props) {


  const [ProductDetails, setProductDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  let { id } = useParams()



  useEffect(() => {
    axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`).then(product => {
      console.log(product.data.data);
      setProductDetails(product.data.data);
      setLoading(false)
    }
    )

  }, [])


  return <>
    {loading ? <div className='vh-100 d-flex justify-content-center align-items-center'><DNA
      visible={true}
      height="200"
      width="200"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    /></div> :
      <div className="row align-items-center">
        <div className="col-md-4">
          <img src={ProductDetails.imageCover} alt="" className='w-100' />
        </div>
        <div className="col-md-8">
          <p className='fw-bold'>{ProductDetails.slug}</p>
          <p className='font-sm'>{ProductDetails.description}</p>
          <h4 className='font-sm fw-bold'>{ProductDetails.category.name}</h4>
          <div className='d-flex justify-content-between my-2'>
            <h4 className='font-sm fw-bold'>{ProductDetails.price} EGP</h4>
            <div>
              <i class="fa-solid fa-star px-1 rating-color"></i>
              <span className='text-black'>{ProductDetails.ratingsAverage}</span>
            </div>
          </div>
            <button className='btn bg-main w-100 text-white'>Add to cart</button> 

        </div>
      </div>}
  </>
}
