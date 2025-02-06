import React, { Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import PaymentAcitivityMain from "../components/Estimate/PaymentAcitivity/PaymentAcitivityMain";
import PaymentAcitivityFilters from "../components/Estimate/PaymentAcitivity/InvoicingFilters";
import InvoicingHeader from "../components/Invoicing/InvoicingHeader";
import EstimateStatusHeader from "../components/Estimate/EstimateStatusHeader";

export default function PaymentAcitivity() {
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content invoiccee">
          <Container fluid>
            <EstimateStatusHeader />
            <PaymentAcitivityFilters />
            <PaymentAcitivityMain />
          </Container>
        </div>
      </div>
    </Fragment>
  );
}
