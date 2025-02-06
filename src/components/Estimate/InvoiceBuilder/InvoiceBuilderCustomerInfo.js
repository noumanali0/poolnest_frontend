import React from "react";
import { Card, Row, Col, Typography, Button, Table } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

// const customerData =

const InvoiceBuilderCustomerInfo = ({ customerData }) => {
  const c = customerData; // for short references

  return (
    <div style={{ padding: 20 }}>
      {/* CUSTOMER INFO SECTION */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={5} style={{ margin: 0 }}>
          {c.customerInfoTitle}
        </Title>
        {/* Right‐side area */}
        <div>
          <button className="yellowbtn text-dark ">
            <PlusOutlined className="font-weight-bold" />{" "}
            <strong>Create Invoice</strong>
          </button>
        </div>
      </div>

      {/* Gray Card for Customer Info */}
      <Card
        style={{
          backgroundColor: "#eee",
          // padding: "25px 0px 0px 0px",
          margin: "20px 0",
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "10px 10px 10px 10px",
        }}
      >
        {/* Row 1: Contact (left), Billing Method (right) */}
        <Row>
          <Col span={12}>
            <Title level={5} className="m-0">
              Contact:
            </Title>
            <Text>{c.contactName}</Text>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Text style={{ fontWeight: "bold" }}>Billing</Text>
          </Col>
        </Row>

        {/* Row 2: Billing Address (left), Service Address (right) */}
        <Row style={{ marginTop: "2rem" }}>
          <Col span={12}>
            <Title level={5} className="m-0">
              Billing Address:
            </Title>
            <Text style={{ whiteSpace: "pre-line" }}>{c.billingAddress}</Text>
          </Col>
          <Col span={12}>
            <Title level={5} className="m-0">
              Service Address:
            </Title>
            <Text style={{ whiteSpace: "pre-line" }}>{c.serviceAddress}</Text>
          </Col>
        </Row>

        {/* Row 3: Phone Number (left), Email (right) */}
        <Row style={{ marginTop: "2rem" }}>
          <Col span={12}>
            <Title level={5} className="m-0">
              Phone Number:
            </Title>
            <Text>{c.phoneNumber}</Text>
          </Col>
          <Col span={12}>
            <Title level={5} className="m-0">
              Email:
            </Title>
            <Text>{c.email}</Text>
          </Col>
        </Row>
      </Card>

      {/* CUSTOMER BALANCE SECTION */}
      <div
        style={{
          marginTop: 24,
          marginBottom: 8,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={5} style={{ display: "inline-block", marginRight: 16 }}>
          {c.customerBalanceTitle}
        </Title>
        <button className="yellowbtn text-dark ">
          <strong>Add Payment</strong>
        </button>
      </div>
      <Card
        style={{
          margin: "20px 0",
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "10px 10px 10px 10px",
        }}
      >
        {/* Row 1: Open Invoices */}
        <Row gutter={[0, 16]}>
          <Col span={24} style={{ padding: "15px" }}>
            <Row>
              {/* "Open Invoices" label */}
              <Col span={8}>
                <Title></Title>
                <Text strong>Open Invoices</Text>
              </Col>
              {/* Labels & values */}
              <Col span={16}>
                {/* Labels row */}
                <Row justify="space-between">
                  <Col>
                    <Text>Sales</Text>
                  </Col>
                  <Col>
                    <Text>Payments</Text>
                  </Col>
                  <Col>
                    <Text>Balance</Text>
                  </Col>
                </Row>
                {/* Values row */}
                <Row justify="space-between" style={{ marginTop: 6 }}>
                  <Col>
                    <Text style={{ color: "green", fontWeight: "bold" }}>
                      ${c.balances.openInvoices.sales}
                    </Text>
                  </Col>
                  <Col>
                    <Text style={{ fontWeight: "bold" }}>
                      ${c.balances.openInvoices.payments}
                    </Text>
                  </Col>
                  <Col>
                    <Text style={{ color: "red", fontWeight: "bold" }}>
                      ${c.balances.openInvoices.balance}
                    </Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          {/* Row 2: All Invoices */}
          <Col span={24} style={{ padding: "15px" }}>
            <Row>
              {/* "All Invoices" label */}
              <Col span={8}>
                <Title></Title>
                <Text strong>All Invoices</Text>
              </Col>
              {/* Labels & values */}
              <Col span={16}>
                {/* Labels row */}
                <Row justify="space-between">
                  <Col>
                    <Text>Sales</Text>
                  </Col>
                  <Col>
                    <Text>Payments</Text>
                  </Col>
                  <Col>
                    <Text>Balance</Text>
                  </Col>
                </Row>
                {/* Values row */}
                <Row justify="space-between" style={{ marginTop: 6 }}>
                  <Col>
                    <Text style={{ color: "green", fontWeight: "bold" }}>
                      ${c.balances.allInvoices.sales}
                    </Text>
                  </Col>
                  <Col>
                    <Text style={{ fontWeight: "bold" }}>
                      ${c.balances.allInvoices.payments}
                    </Text>
                  </Col>
                  <Col>
                    <Text style={{ color: "red", fontWeight: "bold" }}>
                      ${c.balances.allInvoices.balance}
                    </Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      {/* INVOICES TABLE */}
      <div
        style={{
          margin: "20px 0",
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "10px 10px 10px 10px",
        }}
      >
        <Title level={5} style={{ marginBottom: 8 }}>
          {c.customerInvoicesTitle}
        </Title>
        <Card bodyStyle={{ padding: 0 }}>
          <Table
            columns={c.invoiceColumns}
            dataSource={c.invoiceData}
            pagination={false}
            style={{ margin: 0 }}
          />
        </Card>
      </div>

      {/* COMMUNICATION TABLE */}
      <div
        style={{
          margin: "20px 0",
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "10px 10px 10px 10px",
        }}
      >
        <Title level={5} style={{ marginBottom: 8 }}>
          {c.communicationTitle}
        </Title>
        <Card bodyStyle={{ padding: 0 }}>
          <Table
            columns={c.communicationColumns}
            dataSource={c.communicationData}
            pagination={false}
            style={{ margin: 0 }}
          />
        </Card>
      </div>
    </div>
  );
};

export default InvoiceBuilderCustomerInfo;
