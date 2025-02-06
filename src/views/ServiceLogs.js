import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar";
import { Fragment } from "react";
import Logsheader from "../components/ServiceLogs/Logsheader";
import Routetabs from "../components/ServiceLogs/Routetabs";
import { fetchactiveServicedashboard } from "../redux/Slices/getActiveServiceRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import GoogleMap from "../components/RouteAssignment/GoogleMap";
import Loader from "../components/NoDataComponent/Loader";
import socket from "../Socket";
import { fetchprofileDetail } from "../redux/Slices/ProfileDetail";

function ServiceLogs() {
  const { data: activeServicedashboard, statusdata } = useSelector(
    (state) => state.activeServicedashboard
  );
  const { data: profileDetail } = useSelector((state) => state.profileDetail);

  const [saveData, setSaveData] = useState();
  const [routeData, setRouteData] = useState();

  const dispatch = useDispatch();
  const currentDate = new Date();

  const technician_id = null;

  useEffect(() => {
    const date = currentDate;
    dispatch(fetchactiveServicedashboard({ date, technician_id }));
    dispatch(fetchprofileDetail());
  }, [dispatch]);

  useEffect(() => {
    setSaveData();
  }, [activeServicedashboard]);

  const id = profileDetail?.data?._id;
  useEffect(() => {
    const room = `${id}/${activeServicedashboard?.givenDate}`;
    socket.emit("JoinRoute", room, (data) => {
      if (data.status === "error") {
      } else {
      }
    });

    socket.on("routeAssignment", (socketData) => {
      setRouteData(socketData);
      console.log("Received route assignment:", socketData);
    });
  }, [id, activeServicedashboard]);

  const SocketData = routeData?.data ? routeData : activeServicedashboard;

  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />

        <div className="content">
          <div className="addcustomers">
            <Logsheader />

            {statusdata === "loading" ? (
              <Loader />
            ) : (
              <div className="row grayshade workOrderListsss">
                <div className="col-sm-6 abc noPAdd">
                  <Routetabs
                    MapData={{ SocketData, setSaveData, saveData }}
                    id={id}
                  />
                </div>
                <div className="col-sm-6 abc notDisplay">
                  <GoogleMap MapData={saveData} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ServiceLogs;
