import React, { Fragment, useEffect } from "react";
import { Button } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function PaymentHistoryInvoiceDetail() {
  const navigate = useNavigate();

  const { state } = useLocation();

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}/${day}/${year}`;
  }

  useEffect(() => {
    if (!state) {
      navigate(-1);
    }
  });

  return (
    <Fragment>
      <div className="row cslocation">
        <div className="col-sm-12 invoiceHistoryDet">
          <div className="fullW">
            <p className="privce">
              $ {state?.data?.subtotal / 100} at PoolNest
            </p>
            <p className="cardddetail brandlast4">
              {state?.data?.brand} {state?.data?.last4}
            </p>
            <div className="widrhSix">
              <p className="cardddetail">{formatDate(state?.data?.created)}</p>
              <p className="cardddetail">#{state?.data?.invoiceNumber}</p>
            </div>
          </div>
          <div className="fuwl">
            <div className="widrhSix">
              <table>
                <thead>
                  <tr>
                    <th>Billing Addresss</th>
                    <th></th>
                    <th>Price</th>
                  </tr>
                </thead>

                <tbody>
                  {/* {arr.map((item , key) => (
                                        <tr>
                                            <td>108 x Surcharge for last month: 108 additional locations</td>
                                            <td></td>
                                            <td>$150.00</td>
                                            
                                        </tr>
                                    ))} */}
                  <tr>
                    <td>{state?.data?.metadata?.billing_address}</td>
                    <td></td>
                    <td>${state?.data?.amount}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Subtotal</td>
                    <td>${state?.data?.subtotal / 100}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <b>Total</b>
                    </td>
                    <td>${state?.data?.amount_paid / 100}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="fuwl fot">
            <div className="widrhSix fot">
              <p>
                Have a question or need help ? <span>Send us an email</span> or{" "}
                <span>give us a call at (480) 718-2158</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
