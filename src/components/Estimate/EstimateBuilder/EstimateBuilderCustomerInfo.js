import React, { useEffect, useState } from "react";
import { Select, Card, Input, Button, Row, Col, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

const customers = [
  {
    id: 2,
    name: "John Doe",
    billingAddress: "456 Another Rd.\nTempe, AZ 85281",
    serviceAddress: "456 Another Rd.\nTempe, AZ 85281",
    phone: "480-555-1234",
    email: "johndoe@example.com",
    billingMethod: "Cash",
    notes: "Internal notes for John Doe. Lorem ipsum...",
  },
  {
    id: 3,
    name: "Jane Smith",
    billingAddress: "789 Third St.\nScottsdale, AZ 85251",
    serviceAddress: "789 Third St.\nScottsdale, AZ 85251",
    phone: "602-888-7777",
    email: "jane@example.com",
    billingMethod: "Check",
    notes: "Jane’s notes here...",
  },
];

const EstimateBuilderCustomerInfo = ({ customer, setCustomer }) => {
  // Track which customer is selected
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  // Track editing state for notes
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  // Keep local copy of notes in case user cancels
  const [localNotes, setLocalNotes] = useState("");

  // The currently selected customer object or null
  const selectedCustomer = customers.find(
    (cust) => cust.id === selectedCustomerId
  );

  useEffect(() => {
    setCustomer(selectedCustomer);
  }, [selectedCustomer]);

  // When user selects from the dropdown:
  const handleSelectCustomer = (customerId) => {
    setSelectedCustomerId(customerId);
    // Reset notes editing if we switched customers
    setIsEditingNotes(false);
    // Update local notes to the new customer's notes
    const found = customers.find((c) => c.id === customerId);
    setLocalNotes(found ? found.notes : "");
  };

  // Start editing notes
  const handleEditNotes = () => {
    setIsEditingNotes(true);
  };

  // Cancel editing
  const handleCancelNotes = () => {
    // Revert localNotes to whichever is in the selected customer
    setLocalNotes(selectedCustomer ? selectedCustomer.notes : "");
    setIsEditingNotes(false);
  };

  // Save the edited notes back into the "customers" array (in a real app you’d do an API call)
  const handleSaveNotes = () => {
    if (!selectedCustomer) return;
    selectedCustomer.notes = localNotes; // In a real app, you'd likely copy array + setState
    setIsEditingNotes(false);
  };

  return (
    <div className="pt-3">
      {/* 1) Customer dropdown */}
      <div className="d-flex justify-content-between align-items-center">
        <Select
          showSearch
          placeholder="Type to search customer..."
          style={{ width: 300 }}
          onChange={handleSelectCustomer}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
          value={selectedCustomerId || undefined}
        >
          {customers.map((cust) => (
            <Option key={cust.id} value={cust.id}>
              {cust.name}
            </Option>
          ))}
        </Select>
        <Text>Billing Address</Text>
      </div>

      {/* 2) Customer Info Card */}
      {selectedCustomer ? (
        <Card
          style={{
            backgroundColor: "#FFF",
            padding: "25px 0px 0px 0px",
            marginTop: "15px",
          }}
        >
          {/* Row 1: Contact (on the left) */}
          <Row>
            <Col span={24}>
              <Title level={5} className="m-0">
                Contact:
              </Title>
              <Text>{selectedCustomer.name}</Text>
            </Col>
          </Row>

          {/* Row 2: Billing Address (left), Service Address (right) */}
          <Row style={{ marginTop: "2rem" }}>
            <Col span={12}>
              <Title level={5} className="m-0">
                Billing Address:
              </Title>
              <Text style={{ whiteSpace: "pre-line" }}>
                {selectedCustomer.billingAddress}
              </Text>
            </Col>
            <Col span={12}>
              <Title level={5} className="m-0">
                Service Address:
              </Title>
              <Text style={{ whiteSpace: "pre-line" }}>
                {selectedCustomer.serviceAddress}
              </Text>
            </Col>
          </Row>

          {/* Row 3: Phone Number (left), Email (right) */}
          <Row style={{ marginTop: "2rem" }}>
            <Col span={12}>
              <Title level={5} className="m-0">
                Phone Number:
              </Title>
              <Text>{selectedCustomer.phone}</Text>
            </Col>
            <Col span={12}>
              <Title level={5} className="m-0">
                Email:
              </Title>
              <Text>{selectedCustomer.email}</Text>
            </Col>
          </Row>
        </Card>
      ) : (
        <div
          style={{
            margin: "20px 0",
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "10px 10px 10px 10px",
          }}
        >
          <Text type="secondary">No customer selected</Text>
        </div>
      )}

      {/* 3) Internal Notes section */}
      <div
        className="pt-2"
        style={{
          margin: "20px 0",
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "10px 10px 10px 10px",
        }}
      >
        <Title
          level={5}
          style={{ marginBottom: 8 }}
          className="d-flex justify-content-between align-center"
        >
          Internal Notes:
          {!isEditingNotes && selectedCustomer && (
            <Button
              icon={<EditOutlined />}
              type="text"
              onClick={handleEditNotes}
            />
          )}
        </Title>
        <Card style={{ backgroundColor: "#ddd", minHeight: 120 }}>
          {/* If editing, show text area + buttons */}
          {isEditingNotes && selectedCustomer ? (
            <>
              <TextArea
                rows={4}
                value={localNotes}
                onChange={(e) => setLocalNotes(e.target.value)}
              />
              <div
                className="pt-2 d-flex justify-content-end"
                style={{ gap: "15px" }}
              >
                <button
                  onClick={handleCancelNotes}
                  className="esimate-build-form-cancelbtn text-dark"
                >
                  Cancel
                </button>
                <button
                  className="esimate-build-form-savebtn text-dark"
                  onClick={handleSaveNotes}
                >
                  Save
                </button>
              </div>
            </>
          ) : (
            // Otherwise show read‐only notes
            <div>
              <Text style={{ whiteSpace: "pre-line" }}>
                {selectedCustomer ? selectedCustomer.notes : ""}
              </Text>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default EstimateBuilderCustomerInfo;
