import React, { useContext, useEffect, useState } from 'react'
import styles from './Home.css'
import axios from 'axios'
import { DNA } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { CartContext } from '../../Context/CartContext.js'
import toast from 'react-hot-toast'
import Slider from 'react-slick'
import slider1 from "../../Assets/images/slider-image-1.jpeg"
import slider2 from "../../Assets/images/slider-image-2.jpeg"
import slider3 from "../../Assets/images/slider-image-3.jpeg"
import sidePic1 from "../../Assets/images/grocery-banner.png"
import sidePic2 from "../../Assets/images/grocery-banner-2.jpeg"

export default function Home() {

  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  }

  const setting1 = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 5,
    speed: 500,
    rows: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesPerRow: 1
  };

  let { addToCart, setCart } = useContext(CartContext)

  async function PostDataToCart(id) {
    let { data } = await addToCart(id)
    if (data.status == "success") {
      toast.success(data.message, { icon: '👏', })
    } else {
      toast.error("Error in adding product")
    }
  }

  async function getHomeData() {
    return await axios.get("https://route-ecommerce.onrender.com/api/v1/products")

  }
  let { data, isLoading, isFetched, isError } = useQuery("homeData", getHomeData)
  async function getCatData() {
    return await axios.get("https://route-ecommerce.onrender.com/api/v1/categories")

  }
  let catData = useQuery("catData", getCatData)

  return <>

    <div className="row py-5 align-items-lg-stretch">
      <div className="col-md-8 p-0">
        <Slider {...settings}>
          <div>
            <img src={slider1} alt="" className='w-100' />
          </div>
          <div>
            <img src={slider2} alt="" className='w-100' />
          </div>
          <div>
            <img src={slider3} alt="" className='w-100' />
          </div>
        </Slider>
      </div>
      <div className="col-md-4 p-0">
        <img src={sidePic1} alt="" className='w-100 h-50' />
        <img src={sidePic2} alt="" className='w-100 h-50 pb-1' />
      </div>
    </div>

    <h2 className='fw-bold'>Shop By Category:</h2>

    {isLoading ? <div className='vh-100 d-flex justify-content-center align-items-center'><DNA
      visible={true}
      height="200"
      width="200"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    /></div> : <div className="slider-container py-5">
      <Slider {...setting1}>
        {catData?.data.data.data.map(cat => <div key={cat._id}>
          <img src={cat.image} alt="" className='w-100 h-30' />
        </div>)}
      </Slider>
    </div>}

    {isLoading ? <div className='vh-100 d-flex justify-content-center align-items-center'><DNA
      visible={true}
      height="200"
      width="200"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    /></div> : <div className='allProducts'>
      <div className="row g-3">
        {data?.data.data.map(product =>
          <div className="col-md-3" key={product.id}>
            <div className="product cursor-pointer p-2" id={product.id}>
              <Link to={`/detailedProduct/${product.id}`} className='text-decoration-none'>
                <img src={product.imageCover} alt="" className='w-100' />
                <h3 className='font-sm text-main m-0'>{product.category.name}</h3>
                <h3 className='h5 text-black'>{product.slug.split("-").splice(0, 3).join(" ")}</h3>
                <div className='d-flex px-2 justify-content-between align-items-center py-2'>
                  <span className='text-black'>{product.price} EGP</span>
                  <div>
                    <i class="fa-solid fa-star px-1 rating-color"></i>
                    <span className='text-black'>{product.ratingsAverage}</span>
                  </div>
                </div>
              </Link>
              <button onClick={() => { PostDataToCart(product.id) }} className='btn bg-main w-100'>Add to cart</button>
            </div>
          </div>)}
      </div>
    </div>}

  </>
}
