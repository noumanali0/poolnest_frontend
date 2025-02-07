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

const EstimatesFilters = () => {
  return (
    <div className="formik w-100">
      <Form
        name="dynamic_form_estimates_item"
        autoComplete="off"
        className="w-100"
      >
        <div
          className="d-flex flex-wrap gap-3"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px", // Adjust gap as needed
          }}
        >
          {/* 1st Select */}
          <div
            className="flex-grow-1"
            style={{ flex: "1 1 180px", minWidth: "180px", maxWidth: "20%" }}
          >
            <Form.Item
              name="estimatesStatus"
              className="no-margin"
              style={{ margin: "0px" }}
            >
              <Select placeholder="Status" className="w-100">
                {AllStatus?.map((item) => (
                  <Option key={item._id} value={item._id}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {/* 2nd Select */}
          <div
            className="flex-grow-1"
            style={{ flex: "1 1 180px", minWidth: "180px", maxWidth: "20%" }}
          >
            <Form.Item name="estimatesType" style={{ margin: "0px" }}>
              <Select placeholder="Type" className="w-100">
                {Types?.map((item) => (
                  <Option key={item._id} value={item._id}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {/* 3rd Select */}
          <div
            className="flex-grow-1"
            style={{ flex: "1 1 180px", minWidth: "180px", maxWidth: "20%" }}
          >
            <Form.Item name="estimatesCustomer" style={{ margin: "0px" }}>
              <Select placeholder="Customer" className="w-100">
                {AllCustomer?.map((item) => (
                  <Option key={item._id} value={item._id}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {/* 4th Select */}
          <div
            className="flex-grow-1"
            style={{ flex: "1 1 180px", minWidth: "180px", maxWidth: "20%" }}
          >
            <Form.Item name="eatimatesMonths" style={{ margin: "0px" }}>
              <Select placeholder="Time" className="w-100">
                {Months?.map((item) => (
                  <Option key={item._id} value={item._id}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {/* Date Fields */}
          <div
            className="flex-grow-1"
            style={{ flex: "1 1 180px", minWidth: "180px", maxWidth: "20%" }}
          >
            <Form.Item name={[name, "start_date"]} style={{ margin: "0px" }}>
              <DatePicker placeholder="Date To" className="w-100" />
            </Form.Item>
          </div>

          <div
            className="flex-grow-1"
            style={{ flex: "1 1 180px", minWidth: "180px", maxWidth: "20%" }}
          >
            <Form.Item name={[name, "end_date"]} style={{ margin: "0px" }}>
              <DatePicker placeholder="Date From" className="w-100" />
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EstimatesFilters;
