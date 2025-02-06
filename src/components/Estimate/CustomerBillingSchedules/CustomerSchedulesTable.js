import React, { useState } from "react";
import { Table, Button, Input, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const { Title, Text } = Typography;

const CustomerSchedulesTable = ({ invoices }) => {
  const navigate = useNavigate();
  // Columns for the main invoice table
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Due",
      dataIndex: "due",
      key: "due",
    },
    {
      title: "Invoice #",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Qty:",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Rate:",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "Tax:",
      dataIndex: "tax",
      key: "tax",
    },
    {
      title: "Subtotal:",
      dataIndex: "subtotal",
      key: "subtotal",
    },
  ];
  const [isEditingNotes, setIsEditingNotes] = useState(true);

  const handleEditNotes = () => {
    setIsEditingNotes((prev) => !prev);
  };

  // Function to display chemicals when present
  const renderChemicals = (chemicals) => (
    <div className="mt-2">
      <Text strong>Chemicals:</Text>
      <table className="table mt-2">
        <thead>
          <tr>
            <th>Name</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {chemicals.map((chemical, index) => (
            <tr key={index}>
              <td>{chemical.name}</td>
              <td>{chemical.quantity}</td>
              <td>{chemical.rate}</td>
              <td>{chemical.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className="d-flex justify-content-center mt-2"
        style={{ gap: "5px" }}
      >
        <Text strong>Total Chemicals: </Text>
        {""}
        <Text>{chemicals.reduce((acc, chem) => acc + chem.subtotal, 0)}</Text>
      </div>
    </div>
  );

  // Generate final table data where chemicals are in-line
  const formattedData = invoices.flatMap((invoice) => {
    const rows = [
      {
        ...invoice,
        key: invoice.invoiceNumber + "-main",
        showChemicals: false,
      },
    ];
    if (invoice.chemicals.length > 0) {
      rows.push({
        key: invoice.invoiceNumber + "-chemicals",
        description: renderChemicals(invoice.chemicals), // Render chemicals in the Description column
        isChemicalRow: true, // Flag to style differently
      });
    }
    return rows;
  });

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <Title level={3}>Invoices</Title>
        {/* Hide button if chemicals exist in any invoice */}

        <Button
          type="primary text-dark"
          onClick={() => navigate("/estimate-builder")}
        >
          + Create Invoice
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={formattedData}
        pagination={false}
        rowKey="key"
        rowClassName={(record) => (record.isChemicalRow ? "chemical-row" : "")} // Style differently for chemical rows
      />
      <div className="mt-4">
        <div className="d-flex justify-content-between align-items-center w-100">
          <Text strong>Notes:</Text>
          <Button
            icon={<EditOutlined />}
            type="text"
            onClick={handleEditNotes}
          />
        </div>
        <Input.TextArea
          placeholder="Enter your notes here..."
          rows={4}
          className="mt-2"
          disabled={isEditingNotes}
        />
      </div>
    </div>
  );
};

export default CustomerSchedulesTable;
