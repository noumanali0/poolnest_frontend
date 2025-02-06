import React from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProductTypeHeader() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    // navigate("/addcustomer");
  };
  return (
    <Fragment>
      <div className="row customers">
        <div className="col-sm-5 ">
          <h2>Edit Product Type</h2>
        </div>
      </div>
    </Fragment>
  );
}
