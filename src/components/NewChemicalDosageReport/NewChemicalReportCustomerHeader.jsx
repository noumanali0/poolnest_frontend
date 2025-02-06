import React, { Fragment } from "react";

const NewChemicalReportCustomerHeader = ({ data }) => {
  return (
    <Fragment>
      <div className="row customers labourInvoice ChemicalInvoice cslocation">
        <div className="col-sm-3 ">
          <h2>Summary</h2>
        </div>
        <div className="col-sm-9 chemicalRight">
          <div className="row labourInvoice">
            <div className="col-sm-4">
              <h6>
                Total Price{" "}
                <span>${data?.Summary ? data?.Summary?.TotalPrice : 0}</span>
              </h6>
            </div>
            <div className="col-sm-4">
              <h6>
                Total Cost{" "}
                <span>${data?.Summary ? data?.Summary?.TotalCost : 0}</span>
              </h6>
            </div>
            <div className="col-sm-4">
              <h6>
                Total Profit{" "}
                <span>${data?.Summary ? data?.Summary?.TotalProfit : 0}</span>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NewChemicalReportCustomerHeader;
