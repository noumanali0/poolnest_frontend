import React, { Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import LabourReportsearch from "../components/LabourReports/LabourRebortsearch";
import LabourReportstable from "../components/LabourReports/LabourServiceReporttable";
import LabourReportsfilter from "../components/LabourReports/LabourReportilter";
import LabourWorkOrderfilter from "../components/LabourReports/LabourWorkorderfilter.jsx";
import LabourSkippedfilter from "../components/LabourReports/LabourSkippedfilter.jsx";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import { useState } from "react";
import SkippedTable from "../components/LabourReports/SkippedTable.jsx";
import WorkOrderTable from "../components/LabourReports/WorkOrderTable";
import WorkOrderHeader from "../components/LabourReports/WorkOrderHeader";
import { useSelector } from "react-redux";


export default function LabourReports() {
  const [value, setValue] = useState("Service");



  

  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <Container fluid>
            <LabourReportsearch />
            
            <LabourReportsfilter setValue={setValue} />
              <LabourReportstable/>
          </Container>
        </div>
      </div>
    </Fragment>
  );
}
