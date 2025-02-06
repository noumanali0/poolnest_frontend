import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { DatePicker, Select } from "antd";
import { fetchchemicalReport } from "../../redux/Slices/getchemicalReportSlice";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetCustomerType } from "../../redux/Slices/getCustomerType";

export default function Chemicalfilter() {
  const { RangePicker } = DatePicker;

  const dispatch = useDispatch();
  const customertype = useSelector((state) => state.getCustomerType);

  const [selectedDates, setSelectedDates] = useState([]);
  const [StartDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [EndDate, setEndDate] = useState(
    moment().endOf("month").format("YYYY-MM-DD")
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [Customer_type, setcustomer_type] = useState("");

  const handleDateChange = (dates, i) => {
    setSelectedDates(i);
    setStartDate(i[0]);
    setEndDate(i[1]);
  };
  useEffect(() => {
    dispatch(fetchgetCustomerType());
  }, [dispatch]);
  useEffect(() => {
    dispatch(
      fetchchemicalReport({ StartDate, EndDate, Customer_type, currentPage })
    );
  }, [dispatch, StartDate, EndDate, Customer_type]);

  return (
    <Fragment>
      <form className="myfilters tableFilters labourReportInvoice">
        <div className="row cslocation">
          <div className="col-sm-6 installedItemHeader">
            <Select
              className="select1"
              // aria-label=".form-select-lg example"
              onChange={(e) => setcustomer_type(e)}
              defaultValue={"All"}
            >
              <Option value="">All</Option>
              {customertype?.data?.map((item) => {
                return <Option value={item._id}>{item.name}</Option>;
              })}
            </Select>
          </div>

          <div className="col-sm-6">
            <span className="myfilters tableFilters invoiceFilter">
              <DatePicker.RangePicker
                allowClear={true}
                onChange={handleDateChange}
                format="MM/DD/YYYY"
              />
            </span>
          </div>
        </div>

        {/* <button type="submit">
            <i className="fa fa-search" aria-hidden="true" />
          </button> */}
        {/* <button type="submit">
          {" "}
          <i className="fa fa-search" aria-hidden="true" />
        </button> */}
      </form>
    </Fragment>
  );
}
