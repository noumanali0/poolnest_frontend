import React, { Fragment, useState } from "react";
import { Container } from "react-bootstrap";
import Customersearch from "../components/Customers/Customersearch";
import Customertable from "../components/Customers/Customertable";
import Customerfilter from "../components/Customers/Customerfilter";

import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar";

export default function Customers() {
  const [first_name, setfirst_name] = useState("");

  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <Container fluid>
            <Customersearch />
            <Customerfilter
              first_name={first_name}
              setfirst_name={setfirst_name}
            />
            <Customertable first_name={first_name} />
          </Container>
        </div>
      </div>
    </Fragment>
  );
}
