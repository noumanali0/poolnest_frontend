import React, { Fragment } from "react";
import full_screen_preview from "../../../assets/img/full-screen-preview.svg";
import InvoicingStackedChart from "./InvoicingStackedChart";
import { Typography } from "antd";
import PaymentHitory from "./PaymentHistory";

const { Text, Title } = Typography;

export const paymentData = [
  {
    key: "1",
    date: "12/5/24",
    status: "Paid",
    invoiceNumber: 1,
    customerName: "Customer First & Last",
    invoiceTotal: 100,
    payment: 100,
    mode: "Stripe Autopay",
    paymentDate: "12/5/24",
    refundDate: "",
  },
  {
    key: "2",
    date: "12/2/24",
    status: "Refunded",
    invoiceNumber: 2,
    customerName: "Customer First & Last",
    invoiceTotal: 200,
    payment: 200,
    mode: "Other",
    paymentDate: "12/2/24",
    refundDate: "12/5/24",
  },
  {
    key: "3",
    date: "11/30/24",
    status: "Paid",
    invoiceNumber: 3,
    customerName: "Customer First & Last",
    invoiceTotal: 300,
    payment: 300,
    mode: "QB",
    paymentDate: "11/30/24",
    refundDate: "",
  },
  {
    key: "4",
    date: "10/31/24",
    status: "Overdue",
    invoiceNumber: 4,
    customerName: "Customer First & Last",
    invoiceTotal: 400,
    payment: 200,
    mode: "Cash",
    paymentDate: "5 Days Late",
    refundDate: "",
  },
  {
    key: "5",
    date: "9/30/24",
    status: "Paid",
    invoiceNumber: 5,
    customerName: "Customer First & Last",
    invoiceTotal: 1300,
    payment: 300,
    mode: "Stripe Manual",
    paymentDate: "10/5/24",
    refundDate: "",
  },
  {
    key: "6",
    date: "9/30/24",
    status: "Paid",
    invoiceNumber: 6,
    customerName: "Customer First & Last",
    invoiceTotal: 300,
    payment: 300,
    mode: "Check 1234",
    paymentDate: "10/2/24",
    refundDate: "",
  },
  {
    key: "7",
    date: "9/30/24",
    status: "Credit",
    invoiceNumber: "Credit", // or a numeric ID if you prefer
    customerName: "Customer First & Last",
    invoiceTotal: 400,
    payment: 400,
    mode: "QB",
    paymentDate: "10/2/24",
    refundDate: "",
  },
];

const PaymentAcitivityMain = () => {
  return (
    <Fragment>
      <div className="row position-relative">
        <div
          className="full-screen-preview__header"
          style={{ right: "20px", top: "18px", zIndex: "999999" }}
        >
          <Text type="secondary">Collapse Banner</Text>
          <img src={full_screen_preview} alt="not found" />
        </div>
        <div className="col-sm-12  ">
          <div
            className="d-flex flex-column align-items-center"
            style={{
              margin: "20px 0",
              backgroundColor: "#fff",
              borderRadius: "12px",
              padding: "10px 10px 10px 10px",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Invoice Status
            </h3>
            <div className="w-75 ">
              <InvoicingStackedChart />
            </div>

            <div className="col-sm-8">
              <div class="row">
                <div class="col-3"></div>
                <div class="col-8 d-flex justify-content-center">
                  {" "}
                  <p>
                    <strong>Overdue</strong>
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-3 d-flex justify-content-center">
                  {" "}
                  <p>
                    Current <br /> $12137
                  </p>
                </div>
                <div class="col-8">
                  <div className="d-flex justify-content-between border-top border-secondary">
                    <p>
                      1-15 Days <br /> $1030
                    </p>
                    <p>
                      16-30 Days <br /> $1063
                    </p>
                    <p>
                      31-45 Days <br /> $525
                    </p>
                    <p>
                      Above 45 Days <br /> $2905
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 ">{/* <InvoiceStatus /> */}</div>
        <div
          className="col-sm-12"
          style={{
            margin: "20px 0",
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "10px 10px 10px 10px",
          }}
        >
          <PaymentHitory data={paymentData} />
        </div>
      </div>
    </Fragment>
  );
};

export default PaymentAcitivityMain;
