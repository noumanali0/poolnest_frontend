import { Breadcrumb } from 'antd';
import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ConvertProspectHeader({toggleFields}) {
  const navigate = useNavigate()
  const handleNav = () => {
    navigate("/prospect");
  }
  return (
    <Fragment>
      <div className='row customers'>
        <div className='col-sm-5 prospectHeader widthEight'>
          <Breadcrumb
            items={[
                {
                    title: (
                    <h2
                        style={{ cursor: "pointer" }}
                        onClick={handleNav}
                    >
                        Convert Prospect to Customer
                    </h2>
                    ),
                },
                {
                    title: (
                    <h2
                        style={{ cursor: "pointer" }}
                    >
                        Customer Info
                    </h2>
                    ),
                },
            ]}
          />
        </div>
        <div className="col-sm-7 right prospectHeader">
          <button onClick={toggleFields} className="bluebtn">Edit</button>
        </div>
      </div>
    </Fragment>
  )
}
