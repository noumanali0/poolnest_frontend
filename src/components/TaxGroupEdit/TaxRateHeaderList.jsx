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
      <div className="row customers ">
        <div className="col-sm-5 equipmentssss">
          <h2>Edit Tax GROUP</h2>
        </div>
      </div>
    </Fragment>
  );
}
