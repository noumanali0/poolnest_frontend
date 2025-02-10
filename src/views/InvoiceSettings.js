import React, { Fragment, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AutopayDefaults from "../components/InvoiceSettings/AutoPayDefaults";

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
import dayjs from "dayjs";
import { Tabs } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import EstimateStatusHeader from "../components/Estimate/EstimateStatusHeader";
import { EditOutlined } from "@ant-design/icons";
import InvoiceEmail from "../components/InvoiceSettings/InvoiceEmail";
import InvoiceSettingBilling from "../components/InvoiceSettings/InvoiceSettingDiscountFee";
const { TextArea } = Input;
const { Title, Text } = Typography;
export default function InvoiceSettings() {
  const [tab, setTab] = useState("");
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

  const [isEditingNotes, setIsEditingNotes] = useState(true);
  const tabs = [
    {
      key: "1",
      label: "Autopay Defaults",
      children: <AutopayDefaults />,
    },
    {
      key: "2",
      label: "Invoice Email Defaults",
      children: <InvoiceEmail />,
    },
  ];
  const onChange = (key) => {
    setTab(key);
  };

  const handleEditNotes = () => {
    setIsEditingNotes((prev) => !prev);
  };
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <div className="">
          <div className="col d-flex justify-content-end">
            <EstimateStatusHeader />
          </div>
          <Container fluid>
            <div className="col-sm-12 ">
              <Tabs defaultActiveKey="1" activeKey={tab} onChange={onChange}>
                {tabs.map((item) => (
                  <Tabs.TabPane key={item.key} tab={item.label}>
                    {item.children}
                  </Tabs.TabPane>
                ))}
              </Tabs>
            </div>
          </Container>
        </div>
        {!tab && (
          <div className="col-sm-12">
            <div className="col-sm-7 estimate-builder-left">
              {" "}
              <div className="col-sm-12">
                {" "}
                <div className="container mt-4">
                  <Card
                    bordered
                    style={{ margin: "0 auto", backgroundColor: "transparent" }}
                  >
                    <Form layout="vertical">
                      <div className="d-flex justify-content-end">
                        {" "}
                        <Form.Item
                          label="Sequential Numbering:"
                          className="fw-bold"
                        >
                          <Radio.Group>
                            <Radio value="1">1</Radio>
                            <Radio value="2">2</Radio>
                            <Radio value="3">3</Radio>
                          </Radio.Group>
                        </Form.Item>
                        <Form.Item
                          label="Default Due Terms:"
                          className="fw-bold"
                        >
                          <Select className="w-100">
                            <Option value="dueOnReceipt">Due on Receipt</Option>
                            <Option value="net15">Net 15</Option>
                            <Option value="net30">Net 30</Option>
                            <Option value="net45">Net 45</Option>
                            <Option value="net60">Net 60</Option>
                            <Option value="none">None</Option>
                          </Select>
                        </Form.Item>
                      </div>

                      <Form.Item
                        label="Pool Service Description:"
                        className="fw-bold"
                      >
                        <Input.TextArea
                          rows={3}
                          placeholder="Enter description here..."
                        />
                      </Form.Item>

                      <div className="d-flex justify-content-between">
                        <div>
                          {" "}
                          <Form.Item className="fw-bold">
                            <Checkbox>
                              Generate Separate Invoices for Each Service
                              Location
                            </Checkbox>
                          </Form.Item>
                          <Form.Item className="fw-bold">
                            <Checkbox>
                              Generate Invoice if a Service Stop Completed
                            </Checkbox>
                          </Form.Item>
                        </div>
                        <Col span={12} style={{ maxWidth: "200px" }}>
                          <Form.Item
                            label="Default Discount:"
                            className="fw-bold"
                          >
                            <Input type="number" placeholder="e.g., 10%" />
                          </Form.Item>
                        </Col>
                      </div>
                      <Col span={12}>
                        <Form.Item
                          label="Default Tax Rate:"
                          className="fw-bold"
                        >
                          <Input type="number" placeholder="e.g., 5%" />
                        </Form.Item>
                      </Col>
                    </Form>
                  </Card>
                </div>
              </div>
            </div>
            <div className="col-sm-5 estimate-builder-right ">
              <InvoiceSettingBilling data={data} />
              <div className="pt-2">
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
              <div className="pt-2">
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
        )}
      </div>
    </Fragment>
  );
}
