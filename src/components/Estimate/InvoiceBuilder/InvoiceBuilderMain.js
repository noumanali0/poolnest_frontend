import React from "react";
import { useState } from "react";
import EstimateStatusHeader from "../EstimateStatusHeader";
import InvoiceForm from "./InvoiceForm";
import CustomerInfo from "./CustomerInfo";
import ViewIcon from "../../../../src/assets/Icons/View.svg";

import SendEmail from "../CustomerBillingSchedules/Modal/SendEmail";
import {
  MailOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";

export const customerData = {
  // Basic "customer" info
  contactName: "Customer First & Last",
  serviceAddress: "123 Main St.\nPhoenix, AZ 85014",
  billingAddress: "123 Main St.\nPhoenix, AZ 85014",
  phoneNumber: "623-999-9999",
  email: "customer@email.com",

  company: "Customer First & Last",

  // Invoice metadata
  invoiceNumber: 6,
  invoiceTitle: "Invoice #6",
  status: "Sent",
  invoiceDate: "12/6/24",
  dueDate: "12/31/24",

  // =====================
  // LINE ITEMS (Table)
  // =====================
  items: [
    {
      key: 1,
      type: "Work Order",
      description: "Acid Wash",
      qty: 1,
      rate: 1200,
      tax: 0, // "Tax" column for line item
      total: 1200,
    },
    {
      key: 2,
      type: "Chemicals",
      description: "Chlorine additive",
      qty: 1,
      rate: 100,
      tax: 50, // e.g. extra tax from “Chlorine additive”
      total: 150,
    },
    {
      key: 3,
      type: "Installed Item",
      description: "Motor Rebuild",
      qty: 2,
      rate: 500,
      tax: 0,
      total: 1000,
    },
  ],

  // Totals for the invoice
  subtotal: 2350,
  tax: 50,
  amountDue: 2400,

  // =====================
  // BALANCES (Open / All)
  // =====================
  balances: {
    openInvoices: { sales: 1508, payments: 500, balance: 1008 },
    allInvoices: { sales: 1400, payments: 600, balance: 800 },
  },
  services: [
    { id: 101, description: "Per Visit Without Chems", qty: 20, total: 60 },
    { id: 102, description: "Per Visit Without Chems", qty: 20, total: 60 },
    { id: 103, description: "Per Visit Without Chems", qty: 20, total: 60 },
  ],

  chemicals: [
    { id: 201, name: "Chlorine", qty: 15, rate: 1 },
    { id: 202, name: "Shock", qty: 3, rate: 5 },
    { id: 203, name: "Alkalinity", qty: 12, rate: 0.5 },
    { id: 204, name: "Soda Ash", qty: 10, rate: 0.75 },
    { id: 205, name: "Tabs", qty: 12, rate: 4.5 },
  ],

  // =====================
  // SIDE-PANEL: INVOICES
  // (matching your "12/6/24 Sent #6 $1508" etc.)
  // =====================
  customerInvoicesTitle: "Customer Invoices:",
  invoiceColumns: [
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      // color-coded if needed
    },
    { title: "Invoice #", dataIndex: "invoiceNumber", key: "invoiceNumber" },
    {
      title: "Invoice Total",
      dataIndex: "invoiceTotal",
      key: "invoiceTotal",
    },
    { title: "Due", dataIndex: "due", key: "due" },
  ],
  invoiceData: [
    {
      key: "1",
      date: "12/6/24",
      status: "Sent",
      invoiceNumber: 6,
      invoiceTotal: 1508,
      due: "25 Days",
    },
    {
      key: "2",
      date: "11/5/24",
      status: "Paid",
      invoiceNumber: 3,
      invoiceTotal: 100,
      due: "N/A",
    },
  ],

  // =====================
  // SIDE-PANEL: COMMUNICATION
  // =====================
  communicationTitle: "Communication:",
  communicationColumns: [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Time", dataIndex: "time", key: "time" },
    { title: "Method", dataIndex: "method", key: "method" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Viewed", dataIndex: "viewed", key: "viewed" },
  ],
  communicationData: [
    {
      key: "1",
      date: "12/9/24",
      time: "9:00 am",
      method: "Email",
      status: "Sent",
      viewed: "Not Viewed",
    },
    {
      key: "2",
      date: "12/6/24",
      time: "4:00 pm",
      method: "Email/SMS",
      status: "Sent",
      viewed: "3 Days Ago",
    },
  ],
};

const InvoiceBuilderMain = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [customer, setCustomer] = useState({
    id: 0,
    name: "John Doe",
    billingAddress: "456 Another Rd.\nTempe, AZ 85281",
    serviceAddress: "456 Another Rd.\nTempe, AZ 85281",
    phone: "480-555-1234",
    email: "johndoe@example.com",
    billingMethod: "Cash",
    notes: "Internal notes for John Doe. Lorem ipsum...",
  });
  return (
    <div className="row flex justify-content-center">
      <div className="col d-flex justify-content-end">
        <EstimateStatusHeader />
      </div>
      <SendEmail
        notify={true}
        title="Email - Invoice"
        visible={isModalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
      />
      <div className="col-sm-12 estimate-builder-main ">
        <div className="col-sm-8 estimate-builder-left">
          <div className="d-flex justify-content-end row-gap-3">
            <MailOutlined
              onClick={() => setModalVisible(true)}
              style={{ cursor: "pointer", fontSize: 16 }}
            />
            <EyeOutlined style={{ cursor: "pointer", fontSize: 16 }} />
            <EditOutlined
              style={{ cursor: "pointer", fontSize: 16, paddingLeft: "5px" }}
            />

            <DeleteOutlined
              style={{ cursor: "pointer", fontSize: 16, paddingLeft: "5px" }}
            />
          </div>
          <InvoiceForm title={"Estimate"} customer={customer} />
        </div>
        <div className="col-sm-4 estimate-builder-right ">
          <CustomerInfo customer={customer} setCustomer={setCustomer} />
        </div>
      </div>

      {/* invoice detial pages below */}
      {/* <div className="col-sm-12 estimate-builder-main ">
        <div className="col-sm-8 estimate-builder-left ">
          <InvoiceBuilderForm title={"Invite"} customer={customerData} />
        </div>
        <div className="col-sm-4 estimate-builder-right">
          <InvoiceBuilderCustomerInfo customerData={customerData} />
        </div>
      </div> */}
    </div>
  );
};

export default InvoiceBuilderMain;
