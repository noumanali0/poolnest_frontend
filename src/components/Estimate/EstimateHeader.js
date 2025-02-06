import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import EstimateStatusHeader from "./EstimateStatusHeader";
import EstimatesFilters from "./EstimatesFilters";
import EstimatesAnalytics from "./EstimatesAnalytics";

function EstimateHeader() {
  return (
    <Fragment>
      <div className="row customers">
        <div className="col d-flex justify-content-end">
          <EstimateStatusHeader />
        </div>
        <div className="col-sm-12">
          <EstimatesFilters />
        </div>
        <div className="col-sm-12">
          <EstimatesAnalytics />
        </div>
      </div>
    </Fragment>
  );
}

export default EstimateHeader;
