import React, { useState } from "react";
import { Table, Input, Select, Button, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  PlusCircleOutlined,
  CloseOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";

const { Option, OptGroup } = Select;

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

const InvoiceAutopayUpFrontTable = ({ data, setData }) => {
  const [adding, setAdding] = useState(false);

  // "New item" row state
  const [newItem, setNewItem] = useState({
    name: "",
    location: "",
    frequency: 1,
    date: 0,
  });

  // Calculate total
  const getTotal = (item) =>
    Number(item.qty) * Number(item.rate) + Number(item.tax);

  // If user changes the type, auto-prefill the description/rate/tax from our map
  const handleNameChange = (value, option) => {
    const prefills = option.prefills || {};
    setNewItem({
      ...newItem,
      name: value,
      location: prefills.location || "",
      frequency: prefills.frequency || 0,
      date: prefills.date || 0,
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
      title: "Name",
      dataIndex: "name",
      width: 250,
      render: (value, record) => {
        if (record.id === "new") {
          return (
            <Select
              placeholder="Name"
              value={newItem.name}
              onChange={handleNameChange}
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
      title: "Service Location:",
      dataIndex: "location",
      render: (value, record) => {
        if (record.id === "new") {
          return (
            <Input
              placeholder="location"
              value={newItem.location}
              onChange={(e) => handleChange("location", e.target.value)}
              style={{ width: 140 }}
            />
          );
        }
        return value;
      },
    },
    {
      title: "Frequency:",
      dataIndex: "frequency",
      width: 70,
      render: (value, record) => {
        if (record.id === "new") {
          return (
            <Input
              type="frequency"
              value={newItem.frequency}
              onChange={(e) => handleChange("frequency", e.target.value)}
              style={{ width: 60 }}
            />
          );
        }
        return value;
      },
    },
    {
      title: "Billed Date:",
      dataIndex: "date",
      width: 80,
      render: (value, record) => {
        if (record.id === "new") {
          return (
            <Input
              type="date"
              value={newItem.date}
              onChange={(e) => handleChange("date", e.target.value)}
              style={{ width: 80 }}
            />
          );
        }
        return value;
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
                icon={
                  record.add ? (
                    record.add == "plus" ? (
                      <PlusOutlined />
                    ) : (
                      <MinusOutlined />
                    )
                  ) : (
                    <DeleteOutlined />
                  )
                }
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

export default InvoiceAutopayUpFrontTable;
