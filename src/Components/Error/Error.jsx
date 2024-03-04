import React from 'react'
import styles from './Error.css'
import errorLogo from "../../Assets/images/error.svg"
export default function Error() {
  return <>
    <div className='d-flex justify-content-center'>
      <img src={errorLogo} alt=""/>
    </div>
  </>
}
