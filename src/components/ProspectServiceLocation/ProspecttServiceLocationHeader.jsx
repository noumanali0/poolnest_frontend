import React, { Fragment } from 'react';
import { Breadcrumb } from "antd";
import { useNavigate } from 'react-router-dom';

export default function ProspecttServiceLocationHeader({ toggleFields }) {
  const navigate = useNavigate();
  const handleNav = () => {
    navigate("/prospect/convert-prospect");
  };
  return (
    <Fragment>
      <div className="row customers">
        <div className="col-sm-5 prospectHeader widthEight">
          <Breadcrumb
            items={[
              {
                title: (
                  <h2 style={{ cursor: "pointer" }} onClick={handleNav}>
                    Convert Prospect to Customer/Service Location
                  </h2>
                ),
              },
            ]}
          />
        </div>
        <div className="col-sm-7 right prospectHeader">
          <button onClick={toggleFields} className="bluebtn">
            Edit
          </button>
        </div>
      </div>
    </Fragment>
  );
}
