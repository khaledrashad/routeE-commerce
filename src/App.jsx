import React, { useContext } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Login from './Components/Login/Login'
import Cart from './Components/Cart/Cart'
import Products from './Components/Products/Products'
import Register from './Components/Register/Register'
import DetailedProducts from './Components/DetailedProducts/DetailedProducts'
import Home from './Components/Home/Home'

export default function App() {


  let routers = createBrowserRouter([
    {path:"" ,element: <Layout/>,children: [
      {index: true, element: <Login/>},
      {path: "cart", element: <Cart/>},
      {path: "products", element: <Products/>},
      {path: "register", element: <Register/>},
      {path: "detailedProduct/:id", element: <DetailedProducts/>},
      {path: "home", element: <Home/>},
      {path: "login", element: <Login/>}
    ]}
  ])
  return <>
    <RouterProvider router={routers}></RouterProvider>
  </>
}

