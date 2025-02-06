import React, { Fragment, useState } from 'react'
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar"
import ProspecttServiceLocationHeader from '../components/ProspectServiceLocation/ProspecttServiceLocationHeader';
import ProspecttServiceLocation from '../components/ProspectServiceLocation/ProspecttServiceLocation';

export default function ConvertProspect() {
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
            <div className="addcustomers">
              <ProspecttServiceLocationHeader toggleFields={toggleFields} />
              <ProspecttServiceLocation isFieldsDisabled={isFieldsDisabled} />
            </div>
          </div>
        </div>
      </Fragment>
    );
}
