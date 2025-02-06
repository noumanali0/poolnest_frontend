import React, { Fragment } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar";
import AddProspectWorkOrderHeader from "../components/AddProspectWorkOrder/AddProspectWorkOrderHeader";
import AddProspectWorkOrderForm from "../components/AddProspectWorkOrder/AddProspectWorkOrderForm";

export default function AddProspectWorkOrder() {
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <div className="addcustomers">
            <AddProspectWorkOrderHeader />
            <AddProspectWorkOrderForm />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
