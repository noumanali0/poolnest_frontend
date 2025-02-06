import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { fetchTechnician } from "../../redux/Slices/GetTechnician";
import { useDispatch } from "react-redux";
import { Select } from "antd";

export default function CheckListFilter() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [status, setstatus] = useState("");
  const [statusActive, setstatusActive] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(
      fetchTechnician({ name, email, status, statusActive, currentPage })
    );
  };

  useEffect(() => {
    dispatch(
      fetchTechnician({ name, email, status, statusActive, currentPage })
    );
  }, [status, statusActive]);
  return (
    <Fragment>
      <div className="row cslocation">
        <div className="col-sm-12 userfiltersuser">
          <form
            onSubmit={handleSearch}
            className="myfilters userFilter usssser"
          >
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Search for Name"
              className="simpleInput"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Search for Email"
              className="emailInput newdata1"
            />
            <Select
              className="form-select form-select-sm select2 selectNext"
              onChange={(e) => setstatus(e)}
              aria-label=".form-select-sm example"
              placeholder="User Type"
            >
              <Option selected value="">
                All
              </Option>
              <Option value="Admin">Admin</Option>
              <Option value="Technician">Technician</Option>
            </Select>
            <Select
              className="form-select form-select-sm select2 selectNext"
              onChange={(e) => setstatusActive(e)}
              aria-label=".form-select-sm example"
              placeholder="Status"
            >
              <Option selected value="">
                All
              </Option>
              <Option value="true">Active</Option>
              <Option value="false">Inactive</Option>
            </Select>
            <button type="submit">
              {" "}
              <i className="fa fa-search" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
