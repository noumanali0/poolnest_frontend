import React, { Fragment } from "react";

const TechDetailHEader = ({ data }) => {
  console.log(data);
  return (
    <Fragment>
      <div className="row customers labourInvoice ChemicalInvoice cslocation">
        <div className="col-sm-3 ">
          <h2>
            Tech Summary <br />
            {data?.result?.TechData?.first_name +
              " " +
              data?.result?.TechData?.last_name}
          </h2>
        </div>
        <div className="col-sm-9 chemicalRight">
          <div className="row labourInvoice">
            <div className="col-sm-4">
              <h6>
                Total Price <span>${data?.result?.Summary?.TotalPrice}</span>
              </h6>
            </div>
            <div className="col-sm-4">
              <h6>
                Total Cost <span>${data?.result?.Summary?.TotalCost}</span>
              </h6>
            </div>
            <div className="col-sm-4">
              <h6>
                Total Profit <span>${data?.result?.Summary?.TotalProfit}</span>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TechDetailHEader;
