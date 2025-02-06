import React, { Fragment } from "react";

const NewChemicalReportCustomerDetailHeader = ({ data }) => {
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
                Total Price <span>${data?.Summary?.TotalPrice}</span>
              </h6>
            </div>
            <div className="col-sm-4">
              <h6>
                Total Cost <span>${data?.Summary?.TotalCost}</span>
              </h6>
            </div>
            <div className="col-sm-4">
              <h6>
                Total Profit <span>${data?.Summary?.TotalProfit}</span>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NewChemicalReportCustomerDetailHeader;
