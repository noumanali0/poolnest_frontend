import React from "react";
import { Table, Tag, Button } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const InvoiceTable = () => {
  // Sample data
  const data = [
    {
      key: "1",
      date: "12/5/24",
      status: "Paid",
      invoiceNumber: 1,
      customerName: "Customer First & Last",
      invoiceTotal: "$100",
      balanceDue: "$0",
      due: "30 Days",
      statusColor: "#5CEF30", // Green
    },
    {
      key: "2",
      date: "12/2/24",
      status: "Sent",
      invoiceNumber: 2,
      customerName: "Customer First & Last",
      invoiceTotal: "$200",
      balanceDue: "$200",
      due: "15 Days",
      statusColor: "#C7DEFA", // Blue
    },
    {
      key: "3",
      date: "11/30/24",
      status: "Draft",
      invoiceNumber: 3,
      customerName: "Customer First & Last",
      invoiceTotal: "$300",
      balanceDue: "N/A",
      due: "N/A",
      statusColor: "#909090", // Gray
    },
    {
      key: "4",
      date: "10/31/24",
      status: "Overdue",
      invoiceNumber: 4,
      customerName: "Customer First & Last",
      invoiceTotal: "$400",
      balanceDue: "$200",
      due: "3 Days Late",
      statusColor: "#EF3033", // Red
    },
    {
      key: "5",
      date: "10/31/24",
      status: "Voided",
      invoiceNumber: 4,
      customerName: "Customer First & Last",
      invoiceTotal: "$400",
      balanceDue: "$200",
      due: "N/A",
      statusColor: "#F9ADAE", // Pink
    },
  ];

  // Columns definition
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status, record) => (
        <Tag
          color={record.statusColor}
          style={{
            color: "black",
            fontWeight: "bold",
            borderRadius: "4px",
            padding: "5px 10px",
            minWidth: 80,
            textAlign: "center",
          }}
          key={status}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Invoice #",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
      sorter: (a, b) => a.invoiceNumber - b.invoiceNumber,
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Invoice Total",
      dataIndex: "invoiceTotal",
      key: "invoiceTotal",
      sorter: (a, b) =>
        parseFloat(a.invoiceTotal.replace("$", "")) -
        parseFloat(b.invoiceTotal.replace("$", "")),
    },
    {
      title: "Balance Due",
      dataIndex: "balanceDue",
      key: "balanceDue",
    },
    {
      title: "Due",
      dataIndex: "due",
      key: "due",
      render: (due, record) => (
        <span
          style={{ color: record.due === "3 Days Late" ? "red" : "inherit" }}
        >
          {due}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <div>
          <Button icon={<EyeOutlined />} style={{ marginRight: 8 }} />
          <Button icon={<EditOutlined />} style={{ marginRight: 8 }} />
          <Button icon={<DeleteOutlined />} danger />
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Button
          type="primary"
          style={{
            backgroundColor: "#FACC15",
            color: "black",
            fontWeight: "bold",
            border: "none",
          }}
        >
          + Create Invoice
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default InvoiceTable;
