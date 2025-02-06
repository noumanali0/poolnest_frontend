import React, { Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import EstimateBuilderMain from "../components/Estimate/EstimateBuilder/EstimateBuilderMain";

export default function EstimateBuilder() {
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content invoiccee">
          <Container fluid>
            <EstimateBuilderMain />
          </Container>
        </div>
      </div>
    </Fragment>
  );
}
