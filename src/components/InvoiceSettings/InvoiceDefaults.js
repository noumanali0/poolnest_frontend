import React from "react";
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
} from "antd";
import InvoiceSettingBilling from "./DefaultDiscountFees";
import DefaultTaxUI from "./DefaultTaxUI";
import DefaultDiscountFees from "./DefaultDiscountFees";
const { TextArea } = Input;
const { Title, Text } = Typography;

const InvoiceDefaults = ({ data }) => {
  return (
    <div className="col-sm-12">
      <div className="col-sm-8 estimate-builder-left">
        {" "}
        <div
          style={{
            gap: "5px",
            backgroundColor: "white",
            borderRadius: "12px",
            marginTop: "12px",
            padding: "10px",
          }}
        >
          <div className="d-flex justify-content-start">
            {" "}
            <div className="d-flex w-100" style={{ gap: "15px" }}>
              <div style={{ width: "55%" }}>
                <div
                  className="d-flex"
                  style={{
                    gap: "5px",
                    backgroundColor: "white",
                    borderRadius: "12px",
                    marginTop: "12px",
                    padding: "10px",
                  }}
                >
                  <div>
                    <strong>Invoice Numbering Format:</strong>
                  </div>
                  <div className="d-flex flex-column">
                    <span>
                      <strong>Sequential Numbering:</strong> 1, 2, 3
                    </span>
                    <span>
                      <strong>Date Based:</strong> 2024-001
                    </span>
                    <span>
                      <strong>Letter:</strong> INV-1, INV-2
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ width: "45%" }}>
                <div
                  className="d-flex"
                  style={{
                    gap: "5px",
                    backgroundColor: "white",
                    borderRadius: "12px",
                    marginTop: "12px",
                    padding: "10px",
                    width: "100%",
                  }}
                >
                  <div style={{ width: "46%" }}>
                    <strong>Default Due Terms:</strong>
                  </div>
                  <div style={{ width: "54%" }}>
                    <Select className="w-100">
                      <Option value="dueOnReceipt">Due on Receipt</Option>
                      <Option value="net15">Net 15</Option>
                      <Option value="net30">Net 30</Option>
                      <Option value="net45">Net 45</Option>
                      <Option value="net60">Net 60</Option>
                      <Option value="none">None</Option>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex w-100 pt-5" style={{ gap: "10px" }}>
            <div className=" w-50">
              <div className="d-flex flex-column">
                <label htmlFor="monthlyPoolService">
                  Pool Service Invoice Type Name:
                </label>
                <Input id="monthlyPoolService" type="text" />
              </div>
            </div>
            <div className=" w-50">
              <div className="d-flex flex-column">
                <label htmlFor="monthlyServiceDesc">
                  Pool Service Description:
                </label>
                <Input id="monthlyServiceDesc" type="text" />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between pt-5">
            <div>
              {" "}
              <div className="fw-bold">
                <Checkbox>
                  Generate Separate Invoices for Each Service Location
                </Checkbox>
              </div>
              <div className="fw-bold">
                <Checkbox>
                  Generate Invoice if a Service Stop Completed
                </Checkbox>
              </div>
            </div>
          </div>
        </div>
        <DefaultTaxUI />
      </div>

      <div className="col-sm-4 estimate-builder-right ">
        <DefaultDiscountFees data={data} />
        <div
          className="pt-2"
          style={{
            gap: "5px",
            backgroundColor: "white",
            borderRadius: "12px",
            marginTop: "12px",
            padding: "10px",
          }}
        >
          <Title level={5} className="pb-2">
            Default Customer Invoice Note:
          </Title>
          <Card
            style={{
              backgroundColor: "#ddd",
              minHeight: 120,
              padding: "0px",
            }}
          >
            <>
              <TextArea rows={4} />
            </>
          </Card>
        </div>
        <div
          className="pt-2"
          style={{
            gap: "5px",
            backgroundColor: "white",
            borderRadius: "12px",
            marginTop: "12px",
            padding: "10px",
          }}
        >
          <Title level={5} className="pb-2">
            Default Additional Terms:
          </Title>
          <Card
            style={{
              backgroundColor: "#ddd",
              minHeight: 120,
              padding: "0px",
            }}
          >
            <>
              <TextArea rows={4} />
            </>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDefaults;
