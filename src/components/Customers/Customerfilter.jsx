import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetCustomers } from "../../redux/Slices/getCustomer";
import { fetchgetCustomerType } from "../../redux/Slices/getCustomerType";

export default function Customerfilter({ setfirst_name, first_name }) {
  const [customer_type_id, setcustomer_type] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setstatus] = useState("");
  const [size, setsize] = useState(100);
  const [isWithoutRoute, setIsWithoutRoute] = useState(false);
  const customertype = useSelector((state) => state.getCustomerType);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchgetCustomerType());
  }, [dispatch]);

  useEffect(() => {
    const params = {
      first_name,
      customer_type_id,
      currentPage,
      size,
      ...(status && { status }),
      ...(isWithoutRoute && { NumberOfRouteAssigned: 0 }),
    };

    dispatch(fetchgetCustomers(params));
  }, [
    dispatch,
    first_name,
    customer_type_id,
    status,
    currentPage,
    isWithoutRoute,
    size,
  ]);

  const handleStatusChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue === "NumberOfRouteAssigned") {
      setstatus("");
      setIsWithoutRoute(true);
    } else {
      setstatus(selectedValue);
      setIsWithoutRoute(false);
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const params = { first_name, customer_type_id, currentPage };

    if (isWithoutRoute) {
      params.NumberOfRouteAssigned = 0;
    } else if (status) {
      params.status = status;
    }

    dispatch(fetchgetCustomers(params));
  };
  return (
    <form onSubmit={handleSearch} className="myfilters custFiltwer">
      <input
        onChange={(e) => setfirst_name(e.target.value)}
        type="text"
        placeholder="Search for Name"
      />

      <select
        className="form-select form-select-lg mb-3 select1"
        aria-label=".form-select-lg example"
        onChange={(e) => setcustomer_type(e.target.value)}
      >
        <option value="">All</option>
        {customertype?.data?.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>

      <select
        className="form-select form-select-sm select2"
        onChange={handleStatusChange}
        aria-label=".form-select-sm example"
      >
        <option selected value="">
          Status
        </option>
        <option value="true">Active</option>
        <option value="false">Inactive</option>
        <option value="NumberOfRouteAssigned">without Route Assignment</option>
      </select>
      <button type="submit">
        <i className="fa fa-search" aria-hidden="true" />
      </button>
    </form>
  );
}
