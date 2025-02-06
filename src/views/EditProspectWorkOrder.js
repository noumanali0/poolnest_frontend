import React, { Fragment } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import EditProspectWorkOrderHeader from "../components/EditProspectWorkOrder/EditProspectWorkOrderHeader";
import EditProspectWorkOrderForm from "../components/EditProspectWorkOrder/EditProspectWorkOrderForm";

export default function EditProspectWorkOrder() {
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <div className="addcustomers">
            <EditProspectWorkOrderHeader />
            <EditProspectWorkOrderForm />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
