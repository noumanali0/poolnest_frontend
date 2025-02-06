import React from "react";
import { Fragment } from "react";

import Modal from "react-bootstrap/Modal";
import { useState } from "react";

import { Button } from "antd";
import TaxGroupForm from "./TaxGroupForm";
export default function TaxGroupHeaderList() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Fragment>
      <div className="row customers cslocation">
        <div className="col-sm-5 equipmentssss">
          <h2>Tax Group</h2>
        </div>
        <div className="col-sm-7 right equipmentssss">
          <button className="bluebtn taxBTNN" onClick={handleShow}>
            Add Group
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
          Add Tax Group
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <TaxGroupForm data={handleClose} />
      </Modal>
    </Fragment>
  );
}
