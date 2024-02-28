import React from 'react'
import styles from './ProtectedRoute.css'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute(props) {
  if (localStorage.getItem("token")) {
    return props.children
  } else {
    return <Navigate to={"/login"}/>
  }
}   
