import React from "react";
import EstimateBuilderForm from "./EstimateBuilderForm";
import EstimateStatusHeader from "../EstimateStatusHeader";
import EstimateBuilderCustomerInfo from "./EstimateBuilderCustomerInfo";
import { useState } from "react";
// import MailIcon from "../../src/assets/Icons/Mail.svg";
import SendEmail from "../CustomerBillingSchedules/Modal/SendEmail";
import {
  MailOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const EstimateBuilderMain = () => {
  const [isModalVisible, setModalVisible] = useState(false);
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
  console.log(isModalVisible, "isModalVisible");
  return (
    <div className="row flex justify-content-center">
      <div className="col d-flex justify-content-end">
        <EstimateStatusHeader />
      </div>
      <SendEmail
        title="Email - Estimate"
        visible={isModalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
      />
      <div className="col-sm-12 estimate-builder-main ">
        <div className="col-sm-8 estimate-builder-left">
          <div className="d-flex justify-content-end row-gap-3">
            <MailOutlined
              onClick={() => setModalVisible(true)}
              style={{ cursor: "pointer", fontSize: 16 }}
            />
            <EyeOutlined style={{ cursor: "pointer", fontSize: 16 }} />
            <EditOutlined
              style={{ cursor: "pointer", fontSize: 16, paddingLeft: "5px" }}
            />

            <DeleteOutlined
              style={{ cursor: "pointer", fontSize: 16, paddingLeft: "5px" }}
            />
          </div>

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
