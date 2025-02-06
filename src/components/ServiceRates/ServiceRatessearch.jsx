import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
export default function Customersearch() {
  const postDataResult = useSelector((state) => state.getCustomer);

  return (
    <Fragment>
      <div className="row customers">
        <div className="col-sm-5 equipmentssss">
          <h2>
            Service Rate{" "}
            <span className="counts">{postDataResult?.data.totalCount}</span>
          </h2>
        </div>
        <div className="col-sm-7 right equipmentssss">
          <Link to="/addcustomer">
            <button className="bluebtn">Add Customer</button>
          </Link>
          <Link to="/servicerates">
          <button className='yellowbtn'>Service Rates</button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
