import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export default function ServiceHeader() {
  return (
    <Fragment>
    <div className='row customers'>
        <div className='col-sm-5 '>
             <h2>SERVICE LOCATION</h2>
        </div>
        <div className='col-sm-7 right'>
             <Link to='/pool'><button className='yellowbtn'> Add Pool</button></Link>
             <button className='bluebtn'> Add Another</button>
        </div>
    </div>
</Fragment>
  )
}
