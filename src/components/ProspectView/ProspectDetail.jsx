import React, { Fragment, useEffect, useState } from "react";
import { Button } from "antd";

import { Link, useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { useDispatch } from "react-redux";
import { fetchgetProspectWaterBodyDetail } from "../../redux/Slices/getProspectWaterbody";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import NoData from "../NoDataComponent/Loader";

export default function ProspectDetail({ data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const handleNavigate = () => {
    navigate(`/prospect/create-appointment/${id}`);
  };

  const { detailData, loading } = useSelector(
    (state) => state.getProspectWaterBody
  );
  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  const handleSlideChange = (swiper) => {
    const activeIndex = swiper.activeIndex;
    const currentItem = data?.data?.ProspectWaterBodyProspectId?.[activeIndex];
    if (currentItem) {
      handleShowWaterBodyData(currentItem._id);
    }
  };
  const handleShowWaterBodyData = (id) => {
    dispatch(fetchgetProspectWaterBodyDetail({ id }));
  };

  useEffect(() => {
    if (data?.data?.ProspectWaterBodyProspectId?.length > 0) {
      handleShowWaterBodyData(data.data.ProspectWaterBodyProspectId[0]._id);
    }
  }, [data]);

  const handleNavigateEdit = () => {
    navigate(`/prospect/edit-work-order/${id}`);
  };

  const handleNavigateEditService = () => {
    navigate(`/prospect/edit-service/${id}`);
  };
  return (
    <Fragment>
      <div className="row">
        <div className="row customerdetail prospect">
          <div className="col-sm-12 prospectButton">
            <Link to={`/prospect/convert-prospect/${id}`}>
              <Button className="bluebtn">Convert Prospect To Customer</Button>
            </Link>
          </div>
          <div className="col-sm-6">
            <h5 className="Customer-h5">Prospect Info</h5>
            <h5 className="prospect-h5 prospect">
              {data?.data?.ProspectCustomer_type?.name}
            </h5>
            <div className="row CustomerInfo activebody-21 prospectcss">
              <div className="col-sm-10">
                <div className="row">
                  <div className="col-sm-6">Name</div>
                  <div className="col-sm-6">
                    {data?.data?.first_name + " " + data?.data?.last_name}
                  </div>
                  <div className="col-sm-6">Email</div>
                  <div className="col-sm-6">{data?.data?.email}</div>
                  <div className="col-sm-6">Phone No</div>
                  <div className="col-sm-6">
                    {data?.data?.mobile_no_primary}
                  </div>
                  <div className="col-sm-6">Address</div>
                  <div className="col-sm-6">{data?.data?.billing_address}</div>
                  <div className="col-sm-6">Zip Code</div>
                  <div className="col-sm-6">{data?.data?.zipcode}</div>
                  <div className="col-sm-6">Company Name</div>
                  <div className="col-sm-6">
                    {data?.data?.company_name
                      ? data?.data?.company_name
                      : "No Name"}
                  </div>
                  {/* <div className="col-sm-6">Service Location</div>
                  <div className="col-sm-6">
                    {data?.data?.ServiceLocationName}
                  </div> */}
                </div>
              </div>
              <div className="col-sm-2 editbtn">
                {data?.data?.ProspectWaterBodyProspectId &&
                data?.data?.ProspectWaterBodyProspectId[0]?.work_needed ? (
                  <FaEdit onClick={() => handleNavigateEdit(data?.data?._id)} />
                ) : (
                  <FaEdit
                    onClick={() => handleNavigateEditService(data?.data?._id)}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <h5 className="Customer-h5">Water Bodies</h5>
            <h5 className="prospect-h5 prospect-none"></h5>
            {data?.data?.ProspectWaterBodyProspectId.length > 1 ? (
              <Swiper
                // slidesPerView={3}
                spaceBetween={30}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper waterBodySwiper prsopectWateerbody"
                slidesPerView={1}
                onSlideChange={handleSlideChange}
              >
                {data?.data?.ProspectWaterBodyProspectId?.map((item, i) => (
                  <SwiperSlide key={i}>
                    <div
                      className="row CustomerInfo activebody-21 prospectcss prsopectWateerbody"
                      onClick={() => handleShowWaterBodyData(item._id)}
                    >
                      <div className="col-sm-10">
                        <div className="row cslocation">
                          <div className="col-sm-6">Name</div>
                          <div className="col-sm-6">{item?.WaterBodyName}</div>
                          <div className="col-sm-6">Type</div>
                          <div className="col-sm-6">
                            {item?.ProspectWaterBodyTypeData?.name}
                          </div>
                          <div className="col-sm-6">Gallons</div>
                          <div className="col-sm-6">{item?.size}</div>
                          <div className="col-sm-6">Rate</div>
                          <div className="col-sm-6">
                            <ul className="ul-prospect-css">
                              {detailData?.frequencyData?.map((single) => (
                                <li>
                                  {single?.ProspectProspectFrequencyId?.rate}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="col-sm-6">Rate Type</div>
                          <div className="col-sm-6">
                            <ul className="ul-prospect-css">
                              {detailData?.frequencyData?.map((single) => (
                                <li>
                                  {
                                    single?.ProspectProspectFrequencyId
                                      ?.ProspectFrequencyRateTypeId?.label
                                  }
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="col-sm-6">Frequency</div>
                          <div className="col-sm-6">
                            <ul className="ul-prospect-css">
                              {detailData?.frequencyData?.map((single) => (
                                <li>
                                  {
                                    single?.ProspectProspectFrequencyId
                                      ?.ProspectFrequencyFrequencyId?.label
                                  }
                                </li>
                              ))}
                            </ul>
                          </div>
                          {/* <div className="col-sm-6">Base Filter Pressure</div>
                        <div className="col-sm-6">{item?.pressure}</div> */}
                          <div className="col-sm-6">Minutes at Stop</div>
                          <div className="col-sm-6">
                            {item?.minutes_per_stop}
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-2 editbtn">
                        {data?.data?.ProspectWaterBodyProspectId &&
                        data?.data?.ProspectWaterBodyProspectId[0]
                          ?.work_needed ? (
                          <FaEdit
                            onClick={() => handleNavigateEdit(data?.data?._id)}
                          />
                        ) : (
                          <FaEdit
                            onClick={() =>
                              handleNavigateEditService(data?.data?._id)
                            }
                          />
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <>
                {data?.data?.ProspectWaterBodyProspectId?.map((item, i) => (
                  <div
                    className="row CustomerInfo activebody-21 prospectcss prsopectWateerbody"
                    onClick={() => handleShowWaterBodyData(item._id)}
                  >
                    <div className="col-sm-10">
                      <div className="row cslocation">
                        <div className="col-sm-6">Name</div>
                        <div className="col-sm-6">{item?.WaterBodyName}</div>
                        <div className="col-sm-6">Type</div>
                        <div className="col-sm-6">
                          {item?.ProspectWaterBodyTypeData?.name}
                        </div>
                        <div className="col-sm-6">Gallons</div>
                        <div className="col-sm-6">{item?.size}</div>
                        <div className="col-sm-6">Rate</div>
                        <div className="col-sm-6">
                          <ul className="ul-prospect-css">
                            {detailData?.frequencyData?.map((single) => (
                              <li>
                                {single?.ProspectProspectFrequencyId?.rate}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="col-sm-6">Rate Type</div>
                        <div className="col-sm-6">
                          <ul className="ul-prospect-css">
                            {detailData?.frequencyData?.map((single) => (
                              <li>
                                {
                                  single?.ProspectProspectFrequencyId
                                    ?.ProspectFrequencyRateTypeId?.label
                                }
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="col-sm-6">Frequency</div>
                        <div className="col-sm-6">
                          <ul className="ul-prospect-css">
                            {detailData?.frequencyData?.map((single) => (
                              <li>
                                {
                                  single?.ProspectProspectFrequencyId
                                    ?.ProspectFrequencyFrequencyId?.label
                                }
                              </li>
                            ))}
                          </ul>
                        </div>
                        {/* <div className="col-sm-6">Base Filter Pressure</div>
                        <div className="col-sm-6">{item?.pressure}</div> */}
                        <div className="col-sm-6">Minutes at Stop</div>
                        <div className="col-sm-6">{item?.minutes_per_stop}</div>
                      </div>
                    </div>
                    <div className="col-sm-2 editbtn">
                      {data?.data?.ProspectWaterBodyProspectId &&
                      data?.data?.ProspectWaterBodyProspectId[0]
                        ?.work_needed ? (
                        <FaEdit
                          onClick={() => handleNavigateEdit(data?.data?._id)}
                        />
                      ) : (
                        <FaEdit
                          onClick={() =>
                            handleNavigateEditService(data?.data?._id)
                          }
                        />
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="col-sm-6">
            <h5 className="Customer-h5">Appointment</h5>
            <div className="row CustomerInfo activebody-21 prospectcss">
              <div className="col-sm-12">
                <h3 className="propsecth3">Service</h3>
              </div>
              {detailData?.frequencyData?.length > 0 && (
                <>
                  <div className="col-sm-10">
                    <div className="row">
                      <div className="col-sm-6">Representative</div>
                      <div className="col-sm-6">
                        {detailData?.data?.ProspectWaterBodyAssigneeId
                          ?.ProspectAssigneeRepresentativeData?.first_name +
                          " " +
                          detailData?.data?.ProspectWaterBodyAssigneeId
                            ?.ProspectAssigneeRepresentativeData?.last_name}
                      </div>
                      <div className="col-sm-6">Date</div>
                      <div className="col-sm-6">
                        {formatDate(
                          detailData?.data?.ProspectWaterBodyAssigneeId
                            ?.AppointmentDate
                        )}
                      </div>
                      <div className="col-sm-6">Time</div>
                      <div className="col-sm-6">
                        {
                          detailData?.data?.ProspectWaterBodyAssigneeId
                            ?.AppointmentTime
                        }
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div className="col-sm-12">
                <h3 className="propsecth3">Work Order</h3>
              </div>
              {detailData?.data?.work_needed && (
                <>
                  <div className="col-sm-10">
                    <div className="row">
                      <div className="col-sm-6">Representative</div>
                      <div className="col-sm-6">
                        {detailData?.data?.ProspectWaterBodyAssigneeId
                          ?.ProspectAssigneeRepresentativeData?.first_name +
                          " " +
                          detailData?.data?.ProspectWaterBodyAssigneeId
                            ?.ProspectAssigneeRepresentativeData?.last_name}
                      </div>
                      <div className="col-sm-6">Date</div>
                      <div className="col-sm-6">
                        {formatDate(
                          detailData?.data?.ProspectWaterBodyAssigneeId
                            ?.AppointmentDate
                        )}
                      </div>
                      <div className="col-sm-6">Time</div>
                      <div className="col-sm-6">
                        {
                          detailData?.data?.ProspectWaterBodyAssigneeId
                            ?.AppointmentTime
                        }
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-2 editbtn">
                    {data?.data?.ProspectWaterBodyProspectId &&
                    data?.data?.ProspectWaterBodyProspectId[0]?.work_needed ? (
                      <FaEdit
                        onClick={() => handleNavigateEdit(data?.data?._id)}
                      />
                    ) : (
                      <FaEdit
                        onClick={() =>
                          handleNavigateEditService(data?.data?._id)
                        }
                      />
                    )}
                  </div>
                </>
              )}

              <div className="col-sm-12">
                <div className="row CustomerInfo prrrosepect">
                  <div className="col-sm-12 ">
                    {" "}
                    {/* <Skeleton
                          avatar
                          paragraph={{
                            rows: 3,
                          }}
                        /> */}
                    <button
                      className="addviewbtn linkbn"
                      onClick={handleNavigate}
                    >
                      Create New Appointment
                      {/* <Link to="/prospect/create-appointment">
                            Create Appointment
                          </Link> */}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <h5 className="Customer-h5">Quotes</h5>
            {detailData?.data?.work_needed === null ? (
              <div className="row CustomerInfo activebody-21 prospectcss">
                {detailData?.PropsectAllFrequencyData?.map((item, key) => {
                  return (
                    <>
                      <div className="col-sm-12">
                        <h3 className="propsecth3">
                          {item?.ProspectFrequencyFrequencyId?.label}
                        </h3>
                      </div>
                      <div className="col-sm-10 freqnuency">
                        <div className="row">
                          <div className="col-sm-6">{item?.rate}</div>
                          <div className="col-sm-6">
                            {item?.ProspectFrequencyRateTypeId?.label}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            ) : (
              <div className="row CustomerInfo activebody-21 prospectcss">
                <div className="col-sm-10 freqnuency">
                  <div className="row">
                    {/* <div className="col-sm-6">Work Order Type</div>
                    <div className="col-sm-6">Repair</div> */}
                    <div className="col-sm-6">Service Date</div>
                    <div className="col-sm-6">
                      {formatDate(
                        detailData?.data?.ProspectWaterBodyAssigneeId
                          ?.AppointmentDate
                      )}
                    </div>
                    <div className="col-sm-6">Scheduled Time</div>
                    <div className="col-sm-6">
                      {
                        detailData?.data?.ProspectWaterBodyAssigneeId
                          ?.AppointmentTime
                      }
                    </div>
                    <div className="col-sm-6">Est. Minutes</div>
                    <div className="col-sm-6">
                      {detailData?.data?.estimated_time_minutes}
                    </div>
                    <div className="col-sm-6">Price</div>
                    <div className="col-sm-6">{detailData?.data?.price}</div>
                    <div className="col-sm-6">Work Needed</div>
                    <div className="col-sm-6">
                      {detailData?.data?.work_needed}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
