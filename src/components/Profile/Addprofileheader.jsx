import React, { useState } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { Button } from "antd";


export default function Addprofileheader({toggleFields }) {
  

  return (
    <Fragment>
      <div className="row customers">
        <div className="col-sm-5 ">
          <h2>Customer Info</h2>
        </div>
        <div className="col-sm-7 right editCustomer">
          {
            toggleFields?.isFieldsDisabled ? <Button onClick={toggleFields.toggleFields} className="bluebtn">Edit</Button> : <></>
          }
        
          

        </div>
      </div>

    

    </Fragment>
  );
}
