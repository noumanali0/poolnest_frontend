import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar";
import { Fragment } from "react";
import Routeheader from "../components/RouteAssignment/Routeheader";
import RouteListing from "../components/RouteAssignment/RouteListing";
import RouteSearchFilters from "../components/RouteAssignment/RouteSearchFilters";
import Locationonmap from "../components/RouteAssignment/RoutesMap";
import { fetchactiveServicedashboard } from "../redux/Slices/getActiveServiceRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "../components/NoDataComponent/Loader";
import socket from "../Socket";
import { fetchprofileDetail } from "../redux/Slices/ProfileDetail";
function RouteAssignment() {
  const [routeData, setRouteData] = useState();
  const { data: profileDetail } = useSelector((state) => state.profileDetail);

  const [Techniciandata, setTechniciandata] = useState("");

  const { data: activeServicedashboard, statusdata } = useSelector(
    (state) => state.activeServicedashboard
  );
  const dispatch = useDispatch();

  const id = profileDetail?.data?._id;

  const currentDate = new Date();

  const technician_id = null;
  useEffect(() => {
    const date = currentDate;
    dispatch(fetchactiveServicedashboard({ date, technician_id }));
    dispatch(fetchprofileDetail());
  }, [dispatch]);
  useEffect(() => {
    const room = `${id}/${activeServicedashboard?.givenDate}`;
    socket.emit("JoinRoute", room, (data) => {
      if (data.status === "error") {
        console.error("Error joining room:", data.message);
      } else {
        console.log(data, "JoinRoute ============");
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
            <Routeheader />

            <div className="row grayshade workOrderListsss">
              <div className="col-sm-6 route-filter abc">
                <RouteSearchFilters data={SocketData} id={id} />
                {statusdata == "idle" ? (
                  <>
                    <div className="onTabletDisplay routeMapppppp">
                      <Locationonmap Techniciandata={Techniciandata} />
                    </div>
                    <RouteListing
                      data={{ SocketData, setTechniciandata, Techniciandata }}
                    />
                  </>
                ) : (
                  <Loader />
                )}
              </div>

              <div className="col-sm-6 abc notDisplay">
                <Locationonmap Techniciandata={Techniciandata} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default RouteAssignment;
