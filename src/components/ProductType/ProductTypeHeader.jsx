import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Modal } from "react-bootstrap";
import AddProductTypeForm from "../AddProductType/AddProductTypeForm";
import AddProductTypeHeader from "../AddProductType/AddProductTypeHeader";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";
import { fetchProductTypeCSVData } from "../../redux/Slices/getCSVData";
import { useDispatch } from "react-redux";
export default function ProductTypeHeader() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  // const data = getProductType?.items ?  getProductType?.items :  [
  //   ["firstname", "lastname", "email"],
  //   ["Ahmed", "Tomi", "ah@smthing.co.com"],
  //   ["Raed", "Labes", "rl@smthing.co.com"],
  //   ["Yezzi", "Min l3b", "ymin@cocococo.com"]
  // ];
  const { data: getCSVData, isloading } = useSelector(
    (state) => state.getCSVData
  );

  const getCSVFunction = async () => {
    // Fetch CSV data when the "Export" button is clicked
    await dispatch(fetchProductTypeCSVData());
  };

  useEffect(() => {
    dispatch(fetchProductTypeCSVData());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="row customers">
        <div className="col-sm-5 equipmentssss woth work-order-type">
          <h2>Product Type</h2>
        </div>
        <div className="col-sm-7 right equipmentssss wot work-order-type">
          <button className="yellowbtn">
            <CSVLink data={getCSVData} onClick={() => getCSVFunction()}>
              Export
            </CSVLink>
          </button>

          <button className="bluebtn" onClick={handleShow}>
            Add New
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
          Add Product Type
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <AddProductTypeForm data={handleClose} />
      </Modal>
    </Fragment>
  );
}
