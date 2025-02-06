import React, { Fragment, useState, useEffect } from "react";
// import { UnorderedListOutlined } from "@ant-design/icons";
import { Button, Menu, Tooltip } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  DeleterouteAssignmentData,
  EndrouteAssignmwnt,
  UpdaterouteAssignmwntPosition,
  resetData,
} from "../../redux/postReducer/postRouteAssignment";
import { fetchactiveServicedashboard } from "../../redux/Slices/getActiveServiceRoute";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { fetchZoomToMap } from "../../redux/Slices/getZoomToMap";
import { useSelector } from "react-redux";
import { fetchgetRouteAssingnmentSingle } from "../../redux/Slices/getRouteAssignment";
import socket from "../../Socket";
import { Link } from "react-router-dom";
import { CaretRightOutlined } from "@ant-design/icons";
import { io } from "socket.io-client";
import NoData from "../NoDataComponent/Loader";
import { TiTick } from "react-icons/ti";

function RouteListing({ data }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { data: activeServicedashboard, statusdata } = useSelector(
    (state) => state.activeServicedashboard
  );

  const { data: postrouteAssignment, loadingswap } = useSelector(
    (state) => state.postrouteAssignment
  );

  const [showrouteEdit, setShowrouteEdit] = useState(false);
  const handleCloserouteEdit = () => setShowrouteEdit(false);
  const handleShowrouteEdit = () => setShowrouteEdit(true);

  const [active_service_id, setactive_service_id] = useState(false);
  const date1 = localStorage.getItem("date");
  const { data: profileDetail, status } = useSelector(
    (state) => state.profileDetail
  );
  const [idData, setidData] = useState(profileDetail?.data?.rearrange_routes);

  const id = profileDetail?.data?._id;
  const [items, setItems] = useState([]);
  const [technician_id, setTechId] = useState("");
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    const id = list[startIndex]?._id;
    const date = activeServicedashboard?.abc;
    const Data = {
      date: date,
      Position: endIndex + 1,
      PreviousValue: startIndex + 1,
      id: id,
    };

    dispatch(UpdaterouteAssignmwntPosition({ Data, id }));
    // dispatch(
    //   fetchactiveServicedashboard({
    //     date: activeServicedashboard?.abc,
    //     technician_id,
    //   })
    // );

    return result;
  };

  // useEffect(() => {
  //   setidData(profileDetail?.data?.rearrange_routes);
  //   const room = `${id}/${moment(date1).utc().format("YYYY-MM-DD")}`;
  //   socket.emit("createRoom", room);
  //   socket.on("RouteSwap", (data) => {
  //     console.log(data, "============>");
  //     setRouteData(data);
  //   });
  // }, [reorder]);

  useEffect(() => {
    setItems(data);
  }, [data]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(reorderedItems);
  };

  const dispatch = useDispatch();

  const items1 = [
    {
      label: "Zoom on Map",
      key: "1",
    },
    {
      label: "Move to Different Day/Tech",
      key: "3",
    },
    {
      label: "End Route Assignments",
      key: "5",
    },
    {
      label: "Edit Route Assignments",
      key: "6",
    },
    {
      label: "Delete Route Assignments",
      key: "7",
    },
  ];

  const nowDate = new Date();

  const handleClick = async (e, data, data1) => {
    const selectedItem = items1.find((item) => item.key === e.key);

    let id = data1?._id;
    if (selectedItem && selectedItem.label === "Zoom on Map") {
      dispatch(fetchZoomToMap({ id }));
    }
    if (selectedItem && selectedItem.label === "Move to Different Day/Tech") {
      setactive_service_id(data1);
      handleShow();
    }
    if (selectedItem && selectedItem.label === "Edit Route Assignments") {
      setactive_service_id(data1);
      const id = data1._id;
      dispatch(fetchgetRouteAssingnmentSingle({ id }));
      handleShowrouteEdit();
    }

    if (selectedItem && selectedItem.label === "End Route Assignments") {
      const service_id = data1._id;
      const Data = {
        end_date: nowDate,
      };
      let date = localStorage.getItem("date");
      await dispatch(EndrouteAssignmwnt({ service_id, Data }));
      dispatch(resetData());
      dispatch(fetchactiveServicedashboard({ date, technician_id }));
    }
    if (selectedItem && selectedItem.label === "Delete Route Assignments") {
      const service_id = data1._id;
      let date = localStorage.getItem("date");

      await dispatch(DeleterouteAssignmentData({ service_id }));
      dispatch(resetData());
      dispatch(fetchactiveServicedashboard({ date, technician_id }));
    }
  };
  const menu = (serviceDataId, data) => (
    <Menu>
      {items1.map((item) => (
        <Menu.Item
          key={item.key}
          onClick={(e) => handleClick(e, serviceDataId, data)}
        >
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  function formatArrivalTime(arrivalTime) {
    const date = new Date(arrivalTime);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const year = date.getFullYear() % 100; // Get last two digits of the year
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const meridiem = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedArrivalTime = `${month < 10 ? "0" : ""}${month}/${
      day < 10 ? "0" : ""
    }${day}/${year} ${formattedHours}:${minutes < 10 ? "0" : ""}${minutes}`;
    return formattedArrivalTime;
  }

  // useEffect(() => {
  //   const socket = io(`${process.env.REACT_APP_API_URL}`, {
  //     autoConnect: true,
  //   });
  //   socket.on("JoinRoute", () => {
  //     socket.on("JoinRoute", (message) => {
  //       const socketData = {
  //         data: data,
  //         givenDate: date1,
  //       };
  //       socket.emit("routeAssignment", socketData);
  //       console.log("routeAssignment event emitted:", socketData);
  //     });
  //     socket.on("RouteSwap", (data) => {
  //       console.log(data, "============>");
  //       setRouteData(data);
  //     });
  //   });

  //   return () => {
  //     socket.off("RouteSwap");
  //     socket.disconnect();
  //   };
  // }, [data, date1]);

  return (
    <Fragment>
      {loadingswap ? (
        <NoData />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {items?.map((data, index) => (
                  <Draggable
                    key={data._id}
                    draggableId={data._id}
                    index={index}
                    isDragDisabled={!idData}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="bodyroute row nnewwwwBoddyRoute">
                          <div className="col-sm-2 bluebox">
                            <h3>{data?.RouteAssignmentWaterBody?.position}</h3>
                            {data?.RouteAssignmentWaterBody
                              ?.completeserviceid ? (
                              <span className="completeserviceid">
                                <TiTick />
                              </span>
                            ) : null}
                            <span
                              className={`${
                                !data?.ProspectConverted
                                  ? "overlay-workorder"
                                  : "overlay-workorder-1"
                              }`}
                            >
                              {data?.RouteAssignmentWaterBody?.RouteSkip ==
                              null ? (
                                <></>
                              ) : (
                                <p>Skipped</p>
                              )}
                              {data?.WorkOrder_id == null ? (
                                <p>
                                  {data?.ProspectConverted
                                    ? "PROSPECT-SR"
                                    : null}
                                </p>
                              ) : (
                                <p>
                                  {data?.ProspectConverted
                                    ? "PROSPECT-WO"
                                    : "workorder"}
                                </p>
                              )}
                            </span>
                          </div>
                          <div className="col-sm-4 bluebox">
                            <h2>
                              {data?.RouteAssignmentWaterBody?.customer_name}
                            </h2>
                            <Tooltip
                              placement="top"
                              title={
                                data?.RouteAssignmentWaterBody?.service_address
                              }
                              className="serviceLoggg"
                            >
                              <Button className="notoverflow">
                                {
                                  data?.RouteAssignmentWaterBody
                                    ?.service_address
                                }
                              </Button>
                            </Tooltip>
                          </div>
                          <div className="col-sm-2 bluebox">
                            <div className="arrivalTimecss">
                              <p>Arrival Time</p>
                              <p>{formatArrivalTime(data?.arrivalTime)}</p>
                            </div>
                          </div>
                          <div className="col-sm-3 bluebox">
                            <p>
                              <h4>{data?.RouteAssignmentWaterBody?.name}</h4>
                              {/* <span>
                                {" "}
                                {moment(data.start_date).format("DD/MM/YYYY")}
                              </span>
                              <span>
                                {" "}
                                {data?.is_never_ending === false ? (
                                  moment(data.stop_date).format("DD/MM/YYYY")
                                ) : (
                                  <>Never End</>
                                )}
                              </span> */}
                              <span>
                                {
                                  data?.RouteAssignmentWorkOrder
                                    ?.WorkOrderTypeData?.name
                                }
                              </span>
                            </p>
                          </div>
                          <div className="col-sm-1">
                            {data?.RouteAssignmentWaterBody
                              ?.completeserviceid ? (
                              <Link
                                to={`/service-log/${data?.RouteAssignmentWaterBody?.completeserviceid}`}
                              >
                                {" "}
                                <CaretRightOutlined />
                              </Link>
                            ) : (
                              <Link to={`/service-log-workorder/${data?._id}`}>
                                <CaretRightOutlined />
                              </Link>
                            )}
                            {/* {data?.RouteAssignmentWaterBody?.RouteSkip ==
                            null ? (
                              <></>
                            ) : (
                              <p>Skipped</p>
                            )}
                            {data?.WorkOrder_id == null ? (
                              <></>
                            ) : (
                              <p>WORKORDERS</p>
                            )} */}
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </Fragment>
  );
}

export default RouteListing;
