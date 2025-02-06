import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Import useHistory
import { useDispatch, useSelector } from "react-redux";
import {
  fetchgetSingleCustomers,
  STATUSES,
} from "../../redux/Slices/getSingleCustomer";
import { useParams } from "react-router-dom";
import { Button, Skeleton, message } from "antd";
import { Modal } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import Loader from "../NoDataComponent/Loader";
import moment from "moment";
import { FaPlus } from "react-icons/fa";
import DeleteModal from "../Modals/DeleteModal";
import { deleteCustomerData } from "../../redux/postReducer/postCustomer";
import RouteAssignmentModal from "./RouteAssignmentModal";
import WorkorderModal from "./WorkorderModal";
import EditRouteAssignmentModal from "./EditRouteAssignmentModal";
import EditWorkOrderModal from "./EditWorkOrder";

export default function Profile({ isFieldsDisabled }) {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [showEdit, setShowEdit] = useState(false);
  const [EditData, setEditData] = useState("");
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = async (data) => {
    setShowEdit(true);
    await setEditData(data);
  };

  const [serviceIndex, setserviceIndex] = useState(0);
  const [routeIndex, setrouteIndex] = useState(0);

  const [waterbodyid, setWaterbodyid] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setWaterbodyid(e);
    setShow(true);
  };

  const [showEditWorkOrder, setShowEditWorkOrder] = useState(false);
  const [EditDataWorkOrder, setEditDataWorkOrder] = useState("");
  const handleCloseEditWorkOrder = () => setShowEditWorkOrder(false);
  const handleShowEditWorkOrder = (data) => {
    console.log(data, "data");
    setShowEditWorkOrder(true);
    setEditDataWorkOrder(data);
  };

  const [showWorkOrder, setShowWorkOrder] = useState(false);
  const handleCloseWorkOrder = () => setShowWorkOrder(false);
  const handleShowWorkOrder = (e) => {
    setWaterbodyid(e);
    setShowWorkOrder(true);
  };

  const handleServiceTab = (e) => {
    setrouteIndex(0);
    setserviceIndex(e);
  };

  const { data: getSingleCustomer, status } = useSelector(
    (state) => state.getSingleCustomer
  );

  useEffect(() => {
    window.scroll(0, 0);
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchgetSingleCustomers({ id }));
  }, [dispatch, id]);

  const navigate = useNavigate(); // Initialize useHistory

  const NavigateCustomer = () => {
    navigate(`/edit-customer/${id}`);
  };

  const NavigateServiceLocation = () => {
    navigate(`/edit-service-location/${id}`);
  };

  const NavigatePool = (ids) => {
    navigate(`/pool/${id}/${ids}`);
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [Id, setId] = useState("");

  const handleDelete = async (id) => {
    await dispatch(deleteCustomerData({ id }));
    toast.success("Customer Deleted Successfully");
    navigate(-1);
  };

  const handleModal = (id) => {
    setModalOpen(true);
    setId(id);
  };
  if (status === STATUSES.LOADING) {
    return <Loader />;
  }

  if (status === STATUSES.ERROR) {
    return (
      <h2
        style={{
          margin: "100px",
        }}
      >
        Something went wrong!
      </h2>
    );
  }

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}/${day}/${year}`;
  }

  const handlePool = (ids) => {
    navigate(`/customer-addpools/${id}/${ids}`);
  };

  const handleService = () => {
    navigate(`/customer-servicelocation/${id}`);
  };

  const WorkOrderHistory = (id) => {
    navigate(`/customer-workorder-history/${id}`);
  };

  const ServiceHistory = (id) => {
    navigate(`/customer-service-history/${id}`);
  };

  const handleCustomer = () => {
    navigate(`/addcustomer`);
  };
  const handleInvoice = () => {
    navigate(`/invoice`);
  };

  function getAbbreviatedMonthName(dateString) {
    const date = new Date(dateString);
    const monthName = date.toLocaleString("default", { month: "short" });
    return monthName;
  }

  const timeOptions = [
    { id: 0, label: "0 minute", value: 0 },
    { id: 1, label: "10 minutes", value: 0.166 },
    { id: 2, label: "15 minutes", value: 0.25 },
    { id: 3, label: "30 minutes", value: 0.5 },
    { id: 4, label: "1 hour", value: 1 },
    { id: 5, label: "2 hours", value: 2 },
  ];

  function getTimeLabel(inputValue) {
    const option = timeOptions.find((option) => option.value === inputValue);
    return option ? option.label : "Invalid value";
  }

  const handleMsgRoute = () => {
    message.error("Please Add Waterbody First");
  };

  return (
    <Fragment>
      <div className="row">
        <h3 className="customer-name-head-css">
          {getSingleCustomer?.first_name + " " + getSingleCustomer?.last_name}
        </h3>

        <div className="row customerdetail">
          <div className="col-sm-12"></div>
          <div className="col-sm-6">
            <h5 className="Customer-h5">Customer Info</h5>
            <div className="addviewbtn-icon">
              <FaPlus className="addviewbtn" onClick={() => handleCustomer()} />
            </div>
            <div className="row CustomerInfo activebody-21">
              <div className="col-sm-10">
                <div className="row">
                  <div className="col-sm-6">Name</div>
                  <div className="col-sm-6">
                    {getSingleCustomer?.first_name +
                      " " +
                      getSingleCustomer?.last_name}
                  </div>
                  <div className="col-sm-6">Email</div>
                  <div className="col-sm-6">
                    <a href={`mailto:={getSingleCustomer?.email}`}>
                      {getSingleCustomer?.email}
                    </a>
                  </div>
                  <div className="col-sm-6">Phone No</div>
                  <div className="col-sm-6">
                    {getSingleCustomer?.mobile_no_primary}
                  </div>
                  <div className="col-sm-6">Address</div>
                  <div className="col-sm-6">
                    {getSingleCustomer?.address
                      ? getSingleCustomer?.address
                      : "No Address"}
                  </div>
                  {/* <div className="col-sm-6">Zip Code</div> */}
                  {/* <div className="col-sm-6">{getSingleCustomer?.zipcode}</div> */}
                  <div className="col-sm-6">Customer Since</div>
                  <div className="col-sm-6">
                    {formatDate(getSingleCustomer?.createdAt)}
                  </div>
                </div>
              </div>
              <div className="col-sm-2 editbtn">
                <FaEdit onClick={() => NavigateCustomer()} />
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <h5 className="Customer-h5">Invoice/Billing</h5>
            <div className="addviewbtn-icon">
              <FaPlus className="addviewbtn" onClick={() => handleInvoice()} />
            </div>
            <div className="row cslocation">
              <div className="col-sm-12 invoice-data">
                <div className="row newinvoiceborder cslocation head">
                  <div className="col-sm-3 newinvoicecss">Date </div>
                  <div className="col-sm-3 newinvoicecss">Invoice Number </div>
                  <div className="col-sm-2 newinvoicecss">Type </div>
                  <div className="col-sm-2 newinvoicecss">Price </div>
                  <div className="col-sm-2 newinvoicecss">Status </div>
                </div>
                {getSingleCustomer?.CustomerServiceLocation &&
                getSingleCustomer?.CompletedServiceRoutesCustomerId?.length !==
                  0 ? (
                  getSingleCustomer?.CustomerServiceLocation &&
                  getSingleCustomer?.CompletedServiceRoutesCustomerId?.map(
                    (item, i) => {
                      return (
                        <div className="row newinvoiceborder cslocation">
                          <div className="col-sm-3 newinvoicecss">
                            {formatDate(item?.ServiceDate)}
                          </div>
                          <div className="col-sm-3 newinvoicecss">
                            {/* {getAbbreviatedMonthName(item?.ServiceDate)} */}
                          </div>
                          <div className="col-sm-2 newinvoicecss">
                            {item?.WorkOrder ? "Work Order" : "Service"}
                          </div>
                          <div className="col-sm-2 newinvoicecss">
                            ${item?.LaborCost}
                          </div>
                          <div className="col-sm-2 newinvoicecss">
                            {item?.PaidStatus ? "Paid" : "Pending"}
                          </div>
                        </div>
                      );
                    }
                  )
                ) : (
                  <Skeleton
                    avatar
                    paragraph={{
                      rows: 4,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row servicedetail">
          <div className="col-sm-12">
            <h5 className="Customer-h5"> Service Location</h5>

            <div className="addviewbtn-icon">
              <FaPlus className="addviewbtn" onClick={() => handleService()} />
            </div>

            <div className="forPAddingServiceLocation">
              <Swiper
                // slidesPerView={3}
                spaceBetween={15}
                loop={true}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper servLocation newwServlocation"
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                  },
                  // when window width is >= 575px
                  575: {
                    slidesPerView: 2,
                  },
                  // when window width is >= 991px
                  1100: {
                    slidesPerView: 3,
                  },
                }}
              >
                {[
                  ...Array(
                    getSingleCustomer?.CustomerServiceLocation &&
                      getSingleCustomer?.CustomerServiceLocation?.length
                  ),
                ].map((_, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className={
                        serviceIndex == index
                          ? "row servicedetail-card actice-service-1"
                          : "row servicedetail-card"
                      }
                      onClick={() => handleServiceTab(index)}
                    >
                      <div className="col-sm-3">Name</div>
                      <div className="col-sm-7">
                        {getSingleCustomer?.CustomerServiceLocation &&
                          getSingleCustomer?.CustomerServiceLocation[index]
                            ?.name}
                      </div>
                      <div className="col-sm-2">
                        {" "}
                        {serviceIndex == index ? (
                          <FaEdit onClick={() => NavigateServiceLocation()} />
                        ) : (
                          <></>
                        )}
                      </div>

                      <div className="col-sm-3">Address</div>
                      <div className="col-sm-7">
                        {getSingleCustomer?.CustomerServiceLocation &&
                          getSingleCustomer?.CustomerServiceLocation[index]
                            ?.address}
                      </div>

                      <div className="col-sm-6">SMS Arrival</div>
                      <div className="col-sm-6">
                        {getTimeLabel(
                          getSingleCustomer?.CustomerServiceLocation &&
                            getSingleCustomer?.CustomerServiceLocation[index]
                              ?.notify_sms_Time
                        )}
                      </div>
                      <div className="col-sm-6">SMS Completion</div>
                      <div className="col-sm-6">
                        {getTimeLabel(
                          getSingleCustomer?.CustomerServiceLocation &&
                            getSingleCustomer?.CustomerServiceLocation[index]
                              ?.notify_work_completion_sms_Time
                        )}
                      </div>
                      <div className="col-sm-6">Email Arrival</div>
                      <div className="col-sm-6">
                        {getTimeLabel(
                          getSingleCustomer?.CustomerServiceLocation &&
                            getSingleCustomer?.CustomerServiceLocation[index]
                              ?.notify_email_Time
                            ? getSingleCustomer?.CustomerServiceLocation &&
                                getSingleCustomer?.CustomerServiceLocation[
                                  index
                                ]?.notify_email_Time
                            : 0
                        )}
                      </div>
                      <div className="col-sm-6">Email Completion</div>
                      <div className="col-sm-6">
                        {getTimeLabel(
                          getSingleCustomer?.CustomerServiceLocation &&
                            getSingleCustomer?.CustomerServiceLocation[index]
                              ?.notify_work_completion_email_Time
                            ? getSingleCustomer?.CustomerServiceLocation &&
                                getSingleCustomer?.CustomerServiceLocation[
                                  index
                                ]?.notify_work_completion_email_Time
                            : 0
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
        <div className="row servicedetail">
          <div className="col-sm-12 befoer">
            <div className="row cslocation">
              <div className="col-sm-4 routeAssignmentOnDesktop">
                <h5 className="Customer-h5">Water Bodies </h5>
                <div className="addviewbtn-icon">
                  <FaPlus
                    className="addviewbtn"
                    onClick={() =>
                      handlePool(
                        getSingleCustomer?.CustomerServiceLocation[serviceIndex]
                          ._id
                      )
                    }
                  />
                </div>
                {getSingleCustomer?.CustomerServiceLocation &&
                getSingleCustomer?.CustomerServiceLocation[serviceIndex]
                  ?.RouteAssignmentServiceLocation ? (
                  <>
                    {getSingleCustomer?.CustomerServiceLocation[
                      serviceIndex
                    ]?.RouteAssignmentServiceLocation.map((item, key) => (
                      <div
                        className={
                          routeIndex == key
                            ? "row waterbody-sm activebody-21"
                            : "row waterbody-sm"
                        }
                        key={key}
                        onClick={() => setrouteIndex(key)}
                      >
                        <div className="col-sm-5">Name</div>
                        <div className="col-sm-5">{item?.name}</div>
                        <div className="col-sm-2">
                          {routeIndex == key ? (
                            <FaEdit
                              onClick={() =>
                                NavigatePool(
                                  getSingleCustomer?.CustomerServiceLocation[
                                    serviceIndex
                                  ]._id
                                )
                              }
                            />
                          ) : (
                            <></>
                          )}
                        </div>

                        <div className="col-sm-5">Rate Type</div>
                        <div className="col-sm-5">
                          {item?.RateTypeDetail?.label}
                        </div>

                        <div className="col-sm-5">Assigned Route</div>
                        <div className="col-sm-5">
                          {item?.RouteAssignmentWaterBody?.length}
                        </div>

                        <div className="col-sm-5">Work Order</div>
                        <div className="col-sm-5">
                          {item?.WorkOrderCompleted}
                        </div>

                        <div className="col-sm-5">
                          <button
                            className="historybtn"
                            onClick={() => WorkOrderHistory(item._id)}
                            disabled={
                              item?.WorkOrderCompleted == 0 ? true : false
                            }
                          >
                            Work Order History
                          </button>
                        </div>
                        <div className="col-sm-5">
                          <button
                            className="historybtn"
                            onClick={() => ServiceHistory(item._id)}
                            disabled={
                              item?.ServicesCompleted == 0 ? true : false
                            }
                          >
                            Service History
                          </button>
                        </div>
                      </div>
                    ))}
                    {/* Ensure a minimum of 3 cards */}
                    {/* {Array.from({
                      length: Math.max(
                        0,
                        getSingleCustomer?.CustomerServiceLocation[serviceIndex]
                          ?.RouteAssignmentServiceLocation.length == 0
                          ? 3
                          : getSingleCustomer?.CustomerServiceLocation[
                              serviceIndex
                            ]?.RouteAssignmentServiceLocation.length +
                              1 -
                              getSingleCustomer?.CustomerServiceLocation[
                                serviceIndex
                              ]?.RouteAssignmentServiceLocation.length
                      ),
                    }).map((_, index) => (
                      <div
                        className={
                          index === 0
                            ? "row waterbody-sm with-button"
                            : "row waterbody-sm"
                        }
                        key={`empty-card-${index}`}
                      >
                        <Skeleton
                          avatar
                          paragraph={{
                            rows: 4,
                          }}
                        />
                       
                      </div>
                    ))} */}
                  </>
                ) : (
                  // Display at least 3 empty cards when the array is empty
                  <>
                    {/* {Array.from({ length: 1 }).map((_, index) => (
                      <div
                        className={
                          index === 0
                            ? "row waterbody-sm with-button"
                            : "row waterbody-sm"
                        }
                        key={`empty-card-${index}`}
                      >
                        <Skeleton
                          avatar
                          paragraph={{
                            rows: 4,
                          }}
                        />
                      </div>
                    ))} */}
                  </>
                )}
              </div>

              <div className="col-sm-4 routeAssignmentOnMobile">
                <h5 className="Customer-h5">Water Bodies </h5>
                {getSingleCustomer?.CustomerServiceLocation &&
                getSingleCustomer?.CustomerServiceLocation[serviceIndex]
                  ?.RouteAssignmentServiceLocation ? (
                  <>
                    <Swiper
                      slidesPerView={1}
                      spaceBetween={30}
                      loop={false}
                      navigation={true}
                      modules={[Navigation]}
                      className="mySwiper waterBodies"
                    >
                      {getSingleCustomer?.CustomerServiceLocation[
                        serviceIndex
                      ]?.RouteAssignmentServiceLocation.map((item, key) => (
                        <SwiperSlide>
                          <div
                            className={
                              routeIndex == key
                                ? "row waterbody-sm activebody-21"
                                : "row waterbody-sm"
                            }
                            key={key}
                            onClick={() => setrouteIndex(key)}
                          >
                            <div className="col-sm-5">Name</div>
                            <div className="col-sm-5">{item?.name}</div>
                            <div className="col-sm-2">
                              {routeIndex == key ? (
                                <FaEdit
                                  onClick={() =>
                                    NavigatePool(
                                      getSingleCustomer
                                        ?.CustomerServiceLocation[serviceIndex]
                                        ._id
                                    )
                                  }
                                />
                              ) : (
                                <></>
                              )}
                            </div>

                            <div className="col-sm-5">Rate Type</div>
                            <div className="col-sm-5">
                              {item?.RateTypeDetail?.label}
                            </div>

                            <div className="col-sm-5">Assigned Route</div>
                            <div className="col-sm-5">
                              {item?.RouteAssignmentWaterBody?.length}
                            </div>

                            <div className="col-sm-5">Work Order</div>
                            <div className="col-sm-5">
                              {item?.WorkOrderCompleted}
                            </div>

                            <div className="col-sm-5">
                              <button
                                className="historybtn"
                                onClick={() => WorkOrderHistory(item._id)}
                                disabled={
                                  item?.WorkOrderCompleted == 0 ? true : false
                                }
                              >
                                Work Order History
                              </button>
                            </div>
                            <div className="col-sm-5">
                              <button
                                className="historybtn"
                                onClick={() => ServiceHistory(item._id)}
                                disabled={
                                  item?.ServicesCompleted == 0 ? true : false
                                }
                              >
                                Service History
                              </button>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                      {/* Ensure a minimum of 3 cards */}
                      {Array.from({
                        length: Math.max(
                          0,
                          getSingleCustomer?.CustomerServiceLocation[
                            serviceIndex
                          ]?.RouteAssignmentServiceLocation.length == 0
                            ? 1
                            : getSingleCustomer?.CustomerServiceLocation[
                                serviceIndex
                              ]?.RouteAssignmentServiceLocation.length +
                                1 -
                                getSingleCustomer?.CustomerServiceLocation[
                                  serviceIndex
                                ]?.RouteAssignmentServiceLocation.length
                        ),
                      }).map((_, index) => (
                        <SwiperSlide>
                          <div
                            className={
                              index === 0
                                ? "row waterbody-sm with-button"
                                : "row waterbody-sm"
                            }
                            key={`empty-card-${index}`}
                          >
                            <Skeleton
                              avatar
                              paragraph={{
                                rows: 4,
                              }}
                            />
                            {index === 0 && (
                              <button
                                className="addviewbtn"
                                onClick={() =>
                                  handlePool(
                                    getSingleCustomer?.CustomerServiceLocation[
                                      serviceIndex
                                    ]._id
                                  )
                                }
                              >
                                Add New Pool
                              </button>
                            )}
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </>
                ) : (
                  // Display at least 3 empty cards when the array is empty
                  <>
                    <Swiper
                      spaceBetween={30}
                      loop={false}
                      slidesPerView={1}
                      navigation={true}
                      modules={[Navigation]}
                      className="mySwiper waterBodies"
                    >
                      {Array.from({ length: 3 }).map((_, index) => (
                        <SwiperSlide>
                          <div
                            className={
                              index === 0
                                ? "row waterbody-sm with-button"
                                : "row waterbody-sm"
                            }
                            key={`empty-card-${index}`}
                          >
                            <Skeleton
                              avatar
                              paragraph={{
                                rows: 4,
                              }}
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </>
                )}
              </div>

              <div className="col-sm-4 routeAssignmentOnDesktop">
                <h5 className="Customer-h5">Route Assignment</h5>
                <div className="addviewbtn-icon">
                  {getSingleCustomer?.CustomerServiceLocation &&
                  getSingleCustomer?.CustomerServiceLocation[serviceIndex]
                    ?.RouteAssignmentServiceLocation[routeIndex]?._id ? (
                    <FaPlus
                      className="addviewbtn"
                      onClick={() =>
                        handleShow(
                          getSingleCustomer?.CustomerServiceLocation[
                            serviceIndex
                          ]?.RouteAssignmentServiceLocation[routeIndex]?._id
                        )
                      }
                      style={{
                        color: "#000",
                      }}
                    />
                  ) : (
                    <FaPlus className="addviewbtn" onClick={handleMsgRoute} />
                  )}
                </div>
                {getSingleCustomer?.CustomerServiceLocation &&
                getSingleCustomer?.CustomerServiceLocation ? (
                  <>
                    {getSingleCustomer?.CustomerServiceLocation &&
                    getSingleCustomer?.CustomerServiceLocation[serviceIndex]
                      ?.RouteAssignmentServiceLocation?.length !== 0 ? (
                      getSingleCustomer?.CustomerServiceLocation &&
                      getSingleCustomer?.CustomerServiceLocation[serviceIndex]
                        ?.RouteAssignmentServiceLocation[routeIndex]
                        .RouteAssignmentWaterBody &&
                      getSingleCustomer?.CustomerServiceLocation &&
                      getSingleCustomer?.CustomerServiceLocation[
                        serviceIndex
                      ]?.RouteAssignmentServiceLocation[
                        routeIndex
                      ].RouteAssignmentWaterBody?.map((item, key) => (
                        <div
                          className="row waterbody-sm activebody-21 newdata-css-12"
                          key={key}
                          // onClick={() => setrouteIndex(key)}
                        >
                          <div className="col-sm-5">Tech Name</div>
                          <div className="col-sm-5">
                            {item?.RouteAssignmentTechnician?.first_name +
                              " " +
                              item?.RouteAssignmentTechnician?.last_name}
                          </div>
                          <div className="col-sm-2">
                            <FaEdit onClick={() => handleShowEdit(item)} />
                          </div>
                          <div className="col-sm-5">Day of week</div>
                          <div className="col-sm-5">{item?.assigned_date}</div>
                          <div className="col-sm-5">Frequency</div>
                          <div className="col-sm-5">
                            {item?.RouteAssignmentFrequency?.label}
                          </div>
                          <div className="col-sm-5">Start/End</div>
                          <div className="col-sm-5">
                            {formatDate(item?.start_date)} /{" "}
                            {item?.end_date
                              ? formatDate(item?.end_date)
                              : "No End"}
                          </div>
                          <div className="col-sm-5">Services Completed</div>
                          <div className="col-sm-5">
                            {item?.ServicesCompleted}
                          </div>

                          <div className="col-sm-5">Work Order Completed</div>
                          <div className="col-sm-5">
                            {item?.WorkOrderCompleted}
                          </div>
                          {/* <div className="col-sm-5">
                          <button className="historybtn" disabled={item?.WorkOrderCompleted == 0 ? true : false}>Work Order History</button>
                        </div>
                        <div className="col-sm-5">
                        <button className="historybtn" disabled={item?.ServicesCompleted == 0 ? true : false}>Service History</button>
                        </div> */}
                        </div>
                      ))
                    ) : (
                      <></>
                    )}
                    {/* {Array.from({
                      length: Math.max(
                        0,
                        1 -
                          (getSingleCustomer?.CustomerServiceLocation[
                            serviceIndex
                          ]?.RouteAssignmentServiceLocation[routeIndex]
                            ?.WaterBodyData?.length || 0)
                      ),
                    }).map((_, index) => (
                      <div
                        className="row waterbody-sm"
                        key={`empty-card-${index}`}
                      >
                        <Skeleton
                          avatar
                          paragraph={{
                            rows: 4,
                          }}
                        />
                      </div>
                    ))} */}
                  </>
                ) : (
                  <></>
                )}
              </div>

              <div className="col-sm-4 routeAssignmentOnMobile">
                <h5 className="Customer-h5">Route Assignment</h5>

                {getSingleCustomer?.CustomerServiceLocation ? (
                  <>
                    <Swiper
                      slidesPerView={1}
                      spaceBetween={30}
                      loop={false}
                      navigation={true}
                      modules={[Navigation]}
                      className="mySwiper RouteAssignment"
                    >
                      {getSingleCustomer?.CustomerServiceLocation[serviceIndex]
                        ?.RouteAssignmentServiceLocation?.length !== 0 ? (
                        getSingleCustomer?.CustomerServiceLocation[serviceIndex]
                          ?.RouteAssignmentServiceLocation[routeIndex]
                          .RouteAssignmentWaterBody &&
                        getSingleCustomer?.CustomerServiceLocation[
                          serviceIndex
                        ]?.RouteAssignmentServiceLocation[
                          routeIndex
                        ].RouteAssignmentWaterBody?.map((item, key) => (
                          <SwiperSlide>
                            <div
                              className="row waterbody-sm activebody-21 newdata-css-12"
                              key={key}
                              // onClick={() => setrouteIndex(key)}
                            >
                              <div className="col-sm-5">Tech Name</div>
                              <div className="col-sm-5">
                                {item?.RouteAssignmentTechnician?.first_name +
                                  " " +
                                  item?.RouteAssignmentTechnician?.last_name}
                              </div>
                              <div className="col-sm-2">
                                <FaEdit onClick={(e) => handleShowEdit(item)} />
                              </div>
                              <div className="col-sm-5">Day of week</div>
                              <div className="col-sm-5">
                                {item?.assigned_date}
                              </div>
                              <div className="col-sm-5">Frequency</div>
                              <div className="col-sm-5">
                                {item?.RouteAssignmentFrequency?.label}
                              </div>
                              <div className="col-sm-5">Start/End</div>
                              <div className="col-sm-5">
                                {formatDate(item?.start_date)}/
                                {item?.end_date
                                  ? formatDate(item?.end_date)
                                  : "No End"}
                              </div>
                              <div className="col-sm-5">Services Completed</div>
                              <div className="col-sm-5">
                                {item?.ServicesCompleted}
                              </div>

                              <div className="col-sm-5">
                                Work Order Completed
                              </div>
                              <div className="col-sm-5">
                                {item?.WorkOrderCompleted}
                              </div>
                              {/* <div className="col-sm-5">
                          <button className="historybtn" disabled={item?.WorkOrderCompleted == 0 ? true : false}>Work Order History</button>
                        </div>
                        <div className="col-sm-5">
                        <button className="historybtn" disabled={item?.ServicesCompleted == 0 ? true : false}>Service History</button>
                        </div> */}
                            </div>
                          </SwiperSlide>
                        ))
                      ) : (
                        <></>
                      )}
                      {/* {Array.from({
                        length: Math.max(
                          0,
                          1 -
                            (getSingleCustomer?.CustomerServiceLocation[
                              serviceIndex
                            ]?.RouteAssignmentServiceLocation[routeIndex]
                              ?.WaterBodyData?.length || 0)
                        ),
                      }).map((_, index) => (
                        <SwiperSlide>
                          <div
                            className="row waterbody-sm"
                            key={`empty-card-${index}`}
                          >
                            <Skeleton
                              avatar
                              paragraph={{
                                rows: 4,
                              }}
                            />
                          </div>
                        </SwiperSlide>
                      ))} */}
                    </Swiper>
                  </>
                ) : (
                  <></>
                )}
              </div>

              <div className="col-sm-4 routeAssignmentOnDesktop">
                <h5 className="Customer-h5">Work Orders</h5>
                <div className="addviewbtn-icon">
                  {getSingleCustomer?.CustomerServiceLocation &&
                  getSingleCustomer?.CustomerServiceLocation[serviceIndex]
                    ?.RouteAssignmentServiceLocation[routeIndex]?._id ? (
                    <div className="flex">
                      <div>
                        <FaPlus
                          className="addviewbtn"
                          onClick={() =>
                            handleShowWorkOrder(
                              getSingleCustomer?.CustomerServiceLocation[
                                serviceIndex
                              ]?.RouteAssignmentServiceLocation[routeIndex]?._id
                            )
                          }
                          style={{
                            color: "#000",
                          }}
                        />
                      </div>

                      <Button
                        className="wbtn newflex"
                        block
                        onClick={() =>
                          WorkOrderHistory(
                            getSingleCustomer?.CustomerServiceLocation[
                              serviceIndex
                            ]?.RouteAssignmentServiceLocation[routeIndex]?._id
                          )
                        }
                      >
                        Past Workorder
                      </Button>
                    </div>
                  ) : (
                    <FaPlus className="addviewbtn" onClick={handleMsgRoute} />
                  )}
                </div>
                {getSingleCustomer?.CustomerServiceLocation ? (
                  <>
                    {getSingleCustomer?.CustomerServiceLocation[serviceIndex]
                      ?.RouteAssignmentServiceLocation?.length !== 0 ? (
                      getSingleCustomer?.CustomerServiceLocation[
                        serviceIndex
                      ]?.RouteAssignmentServiceLocation[
                        routeIndex
                      ].WaterBodyData?.map((item, key) => (
                        <div
                          className="row waterbody-sm activebody-21 newdata-css-12"
                          key={key}
                          // onClick={() => setrouteIndex(key)}
                        >
                          <div className="col-sm-5">Tech Name</div>
                          <div className="col-sm-5">
                            {item?.TechnicianData?.first_name +
                              " " +
                              item?.TechnicianData?.last_name}
                          </div>
                          <div className="col-sm-2">
                            <FaEdit
                              onClick={() => handleShowEditWorkOrder(item)}
                            />
                          </div>

                          <div className="col-sm-5">Work Order Type</div>
                          <div className="col-sm-5">
                            {item?.WorkOrderTypeData?.name}
                          </div>

                          <div className="col-sm-5">Date</div>
                          <div className="col-sm-5">
                            {formatDate(item?.service_date)}
                          </div>

                          <div className="col-sm-5">Status</div>
                          <div className="col-sm-5">
                            {item?.labor_cost_paid ? "Completed" : "Pending"}
                          </div>
                        </div>
                      ))
                    ) : (
                      <></>
                    )}
                    {/* {Array.from({
                      length: Math.max(
                        0,
                        1 -
                          (getSingleCustomer?.CustomerServiceLocation[
                            serviceIndex
                          ]?.RouteAssignmentServiceLocation[routeIndex]
                            ?.WaterBodyData?.length || 0)
                      ),
                    }).map((_, index) => (
                      <div
                        className="row waterbody-sm"
                        key={`empty-card-${index}`}
                      >
                        <Skeleton
                          avatar
                          paragraph={{
                            rows: 4,
                          }}
                        />
                      </div>
                    ))} */}
                  </>
                ) : (
                  <></>
                )}
              </div>

              <div className="col-sm-4 routeAssignmentOnMobile">
                <h5 className="Customer-h5">Work Orders</h5>
                {getSingleCustomer?.CustomerServiceLocation ? (
                  <>
                    <Swiper
                      slidesPerView={1}
                      spaceBetween={30}
                      loop={false}
                      navigation={true}
                      modules={[Navigation]}
                      className="mySwiper WorkOrders"
                    >
                      {getSingleCustomer?.CustomerServiceLocation &&
                      getSingleCustomer?.CustomerServiceLocation[serviceIndex]
                        ?.RouteAssignmentServiceLocation?.length !== 0 ? (
                        getSingleCustomer?.CustomerServiceLocation[
                          serviceIndex
                        ]?.RouteAssignmentServiceLocation[
                          routeIndex
                        ].WaterBodyData?.map((item, key) => (
                          <SwiperSlide>
                            <div
                              className="row waterbody-sm activebody-21"
                              key={key}
                              // onClick={() => setrouteIndex(key)}
                            >
                              <div className="col-sm-5">Tech Name</div>
                              <div className="col-sm-5">
                                {item?.TechnicianData?.first_name +
                                  " " +
                                  item?.TechnicianData?.last_name}
                              </div>
                              <div className="col-sm-2">
                                <FaEdit
                                  onClick={() => handleShowEditWorkOrder(item)}
                                />
                              </div>

                              <div className="col-sm-5">Work Order Type</div>
                              <div className="col-sm-5">
                                {item?.WorkOrderTypeData?.name}
                              </div>

                              <div className="col-sm-5">Date</div>
                              <div className="col-sm-5">
                                {formatDate(item?.service_date)}
                              </div>

                              <div className="col-sm-5">Status</div>
                              <div className="col-sm-5">
                                {item?.labor_cost_paid
                                  ? "Completed"
                                  : "Pending"}
                              </div>
                            </div>
                          </SwiperSlide>
                        ))
                      ) : (
                        <></>
                      )}
                      {/* {Array.from({
                        length: Math.max(
                          0,
                          1 -
                            (getSingleCustomer?.CustomerServiceLocation[
                              serviceIndex
                            ]?.RouteAssignmentServiceLocation[routeIndex]
                              ?.WaterBodyData?.length || 0)
                        ),
                      }).map((_, index) => (
                        <SwiperSlide>
                          <div
                            className="row waterbody-sm"
                            key={`empty-card-${index}`}
                          >
                            <Skeleton
                              avatar
                              paragraph={{
                                rows: 4,
                              }}
                            />
                          </div>
                        </SwiperSlide>
                      ))} */}
                    </Swiper>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="delete-customer">
          <div className="row newdelete">
            <Button
              className="bluebtn form redcss"
              type="primary"
              onClick={() => handleModal(getSingleCustomer._id)}
            >
              Delete Customer
            </Button>
          </div>
        </div>
      </div>

      <DeleteModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        handleDelete={handleDelete}
        id={Id}
      />

      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="taxratemodal taxGrpModal"
      >
        <Modal.Body>
          Add Route Assignment
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <RouteAssignmentModal
          handleClose={handleClose}
          waterbodyid={waterbodyid}
        />
      </Modal>

      <Modal
        show={showWorkOrder}
        onHide={handleCloseWorkOrder}
        animation={false}
        className="taxratemodal taxGrpModal"
      >
        <Modal.Body>
          Add Work Order
          <Button variant="secondary" onClick={handleCloseWorkOrder}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <WorkorderModal
          handleCloseWorkOrder={handleCloseWorkOrder}
          waterbodyid={waterbodyid}
        />
      </Modal>

      <Modal
        show={showEdit}
        onHide={handleCloseEdit}
        animation={false}
        className="taxratemodal taxGrpModal"
      >
        <Modal.Body>
          Edit Route Assignment
          <Button variant="secondary" onClick={handleCloseEdit}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <EditRouteAssignmentModal
          handleCloseWorkOrder={handleCloseEdit}
          EditData={EditData}
        />
      </Modal>

      <Modal
        show={showEditWorkOrder}
        onHide={handleCloseEditWorkOrder}
        animation={false}
        className="taxratemodal taxGrpModal"
      >
        <Modal.Body>
          Edit Work Order
          <Button variant="secondary" onClick={handleCloseEditWorkOrder}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <EditWorkOrderModal
          handleCloseWorkOrder={handleCloseEditWorkOrder}
          EditData={EditDataWorkOrder}
          waterbodyid={waterbodyid}
        />
      </Modal>
    </Fragment>
  );
}
