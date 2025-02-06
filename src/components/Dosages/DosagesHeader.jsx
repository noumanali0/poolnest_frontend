import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchDosageCSVData,
  fetchUserCSVData,
} from "../../redux/Slices/getCSVData";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import DosageImportModal from "../ImportModel/DosageImportModal";
import Modal from "react-bootstrap/Modal";

export default function DosagesHeader() {
  const { data: getAlldosage } = useSelector((state) => state.getAlldosage);

  const { data: getCSVData, isloading } = useSelector(
    (state) => state.getCSVData
  );
  const dispatch = useDispatch();

  const data = getCSVData ? getCSVData : [];
  const [showImport, setShowImport] = useState(false);
  const handleCloseImport = () => setShowImport(false);
  const handleShowImport = () => setShowImport(true);
  const getCSVFunction = async () => {
    try {
      await dispatch(fetchDosageCSVData());
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    dispatch(fetchDosageCSVData());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="row customers cstomer">
        <div className="col-sm-5 equipmentssss woth work-order-type">
          <h2>Dosages</h2>
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
          <Link to="/add-dosages">
            <button className="bluebtn">Add New</button>
          </Link>
        </div>
      </div>

      <Modal
        show={showImport}
        onHide={handleCloseImport}
        animation={false}
        className="taxratemodal taxGrpModal"
      >
        <Modal.Body>
          Import Dosage
          <Button variant="secondary" onClick={handleCloseImport}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <DosageImportModal data1={{ handleCloseImport }} />
      </Modal>
    </Fragment>
  );
}
