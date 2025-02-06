import { Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import PoolTypeModal from "./PoolTypeModal";
import { Button } from "react-bootstrap";
import { fetchgetSingleCustomers } from "../../redux/Slices/getSingleCustomer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function Poolheader({ toggleFields }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const url = pathname;

  // Split the URL by "/"
  const parts = url.split("/");
  const dispatch = useDispatch();
  // Extract the IDs from the parts
  const id = parts[parts.length - 2];
  const ServiceLocationID = parts[parts.length - 1];

  useEffect(() => {
    dispatch(fetchgetSingleCustomers({ id }));
  }, [dispatch]);

  const handleAnother = () => {
    navigate(`/customer-addpools/${id}/${ServiceLocationID}`);
  };

  return (
    <Fragment>
      <div className="row customers">
        <div className="col-sm-5 noPad">
          <h2>Pool </h2>
        </div>
        <div className="col-sm-7 right poolHeaderr">
          <button className="bluebtn" onClick={toggleFields}>
            Edit
          </button>

          <button className="bluebtn" onClick={() => handleAnother()}>
            Add Another
          </button>
        </div>
      </div>
    </Fragment>
  );
}
