import { Button, DatePicker, Form, Typography, Card, Input } from "antd";
import React, { Fragment, useState } from "react";
import EstimateBuilderTable from "../EstimateBuilder/EstimateBuilderTable";
import CustomerNotes from "../EstimateBuilder/CustomerNotes";
import Billing from "../EstimateBuilder/Billing";
import { EditOutlined } from "@ant-design/icons";
import ServicesAndChemicals from "./ServicesAndChemicals";

const { TextArea } = Input;
const { Text, Title } = Typography;

const InvoiceBuilderForm = ({ title, customer }) => {
  const [localNotes, setLocalNotes] = useState("");
  const [isEditingNotes, setIsEditingNotes] = useState(false);

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

  const handleEditNotes = () => {
    setIsEditingNotes((prev) => !prev);
    console.log("handle edit");
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
        <div className="d-flex w-100 justify-content-between align-items-center p-3">
          <h2 className="m-0">
            {" "}
            <strong>{title}</strong>
          </h2>
          <button
            className="estimate-builder-greybtn"
            style={{ backgroundColor: "#C7DEFA" }}
          >
            <strong>Sent</strong>
          </button>
        </div>
        <div className="w-100 flex">
          <div className="w-50 d-flex p-2">
            {customer && customer?.company ? (
              <div>
                <h5 className="">
                  <strong>{customer?.company}</strong>
                </h5>
                <Text type="secondary">{customer.contactName}</Text>
              </div>
            ) : (
              <div style={{ margin: "20px 0" }}>
                <h5 className="">
                  <strong>{customer?.contactName}</strong>
                </h5>
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

        <div className="pb-4">
          <h5 className="m-0 p-2 ">
            <strong className="">Service Address: </strong>
            <br />
          </h5>
          <span style={{ fontSize: "small" }} className="m-0 p-2">
            {customer?.serviceAddress}
          </span>
        </div>
      </div>
      <div
        className="w-100 "
        style={{
          margin: "20px 0",
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "10px 10px 10px 10px",
        }}
      >
        <EstimateBuilderTable data={data} setData={setData} />

        {(customer.services || customer.chemicals) && (
          <>
            <ServicesAndChemicals
              services={customer?.services}
              chemicals={customer?.chemicals}
              totalChemicals={97.5}
            />
          </>
        )}
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
            <div className="col">
              <h2></h2>
            </div>
            <div className="col d-flex flex-column align-items-start pt-4">
              <div className="d-flex justify-content-between w-100">
                <Title
                  className="p-0 m-0"
                  level={5}
                  style={{ width: "fit-content" }}
                >
                  Subtotal:
                </Title>
                <Text className="p-0 m-0 pl-2">$23647.22</Text>
              </div>
              <div className="d-flex justify-content-between w-100 mt-2">
                <Title
                  className="p-0 m-0"
                  level={5}
                  style={{ width: "fit-content" }}
                >
                  Tax:
                </Title>
                <Text className="p-0 m-0 pl-2">$0.00</Text>
              </div>
              <div className="d-flex justify-content-between w-100 mt-2">
                <Title
                  className="p-0 m-0"
                  level={5}
                  style={{ width: "fit-content" }}
                >
                  Amount Due:
                </Title>
                <Text className="p-0 m-0 pl-2">$6237</Text>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="col-sm-12 "
        style={{
          margin: "20px 0",
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "10px 10px 10px 10px",
        }}
      >
        <div className="pt-2">
          <Title
            level={5}
            style={{ marginBottom: 8 }}
            className="d-flex justify-content-between align-center"
          >
            Internal Notes:
            <Button
              icon={<EditOutlined />}
              type="text"
              onClick={handleEditNotes}
            />
          </Title>
          <Card style={{ backgroundColor: "#ddd", minHeight: 120 }}>
            {/* If editing, show text area + buttons */}
            {isEditingNotes && (
              <>
                <TextArea
                  rows={4}
                  value={localNotes}
                  onChange={(e) => setLocalNotes(e.target.value)}
                />
                <div
                  className="pt-2 d-flex justify-content-end"
                  style={{ gap: "15px" }}
                >
                  <button
                    // onClick={handleCancelNotes}
                    className="esimate-build-form-cancelbtn text-dark"
                  >
                    Cancel
                  </button>
                  <button
                    className="esimate-build-form-savebtn text-dark"
                    // onClick={handleSaveNotes}
                  >
                    Save
                  </button>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </Fragment>
  );
};

export default InvoiceBuilderForm;
