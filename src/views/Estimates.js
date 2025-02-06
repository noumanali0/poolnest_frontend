import React, { Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import EstimateHeader from "../components/Estimate/EstimateHeader";

export default function Estimates() {
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content invoiccee">
          <Container fluid>
            <EstimateHeader />
          </Container>
        </div>
      </div>
    </Fragment>
  );
}
