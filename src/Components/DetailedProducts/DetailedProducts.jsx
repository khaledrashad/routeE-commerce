import React, { useContext, useEffect, useState } from 'react'
import styles from './DetailedProducts.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { DNA } from 'react-loader-spinner'
import Slider from 'react-slick'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { addWishlistItem } from '../../Redux/wishlistSlice'
export default function DetailedProducts(props) {

  let dispatch = useDispatch()
  function PostDataToWishlist(id) {
    dispatch(addWishlistItem(id)).then(data => {
      if (data.payload.status == "success") {
        toast.success(data.payload.message, { icon: '👏', })
      } else {
        toast.error("Error in adding product")
      }
    })
  }


  const [ProductDetails, setProductDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  let { id } = useParams()

  let { addToCart } = useContext(CartContext)

  async function postItemToCart(id) {
    let { data } = await addToCart(id)
    if (data.status == "success") {
      toast.success(data.message)
    }
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  }

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
      <div className="row align-items-center py-3">
        <div className="col-md-4">
          <Slider {...settings}>
            <div>
              <img src={ProductDetails.imageCover} alt="" className='w-100' />
            </div>
            {ProductDetails.images.map(img => <div>
              <img src={img} alt="" className='w-100' />
            </div>)}
          </Slider>
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
          <div className='text-end'>
            <Link onClick={() => { PostDataToWishlist(id) }}><i className="fa-solid fa-heart text-danger fs-2 wishlistIcon"></i></Link>
          </div>
          <button onClick={() => { postItemToCart(id) }} className='btn bg-main w-100 text-white'>Add to cart</button>

        </div>
      </div>}
  </>
}
