import React, { Fragment, useEffect, useState } from "react";
import CustomerView from "../components/CustomerDetail/CustomerView";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import ProspectDetail from "../components/ProspectView/ProspectDetail";
import { useParams } from "react-router-dom";
import { fetchgetAllprospectSingle } from "../redux/Slices/getProspect";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import NoData from "../components/NoDataComponent/Loader";

export default function ProspectView() {
  // const [isFieldsDisabled, setIsFieldsDisabled] = useState(true);

  // const toggleFields = () => {
  //     setIsFieldsDisabled((prev) => !prev);
  // };
  const { data: getAllprospect, loading } = useSelector(
    (state) => state.getAllprospect
  );

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchgetAllprospectSingle({ id }));
  }, [dispatch]);

  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <div className="addcustomersdetails editCustomeDetails">
            {loading ? <NoData /> : <ProspectDetail data={getAllprospect} />}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
