import { Button } from "antd";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import CancelSubscriptionForm from "./CancelSubscriptionForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const StripeIntegration = () => {
  const userProfile = useSelector((state) => state.profileDetail);
  const navigate = useNavigate();

  const handleModal = () => {
    if (userProfile?.data?.StripeIntegrationUrl) {
      window.open(userProfile.data.StripeIntegrationUrl, "_blank");
    } else {
      console.error("StripeIntegrationUrl is not available");
    }
  };

  return (
    <div className="container-fluid stepsform stepsform1">
      <div className="row padding-row registerForm paymentForm">
        <div className="col-sm-12 stepforms step steps">
          <div className="row fomik addRoute">
            <h3 className="cancelSubTitle">Stripe Integration </h3>
            <div className="col-sm-12">
              <p className="cancelSubtetx">
                Please Click The Button Here To Connect Your Bank Account With
                Poolnest To Get Paid Securely
              </p>
            </div>
            <div className="col-sm-12 paymentBtn inDash">
              <Button
                type="primary"
                className="nextbtn"
                htmlType="submit"
                onClick={() => handleModal()}
                disabled={
                  userProfile?.data?.StripeIntegrationUrl ? false : true
                }
              >
                Connect Stripe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripeIntegration;
