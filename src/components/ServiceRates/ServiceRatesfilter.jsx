import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetCustomers } from "../../redux/Slices/getCustomer";
import { fetchgetCustomerType } from "../../redux/Slices/getCustomerType";
import { Select } from "antd";
import Cookies from "js-cookie";

export default function Customerfilter() {
  const [name, setname] = useState("");
  const [customer_type_id, setcustomer_type] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setstatus] = useState("");


  const customertype = useSelector((state) => state.getCustomerType);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchgetCustomerType());
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Set the forceRefetch flag to true to trigger a refetch
    dispatch(fetchgetCustomers({ name, customer_type_id, status, currentPage, forceRefetch: true }));
  };

  return (
    <Fragment>
      <form onSubmit={handleSearch} className="myfilters custFiltwer">
        <input
          onChange={(e) => setname(e.target.value)}
          type="text"
          placeholder="Search for Name"
        />
        <select
          className="form-select form-select-lg mb-3 select1"
          aria-label=".form-select-lg example"
          onChange={(e) => setcustomer_type(e.target.value)}
        >
          {customertype?.data?.map((item) => {
            return <option value={item.customer_type_id}>{item.name}</option>;
          })}
        </select>

        <select
          className="form-select form-select-sm select2"
          onChange={(e) => setstatus(e.target.value)}
          aria-label=".form-select-sm example"
        >
          <option selected value="">
            Status
          </option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button type="submit">
          {" "}
          <i className="fa fa-search" aria-hidden="true" />
        </button>
      </form>
    </Fragment>
  );
}
