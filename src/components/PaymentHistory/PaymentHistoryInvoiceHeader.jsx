import React, { Fragment }  from "react";
import { Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";

export default function PaymentHistoryInvoiceHeader() {
    const navigate = useNavigate();
    const handleNav = () => {
        navigate("/payment-history");
    }
  return (
    <Fragment>
        <Breadcrumb
            items={[
                {
                    title: (
                    <h2
                        style={{ cursor: "pointer" }}
                        onClick={handleNav}
                    >
                        Payment History
                    </h2>
                    ),
                },
                {
                    title: (
                    <h2
                        style={{ cursor: "pointer" }}
                    >
                        Invoice
                    </h2>
                    ),
                },
            ]}
        />
    </Fragment>
  );
}
