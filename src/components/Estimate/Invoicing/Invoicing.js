import React, { Fragment } from "react";
import EstimateStatusHeader from "../EstimateStatusHeader";
import EstimatesFilters from "../EstimatesFilters";
import InvoicingFilter from "../../Invoicing/InvoicingFilter";
import InvoicingFilters from "./InvoicingFilters";
import InvoicingMain from "./InvoicingMain";

const Invoicing = () => {
  return (
    <Fragment>
      <div className="row">
        <div className="col d-flex justify-content-end">
          <EstimateStatusHeader />
        </div>
        <div className="col-sm-12">
          <InvoicingFilters />
        </div>
        <div className="col-sm-12 ">
          <InvoicingMain />
        </div>
      </div>
    </Fragment>
  );
};

export default Invoicing;
