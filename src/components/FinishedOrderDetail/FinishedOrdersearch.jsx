import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function FinishedOrdersearch({ workorderReport }) {
  console.log(workorderReport, "workorderReport");

  const FetchData = workorderReport?.Summary && workorderReport?.Summary[0];

  return (
    <Fragment>
      <div className="row customers ">
        {/* <div className="col-sm-3 ">
          <h2>Aaron Adams</h2>
        </div> */}
        <div className="col-sm-12 chemicalRight">
          <div className="row">
            <div className="col-sm-4">
              <h6>
                Total Work Orders <span>${FetchData?.TotalLaborCost}</span>
              </h6>
            </div>
            <div className="col-sm-4">
              <h6>
                Total Sales Price <span>${FetchData?.TotalSalesPrice}</span>
              </h6>
            </div>
            <div className="col-sm-4">
              <h6>
                Total Net Income <span>$${FetchData?.NetIncome}</span>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
