import React, { useState } from "react";
import { Table, Button, Tag, Typography } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import AddPayment from "./Modal/AddPayment";

const { Title, Text } = Typography;

const PaymentsTable = ({ payments, additionalPayments }) => {
  // Columns for the main payments table
  const [isModalVisible, setModalVisible] = useState(false);
  const columns = [
    {
      title: "PMT Date:",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount:",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${amount}`, // Format as currency
    },
    {
      title: "Mode:",
      dataIndex: "mode",
      key: "mode",
      render: (mode) => <Text strong>{mode}</Text>, // Bold text for mode
    },
    {
      title: "Status:",
      dataIndex: "status",
      key: "status",
      align: "center",

      render: (status) => {
        let color =
          status === "Paid"
            ? "#5CEF30"
            : status === "Failed"
            ? "#EF3033"
            : "#C7DEFA";
        return (
          <Tag
            color={color}
            style={{
              width: "80px",
              textAlign: "center",
              color: "black",
              borderRadius: "10px",
            }}
          >
            {status}
          </Tag>
        );
      },
    },
  ];

  return (
    <div className="container mt-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Title level={3}>Payments</Title>
        <Button type="primary text-dark" onClick={() => setModalVisible(true)}>
          + Add Payment
        </Button>
      </div>

      <AddPayment
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        customers={[]}
        invoices={payments}
      />

      {/* Main Payments Table */}
      <Table
        columns={columns}
        dataSource={payments}
        pagination={false}
        rowKey="date"
        bordered
      />

      {/* Additional Payments Section */}
      <div className="mt-4">
        <Title level={4}>Additional Payments</Title>
        <Table
          columns={columns}
          dataSource={additionalPayments}
          pagination={false}
          rowKey="date"
          bordered
        />
      </div>
    </div>
  );
};

export default PaymentsTable;
