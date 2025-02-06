import React from "react";
import { Fragment, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Accordion from "react-bootstrap/Accordion";
import moment from "moment";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import DateFilter from "./DateFilter";
import NoData from "../NoDataComponent/NoData";
import Locationonmap from "../RouteAssignment/Locationonmap";
import { useSelector } from "react-redux";
import DragRoute from "./DragRoute";

function Routetabs({ MapData, id }) {
  const { data: activeServicedashboard, statusdata } = useSelector(
    (state) => state.activeServicedashboard
  );

  const [socketData, setSocketData] = useState(MapData?.SocketData?.data);

  useEffect(() => {
    setSocketData(MapData?.SocketData?.data);
  }, [MapData?.SocketData]);

  const data = MapData?.SocketData?.data;

  const dispatch = useDispatch();
  const [Dates, setDates] = useState([]);
  const [activeKey, setActiveKey] = useState(null);

  function metersToMiles(kilometers) {
    const conversionFactor = 0.621371;
    return kilometers * conversionFactor;
  }

  function secondsToMinutes(seconds) {
    const days = Math.floor(seconds / 86400); // Calculate days (1 day = 86400 seconds)
    const hours = Math.floor((seconds % 86400) / 3600); // Calculate remaining hours
    const minutes = Math.floor((seconds % 3600) / 60); // Calculate remaining minutes

    let formattedTime = "";
    if (days > 0) {
      formattedTime += days + "d ";
    }
    if (hours > 0 || days > 0) {
      formattedTime += hours + "h ";
    }
    formattedTime += minutes + "m";

    return formattedTime.trim(); // Trim any trailing spaces
  }

  const calculatePercentage = (distanceCovered, totalDistance) => {
    const percentage = (distanceCovered / totalDistance) * 100;
    return percentage > 100 ? 100 : percentage; // Ensure it doesn't exceed 100%
  };

  const getBackgroundColor = () => {
    const percentage = calculatePercentage();
    if (percentage < 50) {
      return "#e9ecef"; // Set a color for the first half
    } else if (percentage < 80) {
      return "#fab51c"; // Set a color for the second half
    } else {
      return "#e9ecef"; // Set a color for the last part
    }
  };

  const GetDates = () => {
    var start = new Date();
    var end = new Date(start);

    end.setDate(start.getDate() + 3);
    let Dates = [];

    var loop = new Date(start);

    for (let i = 0; i < 7; i++) {
      if (i == 0) {
        var newDates = loop.setDate(loop.getDate() + i);
        loop = new Date(newDates);
        Dates.push(moment(loop).format("YYYY-MM-DD"));
      } else {
        var newDates = loop.setDate(loop.getDate() - 1);
        loop = new Date(newDates);
        Dates.push(moment(loop).format("YYYY-MM-DD"));
      }
    }

    setDates(Dates.reverse());
    return Dates;
  };

  useEffect(() => {
    GetDates();
  }, []);

  console.log(MapData, "MapData");

  useEffect(() => {
    const updateData = socketData?.find(
      (item) => item?._id == MapData?.saveData?._id
    );
    MapData?.setSaveData(updateData);
  }, [socketData]);

  return (
    <Fragment>
      <Tab.Container id="left-tabs-example" defaultActiveKey="1">
        <DateFilter data={MapData} id={id} />
        <div className="onTabletDisplay workOrderMap">
          <Locationonmap />
        </div>

        <Row className="cslocation">
          <Col sm={12}>
            <Tab.Content>
              <Tab.Pane>
                <div className="filteraccordian">
                  <h3 className="routeH3">
                    {moment(activeServicedashboard?.givenDate).format("LL")}
                  </h3>

                  {socketData?.length === 0 ? (
                    <NoData />
                  ) : (
                    socketData?.map((item, i) => {
                      return (
                        <div className="main">
                          <Accordion
                            activeKey={activeKey}
                            onSelect={(i) => setActiveKey(i)}
                          >
                            <Accordion.Item eventKey={i}>
                              <Accordion.Header
                                onClick={() => MapData?.setSaveData(item)}
                              >
                                <div className="row cslocation">
                                  <div className="col-sm-2 white roueTabs">
                                    <h2>
                                      <span>POOL </span> {item.completedPools}{" "}
                                      <br />
                                      <span>OUT OF {item?.TotalPools}</span>
                                    </h2>
                                  </div>
                                  <div className="col-sm-2 yellows roueTabs">
                                    <h2>
                                      <span>WORKORDERS </span>{" "}
                                      {item.completedWorkOrder} <br />
                                      <span>OUT OF {item.TotalWorkOrder}</span>
                                    </h2>
                                  </div>
                                  <div className="col-sm-2 gray roueTabs">
                                    <h2>
                                      <span>SKIPPED </span> {item.skippedcount}
                                      <br />
                                      <span> OUT OF {item.TotalPools}</span>
                                    </h2>
                                  </div>
                                  <div className="col-sm-6 roueTabsMax">
                                    <div className="row">
                                      <h2>{item?.first_name}</h2>
                                      <div
                                        className="tech_color_code"
                                        style={{
                                          background: `${item?.color_code}`,
                                        }}
                                      ></div>
                                    </div>

                                    <div className="row miles">
                                      <div className="col-sm-4 roueTabsMaxContent">
                                        {metersToMiles(
                                          item.distanceCovered
                                        ).toFixed(1)}{" "}
                                        MILES
                                      </div>
                                      <div className="col-sm-4 roueTabsMaxContent">
                                        {secondsToMinutes(item.totaltime)}
                                      </div>
                                      <div className="col-sm-4 roueTabsMaxContent">
                                        {metersToMiles(
                                          item.totaldistance
                                        ).toFixed(1)}{" "}
                                        MILES
                                      </div>
                                    </div>
                                    <div className="progress">
                                      <div
                                        className="progress-bar"
                                        role="progressbar"
                                        aria-valuenow={calculatePercentage()}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        style={{
                                          width: `${calculatePercentage(
                                            item.distanceCovered,
                                            item.totaldistance
                                          )}%`,
                                          backgroundColor: getBackgroundColor(),
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
                                <DragRoute
                                  data={item?.RouteAssignmentTechnician}
                                />
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </div>
                      );
                    })
                  )}
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Fragment>
  );
}

export default Routetabs;
