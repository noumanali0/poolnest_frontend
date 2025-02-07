import React, { Fragment, useState, useEffect } from "react";
import { Input, Select, Checkbox, Row, Col } from "antd";

const { Option } = Select;
import { Typography } from "antd";
const { Title, Text } = Typography;

const RowItem = ({
  title,
  value,
  onChange,
  isEnabled,
  handleCheckboxChange,
  dropdownValue,
  onDropdownChange,
}) => {
  return (
    <Row gutter={16} className="d-flex align-items-center pt-4">
      {/* Text Field */}
      <Col>
        <Input
          style={{ width: 100, height: 40 }}
          disabled={!isEnabled}
          value={value}
          onChange={onChange}
        />
      </Col>

      {/* Dropdown */}
      <Col>
        <Select
          disabled={!isEnabled}
          style={{ width: 90 }}
          size="small"
          value={dropdownValue}
          onChange={onDropdownChange}
        >
          <Option value={0.02}>%</Option>

          <Option value={0.05}>$</Option>
        </Select>
      </Col>

      {/* Checkbox */}
      <Col>
        <Checkbox
          checked={isEnabled}
          onChange={handleCheckboxChange}
        ></Checkbox>
      </Col>

      {/* Title Field */}
      <Col>
        <Input
          style={{ width: 120, height: 40 }}
          size="small"
          disabled={!isEnabled}
          placeholder="Title"
          value={title}
          readOnly
        />
      </Col>
      <Col></Col>
    </Row>
  );
};

const InvoiceSettingBilling = ({ data = [] }) => {
  console.log("date", data);
  const [row1Value, setRow1Value] = useState("");
  const [row2Value, setRow2Value] = useState("");
  const [row3Value, setRow3Value] = useState("");

  const [row1Dropdown, setRow1Dropdown] = useState(0.02);
  const [row2Dropdown, setRow2Dropdown] = useState(0.02);
  const [row3Dropdown, setRow3Dropdown] = useState(0.02);

  const [isRow1Enabled, setIsRow1Enabled] = useState(false);
  const [isRow2Enabled, setIsRow2Enabled] = useState(false);
  const [isRow3Enabled, setIsRow3Enabled] = useState(false);

  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [amountDue, setAmountDue] = useState(0);

  // Calculate Subtotal from `data`
  useEffect(() => {
    const calculatedSubtotal = data.reduce((acc, item) => acc + item.total, 0);
    setSubtotal(calculatedSubtotal);
  }, [data]);

  // Calculate Tax, Amount Due, and other values dynamically
  const calculateValues = () => {
    let currentSubtotal = subtotal;

    // Apply Down Payment
    if (isRow1Enabled) {
      const downPayment = parseFloat(row1Value) || 0;
      currentSubtotal -= downPayment * row1Dropdown;
    }

    // Apply Discount
    if (isRow2Enabled) {
      const discount = parseFloat(row2Value) || 0;
      currentSubtotal -= discount * row2Dropdown;
    }

    // Apply Fee
    if (isRow3Enabled) {
      const fee = parseFloat(row3Value) || 0;
      currentSubtotal += fee * row3Dropdown;
    }

    const calculatedTax = currentSubtotal * 0.1; // Assume 10% tax
    const calculatedAmountDue = currentSubtotal + calculatedTax;

    setTax(calculatedTax.toFixed(2));
    setAmountDue(calculatedAmountDue.toFixed(2));
  };

  // Update calculations when state changes
  useEffect(() => {
    calculateValues();
  }, [
    subtotal,
    row1Value,
    row2Value,
    row3Value,
    isRow1Enabled,
    isRow2Enabled,
    isRow3Enabled,
    row1Dropdown,
    row2Dropdown,
    row3Dropdown,
  ]);

  return (
    <Fragment>
      <div className="col-sm-12 pt-3">
        <div className="col pt-4">
          <RowItem
            title="Down Payment"
            value={row1Value}
            onChange={(e) => setRow1Value(e.target.value)}
            isEnabled={isRow1Enabled}
            handleCheckboxChange={(e) => setIsRow1Enabled(e.target.checked)}
            dropdownValue={row1Dropdown}
            onDropdownChange={setRow1Dropdown}
          />
          <RowItem
            title="Discount"
            value={row2Value}
            onChange={(e) => setRow2Value(e.target.value)}
            isEnabled={isRow2Enabled}
            handleCheckboxChange={(e) => setIsRow2Enabled(e.target.checked)}
            dropdownValue={row2Dropdown}
            onDropdownChange={setRow2Dropdown}
          />
          <RowItem
            title="Fee"
            value={row3Value}
            onChange={(e) => setRow3Value(e.target.value)}
            isEnabled={isRow3Enabled}
            handleCheckboxChange={(e) => setIsRow3Enabled(e.target.checked)}
            dropdownValue={row3Dropdown}
            onDropdownChange={setRow3Dropdown}
          />
        </div>

        <div className="col d-flex flex-column align-items-start pt-4">
          <div className="d-flex justify-content-between w-100">
            <Title
              className="p-0 m-0"
              level={5}
              style={{ width: "fit-content" }}
            >
              Subtotal:
            </Title>
            <Text className="p-0 m-0 pl-2">${subtotal.toFixed(2)}</Text>
          </div>
          <div className="d-flex justify-content-between w-100 mt-2">
            <Title
              className="p-0 m-0"
              level={5}
              style={{ width: "fit-content" }}
            >
              Tax:
            </Title>
            <Text className="p-0 m-0 pl-2">$0.00</Text>
          </div>
          <div className="d-flex justify-content-between w-100 mt-2">
            <Title
              className="p-0 m-0"
              level={5}
              style={{ width: "fit-content" }}
            >
              Amount Due:
            </Title>
            <Text className="p-0 m-0 pl-2">${amountDue}</Text>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default InvoiceSettingBilling;
