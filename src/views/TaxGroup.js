import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import TaxGrouptable from "../components/TaxGroup/TaxGrouptable";
import TaxRatetable from "../components/TaxGroup/TaxRatetable";

export default function TaxGroup() {
  return (
    <Fragment>
      <Sidebar routes={routes} /> 
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <Container fluid>
            <div className="row cslocation taxGroupMainPage">
              <div className="col-sm-6 height-adjust">
                <TaxGrouptable />
                </div>
              <div className="col-sm-6 height-adjust">
                 <TaxRatetable />
                 </div>
            </div>
            
           
          </Container>
        </div>
      </div>
    </Fragment>
  );
}
