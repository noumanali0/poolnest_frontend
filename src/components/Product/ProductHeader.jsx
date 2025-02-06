import React, { Fragment, useEffect } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProductCSVData } from "../../redux/Slices/getCSVData";

export default function ProductHeader() {
  const dispatch = useDispatch();
  const { data: getCSVData, isloading } = useSelector(
    (state) => state.getCSVData
  );

  const getCSVFunction = async () => {
    // Fetch CSV data when the "Export" button is clicked
    await dispatch(fetchProductCSVData());
  };

  useEffect(() => {
    dispatch(fetchProductCSVData());
  }, [dispatch]);
  return (
    <Fragment>
      <div
        className="row customers"
        onClick={() => console.log(getCSVData, "<====data")}
      >
        <div className="col-sm-5 equipmentssss woth work-order-type">
          <h2>Products</h2>
        </div>
        <div className="col-sm-7 right equipmentssss wot work-order-type">
          <button className="yellowbtn">
            <CSVLink data={getCSVData} onClick={() => getCSVFunction()}>
              Export
            </CSVLink>
          </button>

          <Link to="/add-product">
            <button className="bluebtn">Add New</button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
