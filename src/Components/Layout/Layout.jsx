import React from 'react'
import styles from './Layout.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
export default function Layout() {

  return <>
    <Navbar />
    <div className="container py-3">
      <Outlet></Outlet>
    </div>
    <Footer />
  </>
}
