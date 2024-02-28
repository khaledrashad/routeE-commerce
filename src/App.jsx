import React, { useContext } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Login from './Components/Login/Login'
import Cart from './Components/Cart/Cart'
import Products from './Components/Products/Products'
import Register from './Components/Register/Register'
import DetailedProducts from './Components/DetailedProducts/DetailedProducts'
import Home from './Components/Home/Home'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import { Toaster } from 'react-hot-toast'
import SpecificCategory from './Components/SpecificCategory/SpecificCategory'
import { Provider } from 'react-redux'
import { Store } from './Redux/Store'
import SpecificBrand from './Components/SpecificBrand/SpecificBrand'


export default function App() {


  let routers = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        { path: "login", element: <Login /> },
        { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: "register", element: <Register /> },
        { path: "detailedProduct/:id", element: <ProtectedRoute><DetailedProducts /></ProtectedRoute> },
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "specificCategory/:id", element: <ProtectedRoute><SpecificCategory /></ProtectedRoute> },
        { path: "specificBrand/:id", element: <ProtectedRoute><SpecificBrand /></ProtectedRoute> },
        { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> }
      ]
    }
  ])
  return <>
    <Provider store={Store}>
      <RouterProvider router={routers}></RouterProvider>
      <Toaster />
    </Provider>
  </>
}

