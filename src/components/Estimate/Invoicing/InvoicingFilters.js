import React from "react";
import { Form, Select, DatePicker } from "antd";
const { Option } = Select;

const AllStatus = [
  { _id: 1, label: "All Status" },
  { _id: 2, label: "Approved" },
  { _id: 3, label: "Rejected" },
  { _id: 4, label: "Expired" },
  { _id: 5, label: "Sent" },
];
const Types = [
  { _id: 1, label: "All Types" },
  { _id: 2, label: "Service" },
  { _id: 3, label: "Work Order" },
];
const AllCustomer = [
  { _id: 1, label: "Customer 1" },
  { _id: 2, label: "Customer 2" },
  { _id: 3, label: "Customer 3" },
  { _id: 4, label: "Customer 4" },
  { _id: 5, label: "Customer 5" },
];
const Months = [
  { _id: 1, label: "This week" },
  { _id: 2, label: "Last Week" },
  { _id: 3, label: "This Month" },
  { _id: 4, label: "Last Month" },
  { _id: 5, label: "Last 3 Months" },
  { _id: 6, label: "YTD" },
  { _id: 7, label: "All" },
];

const InvoicingFilters = () => {
  return (
    <div className="row formik">
      <Form
        name="dynamic_form_estimates_item"
        autoComplete="off"
        className="w-100"
      >
        {/* Single row containing 5 columns of Selects */}
        <div className="row d-flex align-items-center">
          {/* 1st Select */}
          <div className="col">
            <Form.Item name="invoiceStatus">
              <Select placeholder="Status">
                {AllStatus?.map((item) => (
                  <Option key={item._id} value={item._id}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {/* 2nd Select */}
          <div className="col">
            <Form.Item name="all_invoiving_customers">
              <Select placeholder="All Customers">
                {AllCustomer?.map((item) => (
                  <Option key={item._id} value={item._id}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {/* 3rd Select */}
          <div className="col">
            <Form.Item name="invoicenumber">
              <Select placeholder="Invoice #">
                {AllCustomer?.map((item) => (
                  <Option key={item._id} value={item._id}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {/* 4th Select */}
          <div className="col">
            <Form.Item name="invoiceMonths">
              <Select placeholder="This Month">
                {Months?.map((item) => (
                  <Option key={item._id} value={item._id}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {/* 5th Select */}
          <div className="col-sm-4">
            <div className="row">
              <div className="col">
                <Form.Item name={[name, "start_date"]}>
                  <DatePicker placeholder="Date To" />
                </Form.Item>
              </div>
              <div className="col">
                <Form.Item name={[name, "start_date"]}>
                  <DatePicker placeholder="Date From" />
                </Form.Item>
              </div>
            </div>
          </div>

          <div className="col m-0 " style={{ paddingBottom: "25px" }}>
            <button className="estimate-builder-bluebtn">
              <strong>Batch</strong>
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default InvoicingFilters;
