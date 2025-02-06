import React, { Fragment, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar";
import ProspectHeader from "../components/Prospect/ProspectHeader";
import ProspectFilter from "../components/Prospect/ProspectFilter";
import ProspectTable from "../components/Prospect/ProspectTable";
import { useSelector, useDispatch } from "react-redux";
import { fetchgetAllprospect } from "../redux/Slices/getProspect";

export default function Prospect() {
  const [tableData, setTableData] = useState("");
  const dispatch = useDispatch();
  const { data: getAllprospect, statusdata } = useSelector(
    (state) => state.getAllprospect
  );

  useEffect(() => {
    dispatch(fetchgetAllprospect({}));
  }, [dispatch]);

  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <Container fluid>
            <ProspectHeader getAllprospect={getAllprospect} />
            <ProspectFilter />
            <ProspectTable tableData={getAllprospect} />
          </Container>
        </div>
      </div>
    </Fragment>
  );
}
