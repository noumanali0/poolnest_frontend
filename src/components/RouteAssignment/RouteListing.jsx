import React, { Fragment, useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import moment from "moment";
import DragRoute from "./DragRoute";
import NoData from "../NoDataComponent/NoData";

function RouteListing({ data }) {
  const [socketData, setSocketData] = useState(data?.SocketData);
  useEffect(() => {
    setSocketData(data?.SocketData);
  }, [data?.SocketData]);

  function metersToMiles(kilometers) {
    const conversionFactor = 0.621371;
    return kilometers * conversionFactor;
  }

  function secondsToMinutes(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    let formattedTime = "";
    if (days > 0) {
      formattedTime += days + "d ";
    }
    if (hours > 0 || days > 0) {
      formattedTime += hours + "h ";
    }
    formattedTime += minutes + "m";

    return formattedTime.trim();
  }

  const handleTechnicianClick = (item) => {
    data?.setTechniciandata(item);
  };

  const calculatePercentage = (distanceCovered, totalDistance) => {
    const percentage = (distanceCovered / totalDistance) * 100;
    return percentage > 100 ? 100 : percentage;
  };

  const getBackgroundColor = (percentage) => {
    if (percentage < 50) {
      return "#e9ecef";
    } else if (percentage < 80) {
      return "#fab51c";
    } else {
      return "#e9ecef";
    }
  };
  useEffect(() => {
    const updateData = socketData?.data?.find(
      (item) => item?._id == data?.Techniciandata?._id
    );
    data?.setTechniciandata(updateData);
  }, [socketData]);
  return (
    <Fragment>
      <div className="filteraccordian">
        <h3 className="routeH3 newssswswsw">
          {moment(socketData?.givenDate).format("LL")}
        </h3>
        {socketData?.data?.length === 0 ? (
          <NoData message={"No route is created for current date"} />
        ) : (
          socketData?.data?.map((item, i) => (
            <div className="main" key={i}>
              <Accordion defaultActiveKey="0" alwaysOpen>
                <Accordion.Item eventKey={i}>
                  <Accordion.Header onClick={() => handleTechnicianClick(item)}>
                    <div className="row cslocation">
                      <div className="col-sm-12 roueTabsMax">
                        <div className="row">
                          <h2>{item?.first_name}</h2>
                          <div
                            className="tech_color_code"
                            style={{
                              background: `${item?.color_code}`,
                            }}
                          ></div>
                          <span style={{ color: `${item?.color_code}` }}>
                            ({item?.RouteAssignmentTechnician?.length})
                          </span>
                        </div>

                        <div className="row miles">
                          <div className="col-sm-4 roueTabsMaxContent">
                            {metersToMiles(10).toFixed(1)} MILES
                          </div>
                          <div className="col-sm-4 roueTabsMaxContent">
                            {secondsToMinutes(item.totaltime)}
                          </div>
                          <div className="col-sm-4 roueTabsMaxContent">
                            {metersToMiles(item.totaldistance).toFixed(1)} MILES
                          </div>
                        </div>
                        <div className="progress">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            aria-valuenow={calculatePercentage(
                              item.distanceCovered,
                              item.totaldistance
                            )}
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{
                              width: `${calculatePercentage(
                                item.distanceCovered,
                                item.totaldistance
                              )}%`,
                              backgroundColor: getBackgroundColor(
                                calculatePercentage(
                                  item.distanceCovered,
                                  item.totaldistance
                                )
                              ),
                            }}
                          >
                            {`${calculatePercentage(
                              item.distanceCovered,
                              item.totaldistance
                            ).toFixed(1)}%`}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Accordion.Header>

                  <Accordion.Body>
                    <DragRoute data={item?.RouteAssignmentTechnician} />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          ))
        )}
      </div>
    </Fragment>
  );
}

export default RouteListing;
