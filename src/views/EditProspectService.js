import React, { Fragment } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import EditProspectServiceHeader from "../components/EditProspectService/EditProspectServiceHeader";
import EditProspectServiceForm from "../components/EditProspectService/EditProspectServiceForm";

export default function EditProspectService() {
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <div className="addcustomers">
            <EditProspectServiceHeader />
            <EditProspectServiceForm />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
