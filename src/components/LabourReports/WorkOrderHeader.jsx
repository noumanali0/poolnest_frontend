import React, { useEffect } from "react";

export default function WorkOrderHeader({data}) {

console.log(data , "ewqqwe")

const FetchData = data?.Summary && data?.Summary[0]
  return (
    <div className="row customers labourInvoice">
      <div className="col-sm-3 ">
        <h2>Summary</h2>
      </div>
      <div className="col-sm-9 chemicalRight">
        <div className="row labourInvoice cslocation">
          <div className="col-sm-4">
            <h6>
              Total Sales Price <span>${FetchData?.TotalSalesPrice ? Math.round(FetchData?.TotalSalesPrice) : 0}</span>
            </h6>
          </div>
          {/* <div className="col-sm-4">
            <h6>
              Total Job Cost <span>${FetchData?.TotalSalesPrice}</span>
            </h6>
          </div> */}
          <div className="col-sm-4">
            <h6>
              Total Labor Amount <span>${FetchData?.TotalLaborCost ? Math.round(FetchData?.TotalLaborCost) : 0}</span>
            </h6>
          </div>
          <div className="col-sm-4">
            <h6>
              Net Income <span>${FetchData?.NetIncome ? Math.round(FetchData?.NetIncome) : 0}</span>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
