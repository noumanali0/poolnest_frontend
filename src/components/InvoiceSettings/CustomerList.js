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

export default function CustomerList() {
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
      <div className="">
        <div className="col-sm-12">
          <div className="col-sm-6">
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
            ></InvoiceAutopayUpfrontTable>
          </div>{" "}
          <div className="col-sm-6 ">
            <div className="mt-4 mb-4">
              <div className="row  align-items-end" style={{ gap: "10px" }}>
                <div className="col-3">
                  <label className="form-label" style={{}}>
                    Search Customer Name
                  </label>
                  <Input
                    placeholder="Enter customer name"
                    style={{
                      paddingLeft: "0px",
                      paddingRight: "0px",
                      height: "50px",
                    }}
                  />
                </div>

                <div className="col-3">
                  <label className="form-label">Customer Tags:</label>
                  <Select
                    style={{ height: "50px !important" }}
                    mode="multiple"
                    placeholder="Choose..."
                    className="w-100"
                    allowClear
                  >
                    <Option value="vip">Seasonal X</Option>
                    <Option value="regular">Seasonal Y</Option>
                  </Select>
                </div>

                <div className="col-3">
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
                  style={{ color: "black", textTransform: "none" }}
                >
                  Search
                </Button>
              </div>
            </div>
            <InvoiceAutopayUpfrontTable
              data={data}
              setData={setData}
            ></InvoiceAutopayUpfrontTable>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
