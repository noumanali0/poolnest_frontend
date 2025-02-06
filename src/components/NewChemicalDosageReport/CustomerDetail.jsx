import moment from "moment";
import React, { Fragment } from "react";

const CustomerDetail = ({ data, Item }) => {
  console.log(data, "data, Item ");

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${month}/${day}/${year}`;
  }

  return (
    <Fragment>
      <div className="row fomik addRoute taxratee checmicalCustDet">
        <div className="col-sm-3">
          <p>
            <b>Date:</b> {formatDate(data?.ServiceDate)}
          </p>
        </div>
        <div className="col-sm-3">
          <p>
            <b>A:</b> {Item?.address}
          </p>
        </div>
        <div className="col-sm-3">
          <p>
            <b>Pool:</b> {data?.CompletedServiceRoutesWaterBody?.name}
          </p>
        </div>
        <div className="col-sm-3">
          <p>
            <b>Tech:</b>{" "}
            {data?.CompletedServiceRoutes_Technician_id?.first_name}
          </p>
        </div>

        <div className="col-sm-6">
          <h2>Readings</h2>
          <div className="row cslocation">
            {data?.CompletedServiceRoutesReadingActivity?.map((single) => {
              return (
                <>
                  <div className="col-sm-6">
                    <p>
                      {
                        single?.CompletedServiceRoutesReadingValueData
                          ?.ReadingValuesData?.name
                      }
                    </p>
                  </div>
                  <div className="col-sm-6">
                    <p>
                      {single?.values +
                        "  " +
                        single?.CompletedServiceRoutesReadingValueData
                          ?.ReadingValuesData?.unit_of_measurement}
                    </p>
                  </div>
                </>
              );
            })}
          </div>
        </div>

        <div className="col-sm-6">
          <h2>Dosages</h2>
          <div className="row cslocation">
            {data?.CompletedServiceRoutesDosageActivity?.map((single) => {
              return (
                <>
                  {" "}
                  <div className="col-sm-6">
                    <p>
                      {
                        single?.CompletedServiceRoutesDosageDosageValueData
                          ?.DosageData?.name
                      }
                    </p>
                  </div>
                  <div className="col-sm-6">
                    <p>
                      {single?.values +
                        "  " +
                        single?.CompletedServiceRoutesDosageDosageValueData
                          ?.DosageData?.unit_of_measurement}
                    </p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CustomerDetail;
