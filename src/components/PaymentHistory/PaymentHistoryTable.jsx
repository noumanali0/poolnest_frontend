import React, { Fragment } from "react";
import viewImage from "../../assets/img/Analyze.png";
import { HiOutlineMail } from "react-icons/hi";
import { FaPrint } from "react-icons/fa6";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendInvoiceRecipt } from "../../redux/postReducer/postsendInvoiceRecipt";
import { useSelector } from "react-redux";
import Loader from "../NoDataComponent/Loader";

export default function PaymentHistoryTable({ data }) {
  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}/${day}/${year}`;
  }
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleNavigate = async (data) => {
    await navigate(`/payment-history/${data.id}`, {
      state: {
        data: data,
      },
    });
  };

  const SendMail = async (id) => {
    await dispatch(sendInvoiceRecipt({ id }));
  };

  const { data: getPaymentHistory, statusdata } = useSelector(
    (state) => state.getPaymentHistory
  );

  return (
    <Fragment>
      <div className="routedashboard mainpage customertable">
        <div className="ct-chart" id="chartActivity">
          {statusdata == "idle" ? (
            <table>
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {data?.data?.map((item, key) => (
                  <tr>
                    <td>{item?.status}</td>
                    <td>{formatDate(item?.created)}</td>
                    <td>${item?.amount_paid / 100}</td>
                    <td>
                      <div className="paymentHistoryButtons">
                        <Button onClick={() => handleNavigate(item)}>
                          <img src={viewImage} />
                        </Button>
                        <Button onClick={() => SendMail(item?.id)}>
                          <HiOutlineMail />
                        </Button>
                        <Button disabled={!item?.invoiceNumber ? true : false}>
                          <a href={item?.paymentReciptLink} target="_blank">
                            <FaPrint />
                          </a>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </Fragment>
  );
}
