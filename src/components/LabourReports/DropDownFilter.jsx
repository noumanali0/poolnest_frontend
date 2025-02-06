import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { fetchlabourReport } from "../../redux/Slices/getlabourReportSlice.js"
import { useDispatch } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

export default function Installedfilter({ setValue }) {
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();


  const [StartDate, setStartDate] = useState(moment().startOf("month").format('YYYY-MM-DD'));
  const [EndDate, setEndDate] = useState(moment().endOf("month").format('YYYY-MM-DD'));
  const [currentPage, setCurrentPage] = useState(1);

  const handleDateChange = (dates, i) => {
    setStartDate(i[0]);
    setEndDate(i[1]);
  };

  useEffect(() => {
    dispatch(fetchlabourReport({StartDate , EndDate , currentPage}))
  } ,[dispatch , StartDate , EndDate , currentPage])

  return (
    <Fragment>
      <form className="myfilters tableFilters">
      <select
          className="form-select form-select-lg mb-3 select1"
          aria-label=".form-select-lg example"
          onChange={(e) => setValue(e.target.value)}
        >
          <option value="Service">
             <Link to={"/labor-report"}>Service</Link>
          </option>
          <option value="WorkOrder"><Link to={"/labor-report-workorder"}>Work Order</Link></option>
          <option value="SkippedStop"><Link to={"/labor-report-skipped"}>Skipped Stop</Link></option>
        </select>
    

                <button type="submit">
          {" "}
          <i className="fa fa-search" aria-hidden="true" />
        </button>
      </form>
    </Fragment>
  );
}
