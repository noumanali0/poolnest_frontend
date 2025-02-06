import React, { Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import EstimateStatusHeader from "../components/Estimate/EstimateStatusHeader";
import CustomerBillingSchedulesMain from "../components/Estimate/CustomerBillingSchedules/CustomerBillingSchedulesMain";

export default function CustomerBillingSchedules() {
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content invoiccee">
          <Container fluid>
            <CustomerBillingSchedulesMain />
          </Container>
        </div>
      </div>
    </Fragment>
  );
}
