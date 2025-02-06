import React, { useState } from "react";

const EstimateStatusHeader = () => {
  const [status, setStatus] = useState({
    stripe: true,
    qbo: false,
  });
  return (
    <div className="flex align-items-baseline justify-content-end">
      <h6>Stripe:</h6>
      <div className="flex align-items-baseline estimates-header-status estimates-header-status-stripe">
        <h5>{status?.stripe && "Enabled"} </h5>
      </div>
      <h6 className="pl-5">QBO:</h6>
      <h5 className=" estimates-header-status estimates-header-status-qbo ">
        {status?.stripe && "Not Setup"}
      </h5>
    </div>
  );
};

export default EstimateStatusHeader;
