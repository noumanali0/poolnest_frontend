import React, { Fragment, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";
import dashboardRoutes from "../../routes";
import { Switch } from "antd";
import InvoiceAutopayUpfrontTable from "./InvoiceAutopayUpfrontTable";

import {
  DatePicker,
  Select,
  Input,
  Typography,
  Card,
  Button,
  Form,
  Radio,
  Checkbox,
  Row,
  Col,
  Tabs,
  InputNumber,
} from "antd";

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Title, Text } = Typography;

export default function AutopayDefaults() {
  const [isEditingNotes, setIsEditingNotes] = useState(true);
  const [autoInvoicing, setAutoInvoicing] = useState(true);
  const [invoiceDay, setInvoiceDay] = useState(1);
  const [data, setData] = useState([
    {
      key: 1,
      name: "Customer 1 First & Last",
      location: "St. Address Only",
      frequency: 7,
      date: 1,
      add: "minus",
    },
    {
      key: 2,
      name: "Customer 2 First & Last",
      location: "St. Address Only",
      frequency: 14,
      date: 1,
      add: "minus",
    },
    {
      key: 3,
      name: "Customer 3 First & Last",
      location: "St. Address Only",
      frequency: 30,
      date: 5,
      add: "plus",
    },
    {
      key: 4,
      name: "Customer 4 First & Last",
      location: "St. Address Only",
      frequency: 30,
      date: 1,
      add: "plus",
    },
    {
      key: 5,
      name: "Customer 5 First & Last",
      location: "St. Address Only",
      frequency: 30,
      date: 15,
      add: "plus",
    },
  ]);
  const [dataUpfront, setDataUpfront] = useState([
    {
      key: 1,
      name: "Customer 1 First & Last",
      location: "St. Address Only",
      frequency: 7,
      date: 1,
    },
    {
      key: 2,
      name: "Customer 2 First & Last",
      location: "St. Address Only",
      frequency: 14,
      date: 1,
    },
    {
      key: 3,
      name: "Customer 3 First & Last",
      location: "St. Address Only",
      frequency: 30,
      date: 5,
    },
    {
      key: 4,
      name: "Customer 4 First & Last",
      location: "St. Address Only",
      frequency: 30,
      date: 1,
    },
    {
      key: 5,
      name: "Customer 5 First & Last",
      location: "St. Address Only",
      frequency: 30,
      date: 15,
    },
  ]);
  return (
    <Fragment>
      <Sidebar routes={dashboardRoutes} />

      <div className="col-sm-12">
        <div
          className="col-sm-8"
          style={{
            gap: "5px",
            backgroundColor: "white",
            borderRadius: "12px",
            marginTop: "12px",
            padding: "10px",
          }}
        >
          <h4 style={{ color: "black", fontWeight: "700" }}>
            Autopay Settings:
          </h4>
          <h5 className="mb-3" style={{ color: "black", fontWeight: "700" }}>
            Auto Invoicing Setting:
          </h5>

          {/* Enable Auto Invoicing */}
          <Checkbox
            checked={autoInvoicing}
            onChange={(e) => setAutoInvoicing(e.target.checked)}
          >
            Enable Auto Invoicing
          </Checkbox>

          {/* Invoice Delivery Date */}
          <div
            className="mt-3 d-flex align-items-center"
            style={{ gap: "8px" }}
          >
            <label className="me-2" style={{ color: "black" }}>
              Invoice Delivery Date:
            </label>
            <InputNumber
              min={1}
              max={31}
              value={invoiceDay}
              onChange={(value) => setInvoiceDay(value)}
            />
            <span
              className="ms-2"
              style={{
                color: "#000000",
                fontSize: "12px",
                fontWeight: "400",
              }}
            >
              Day of the month
            </span>
          </div>

          {/* Information Text */}
          <div className="d-flex justify-content-between pt-5">
            <div>
              {" "}
              <div className="fw-bold">
                <Checkbox>Automatically send generated invoice</Checkbox>
              </div>
              <div className="fw-bold">
                <Checkbox>
                  Require invoice review prior to sending (Sent to Invoicing)
                </Checkbox>
              </div>
            </div>
          </div>

          <div
            className="pt-2 d-flex justify-content-end"
            style={{ gap: "15px" }}
          >
            <button
              // onClick={handleCancel}
              className="esimate-build-form-cancelbtn"
            >
              Cancel
            </button>
            <button
              // onClick={handleSave}
              className="esimate-build-form-savebtn"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="col-sm-12">
        <div className="col-sm-6">
          <h4 style={{ fontWeight: "700" }}>Customer Billing Schedules:</h4>
          <div className="d-flex mt-4 mb-4 gap-3">
            <p className="mr-4 fs-6">Upfront Payment</p>
            <Switch />

            <p className="ml-4  fs-6">Post-service payment</p>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <p className="" style={{ fontWeight: "700" }}>
              {" "}
              Upfront Payment Customers:
            </p>
            <Button
              key="send"
              type="primary"
              style={{ color: "black", textTransform: "none" }}
            >
              Download
            </Button>
          </div>
          <InvoiceAutopayUpfrontTable
            data={dataUpfront}
            setData={setDataUpfront}
          />
        </div>{" "}
        <div
          className="col-sm-6"
          style={{ padding: "10px 0px 10px 0px ", marginTop: "6.4rem" }}
        >
          <div
            className="row  align-items-end"
            // style={{ gap: "10px" }}
            style={{
              gap: "5px",
              backgroundColor: "white",
              borderRadius: "12px",
              margin: "12px 0px 12px 0px",
              padding: "10px 0px 10px 0px ",
            }}
          >
            <div className="col-3 p-0">
              <label className="form-label" style={{}}>
                Search Customer Name
              </label>
              <Input
                placeholder="Enter customer name"
                style={{
                  height: "50px",
                }}
              />
            </div>

            <div className="col-3 p-0">
              <label className="form-label">Customer Tags:</label>
              <Select mode="single" placeholder="Choose..." className="w-100">
                <Option value="vip">Seasonal X</Option>
                <Option value="regular">Seasonal Y</Option>
              </Select>
            </div>

            <div className="col-3 p-0">
              <label className="form-label">With</label>
              <Select
                placeholder="Choose..."
                className="w-100"
                style={{ height: "50px !important" }}
              >
                <Option value="any">Any</Option>
                <Option value="all">All</Option>
                <Option value="none">None</Option>
              </Select>
            </div>

            <Button
              key="send"
              type="primary"
              className=""
              style={{ color: "black", textTransform: "none" }}
            >
              Search
            </Button>
          </div>
          <InvoiceAutopayUpfrontTable data={data} setData={setData} />
        </div>
      </div>
    </Fragment>
  );
}
