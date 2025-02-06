import React from "react";
import { Fragment } from "react";

import Modal from "react-bootstrap/Modal";
import { useState } from "react";

import { Button } from "antd";
import TaxRateForm from "./TaxRateForm";
export default function TaxGroupHeaderList() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Fragment>
      <div className="row customers cslocation">
        <div className="col-sm-5 equipmentssss">
          <h2>Tax Rate</h2>
        </div>
        <div className="col-sm-7 right equipmentssss">
          <button className="bluebtn taxBTNN" onClick={handleShow}>
            Add Rate
          </button>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="taxratemodal taxGrpModal"
      >
        <Modal.Body>
          Add Tax Rate
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <TaxRateForm data={handleClose} />
      </Modal>
      {/* <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header className="modalHeader">
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div className="addcustomers addEquipments">
            <TaxRateForm data={handleClose} />
          </div>
        </Modal.Body>
      </Modal> */}
    </Fragment>
  );
}
