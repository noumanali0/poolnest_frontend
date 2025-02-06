import React, { Fragment } from "react";

import EstimateStatusHeader from "../EstimateStatusHeader";
import CustomerBillingSchedulesFilters from "./CustomerBillingSchedulesFilters";
import CustomerDetails from "./CustomerDetails";
import CustomerSchedulesTable from "./CustomerSchedulesTable";
import PaymentsTable from "./PaymentsTable";
import { EditOutlined } from "@ant-design/icons";

const invoices = [
  {
    date: "12/5/24",
    due: "12/31/24",
    invoiceNumber: "Invoice 5",
    type: "Service",
    description: "Per Month W/ Chems",
    quantity: 100,
    rate: 100,
    tax: 100,
    subtotal: 100,
    chemicals: [], // No chemicals
    totalChemicals: 0,
  },

  {
    date: "10/5/24",
    due: "11/5/24",
    invoiceNumber: "Invoice 2",
    type: "Work Order",
    description: "Filter Cleaning & Skimmer Door",
    quantity: 100,
    rate: 100,
    tax: 150,
    subtotal: 150,
    chemicals: [], // No chemicals
    totalChemicals: 0,
  },
  {
    date: "9/5/24",
    due: "9/5/24",
    invoiceNumber: "Invoice 1",
    type: "Service",
    description: "Per Month Without Chems",
    quantity: 75,
    rate: 172.5,
    tax: 0,
    subtotal: 172.5,
    chemicals: [], // No chemicals
    totalChemicals: 0,
  },
  {
    date: "9/5/24",
    due: "9/5/24",
    invoiceNumber: "Invoice 1",
    type: "Service",
    description: "Per Month Without Chems",
    quantity: 75,
    rate: 172.5,
    subtotal: 172.5,
    chemicals: [
      { name: "Chlorine", quantity: 15, rate: 1, subtotal: 15 },
      { name: "Shock", quantity: 3, rate: 5, subtotal: 15 },
      { name: "Alkalinity", quantity: 12, rate: 0.5, subtotal: 6 },
      { name: "Soda Ash", quantity: 10, rate: 0.75, subtotal: 7.5 },
      { name: "Tabs", quantity: 12, rate: 4.5, subtotal: 54 },
    ],
    totalChemicals: 97.5,
  },
];

const payments = [
  { date: "12/12/24", amount: 100, mode: "Cash", status: "Paid" },
  { date: "12/1/24", amount: 200, mode: "Check: 1234", status: "Failed" },
  { date: "11/5/24", amount: 150, mode: "Stripe: Autopay", status: "Paid" },
  { date: "9/5/24", amount: 172.5, mode: "Stripe: Manual", status: "Paid" },
];

const additionalPayments = [
  { date: "8/5/24", amount: 150, mode: "Stripe: Manual", status: "Paid" },
];

const CustomerBillingSchedulesMain = () => {
  return (
    <Fragment>
      <div className="row position-relative">
        <div className="col-sm-12  ">
          <EstimateStatusHeader />
        </div>
        <div
          className="col-sm-12 "
          style={{
            margin: "20px 0",
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "10px 10px 10px 10px",
          }}
        >
          <div className="col-sm-12 p-0 mb-2">
            <CustomerDetails
              Name={"Customer Name"}
              serviceAddress={"123 Main St.Phoenix, AZ 85014"}
              autoplay={"On"}
            />
          </div>
          <div className="col-sm-12 p-0">
            <CustomerBillingSchedulesFilters />
          </div>
        </div>
        {/* <div className="col-sm-12 p-0 ">
          <div className="row gx-2">
            <div
              className="col-sm-8 g-2"
              style={{
                margin: "20px 0",
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "10px 10px 10px 10px",
              }}
            >
              <CustomerSchedulesTable invoices={invoices} />
            </div>

            <div
              className="col-sm-4 "
              style={{
                margin: "20px 0",
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "10px 10px 10px 10px",
              }}
            >
              <PaymentsTable
                payments={payments}
                additionalPayments={additionalPayments}
              />
            </div>
          </div>
        </div> */}
        <div className="col-sm-12 p-0">
          {/* Wrap your columns inside a row with a horizontal gutter */}
          <div className="row gx-3 align-items-start">
            <div className="col-sm-8">
              <div
                style={{
                  margin: "20px 0",
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  padding: "10px",
                }}
              >
                <CustomerSchedulesTable invoices={invoices} />
              </div>
            </div>

            <div className="col-sm-4">
              <div
                style={{
                  margin: "20px 0",
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  padding: "10px",
                }}
              >
                <PaymentsTable
                  payments={payments}
                  additionalPayments={additionalPayments}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CustomerBillingSchedulesMain;
