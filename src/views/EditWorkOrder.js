import React, { Fragment, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar";
import EditWorkHeader from "../components/EditWorkOrder/EditWorkHeader";
import EditWorkForm from "../components/EditWorkOrder/EditWorkForm";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchgetSingleWorkOrderDetail } from "../redux/Slices/getSingleWorkOrder";


export default function EditWorkOrder() {
  const { pathname } = useLocation();
  const dispatch = useDispatch()


  const url = pathname;

  // Split the URL by "/"
  const parts = url.split("/");

  // Extract the IDs from the parts
  const id = parts[parts.length - 2];
  const seerviceid = parts[parts.length - 1];


  const {data: getSingleWorkOrder , status} = useSelector((state) => state.getSingleWorkOrder);
  
  useEffect(() => {
    dispatch(fetchgetSingleWorkOrderDetail({id, seerviceid}))
  },[dispatch, id])



  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel works">
        <AdminNav />
        <div className="content">
          <div className="addcustomers">
            <EditWorkHeader />
            <EditWorkForm state={getSingleWorkOrder} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
