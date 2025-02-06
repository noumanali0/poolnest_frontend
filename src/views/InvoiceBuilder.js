import React, { Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import InvoiceBuilderMain from "../components/Estimate/InvoiceBuilder/InvoiceBuilderMain";

export default function InvoiceBuilder() {
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content invoiccee">
          <Container fluid>
            <InvoiceBuilderMain />
          </Container>
        </div>
      </div>
    </Fragment>
  );
}
