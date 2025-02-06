import { Select } from "antd";
import React from "react";

const ServiceLogsFilter = ({data}) => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="row customers servicedata_header cslocation">
      <div className="col-sm-6">
        <h2>{data?.CompletedServiceRouteAssignmentData?.RouteAssignmentWaterBody?.RouteAssignmentServiceLocation?.name} </h2>
        {/* <h6>{data?.CompletedServiceRouteAssignmentData?.RouteAssignmentWaterBody?.name}</h6> */}
      </div>
      <div className="col-sm-6">
        <h2>{data?.CompletedServiceRouteAssignmentData?.RouteAssignmentWaterBody?.name} </h2>
      </div>
    </div>
  );
};

export default ServiceLogsFilter;
