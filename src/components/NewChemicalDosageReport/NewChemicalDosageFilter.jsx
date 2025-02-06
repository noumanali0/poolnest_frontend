import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { DatePicker, Form, Select } from "antd";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { RangePicker } = DatePicker;

export default function NewChemicalDosageFilter({
  value,
  setValue,
  setStartDate,
  setEndDate,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  const handleDateChange = (dates, i) => {
    setStartDate(i[0]);
    setEndDate(i[1]);
    setSelectedDateRange(dates);
  };

  const handleMainOptionChange = (selectedValue) => {
    setValue(selectedValue);

    switch (selectedValue) {
      case "Customer":
        navigate("/chemical");
        break;
      case "CustomerDeatil":
        navigate("/chemical-customer-detail");
        break;
      case "Tech":
        navigate("/chemical-tech");
        break;
      default:
        break;
    }
  };

  const handleDateOptionChange = (selectedValue) => {
    let startDate, endDate;

    if (selectedValue === "thisWeek") {
      startDate = moment().startOf("week");
      endDate = moment().endOf("week");
    } else if (selectedValue === "thisMonth") {
      startDate = moment().startOf("month");
      endDate = moment().endOf("month");
    }

    handleDateChange(
      [startDate, endDate],
      [startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD")]
    );
  };

  return (
    <Fragment>
      <Form className="myfilters tableFilters labourReportInvoice">
        <div className="row cslocation">
          <div className="col-sm-4 installedItemHeader">
            <Select
              className="select1"
              onChange={(e) => handleMainOptionChange(e)}
              defaultValue={value}
            >
              <Option value="Customer">Customer Summary</Option>
              <Option value="CustomerDeatil">Customer Detail Summary</Option>
              <Option value="Tech">Tech Summary</Option>
            </Select>
          </div>

          <div className="col-sm-4 installedItemHeader">
            <Select
              className="select1"
              onChange={(e) => handleDateOptionChange(e)}
              defaultValue={"thisMonth"}
            >
              <Option value="thisMonth">This Month</Option>
              <Option value="thisWeek">This Week</Option>
            </Select>
          </div>
          <div className="col-sm-4">
            <span className="myfilters tableFilters invoiceFilter">
              <RangePicker allowClear={true} onChange={handleDateChange} />
            </span>
          </div>
        </div>
      </Form>
    </Fragment>
  );
}
