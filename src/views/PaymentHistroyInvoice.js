import React, { Fragment } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import PaymentHistoryInvoiceHeader from "../components/PaymentHistory/PaymentHistoryInvoiceHeader";
import { HiOutlineMail } from "react-icons/hi";
import { FaPrint } from "react-icons/fa6";
import PaymentHistoryInvoiceDetail from "../components/PaymentHistory/PaymentHistoryInvoiceDetail";
import { Button } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendInvoiceRecipt } from "../redux/postReducer/postsendInvoiceRecipt";

export default function PaymentHistroyInvoice() {
  const { state } = useLocation();
  const dispatch = useDispatch();

  const SendMail = async (id) => {
    await dispatch(sendInvoiceRecipt({ id }));
  };

  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <div className="addcustomers">
            <div className="row cslocation paymentHistoryInvoice">
              <div className="col-sm-6 pi">
                <PaymentHistoryInvoiceHeader />
              </div>
              <div className="col-sm-6 pi">
                <div className="buttonForHead">
                  <Button onClick={() => SendMail(state?.data?.id)}>
                    <HiOutlineMail />
                    <p>Send Invoice</p>
                  </Button>

                  <Button
                    disabled={!state?.data?.paymentReciptLink ? true : false}
                  >
                    <a
                      href={state?.data?.paymentReciptLink}
                      target="_blank"
                      className="printinvoice-btn"
                    >
                      <FaPrint />
                      <p>Print Invoice</p>
                    </a>
                  </Button>
                </div>
              </div>
              <div className="col-sm-12">
                <PaymentHistoryInvoiceDetail />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
