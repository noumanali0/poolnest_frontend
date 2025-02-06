import React, { Fragment, useState, useEffect } from "react";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Modal, Tooltip, message } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  DeleterouteAssignmentData,
  EndrouteAssignmwnt,
  UpdaterouteAssignmwntPosition,
  resetData,
} from "../../redux/postReducer/postRouteAssignment";
import ChangeTech from "./ChangeTech";
import EditRouteAssingnment from "./EditRouteAssingnment";
import Modal1 from "react-bootstrap/Modal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { fetchZoomToMap } from "../../redux/Slices/getZoomToMap";
import { useSelector } from "react-redux";
import Loader from "../NoDataComponent/Loader";
import { Link } from "react-router-dom";
import { TiTick } from "react-icons/ti";

const { confirm } = Modal;

function RouteListing({ data }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { data: activeServicedashboard, statusdata } = useSelector(
    (state) => state.activeServicedashboard
  );
  const { loadingswap } = useSelector((state) => state.postrouteAssignment);
  const [showrouteEdit, setShowrouteEdit] = useState(false);
  const handleCloserouteEdit = () => setShowrouteEdit(false);
  const handleShowrouteEdit = () => setShowrouteEdit(true);

  const [active_service_id, setactive_service_id] = useState(false);
  const date1 = localStorage.getItem("date");
  const { data: profileDetail, status } = useSelector(
    (state) => state.profileDetail
  );
  const [idData, setidData] = useState(profileDetail?.data?.rearrange_routes);

  const handleDateChange = (date) => {
    // Create a moment object for the given date
    const momentDate = moment(date);

    // Get the current time in UTC
    const currentTimeUTC = moment.utc().format("HH:mm:ss");

    // Combine the current date with the current time in UTC
    const utcDate = moment(
      momentDate.format("YYYY-MM-DD") + "T" + currentTimeUTC
    ).toISOString();

    return utcDate;
  };
  const id = profileDetail?.data?._id;
  const [items, setItems] = useState([]);
  const [technician_id, setTechId] = useState("");
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    const id = list[startIndex]?._id;

    const Data = {
      date: activeServicedashboard?.abc,
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

  useEffect(() => {
    setidData(profileDetail?.data?.rearrange_routes);
  }, []);

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
    // {
    //   label: "Edit Route Assignments",
    //   key: "6",
    // },
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

    if (selectedItem && selectedItem.label === "End Route Assignments") {
      const service_id = data1._id;
      const Data = {
        end_date: nowDate,
      };

      confirm({
        title: "Are you sure you want to end this route assignment?",
        content: "Once ended, this route assignment will no longer be active.",
        okText: "Yes, end it",
        okType: "danger",
        cancelText: "No, keep it",
        onOk: async () => {
          try {
            await dispatch(EndrouteAssignmwnt({ service_id, Data }));
            dispatch(resetData());
            message.success("Route assignment ended successfully!");
          } catch (error) {
            message.error("Failed to end the route assignment.");
          }
        },
        onCancel() {
          message.info("Route assignment end canceled.");
        },
      });
    }
    if (selectedItem && selectedItem.label === "Delete Route Assignments") {
      const service_id = data1._id;
      const date = activeServicedashboard?.givenDate;

      confirm({
        title: "Are you sure you want to delete this route assignment?",
        content: "This action cannot be undone.",
        okText: "Yes, delete it",
        okType: "danger",
        cancelText: "No, keep it",
        onOk: async () => {
          try {
            await dispatch(DeleterouteAssignmentData({ service_id, date }));
            dispatch(resetData());
            message.success("Route assignment deleted successfully!");
          } catch (error) {
            message.error("Failed to delete the route assignment.");
          }
        },
        onCancel() {
          message.info("Route assignment deletion canceled.");
        },
      });
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
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const meridiem = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format

    // Calculate days and hours
    const totalHours = Math.floor(hours);
    const days = Math.floor(totalHours / 24);
    hours = totalHours % 24;

    const formattedArrivalTime =
      days > 0
        ? `${days} days ${hours}:${
            minutes < 10 ? "0" : ""
          }${minutes} ${meridiem}`
        : `${month < 10 ? "0" : ""}${month}/${
            day < 10 ? "0" : ""
          }${day}/${year} ${formattedHours}:${
            minutes < 10 ? "0" : ""
          }${minutes} ${meridiem}`;

    return formattedArrivalTime;
  }

  return (
    <Fragment>
      {loadingswap ? (
        <Loader />
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
                        <div className="bodyroute row">
                          <div className="col-sm-2 bluebox">
                            <h3>{data?.RouteAssignmentWaterBody?.position}</h3>
                            {data?.RouteAssignmentWaterBody
                              ?.completeserviceid ? (
                              <span className="completeserviceid">
                                <TiTick />
                              </span>
                            ) : null}
                          </div>
                          <div className="col-sm-4 bluebox">
                            <h2>
                              <Link
                                to={`/customerview/${data?.RouteAssignmentWaterBody?.customer_id}`}
                              >
                                {data?.RouteAssignmentWaterBody?.customer_name}
                              </Link>
                            </h2>
                            <Tooltip
                              placement="top"
                              title={
                                data?.RouteAssignmentWaterBody?.service_address
                              }
                              className="dragroute"
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
                              <span>
                                {" "}
                                {moment(data.start_date).format("MM/DD/YYYY")}
                              </span>
                              <span>
                                {" "}
                                {data?.end_date ? (
                                  moment(data.end_date).format("MM/DD/YYYY")
                                ) : (
                                  <>Never End</>
                                )}
                              </span>
                            </p>
                          </div>
                          <div className="col-sm-1 bluebox">
                            <Dropdown
                              overlay={menu(data.active_service_id, data)}
                              placement="bottomLeft"
                              arrow={{ pointAtCenter: true }}
                            >
                              <UnorderedListOutlined
                                style={{
                                  cursor: "pointer",
                                  width: "100%",
                                  padding: "8px",
                                }}
                              />
                            </Dropdown>
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

      <Modal1
        show={show}
        onHide={handleClose}
        animation={false}
        className="taxratemodal taxGrpModal"
      >
        <Modal1.Body>
          Change Tech/Date
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X{" "}
          </Button>
        </Modal1.Body>
        <ChangeTech
          data1={{ handleClose, idData, active_service_id }}
          activeServicedashboard={activeServicedashboard}
        />
      </Modal1>

      <Modal1
        show={showrouteEdit}
        onHide={handleCloserouteEdit}
        animation={false}
        className="taxratemodal taxGrpModal"
      >
        <Modal1.Body>
          Edit Route Assignment
          <Button variant="secondary" onClick={handleCloserouteEdit}>
            {" "}
            X{" "}
          </Button>
        </Modal1.Body>
        <EditRouteAssingnment
          data1={{ handleCloserouteEdit, idData, active_service_id }}
        />
      </Modal1>
    </Fragment>
  );
}

export default RouteListing;
