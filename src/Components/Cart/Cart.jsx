import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { DNA } from 'react-loader-spinner'
import { CartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom'

export default function Cart() {

  const [loading, setloading] = useState(true)
  const [Error, setError] = useState("")


  let { deleteCartItem, Cart, setCart, deleteAllItems, updateItemCount, setCartId } = useContext(CartContext)

  function getCartData() {
    axios.get(`https://route-ecommerce.onrender.com/api/v1/cart`, {
      headers: {
        token: localStorage.getItem("token")
      }
    }).then(cartProducts => {
      setCart(cartProducts)
      setCartId(cartProducts.data.data._id);
      setloading(false)
    }).catch(err => {
      setError(err.response.data.statusMsg);
      setloading(false)
    })
  }

  useEffect(() => {
    getCartData()
  }, [])


  async function removeCartItem(id) {
    let data = await deleteCartItem(id)
    if (data.data.numOfCartItems == 0) {
      removeAllCartItem()
    } else {
      setCart(data)
    }
  }
  async function updateCartItemCount(id, count) {
    let data = await updateItemCount(id, count)
    for (let i = 0; i < data.data.data.products.length; i++) {
      if (data.data.data.products[i].count == 0) {
        removeCartItem(id)
      } else {
        setCart(data)
      }
    }
  }
  async function removeAllCartItem() {
    let data = await deleteAllItems()
    if (data.data.message == "success") {
      setError(true)
    }
  }
  return <>
    {loading ? <div className='vh-100 d-flex justify-content-center align-items-center'><DNA
      visible={true}
      height="200"
      width="200"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    /></div> : Error ? <div className='bg-main-light text-center'><h2 className='p-4'>No Items In Your Cart</h2></div> : <div className='bg-main-light'>
      <div className='p-2 cartHeader'>
        <h3 className='fw-bold'>Shop Cart:</h3>
        <h4 className='text-main font-sm'>Total Cart Price: {Cart.data.data.totalCartPrice} EGP</h4>
      </div>
      <div className='cardBody'>
        {Cart.data.data.products.map(product => <div className="row align-items-center m-0 border-bottom mb-2" key={product.product._id} id={product.product._id}>
          <div className="col-2">
            <img src={product.product.imageCover} alt={product.product.title} className='w-75' />
          </div>
          <div className="col-8">
            <p className='fw-bold'>{product.product.title}</p>
            <h5 className='text-main font-sm'>Price: {product.price}EGP</h5>
            <Link className='text-decoration-none text-black' onClick={() => { removeCartItem(product.product._id) }}><i class="fa-solid fa-trash-can text-main"></i> Remove</Link>
          </div>
          <div className="col-2">
            <span><button onClick={() => { updateCartItemCount(product.product._id, product.count + 1) }} className="cartBtn">+</button> {product.count} <button onClick={() => { updateCartItemCount(product.product._id, product.count - 1) }} className='cartBtn'>-</button></span>
          </div>
        </div>)}
        <div className="d-flex justify-content-between px-2">
          <button onClick={removeAllCartItem} className='btn bg-main ms-2 mb-2 fw-bold text-white'>Clear Your Cart</button>
          <Link className='btn bg-main ms-2 mb-2 fw-bold text-white' to={"/paymentAddress"}>Pay Your Cart Online</Link>
        </div>
      </div>
    </div>}

  </>
}
