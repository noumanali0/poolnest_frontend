import React, { useEffect } from "react";
import { Fragment } from "react";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchWorkOrderTypeCSVData } from "../../redux/Slices/getCSVData";

export default function WorkOrderTypeHeader() {
  const dispatch = useDispatch();
  const workOrderTypeData = useSelector((state) => state.getCSVData.data);

  console.log(workOrderTypeData);
  const getCSVFunction = async () => {
    // Fetch CSV data when the "Export" button is clicked
    await dispatch(fetchWorkOrderTypeCSVData());
  };
  useEffect(() => {
    dispatch(fetchWorkOrderTypeCSVData());
  }, []);

  return (
    <Fragment>
      <div className="row customers">
        <div className="col-sm-5 equipmentssss woth work-order-type">
          <h2>Work Order Type </h2>
        </div>
        <div className="col-sm-7 right equipmentssss wot work-order-type">
          <button className="yellowbtn">
            {/* Render CSVLink with onClick event */}
            <CSVLink data={workOrderTypeData} onClick={() => getCSVFunction()}>
              Export
            </CSVLink>
          </button>
          <Link to="/add-work-order-type">
            <button className="bluebtn">Add New</button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
