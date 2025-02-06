import React, { useState } from "react";
import { Table, Input, Select, Button, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  PlusCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const { Option, OptGroup } = Select;

// Sample data for existing rows
const initialData = [
  {
    id: 1,
    type: "Filter Cleaning",
    description: "Clean pool filter",
    qty: 1,
    rate: 100,
    tax: 10,
    total: 110,
  },
  {
    id: 2,
    type: "Acid Wash",
    description: "Deep acid wash",
    qty: 1,
    rate: 1200,
    tax: 0,
    total: 1200,
  },
];

// Below is a “master list” of type options, with each option carrying
// the data needed to prefill description/rate/tax.  You can expand or customize.
const typeGroups = {
  "Work Order Types": [
    {
      label: "Filter Cleaning",
      value: "Filter Cleaning",
      prefills: { description: "Clean pool filter", rate: 100, tax: 10 },
    },
    {
      label: "Acid Wash",
      value: "Acid Wash",
      prefills: { description: "Deep acid wash", rate: 1200, tax: 0 },
    },
  ],
  "Products (Installed Items)": [
    {
      label: "Skimmer Basket",
      value: "Skimmer Basket",
      prefills: { description: "Basket replacement", rate: 25, tax: 2 },
    },
  ],
  Chemicals: [
    {
      label: "Chlorine",
      value: "Chlorine",
      prefills: { description: "Chlorine additive", rate: 15, tax: 2 },
    },
  ],
  "Service Types": [
    {
      label: "Per Visit With Chems",
      value: "Per Visit With Chems",
      prefills: { description: "All-inclusive service", rate: 80, tax: 8 },
    },
    {
      label: "Per Visit Without Chems",
      value: "Per Visit Without Chems",
      prefills: { description: "Service only (no chems)", rate: 60, tax: 5 },
    },
  ],
};

const EstimateBuilderTable = ({ data, setData }) => {
  const [adding, setAdding] = useState(false);

  // "New item" row state
  const [newItem, setNewItem] = useState({
    type: "",
    description: "",
    qty: 1,
    rate: 0,
    tax: 0,
  });

  // Calculate total
  const getTotal = (item) =>
    Number(item.qty) * Number(item.rate) + Number(item.tax);

  // If user changes the type, auto-prefill the description/rate/tax from our map
  const handleTypeChange = (value, option) => {
    const prefills = option.prefills || {};
    setNewItem({
      ...newItem,
      type: value,
      description: prefills.description || "",
      rate: prefills.rate || 0,
      tax: prefills.tax || 0,
    });
  };

  // For other fields (description, qty, rate, tax), user can override
  const handleChange = (key, value) => {
    setNewItem({ ...newItem, [key]: value });
  };

  // Confirm add
  const handleAddConfirm = () => {
    const nextId = data.length ? Math.max(...data.map((d) => d.id)) + 1 : 1;
    const itemToAdd = {
      id: nextId,
      ...newItem,
      total: getTotal(newItem),
    };
    setData([...data, itemToAdd]);
    setNewItem({ type: "", description: "", qty: 1, rate: 0, tax: 0 });
    setAdding(false);
  };

  // Cancel add
  const handleAddCancel = () => {
    setNewItem({ type: "", description: "", qty: 1, rate: 0, tax: 0 });
    setAdding(false);
  };

  // Delete an existing row
  const handleDelete = (record) => {
    setData(data.filter((item) => item.id !== record.id));
  };

  // Table columns
  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      width: 250,
      render: (value, record) => {
        if (record.id === "new") {
          return (
            <Select
              placeholder="Type"
              value={newItem.type}
              onChange={handleTypeChange}
              style={{ width: "100%" }}
            >
              {Object.entries(typeGroups).map(([groupLabel, options]) => (
                <OptGroup label={groupLabel} key={groupLabel}>
                  {options.map((item) => (
                    <Option
                      key={item.value}
                      value={item.value}
                      prefills={item.prefills}
                    >
                      {item.label}
                    </Option>
                  ))}
                </OptGroup>
              ))}
            </Select>
          );
        }
        return value;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (value, record) => {
        if (record.id === "new") {
          return (
            <Input
              placeholder="Description"
              value={newItem.description}
              onChange={(e) => handleChange("description", e.target.value)}
              style={{ width: 140 }}
            />
          );
        }
        return value;
      },
    },
    {
      title: "Qty",
      dataIndex: "qty",
      width: 70,
      render: (value, record) => {
        if (record.id === "new") {
          return (
            <Input
              type="number"
              value={newItem.qty}
              onChange={(e) => handleChange("qty", e.target.value)}
              style={{ width: 60 }}
            />
          );
        }
        return value;
      },
    },
    {
      title: "Rate",
      dataIndex: "rate",
      width: 80,
      render: (value, record) => {
        if (record.id === "new") {
          return (
            <Input
              type="number"
              value={newItem.rate}
              onChange={(e) => handleChange("rate", e.target.value)}
              style={{ width: 80 }}
            />
          );
        }
        return value;
      },
    },
    {
      title: "Tax",
      dataIndex: "tax",
      width: 60,
      render: (value, record) => {
        if (record.id === "new") {
          return (
            <Input
              type="number"
              value={newItem.tax}
              onChange={(e) => handleChange("tax", e.target.value)}
              style={{ width: 60 }}
            />
          );
        }
        // If tax is 0, just show blank or 0
        return value || 0;
      },
    },
    {
      title: "Totals",
      dataIndex: "total",
      render: (value, record) => {
        if (record.id === "new") {
          return `$${getTotal(newItem).toLocaleString()}`;
        }
        return `$${value.toLocaleString()}`;
      },
    },
    {
      title: "",
      key: "actions",
      render: (_, record) => {
        // Normal rows: show Edit & Delete icons
        if (record.id !== "new") {
          return (
            <Space>
              <Button
                icon={<EditOutlined />}
                onClick={() => console.log("Edit", record)}
              />
              <Button
                icon={<DeleteOutlined />}
                danger
                onClick={() => handleDelete(record)}
              />
            </Space>
          );
        }
        // "new" row: show Check & Close icons
        return (
          <Space>
            <Button
              icon={<CheckOutlined />}
              className="text-success"
              onClick={handleAddConfirm}
            />
            <Button icon={<CloseOutlined />} danger onClick={handleAddCancel} />
          </Space>
        );
      },
    },
  ];

  // If we're adding a new row, append a pseudo-row {id: "new"}
  const nonServiceData = data.filter(
    (item) =>
      item.type !== "Per Visit With Chems" &&
      item.type !== "Per Visit Without Chems"
  );
  const serviceData = data.filter(
    (item) =>
      item.type === "Per Visit With Chems" ||
      item.type === "Per Visit Without Chems"
  );

  // If we're adding a new row, append a pseudo-row { id: "new" }
  const tableData = adding
    ? [...nonServiceData, { id: "new" }]
    : nonServiceData;

  // const tableData = adding ? [...data, { id: "new" }] : data;

  return (
    <div className="ww-100">
      <Table
        dataSource={tableData}
        columns={columns}
        rowKey="id"
        pagination={false}
      />

      {/* “Add” Button to toggle the new row */}
      {/* {!adding && (
        <div style={{ textAlign: "center", marginTop: 10 }}>
          <Button
            type="dashed"
            icon={<PlusCircleOutlined />}
            onClick={() => setAdding(true)}
          >
            Add Item
          </Button>
        </div>
      )} */}
    </div>
  );
};

export default EstimateBuilderTable;
