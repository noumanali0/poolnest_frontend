import React, { useState } from "react";
import { Table, Tag, Space, Button } from "antd";
import { EditOutlined, CopyOutlined, DeleteOutlined } from "@ant-design/icons";

const EstimateTable = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      total: initialData.length,
    },
  });

  // Simple status-color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "#5CEF30";
      case "Sent":
        return "#C7DEFA";
      case "Expired":
        return "#909090";
      case "Rejected":
        return "#EF3033";
      default:
        return "default";
    }
  };

  // Define columns
  const columns = [
    {
      title: "Created On",
      dataIndex: "createdOn",
      sorter: (a, b) => {
        // Example numeric sort by the date portion
        const dateA = new Date(a.createdOn);
        const dateB = new Date(b.createdOn);
        return dateA - dateB;
      },
      width: 120,
    },
    {
      title: "Status",
      align: "center",
      dataIndex: "status",

      // Example of filters for status
      //   filters: [
      //     { text: "Approved", value: "Approved" },
      //     { text: "Sent", value: "Sent" },
      //     { text: "Expired", value: "Expired" },
      //     { text: "Rejected", value: "Rejected" },
      //   ],
      //   onFilter: (value, record) => record.status === value,
      render: (status) => (
        <Tag
          color={getStatusColor(status)}
          key={status}
          style={{ minWidth: 80, textAlign: "center" }}
        >
          <strong className="text-dark">{status}</strong>
        </Tag>
      ),
      width: 120,
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
      width: 180,
    },
    {
      title: "Address",
      dataIndex: "address",
      //   sorter: (a, b) => a.address.localeCompare(b.address),
      width: 180,
    },
    {
      title: "Service Type",
      dataIndex: "serviceType",
      sorter: (a, b) => a.serviceType.localeCompare(b.serviceType),
      width: 120,
    },
    {
      title: "Desired Completion Date",
      dataIndex: "desiredCompletionDate",
      //   sorter: (a, b) =>
      //     a.desiredCompletionDate.localeCompare(b.desiredCompletionDate),
      width: 180,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      //   sorter: (a, b) => a.amount - b.amount,
      render: (amount) => `$${amount.toLocaleString()}`,
      width: 100,
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => console.log("Edit", record)}
          />

          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => console.log("Delete", record)}
          />
        </Space>
      ),
      width: 120,
    },
  ];

  // Handle table changes (sort, filter, paginate)
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      sortField: sorter.field,
      sortOrder: sorter.order,
      filters,
    });
  };

  return (
    <div
      style={{
        overflowX: "auto",
        border: "1px solid #d9d9d9",
        borderRadius: "20px",
      }}
    >
      <div style={{ minWidth: "830px" }}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          onChange={handleTableChange}
          rowKey="key"
        />
      </div>
    </div>
  );
};

export default EstimateTable;
