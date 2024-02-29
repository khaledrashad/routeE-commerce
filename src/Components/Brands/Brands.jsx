import React from 'react'
import styles from './Brands.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getBrands } from '../../Redux/brandSlice'
import { DNA } from 'react-loader-spinner'
import { Link } from 'react-router-dom'



export default function Brands() {

  let dispatch = useDispatch()

  let data = useSelector(({brands}) => brands)
  console.log(data);

 useEffect(()=>{
  dispatch(getBrands())
 },[])



  return <>
    {data.isLoading ? <div className='vh-100 d-flex justify-content-center align-items-center'><DNA
      visible={true}
      height="200"
      width="200"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    /></div> : <div className="row g-3">
      {data.brands.map(brand => <div className="col-md-3 cursor-pointer" key={brand._id} id={brand._id} to={`/specificBrand/${brand._id}`}>
        <img src={brand.image} alt="" className='w-100 h-30' />
      </div>)}
    </div>}
  </>
}
