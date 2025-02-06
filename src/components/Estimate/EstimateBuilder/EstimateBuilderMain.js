import React from "react";
import EstimateBuilderForm from "./EstimateBuilderForm";
import EstimateStatusHeader from "../EstimateStatusHeader";
import EstimateBuilderCustomerInfo from "./EstimateBuilderCustomerInfo";
import { useState } from "react";

const EstimateBuilderMain = () => {
  const [customer, setCustomer] = useState({
    id: 0,
    name: "John Doe",
    billingAddress: "456 Another Rd.\nTempe, AZ 85281",
    serviceAddress: "456 Another Rd.\nTempe, AZ 85281",
    phone: "480-555-1234",
    email: "johndoe@example.com",
    billingMethod: "Cash",
    notes: "Internal notes for John Doe. Lorem ipsum...",
  });

  return (
    <div className="row flex justify-content-center">
      <div className="col d-flex justify-content-end">
        <EstimateStatusHeader />
      </div>

      <div className="col-sm-12 estimate-builder-main ">
        <div className="col-sm-8 estimate-builder-left">
          <EstimateBuilderForm title={"Estimate"} customer={customer} />
        </div>
        <div className="col-sm-4 estimate-builder-right ">
          <EstimateBuilderCustomerInfo
            customer={customer}
            setCustomer={setCustomer}
          />
        </div>
      </div>
    </div>
  );
};

export default EstimateBuilderMain;
