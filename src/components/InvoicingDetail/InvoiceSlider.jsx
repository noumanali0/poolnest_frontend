import React, { Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { Previewslides } from "../../Data/Data";
import InvoicingTable from "./InvoicingTable";
import InvoicingDetail from "./InvoiceDetail";
import { useEffect } from "react";
import { fetchgetInvoiceData } from "../../redux/Slices/getInvoiceData";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchgetInvoiceSingle } from "../../redux/Slices/getInvoiceDetail";
import Loader from "../NoDataComponent/Loader";
import moment from "moment";

export default function InvoiceSlider({ isFieldsDisabled }) {
  const [keyData, setKeyData] = useState(0);
  const { data: getInvoiceData } = useSelector((state) => state.getInvoiceData);
  const { data: getInvoiceDetail, status } = useSelector(
    (state) => state.getInvoiceDetail
  );

  const parts1 = window.location.href;

  const parts = parts1.split("/");

  const Id = parts[4];
  const locationId = parts[5];
  const variable2 = parts[6]; // 2023-12-31T19:00:00Z
  const variable3 = parts[7]; // 2024-01-30T19:00:00Z

  const [StartDate, setStartDate] = useState(
    moment(variable2).startOf("month").format("YYYY-MM-DD")
  );
  const [EndDate, setEndDate] = useState(
    moment(variable3).endOf("month").format("YYYY-MM-DD")
  );

  const handleSlideChange = (swiper, slideData, currentSlideIndex) => {
    setKeyData(currentSlideIndex);
    // dispatch(fetchgetInvoiceSingle({Id ,locationId ,StartDate , EndDate}))
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (StartDate && EndDate) {
      dispatch(fetchgetInvoiceData({ StartDate, EndDate }));
    }
  }, [dispatch, StartDate, EndDate]);

  return (
    <Fragment>
      <div className="container-fluid wordkorder preview">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          onSlideChange={(swiper) => {
            const currentSlideIndex = swiper.activeIndex;
            const currentSlideData = 1;
            handleSlideChange(swiper, currentSlideData, currentSlideIndex);
          }}
        >
          {getInvoiceDetail == null ? (
            <></>
          ) : getInvoiceDetail.CustomerServiceLocation &&
            getInvoiceDetail.CustomerServiceLocation[0]
              ?.RouteAssignmentServiceLocation?.length == 0 ? (
            getInvoiceDetail.CustomerServiceLocation &&
            getInvoiceDetail.CustomerServiceLocation[0]?.RouteAssignmentWorkOrderServiceLocation?.map(
              (data, key) => {
                const currentSlideData =
                  getInvoiceDetail.CustomerServiceLocation[0]
                    ?.RouteAssignmentWorkOrderServiceLocation[key];
                return (
                  <SwiperSlide key={data.key}>
                    <InvoicingDetail
                      data={{
                        getInvoiceDetail,
                        currentSlideData,
                        isFieldsDisabled,
                        keyData,
                      }}
                    />
                  </SwiperSlide>
                );
              }
            )
          ) : (
            getInvoiceDetail.CustomerServiceLocation &&
            getInvoiceDetail.CustomerServiceLocation[0]?.RouteAssignmentServiceLocation?.map(
              (data, key) => {
                const currentSlideData =
                  getInvoiceDetail.CustomerServiceLocation[0]
                    ?.RouteAssignmentServiceLocation[key];
                return (
                  <SwiperSlide key={data.key}>
                    <InvoicingDetail
                      data={{
                        getInvoiceDetail,
                        currentSlideData,
                        isFieldsDisabled,
                        keyData,
                      }}
                    />
                  </SwiperSlide>
                );
              }
            )
          )}
        </Swiper>
      </div>
    </Fragment>
  );
}
