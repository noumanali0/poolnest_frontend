import React from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Alert } from "antd";

export default function InvoicingHeader() {
  const { data: getInvoiceData, statusdata } = useSelector(
    (state) => state.getInvoiceData
  );

  const userProfile = useSelector((state) => state.profileDetail);

  return (
    <Fragment>
      <div className="row customers ">
        <div className="col-sm-12 ">
          <h2>
            Invoicing Report{" "}
            <span>
              <span>{getInvoiceData?.totalCount}</span>
            </span>
          </h2>
          {userProfile?.data?.StripeIntegrated ? (
            <></>
          ) : (
            <Alert
              message="Warning"
              description={
                <>
                  Please check your email and complete your Stripe configuration
                  before continuing or click on the link{" "}
                  <a
                    href={userProfile?.data?.StripeIntegrationUrl}
                    className="linkstyle-css"
                    target="_blank"
                  >
                    here
                  </a>
                  .
                </>
              }
              type="warning"
              showIcon
              // closable
              className="alert-css"
            />
          )}
        </div>
      </div>
    </Fragment>
  );
}
