import React, { useContext, useEffect, useState } from 'react'
import styles from './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../Assets/images/freshcart-logo.svg"
import { TokenContext } from '../../Context/TokenContext'
export default function Navbar() {

  let navigate = useNavigate

  let {Token , setToken} = useContext(TokenContext)

  function logOut() {
    localStorage.removeItem("token")
    setToken(false)
    navigate("/routeE-commerce")
  }

  useEffect(()=>{
    if(localStorage.getItem("token") != null){
      setToken(true)
    }
  },[])

  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link to="home"><img src={logo} alt="mainLogo" /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {Token ? <div className='d-flex'>
              <li className="nav-item">
                <Link className="nav-link fw-bold" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bold" aria-current="page" to="wishList">Wishlist</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bold" aria-current="page" to="categories">Categories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bold" aria-current="page" to="brands">Brands</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bold" aria-current="page" to="allOrders">Orders</Link>
              </li>
            </div> : null}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {Token ?<li className="nav-item">
              <Link className="nav-link" aria-current="page" to="cart"><i class="fa-solid fa-cart-shopping fs-4"></i></Link>
            </li> : null}
            <li className='d-flex align-items-center'>
              <div className="navLogo">
                <i className="fa-brands fa-instagram mx-2 cursor-pointer"></i>
                <i className="fa-brands fa-facebook mx-2 cursor-pointer"></i>
                <i className="fa-brands fa-twitter mx-2 cursor-pointer"></i>
                <i className="fa-brands fa-youtube mx-2 cursor-pointer"></i>
              </div>
            </li>
            {Token ? <li><Link className="nav-link" aria-current="page" to="/" onClick={logOut}>Logout</Link></li> : <div className='d-flex'>
              <li>
                <Link className="nav-link" aria-current="page" to="login">Login</Link>
              </li>
              <li>
                <Link className="nav-link" aria-current="page" to="register">Register</Link>
              </li>
            </div>}
          </ul>
        </div>
      </div>
    </nav>
  </>
}
