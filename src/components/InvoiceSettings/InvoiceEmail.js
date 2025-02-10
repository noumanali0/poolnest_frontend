import React, { Fragment, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";
import dashboardRoutes from "../../routes";
import { Switch } from "antd";
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
export default function InvoiceEmail() {
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
  const handleSave = () => {
    console.log("Save clicked");
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
  };

  return (
    <div className="container mt-4">
      <Card bordered>
        <Form layout="vertical">
          <div className="d-flex w-100">
            <Row gutter={16} align="stretch" className="w-100">
              <Col span={12}>
                <Form.Item className="fw-bold">
                  <Input placeholder="Enter something..." />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="From:" className="fw-bold">
                  <Input placeholder="Enter sender email" />
                </Form.Item>
                <Form.Item label="Email:" className="fw-bold">
                  <Input placeholder="Enter recipient email" />
                </Form.Item>
                <Form.Item label="CC:" className="fw-bold">
                  <Input placeholder="Enter CC email" />
                </Form.Item>
                <Form.Item label="BCC:" className="fw-bold">
                  <Input placeholder="Enter BCC email" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} className="mt-3 w-100 ml-3">
              <Col span={24}>
                <Card size="small" title="Company Info:" bordered>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Row gutter={[16, 8]}>
                        <Col span={24}>
                          <p className="fw-bold">Company Name:</p>
                          <p>XYZ Pool Service</p>
                        </Col>

                        <Col span={24}>
                          <p className="fw-bold">Billing Address:</p>
                          <p>123 Main St, Phoenix, AZ 85014</p>
                        </Col>

                        <Col span={24}>
                          <Checkbox>Include Company Logo</Checkbox>
                        </Col>
                      </Row>
                    </Col>

                    <Col span={12}>
                      <Row gutter={[16, 8]}>
                        <Col span={24}>
                          <p className="fw-bold">Phone Number:</p>
                          <p>623-999-9999</p>
                        </Col>

                        <Col span={24}>
                          <p className="fw-bold">Email:</p>
                          <p>email@example.com</p>
                        </Col>

                        <Col span={24}>
                          <p className="fw-bold">Website:</p>
                          <p>www.poolco.com</p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </div>
          <div className="d-flex w-100">
            <Row gutter={16} align="stretch" className="w-100">
              <Col span={24}>
                <Form.Item
                  label="Email Template Settings:"
                  className="fw-bold mt-3"
                >
                  <Input.TextArea
                    rows={3}
                    placeholder="Enter email template..."
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} className="mt-3 w-100 ml-3">
              <Col span={24}>
                <Card size="small" title="Overdue Reminder Settings:" bordered>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item>
                        <Checkbox>
                          Set the number of days before the invoice is due:
                        </Checkbox>
                        <Input
                          type="number"
                          placeholder="Enter days"
                          className="mt-2"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item>
                        <Checkbox>
                          Set the number of days after the invoice is due:
                        </Checkbox>
                        <Input
                          type="number"
                          placeholder="Enter days"
                          className="mt-2"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item>
                        <Checkbox>
                          Set the interval for sending reminder emails until the
                          invoice is paid:
                        </Checkbox>
                        <Input
                          type="number"
                          placeholder="Enter days"
                          className="mt-2"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </div>

          <Form.Item>
            <Checkbox>Include a PDF copy of the invoice</Checkbox>
          </Form.Item>
          <Form.Item>
            <Checkbox>Additional Attachments</Checkbox>
          </Form.Item>

          <div className="d-flex justify-content-end mt-3 gap-2">
            <Button
              key="cancel"
              className="estimate-builder-greybtn mr-2"
              style={{
                fontWeight: "700",
                height: "40px",
                boxSizing: "border-box",
                borderRadius: "15px",
                backgroundColor: "#C3C1B9",
              }}
            >
              Cancel
            </Button>
            <Button
              key="send"
              type="primary"
              style={{
                color: "black",
                fontWeight: "700",
                textTransform: "none",
                backgroundColor: "#F1C40F",
                borderRadius: "12px",
                height: "40px",
              }}
            >
              Save
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
