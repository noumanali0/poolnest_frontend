import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import { Routeassignments } from "../../Data/Data";
import { RightOutlined } from "@ant-design/icons";
import Accordion from "react-bootstrap/Accordion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Button, Card, Dropdown, Menu, Skeleton, Tooltip } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import NoData from "../NoDataComponent/NoData";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { fetchgetWorkOrderRouteApi } from "../../redux/Slices/getWorkOrderRoute";
import {
  DeleteworkOrderBuilder,
  resetData,
} from "../../redux/postReducer/postWorkorder";
import { toast } from "react-toastify";
import Loader from "../NoDataComponent/Loader";
import DeleteModal from "../Modals/DeleteModal";

function Worktabs({ activeServicedashboard }) {
  const { data: WorkOrderRouteApi, statusdata } = useSelector(
    (state) => state.WorkOrderRouteApi
  );
  const { error, success } = useSelector((state) => state.postworkorder);

  const [start_date, setStartDate] = useState(
    moment().startOf("week").format("YYYY-MM-DD")
  );
  const [end_date, setEndDate] = useState(
    moment().endOf("week").format("YYYY-MM-DD")
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState(null);

  function metersToMiles(kilometers) {
    const conversionFactor = 0.621371;
    return kilometers * conversionFactor;
  }

  function secondsToMinutes(seconds) {
    return seconds / 60;
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

  const [modalOpen, setModalOpen] = useState(false);
  const [Id, setId] = useState("");
  const [routeid, setrouteid] = useState("");

  const handleModal = (id, routeid) => {
    console.log(id, routeid);
    setModalOpen(true);
    setId(id);
    setrouteid(routeid);
  };
  const handleEdit = (id, serviceid) => {
    navigate(`/edit-work-order/${id}/${serviceid}`);
  };

  const handleDelete = async (id, routeid1) => {
    console.log(id, routeid1, "id, routeid");
    await dispatch(DeleteworkOrderBuilder({ id, routeid }));
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(fetchgetWorkOrderRouteApi({ start_date, end_date }));
      dispatch(resetData());
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, success]);

  return (
    <Fragment>
      <Row className="cslocation">
        <Col sm={12} className="workOrdertwelve">
          {activeServicedashboard?.data?.length != 0 ? (
            activeServicedashboard?.data?.map((newdata, ind) => {
              return (
                <>
                  {statusdata == "idle" ? (
                    <div className="filteraccordian workTabsss" key={ind}>
                      <div className="main">
                        <div className="">
                          <h3 className="datefilter-h3">
                            <span>
                              {moment(
                                activeServicedashboard?.data[ind]?.Date
                              ).format("LL")}
                            </span>
                          </h3>
                        </div>
                        {newdata?.Data?.map((item, i) => {
                          return (
                            <Accordion
                              activeKey={activeKey}
                              onSelect={(ind) => setActiveKey(ind)}
                            >
                              <Accordion.Item eventKey={item._id + i}>
                                <Accordion.Header>
                                  <div className="row cslocation">
                                    <div className="col-sm-2 yellows roueTabs">
                                      <h2>
                                        <span>WORKORDERS </span>{" "}
                                        {item?.completedWorkOrder} <br />
                                        <span>
                                          out of :{item.TotalWorkOrder}
                                        </span>
                                      </h2>
                                    </div>

                                    <div className="col-sm-10 roueTabsMax">
                                      <div className="row">
                                        <div
                                          className="col-sm-12"
                                          style={{
                                            display: "flex",
                                            paddingLeft: 0,
                                          }}
                                        >
                                          <h2>
                                            {item?.first_name +
                                              " " +
                                              item?.last_name}
                                          </h2>
                                          <div
                                            className="tech_color_code"
                                            style={{
                                              background: `${item?.color_code}`,
                                            }}
                                          ></div>
                                        </div>
                                      </div>

                                      <div className="row miles">
                                        <div className="col-sm-4 roueTabsMaxContent">
                                          {metersToMiles(
                                            item.distanceCovered
                                          ).toFixed(1)}{" "}
                                          MILES
                                        </div>
                                        <div className="col-sm-4 roueTabsMaxContent">
                                          {secondsToMinutes(
                                            item.totaltime
                                          ).toFixed(2)}{" "}
                                          MIN
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
                                            backgroundColor:
                                              getBackgroundColor(),
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
                                  {item?.RouteAssignmentTechnician?.map(
                                    (data) => {
                                      return (
                                        <div className="row cslocation repairWorkOrderr">
                                          <div className="col-sm-4">
                                            <div className="repairSection">
                                              <button className="bluebtn">
                                                {
                                                  data?.RouteAssignmentWorkOrder
                                                    ?.WorkOrderTypeData?.name
                                                }
                                              </button>
                                              <div>
                                                <h6>
                                                  {item?.PaidWorkOrder == 1
                                                    ? "PAID"
                                                    : "UNPAID"}
                                                </h6>
                                              </div>
                                            </div>
                                            <div className="workCustomer">
                                              <h4>
                                                {
                                                  data?.RouteAssignmentWaterBody
                                                    ?.customer_name
                                                }
                                              </h4>
                                              <Tooltip
                                                placement="top"
                                                title={
                                                  data?.RouteAssignmentWaterBody
                                                    ?.service_address
                                                }
                                                className="workORdertootltyp"
                                              >
                                                <Button className="notoverflow">
                                                  {
                                                    data
                                                      ?.RouteAssignmentWaterBody
                                                      ?.service_address
                                                  }
                                                </Button>
                                              </Tooltip>
                                            </div>
                                            <div className="workPool">
                                              <p>
                                                {
                                                  data?.RouteAssignmentWaterBody
                                                    ?.name
                                                }
                                              </p>
                                            </div>
                                            <div className="workStatus">
                                              <p
                                                style={{
                                                  textTransform: "capitalize",
                                                }}
                                              >
                                                {/* Status: {item.status} */}
                                              </p>
                                            </div>
                                          </div>

                                          <div className="col-sm-8">
                                            <div className="workSelect">
                                              <Card>
                                                <p>
                                                  {
                                                    data
                                                      ?.RouteAssignmentWorkOrder
                                                      ?.work_needed
                                                  }
                                                </p>
                                                <p>
                                                  {
                                                    data
                                                      ?.RouteAssignmentFrequency
                                                      ?.name
                                                  }
                                                </p>
                                                <p>
                                                  {
                                                    data
                                                      ?.RouteAssignmentWorkOrder
                                                      ?.WorkOrderTypeData?.name
                                                  }
                                                </p>
                                              </Card>
                                              <div className="col-sm-12 edit-delete-btn">
                                                <div>
                                                  <FaEdit
                                                    onClick={() =>
                                                      handleEdit(
                                                        data?.WorkOrder_id,
                                                        data
                                                          ?.RouteAssignmentWaterBody
                                                          ?.completeserviceid
                                                          ? data
                                                              ?.RouteAssignmentWaterBody
                                                              ?.completeserviceid
                                                          : 1
                                                      )
                                                    }
                                                  />
                                                </div>
                                                <div>
                                                  <MdDelete
                                                    onClick={() =>
                                                      handleModal(
                                                        data?.WorkOrder_id,
                                                        data?._id
                                                      )
                                                    }
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <Loader />
                  )}
                </>
              );
            })
          ) : (
            <div className="nodata_div">
              <h2>No Data Found</h2>
              <p>No workorders scheduled for this week</p>
              <Skeleton />
            </div>
          )}
        </Col>
      </Row>
      <DeleteModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        handleDelete={handleDelete}
        id={Id}
      />
    </Fragment>
  );
}

export default Worktabs;
