import { Button, DatePicker, Form, Typography } from "antd";
import React, { Fragment, useState } from "react";
import EstimateBuilderTable from "./EstimateBuilderTable";
import CustomerNotes from "./CustomerNotes";
import Billing from "./Billing";
const { Text } = Typography;

const EstimateBuilderForm = ({ title, customer }) => {
  const [data, setData] = useState([
    {
      key: 1,
      type: "Work Order",
      description: "Acid Wash",
      qty: 1,
      rate: 1200,
      tax: 0,
      total: 1200,
    },
    {
      key: 2,
      type: "Chemicals",
      description: "Chlorine additive",
      qty: 1,
      rate: 100,
      tax: 50,
      total: 150,
    },
    {
      key: 3,
      type: "Installed Item",
      description: "Motor Rebuild",
      qty: 2,
      rate: 500,
      tax: 0,
      total: 1000,
    },
  ]);

  const handleCancel = () => {
    console.log("cancel");
  };

  // Save the edited notes back into the "customers" array (in a real app you’d do an API call)
  const handleSave = () => {
    console.log("save");
  };
  return (
    <Fragment>
      <div
        style={{
          margin: "20px 0",
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "10px 10px 10px 10px",
        }}
      >
        <div
          className="d-flex w-100 justify-content-between align-items-center p-3"
          style={{
            margin: "20px 0",
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "10px 10px 10px 10px",
          }}
        >
          <h2 className="m-0">
            {" "}
            <strong>{title}</strong>
          </h2>
          <button className="estimate-builder-greybtn">
            <strong>Draft</strong>
          </button>
        </div>
        <div
          className="w-100 d-flex flex-column"
          style={{
            margin: "20px 0",
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "10px 10px 10px 10px",
          }}
        >
          <div className="d-flex justify-content-between ">
            <div className="w-50 d-flex p-2">
              {customer ? (
                <h5 className="">
                  <strong>{customer?.name}</strong>
                </h5>
              ) : (
                <div style={{ margin: "20px 0" }}>
                  <Text type="secondary">No customer selected</Text>
                </div>
              )}
            </div>
            <div className="w-50 d-flex flex-column align-items-end p-2">
              <div className="flex w-100 align-items-center">
                <label htmlFor="et-date" className="w-25">
                  Estimate Date
                </label>
                <Form.Item name={[name, "start_date"]} className="w-75 m-0">
                  <DatePicker placeholder="Estimate Date" />
                </Form.Item>
              </div>
              <div className="flex w-100 align-items-center pt-3">
                <label htmlFor="et-date" className="w-25">
                  Expiration Date
                </label>
                <Form.Item name={[name, "start_date"]} className="w-75 m-0">
                  <DatePicker placeholder="Estimate Date" />
                </Form.Item>
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center">
            <h5 className="m-0 p-2 pb-2">
              <strong className="">Service Address: </strong>
              <br />
            </h5>
            <span style={{ fontSize: "small" }}>
              {customer?.serviceAddress}
            </span>
          </div>
        </div>
      </div>

      <div
        className="w-100 pt-3"
        style={{
          margin: "20px 0",
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "10px 10px 10px 10px",
        }}
      >
        <EstimateBuilderTable data={data} setData={setData} />
      </div>

      <div className="w-100 pt-5">
        <div
          className="col-sm-12"
          style={{
            margin: "20px 0",
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "10px 10px 10px 10px",
          }}
        >
          <div className="col-sm-5">
            <CustomerNotes />
          </div>
          <div className="col-sm-7">
            <Billing data={data} />
          </div>
        </div>
      </div>

      <div className="col-sm-12 pt-5">
        <div
          className="pt-2 d-flex justify-content-end"
          style={{ gap: "15px" }}
        >
          <button
            onClick={handleCancel}
            className="esimate-build-form-cancelbtn"
          >
            Cancel
          </button>
          <button onClick={handleSave} className="esimate-build-form-savebtn">
            Save
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default EstimateBuilderForm;
