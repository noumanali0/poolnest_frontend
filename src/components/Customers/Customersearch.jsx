import React, { useEffect , useState } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink } from "react-csv";
import { fetchCustomerCSVData } from "../../redux/Slices/getCSVData";
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import Modal from "react-bootstrap/Modal";
import ImportModel from "../ImportModel/ImportModal"
export default function Customersearch() {
  const dispatch = useDispatch();

  const { data: getCSVData, isloading } = useSelector(
    (state) => state.getCSVData
  );
  const { data: getCustomer, statusdata } = useSelector(
    (state) => state.getCustomer
  );
  const datas = getCSVData ? getCSVData : [];

  const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);


  const getCSVFunction = async () => {
    await dispatch(fetchCustomerCSVData());
  };

  useEffect(() => {
    dispatch(fetchCustomerCSVData());
  }, []);

  // const jsonValidator = (file) => {
  //   const isJson = file.type === 'application/json';
  //   if (!isJson) {
  //       message.error('You can only upload JSON files!');
  //   }
  //   return isJson;
  // };

  // const uploadProps = {
  //   name: 'file',
  //   beforeUpload: jsonValidator,
  //   onChange(info) {
  //     const { status } = info.file;
  //     if (status === 'done') {
  //       console.log(info)
  //       // dispatch(UploadModelData())
  //       message.success(`${info.file.name} file uploaded successfully.`);
  //     } else if (status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  //   accept: ".json", // Only allow JSON files to be visible for selection
  // };

  return (
    <Fragment>
      <div className="row customers cstomer">
        <div className="col-sm-5 equipmentssss woth work-order-type">
          <h2>
            Customers ({getCustomer?.totalCount})
            <span className="counts">{getCustomer?.items?.totalCount}</span>
          </h2>
        </div>
        <div className="col-sm-7 right equipmentssss wot work-order-type">
          <CSVLink data={datas} onClick={() => getCSVFunction()}>
            <button className="bluebtn" disabled={isloading}>
              Export
            </button>
          </CSVLink>

          <div className="yellowbtn with_icon immmport">
              <Button className="UploadOutlined-icon uploadYelloww" onClick={handleShow} icon={<UploadOutlined />}>Import</Button>
          </div>

          <Link to="/addcustomer">
            <button className="bluebtn">Add New</button>
          </Link>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} animation={false} className="taxratemodal taxGrpModal">
        <Modal.Body>
          Import Customer
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <ImportModel data1={{ handleClose }} />
      </Modal>
    </Fragment>
  );
}
