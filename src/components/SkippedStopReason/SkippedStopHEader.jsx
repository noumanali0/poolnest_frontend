import React, { useEffect , useState } from "react";
import { Fragment } from "react";
import { Button } from 'antd';
import Modal from "react-bootstrap/Modal";
import AddReasonForm from "./AddReasonForm";

export default function SkippedStopHEader() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Fragment>
            <div className="row customers">
                <div className="col-sm-5 equipmentssss">
                    <h2>Reasons for Skipped Stops</h2>
                </div>
                <div className="col-sm-7 right equipmentssss">
                    <button className="bluebtn" onClick={() => handleShow()}>Add Reason</button>
                </div>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                animation={false}
                className="taxratemodal taxGrpModal"
            >
                <Modal.Body>
                    Add Skipped Stop Reason
                    <Button variant="secondary" onClick={handleClose}>
                        {" "}
                        X{" "}
                    </Button>
                    </Modal.Body>
                    <AddReasonForm handleClose={handleClose}/>
                {/* <TaxRateForm data={handleClose} /> */}
            </Modal>
        </Fragment>
    );
}
