import React, { useState } from "react";
import { Fragment } from "react";
import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
import InvoicingTabs from "./InvoicingTabs";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchgetInvoiceData } from "../../redux/Slices/getInvoiceData";

export default function InvoicingFilter() {
  const { RangePicker } = DatePicker;

  const dispatch = useDispatch();

  const [StartDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [EndDate, setEndDate] = useState(
    moment().endOf("month").format("YYYY-MM-DD")
  );
  const [page, setpage] = useState(1);
  const [name, setname] = useState("");

  useEffect(() => {
    dispatch(fetchgetInvoiceData({ StartDate, EndDate, name, page }));
  }, [dispatch, StartDate, EndDate, name]);

  const handleDateChange = (dates, i) => {
    setStartDate(i[0]);
    setEndDate(i[1]);
  };

  return (
    <Fragment>
      <div className="d-flex">
        <div className="col-sm-12 inVoicingTabsss">
          {" "}
          <InvoicingTabs />
        </div>
        <div className="row">
          <form className="myfilters tableFilters invoiceFilter">
            <DatePicker.RangePicker
              allowClear={true}
              onChange={handleDateChange}
              format="MM/DD/YYYY"
            />
          </form>
          <input
            placeholder="Search Customer"
            className="invoice-customer-search"
            onChange={(e) => setname(e.target.value)}
          />
        </div>
      </div>
    </Fragment>
  );
}
