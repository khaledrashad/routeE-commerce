import React, { useEffect } from 'react'
import styles from './Categories.css'
import { DNA } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../Redux/categorySlice'
export default function Categories() {

  let dispatch = useDispatch()
  let data = useSelector(({category})=> category)

  useEffect(()=>{
    dispatch(getCategories())
  }, [])

  return <>
    {data.isLoading ? <div className='vh-100 d-flex justify-content-center align-items-center'><DNA
      visible={true}
      height="200"
      width="200"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    /></div> : <div className="row g-3">
      {data.cat.map(cat => <Link className="col-md-3" key={cat._id} id={cat._id} to={`/specificCategory/${cat._id}`}>
        <img src={cat.image} alt="" className='w-100 h-30' />
      </Link>)}
    </div>}
  </>
}
