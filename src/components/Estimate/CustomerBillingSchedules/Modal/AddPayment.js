import React, { useState } from "react";
import { Modal, Select, Input, Button, Form, DatePicker } from "antd";

const { Option } = Select;

const AddPayment = ({ visible, onClose, customers, invoices }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState(null);
  const [reference, setReference] = useState("");
  const [notes, setNotes] = useState("");

  // Filter invoices to show only open ones
  const openInvoices = invoices.filter((invoice) => invoice.status === "open");

  return (
    <Modal
      title={<h4 className="text-center fw-bold">Add Payment</h4>}
      open={visible}
      onCancel={onClose}
      footer={[
        <Button
          key="cancel"
          onClick={onClose}
          className="estimate-builder-greybtn"
        >
          Cancel
        </Button>,
        <Button key="save" type="primary">
          Save
        </Button>,
      ]}
      centered
      width={600}
      className="p-4"
    >
      <Form layout="vertical">
        <div
          className="container"
          style={{
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <div className="row">
            {/* Customer Selection */}
            <div className="col-sm-6">
              <Form.Item label="Customer:" className="fw-bold">
                <Select
                  value={selectedCustomer}
                  onChange={(value) => setSelectedCustomer(value)}
                >
                  <Option value="all">All Customers</Option>
                  {customers.map((customer) => (
                    <Option key={customer.id} value={customer.id}>
                      {customer.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            {/* Invoice Selection */}
            <div className="col-sm-6">
              <Form.Item label="Invoice:" className="fw-bold">
                <Select
                  value={selectedInvoice}
                  onChange={(value) => setSelectedInvoice(value)}
                >
                  {openInvoices.map((invoice) => (
                    <Option key={invoice.id} value={invoice.id}>
                      {invoice.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            {/* Payment Date */}
            <div className="col-sm-6">
              <Form.Item label="Payment Date:" className="fw-bold">
                <DatePicker
                  format="YYYY-MM-DD"
                  value={paymentDate}
                  onChange={(date) => setPaymentDate(date)}
                />
              </Form.Item>
            </div>

            {/* Payment Amount */}
            <div className="col-sm-6">
              <Form.Item label="Payment Amount:" className="fw-bold">
                <Input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                />
              </Form.Item>
            </div>

            {/* Payment Mode */}
            <div className="col-sm-6">
              <Form.Item label="Payment Mode:" className="fw-bold">
                <Select
                  value={paymentMode}
                  onChange={(value) => setPaymentMode(value)}
                >
                  <Option value="Cash">Cash</Option>
                  <Option value="Stripe - Manual">Stripe - Manual</Option>
                  <Option value="QuickBooks">QuickBooks</Option>
                  <Option value="Check">Check</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>
            </div>

            {/* Reference */}
            <div className="col-sm-6">
              <Form.Item label="Reference:" className="fw-bold">
                <Input
                  className="form-control"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                />
              </Form.Item>
            </div>

            {/* Payment Notes */}
            <div className="col-sm-12">
              <Form.Item label="Payment Notes:" className="fw-bold">
                <Input.TextArea
                  className="form-control"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default AddPayment;
