import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { CSVLink } from "react-csv";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchReadingCSVData } from "../../redux/Slices/getCSVData";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { Modal } from "react-bootstrap";
import ReadingImportModal from "../ImportModel/ReadingImportModal";

export default function ReadingHeader() {
  const { data: getAllreading } = useSelector((state) => state.getAllreading);

  const { data: getCSVData, isloading } = useSelector(
    (state) => state.getCSVData
  );
  const dispatch = useDispatch();

  const [showImport, setShowImport] = useState(false);
  const handleCloseImport = () => setShowImport(false);
  const handleShowImport = () => setShowImport(true);

  const data = getCSVData ? getCSVData : [];

  const getCSVFunction = async () => {
    try {
      await dispatch(fetchReadingCSVData());
    } catch (error) {
      toast.error(error);
    }
  };
  console.log(data, "<=====data");
  useEffect(() => {
    dispatch(fetchReadingCSVData());
  }, []);
  return (
    <Fragment>
      <div className="row customers cstomer">
        <div className="col-sm-5 equipmentssss woth work-order-type">
          <h2>Readings</h2>
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
          <Link to="/add-readings">
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
          Import Reading
          <Button variant="secondary" onClick={handleCloseImport}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <ReadingImportModal data1={{ handleCloseImport }} />
      </Modal>
    </Fragment>
  );
}
