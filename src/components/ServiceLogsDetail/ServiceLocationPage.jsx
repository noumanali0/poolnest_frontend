import React from "react";
import { Fragment } from "react";
import { Form } from "antd";
import ServiceLogsFilter from "./ServiceLogsFilter";
import ServiceInfo from "./ServiceInfo";
import ServiceReading from "./ServiceReading";
import ServiceEquipment from "./ServiceEquipment";
import ServiceItemNeeded from "./ServiceItemNeeded";
import DosagesList from "./DosagesList";
import ServiceCheckList from "./ServiceCheckList";
import ServiceEmail from "./ServiceEmail";
import ServiceImageSlider from "./ServiceImageSlider";

export default function ServiceLogDetailPage({ data }) {
  const onFinishs = (values) => {
    console.log("Received values of form:");
  };

  return (
    <Fragment>
      <div className="serviceLog">
        <Form name="dynamic_form_item" onFinish={onFinishs}>
          <ServiceLogsFilter data={data} />
          <ServiceInfo data={data} />

          <div className="row serviceLogDetailPageCols cslocation">
            <div className="col-sm-6 forFullWidth">
              {data?.CompletedServiceRoutesReadingActivity?.length !== 0 ? (
                <ServiceReading
                  data={data?.CompletedServiceRoutesReadingActivity}
                />
              ) : (
                <></>
              )}
            </div>
            <div className="col-sm-6 forFullWidth ">
              {data?.CompletedServiceRoutesDosageActivity?.length !== 0 ? (
                <DosagesList
                  data={data?.CompletedServiceRoutesDosageActivity}
                />
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="row serviceLogDetailPageCols cslocation">
            <div className="col-sm-6 forFullWidth">
              {data?.CompletedServiceRouteEquipmentServiceData?.length !== 0 ? (
                <ServiceEquipment
                  data={data?.CompletedServiceRouteEquipmentServiceData}
                />
              ) : (
                <></>
              )}
            </div>
            <div className="col-sm-6 forFullWidth ">
              {data?.CompletedServiceRouteItemNeededServiceData?.length !==
              0 ? (
                <ServiceItemNeeded
                  data={data?.CompletedServiceRouteItemNeededServiceData}
                />
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="row serviceLogDetailPageCols cslocation">
            <div className="col-sm-4 forFullWidth">
              <ServiceCheckList
                data={data?.CompletedServiceRouteCheckListServiceData}
              />
            </div>
            <div className="col-sm-8 forFullWidth">
              <ServiceEmail data={data} />
            </div>
            <div className="col-sm-12">
              <ServiceImageSlider
                data={data?.CompletedServiceRouteImageServiceData}
              />
            </div>
          </div>
        </Form>
      </div>
    </Fragment>
  );
}
