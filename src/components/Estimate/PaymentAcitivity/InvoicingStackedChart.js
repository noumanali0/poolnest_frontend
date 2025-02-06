// SingleStackedBar.js
import React from "react";
import ChartistGraph from "react-chartist";
import "chartist/dist/chartist.min.css"; // Chartist's default

function InvoicingStackedChart() {
  // Data for one bar with 3 segments
  const data = {
    labels: [""], // single bar only
    series: [
      [5523], // Overdue (red)
      [12137], // Awaiting Payment (orange)
      [23323], // Collected (green)
    ],
  };

  const options = {
    stackBars: true,
    horizontalBars: true,
    axisX: { showGrid: false, showLabel: false },
    axisY: { showGrid: false, showLabel: false },
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    height: "50px",
  };

  return (
    <div style={{ margin: "0 auto", width: "100%" }}>
      {/* Legend Above the Chart (in black text) */}
      <div
        style={{ marginBottom: "10px", fontSize: "14px", color: "#000" }}
        className="d-flex justify-content-around"
      >
        <span style={{ marginRight: "20px" }}>
          Overdue: <br /> $5,000
        </span>
        <span style={{ marginRight: "20px" }}>
          Awaiting Payment: <br /> $5,000
        </span>
        <span>
          Collected:
          <br /> $5,000
        </span>
      </div>

      <ChartistGraph
        data={data}
        options={options}
        type="Bar"
        className="ct-chart w-100"
      />
    </div>
  );
}

export default InvoicingStackedChart;
