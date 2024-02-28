import React from 'react'
import styles from './SpecificBrand.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useParams } from 'react-router-dom'
export default function SpecificBrand() {

  let {id} = useParams()
  function getSpecificBrand(id){
    return axios.get(`https://route-ecommerce.onrender.com/api/v1/brands`)
  }
  let {data,isError,isLoading} = useQuery("getSpecificBrand", getSpecificBrand)

  console.log(data?.data);
  console.log(isError);
  return <>

  </>
}
