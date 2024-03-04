import styles from './Home.css'
import React, { useContext} from 'react'
import { DNA } from 'react-loader-spinner'
import { Link} from 'react-router-dom'
import { useQuery } from 'react-query'
import Slider from 'react-slick'
import slider1 from "../../Assets/images/slider-image-1.jpeg"
import slider2 from "../../Assets/images/slider-image-2.jpeg"
import slider3 from "../../Assets/images/slider-image-3.jpeg"
import sidePic1 from "../../Assets/images/grocery-banner.png"
import sidePic2 from "../../Assets/images/grocery-banner-2.jpeg"
import axios from 'axios'
import Products from '../Products/Products'

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
      centerMode: false,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 5,
      speed: 500,
      rows: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesPerRow: 1
    };

    let catData = useQuery("catData", getCatData)
    async function getCatData() {
      return await axios.get("https://route-ecommerce.onrender.com/api/v1/categories")
  
    }
  return <>

    <div className="row py-1 align-items-lg-stretch">
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
        <img src={sidePic2} alt="" className='w-100 h-50 pb-3' />
      </div>
    </div>

    {catData.isLoading ? <div className='vh-100 d-flex justify-content-center align-items-center'><DNA
      visible={true}
      height="200"
      width="200"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    /></div> : <div className="slider-container py-2">
      <Slider {...setting1}>
        {catData?.data.data.data.map(cat => <Link key={cat._id}>
          <img src={cat.image} alt="" className='w-100 h-30' />
        </Link>)}
      </Slider>
    </div>}
    <Products/>
  </>
}
