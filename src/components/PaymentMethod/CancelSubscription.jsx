import { Button } from "antd";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import CancelSubscriptionForm from "./CancelSubscriptionForm";

const CancelSubscription = () => {
  const [modalOpen, setModalOpen] = useState(false);

  // const handleClose = () => setShow(false);
  const handleModal = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };
  return (
    <div className="container-fluid stepsform stepsform1">
      <div className="row padding-row registerForm paymentForm">
        <div className="col-sm-12 stepforms step steps">
          <div className="row fomik addRoute">
            <h3 className="cancelSubTitle">
              Cancel Your PoolNest Subscription
            </h3>
            <div className="col-sm-12">
              <p className="cancelSubtetx">
                If you would like to stop using PoolNest, click the button
                below. After cancelling you will have access to PoolNest until
                the end of your billing period.
              </p>
            </div>
            <div className="col-sm-12 paymentBtn inDash">
              <Button
                type="primary"
                className="nextbtn"
                htmlType="submit"
                onClick={() => handleModal()}
              >
                Cancel Subscription
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={modalOpen}
        onHide={handleClose}
        animation={false}
        className="taxratemodal cancelSubscription"
      >
        <Modal.Body>
          Subscription Cancellation
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        {/* <div className="row cslocation"></div> */}
        <CancelSubscriptionForm data1={{ handleClose }} />
        {/* <TaxGroupEdit data1={{ Data, handleClose }} /> */}
      </Modal>
    </div>
  );
};

export default CancelSubscription;
