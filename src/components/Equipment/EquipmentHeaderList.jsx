import React, { useEffect } from "react";
import { Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import EquipmentForm from "../AddEquipment/EquipmentForm";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";
import { fetchEquiptmentCSVData } from "../../redux/Slices/getCSVData";
import { useDispatch } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import EquipmentImportModal from "../ImportModel/EquipmentImportModal";

export default function EquipmentHeaderList() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  const { data: getCSVData, isloading } = useSelector(
    (state) => state.getCSVData
  );

  const [showImport, setShowImport] = useState(false);
  const handleCloseImport = () => setShowImport(false);
  const handleShowImport = () => setShowImport(true);

  const data = getCSVData ? getCSVData : [];

  const getCSVFunction = async () => {
    await dispatch(fetchEquiptmentCSVData());
  };

  useEffect(() => {
    dispatch(fetchEquiptmentCSVData());
  }, []);

  return (
    <Fragment>
      <div className="row customers cstomer">
        <div className="col-sm-5 equipmentssss woth work-order-type">
          <h2>Equipment</h2>
        </div>
        <div className="col-sm-7 right equipmentssss wot work-order-type">
          <button className="bluebtn">
            <CSVLink data={data} onClick={() => getCSVFunction()}>
              Export
            </CSVLink>
          </button>

          <div className="yellowbtn with_icon immmport">
            <Button
              className="UploadOutlined-icon uploadYelloww"
              onClick={handleShowImport}
              icon={<UploadOutlined />}
            >
              Import
            </Button>
          </div>
          <button className="bluebtn" onClick={handleShow}>
            Add New
          </button>
        </div>
      </div>
      {/* <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header className="modalHeader">
          <Button variant="secondary" onClick={handleClose}>
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div className="addcustomers addEquipments">
            <EquipmentHeader />
            <EquipmentForm data1={handleClose} />
          </div>
        </Modal.Body>
      </Modal> */}
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="taxratemodal taxGrpModal"
      >
        <Modal.Body>
          Add Equipment
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <EquipmentForm data1={handleClose} />
      </Modal>

      <Modal
        show={showImport}
        onHide={handleCloseImport}
        animation={false}
        className="taxratemodal taxGrpModal"
      >
        <Modal.Body>
          Import Equipment
          <Button variant="secondary" onClick={handleCloseImport}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <EquipmentImportModal data1={{ handleCloseImport }} />
      </Modal>
    </Fragment>
  );
}
