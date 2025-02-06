import React, { useEffect } from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchCheckListCsv,
  fetchProductCSVData,
} from "../../redux/Slices/getCSVData";
import { CSVLink } from "react-csv";

export default function CheckListHeader() {
  const dispatch = useDispatch();
  const { data: getCSVData, isloading } = useSelector(
    (state) => state.getCSVData
  );

  const getCSVFunction = async () => {
    // Fetch CSV data when the "Export" button is clicked
    await dispatch(fetchCheckListCsv());
  };

  useEffect(() => {
    // Fetch CSV data when the component mounts
    dispatch(fetchCheckListCsv());
  }, [dispatch]);
  return (
    <Fragment>
      <div className="row customers">
        <div className="col-sm-5 equipmentssss serviceCehcklist woth work-order-type">
          <h2>Service Checklist</h2>
        </div>
        <div className="col-sm-7 right equipmentssss wot work-order-type">
          <button className="yellowbtn">
            <CSVLink data={getCSVData} onClick={() => getCSVFunction()}>
              Export
            </CSVLink>
          </button>
          <Link to="/add-checklist">
            <button className="bluebtn">Add New</button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
