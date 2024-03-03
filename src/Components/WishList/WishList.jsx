import React, { useContext, useEffect } from 'react'
import styles from './WishList.css'
import { getWishlist, removeWishlistItem } from '../../Redux/wishlistSlice'
import { useDispatch, useSelector } from 'react-redux'
import { DNA } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
export default function WishList() {

  let {setCart, addToCart} = useContext(CartContext)
  let dispatch = useDispatch()
  let wishlistData = useSelector(({ wishlist }) => wishlist)
  console.log(wishlistData);

  function deleteWishListItem(id){
    dispatch(removeWishlistItem(id)).then(()=>{
      dispatch(getWishlist())
    })
  }

  function addWishToCart(id){
    addToCart(id).then(()=> dispatch(removeWishlistItem(id))).then(()=> dispatch(getWishlist()))
  }

  useEffect(() => {
    dispatch(getWishlist())
  }, [])

  return <>
    {wishlistData.isLoading == false ? <div className='bg-main-light p-2'>
      <div className='p-2 cartHeader'>
        <h3 className='fw-bold'>Shop Wishlist:</h3>
      </div>
      <div className='cardBody'>
        {wishlistData?.items.data.map(product => <div className="row align-items-center m-0 border-bottom mb-2" key={product.id} id={product.id}>
          <div className="col-2">
            <img src={product.imageCover} alt={product.title} className='w-75' />
          </div>
          <div className="col-8">
            <p className='fw-bold'>{product.title}</p>
            <h5 className='text-main font-sm'>Price: {product.price}EGP</h5>
            <Link className='text-decoration-none text-black' onClick={()=>{ deleteWishListItem(product.id)}}><i class="fa-solid fa-trash-can text-main"></i> Remove</Link>
          </div>
          <div className="col-2">
            <button className='btn bg-main ms-2 mb-2 fw-bold text-white' onClick={()=>{addWishToCart(product.id)}}>Add To Your Cart</button>
          </div>
        </div>)}
      </div>
    </div> : <div className='vh-100 d-flex justify-content-center align-items-center'><DNA
      visible={true}
      height="200"
      width="200"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    /></div>}
  </>
}
