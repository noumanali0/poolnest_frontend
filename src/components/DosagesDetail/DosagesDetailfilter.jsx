import React, { useState } from "react";
import { Fragment } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
export default function DosagesDetailfilter() {
  const { RangePicker } = DatePicker;
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };
  return (
    <Fragment>
      <form className="myfilters tableFilters">
        <select
          className="form-select form-select-lg mb-3 select1"
          aria-label=".form-select-lg example"
        >
          <option selected>Tech Summary</option>
          <option value="residential">Residential</option>
          <option value="Commercial">Commercial</option>
        </select>
        <select
          className="form-select form-select-lg mb-3 select1"
          aria-label=".form-select-lg example"
        >
          <option selected>All Chemicals</option>
          <option value="residential">Residential</option>
          <option value="Commercial">Commercial</option>
        </select>

        <RangePicker disabledDate={disabledDate} allowClear={true} />
        <button type="submit">
          {" "}
          <i className="fa fa-search" aria-hidden="true" />
        </button>
      </form>
    </Fragment>
  );
}
