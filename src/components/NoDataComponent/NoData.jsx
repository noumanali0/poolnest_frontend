import React from 'react'
import { Skeleton } from 'antd';

const NoData = ({message}) => {
  return (
      <div className="nodata_div">
          <h2>{message ? message :"No Data Found"}</h2>
          <p>Add a new record by simply clicking the button on top right side.</p>
          <Skeleton />
        </div>
  )
}

export default NoData
