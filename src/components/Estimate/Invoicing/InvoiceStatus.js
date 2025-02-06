import React from "react";
import ChartistGraph from "react-chartist";
import "chartist/dist/chartist.min.css";
import full_screen_preview from "../../../assets/img/full-screen-preview.svg";

const InvoiceStatus = () => {
  // Data for the chart
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
    ],
    series: [
      [20000, 18000, 12000, 14000, 16000, 16000, 17000, 19000, 18000, 17000], // Collected
      [0, 2000, 3000, 2000, 0, 0, 0, 3000, 5000, 4000], // Awaiting Payment
      [1000, 1000, 5000, 4000, 1000, 1000, 1000, 2000, 3000, 2000], // Overdue
    ],
  };

  // Chart options
  const options = {
    stackBars: true,
    axisY: {
      onlyInteger: true,
      offset: 50,
      labelInterpolationFnc: (value) => `$${value / 1000}K`,
    },
    height: "300px",
    seriesBarDistance: 20, // Space between bar groups
  };

  // Styling for bar colors
  const barColors = {
    "--ct-series-a": "#8BC34A", // Collected - Green
    "--ct-series-b": "#FFC107", // Awaiting Payment - Yellow
    "--ct-series-c": "#F44336", // Overdue - Red
  };

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "8px",
        position: "relative",
      }}
    >
      <div className="full-screen-preview__header">
        <img src={full_screen_preview} alt="not found" />
      </div>
      <h3
        style={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Invoice Status
      </h3>
      <div style={barColors}>
        <ChartistGraph
          data={data}
          options={options}
          type="Bar"
          className="ct-custom-bar-width"
        />
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <div
          style={{ display: "flex", alignItems: "center", marginRight: "20px" }}
        >
          <span
            style={{
              display: "inline-block",
              width: "12px",
              height: "12px",
              backgroundColor: "#8BC34A",
              marginRight: "5px",
            }}
          ></span>
          Collected
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginRight: "20px" }}
        >
          <span
            style={{
              display: "inline-block",
              width: "12px",
              height: "12px",
              backgroundColor: "#FFC107",
              marginRight: "5px",
            }}
          ></span>
          Awaiting Payment
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              display: "inline-block",
              width: "12px",
              height: "12px",
              backgroundColor: "#F44336",
              marginRight: "5px",
            }}
          ></span>
          Overdue
        </div>
      </div>
    </div>
  );
};

export default InvoiceStatus;
