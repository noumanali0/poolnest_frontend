import React, { Fragment, useState } from "react";
import CustomerView from "../components/CustomerDetail/CustomerView";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";

export default function Profilepage() {
  const [isFieldsDisabled, setIsFieldsDisabled] = useState(true);

  const toggleFields = () => {
    setIsFieldsDisabled((prev) => !prev);
  };

  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <div className="addcustomersdetails editCustomeDetails">
            <CustomerView isFieldsDisabled={isFieldsDisabled} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}