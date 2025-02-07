import React, { useState } from "react";

const EstimateStatusHeader = () => {
  const [status, setStatus] = useState({
    stripe: true,
    qbo: false,
  });
  return (
    <div className="d-flex align-items-baseline gap-2 justify-content-start justify-content-sm-end flex-sm-row flex-column">
      <div className="d-flex gap-2  align-items-baseline">
        <h6 className="pl-2">Stripe:</h6>
        <div className="d-flex align-items-baseline estimates-header-status estimates-header-status-stripe">
          <h5>{status?.stripe && "Enabled"}</h5>
        </div>
      </div>

      <div className="d-flex gap-2 pl-2 align-items-baseline pt-2 pt-sm-0">
        {" "}
        <h6 className="pl-2">QBO:</h6>
        <h5 className=" estimates-header-status estimates-header-status-qbo ">
          {status?.stripe && "Not Setup"}
        </h5>
      </div>
    </div>
  );
};

export default EstimateStatusHeader;
