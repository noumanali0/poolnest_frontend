import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import moment from "moment";
import { fetchskippedStopReportByID } from "../../redux/Slices/getskippedStopReport";
import { useNavigate, useParams } from "react-router-dom";

export default function Installedfilter({ setValue }) {
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();

  const { id } = useParams();

  const [StartDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [EndDate, setEndDate] = useState(
    moment().endOf("month").format("YYYY-MM-DD")
  );
  const [currentPage, setCurrentPage] = useState(1);

  const handleDateChange = (dates, i) => {
    setStartDate(i[0]);
    setEndDate(i[1]);
  };

  const history = useNavigate();

  const handleOptionChange = (selectedValue) => {
    // Handle navigation based on selected option
    switch (selectedValue) {
      case "Service":
        history("/labor-report");
        break;
      case "WorkOrder":
        history("/labor-report-workorder");
        break;
      case "SkippedStop":
        history("/labor-report-skipped");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    dispatch(
      fetchskippedStopReportByID({ StartDate, EndDate, id, currentPage })
    );
  }, [dispatch, StartDate, EndDate, currentPage]);

  return (
    <Fragment>
      <form className="myfilters tableFilters labourReportInvoice">
        <div className="row cslocation">
          <div className="col-sm-6 installedItemHeader">
            <Select
              className="select1"
              onChange={(e) => handleOptionChange(e)}
              defaultValue={"Skipped Stop"}
            >
              <Option value="Service">Service</Option>
              <Option value="WorkOrder">Work Order</Option>
              <Option value="SkippedStop">Skipped Stop</Option>
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
      </form>
    </Fragment>
  );
}
