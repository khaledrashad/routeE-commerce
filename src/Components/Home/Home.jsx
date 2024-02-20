import React, { useEffect, useState } from 'react'
import styles from './Home.css'
import axios from 'axios'
import { DNA } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import DetailedProducts from '../DetailedProducts/DetailedProducts'
export default function Home() {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])



  useEffect(() => {
    setLoading(true)
    axios.get("https://route-ecommerce.onrender.com/api/v1/products").then(products => {
      setProducts(products.data.data)
      setLoading(false)
    })
  }, [])

  return <>
    {loading ? <div className='vh-100 d-flex justify-content-center align-items-center'><DNA
      visible={true}
      height="200"
      width="200"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    /></div> : null}
    <div className='allProducts'>
      <div className="row g-3">
        {products.map(product =>
          <div className="col-md-3">
            <Link to={`/detailedProduct/${product.id}`} className='text-decoration-none'>
              <div className="product cursor-pointer p-2" key={product.id} id={product.id}>
                <img src={product.imageCover} alt="" className='w-100' />
                <h3 className='font-sm text-main m-0'>{product.category.name}</h3>
                <h3 className='h5 text-black'>{product.slug.split("-").splice(0, 3).join(" ")}</h3>
                <div className="container">
                  <button className='btn bg-main w-100'>Add to cart</button> 
                </div>
                <div className='d-flex px-2 justify-content-between align-items-center py-2'>
                  <span className='text-black'>{product.price} EGP</span>
                  <div>
                    <i class="fa-solid fa-star px-1 rating-color"></i>
                    <span className='text-black'>{product.ratingsAverage}</span>
                  </div>
                </div>
              </div>
            </Link>  
          </div>)}
      </div>
    </div>
  </>
}
