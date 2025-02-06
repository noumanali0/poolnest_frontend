import React, { Fragment } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import QuickBooksOnlineHeader from "../components/QuickBooksOnline/QuickBooksOnlineHeader";
import QuickBooksOnlineBottom from "../components/QuickBooksOnline/QuickBooksOnlineBottom";
import QuickBooksOnlineInstruction from "../components/QuickBooksOnline/QuickBooksOnlineInstruction";
import QuickBooksOnlineLinks from "../components/QuickBooksOnline/QuickBooksOnlineLinks";

export default function PaymentMethodAccount() {
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          
          <div className="addcustomers integration">
            <div className="row cslocation paymentPage customers">
              <div className="col-sm-12">
                <QuickBooksOnlineHeader />
              </div>
              <div className="col-sm-8 height-adjust">
                <QuickBooksOnlineInstruction />
                <QuickBooksOnlineBottom />
              </div>
              <div className="col-sm-4 height-adjust">
                <QuickBooksOnlineLinks />
              </div>
              {/* <div className="col-sm-6 height-adjust">
                <QuickBooksOnlineBottom />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
