import React from "react";
import ChartistGraph from "react-chartist";
import full_screen_preview from "../../assets/img/full-screen-preview.svg";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import EstimateTable from "./EstimateTable";

const initialData = [
  {
    key: "1",
    createdOn: "12/5/24",
    status: "Approved",
    customerName: "Client First & Last",
    address: "Address 1",
    serviceType: "Work Order",
    desiredCompletionDate: "End of the Month",
    amount: 3333,
  },
  {
    key: "2",
    createdOn: "12/4/24",
    status: "Sent",
    customerName: "Client First & Last",
    address: "Address 1",
    serviceType: "Service",
    desiredCompletionDate: "First Week in January",
    amount: 222,
  },
  {
    key: "3",
    createdOn: "11/24/24",
    status: "Expired",
    customerName: "Client First & Last",
    address: "Address 1",
    serviceType: "Work Order",
    desiredCompletionDate: "12/25/24",
    amount: 1123,
  },
  {
    key: "4",
    createdOn: "11/20/24",
    status: "Rejected",
    customerName: "Client First & Last",
    address: "Address 1",
    serviceType: "Service",
    desiredCompletionDate: "ASAP",
    amount: 130,
  },
];

const EstimatesAnalytics = () => {
  const data = {
    series: [
      {
        value: 71,
        className: "slice-green",
      },
      {
        value: 18,
        className: "slice-red",
      },
      {
        value: 11,
        className: "slice-grey",
      },
    ],
  };

  const options = {
    donut: true,
    donutWidth: 30,
    donutSolid: true,
    startAngle: 150,
    showLabel: true,
  };

  return (
    <>
      <div
        className="row position-relative"
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          marginTop: "12px",
        }}
      >
        <div className="full-screen-preview__header">
          <img src={full_screen_preview} alt="not found" />
        </div>
        <div className=" row heading w-100 flex justify-content-center pt-3 ">
          <h2>
            <strong>Estimates</strong>
          </h2>
        </div>
        <div className=" w-100 col-sm-12 flex justify-content-center pt-5">
          <div className="col-sm-10">
            <div className="col-sm-6 anylytics">
              <div className="w-100 flex">
                <div className=" d-flex flex-column justify-content-center align-items-center">
                  <div className="estimates-analytics-sent ">
                    <p>
                      <strong>Sent</strong>{" "}
                    </p>
                  </div>
                  <p>$3000</p>
                  <p>15</p>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <div className="estimates-analytics-expired">
                    <p>
                      <strong>Expired</strong>{" "}
                    </p>
                  </div>
                  <p>$3000</p>
                  <p>15</p>
                </div>
                <div className=" d-flex flex-column justify-content-center align-items-center">
                  <div className="estimates-analytics-rejected">
                    <p>
                      <strong>Rejected</strong>{" "}
                    </p>
                  </div>
                  <p>$3000</p>
                  <p>15</p>
                </div>
                <div className=" d-flex flex-column justify-content-center align-items-center">
                  <div className="estimates-analytics-approved">
                    <p>
                      <strong>Approved</strong>
                    </p>
                  </div>
                  <p>$3000</p>
                  <p>15</p>
                </div>
              </div>
            </div>
            <div className="col-sm-2"></div>
            <div className="col-sm-4 ">
              <div className="w-100 d-flex flex-column align-items-center ">
                <h4 className="p-0 pb-5 m-0">Approval %</h4>

                <ChartistGraph
                  data={data}
                  options={options}
                  type="Pie"
                  className="ct-chart w-100 "
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className=" row d-flex flex-column pt-3 mt-5"
        style={{ backgroundColor: "#fff", borderRadius: "12px" }}
      >
        <div className="col-sm-12">
          <div className="col-sm-6"></div>
          <div className="row col-sm-6">
            <div className="w-100 d-flex justify-content-start justify-content-sm-end">
              <button className="yellowbtn text-dark ">
                <PlusOutlined className="font-weight-bold" />{" "}
                <strong>Create Estimate</strong>
              </button>
            </div>
          </div>
        </div>

        <div className="col-12 py-4">
          <EstimateTable initialData={initialData} />
        </div>
      </div>
    </>
  );
};

export default EstimatesAnalytics;
