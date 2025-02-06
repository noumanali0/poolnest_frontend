import React, { Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import EstimateHeader from "../components/Estimate/EstimateHeader";
import Invoicing from "../components/Estimate/Invoicing/Invoicing";

export default function EstimateInvoicing() {
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content invoiccee">
          <Container fluid>
            <Invoicing />
          </Container>
        </div>
      </div>
    </Fragment>
  );
}
