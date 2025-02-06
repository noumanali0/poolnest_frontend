import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

function Routeheader() {
  return (
    <Fragment>
      <div className="row customers cslocation routeHeader">
        <div className="col-sm-5 equipmentssss">
          <h2>Route Assignment</h2>
        </div>
        <div className="col-sm-7 right equipmentssss">
          <Link to="/add-route">
            <button className="bluebtn equipmentssssblue">Add Another</button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

export default Routeheader;
