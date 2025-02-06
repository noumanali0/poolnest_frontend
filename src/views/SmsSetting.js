import React, { Fragment, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import SmsHeader from "../components/SmsSetting/SmsHeader";
import SmsData from "../components/SmsSetting/SmsData";
import SmsEmailFields from "../components/SmsSetting/SmsEmailFields";
import { useDispatch } from "react-redux";
import { fetchServiceEmailSettings } from "../redux/Slices/getServiceEmailSettingsData";

export default function AddChecklist() {


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchServiceEmailSettings())
  },[dispatch])
  
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <div className="addcustomers">
            <SmsHeader />
            <div className="row grayshade emailBroadcast smsSetting">
              <div className="col-sm-6 email">
                <SmsData />
              </div>
              <div className="col-sm-6 email">
                <SmsEmailFields />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
