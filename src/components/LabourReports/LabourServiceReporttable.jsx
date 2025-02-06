import React, { Fragment, useState, useEffect } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import Noti from "../../assets/img/more.png";
import { chemicalData } from "../../Data/Data";
import Analyze from "../../assets/img/Analyze.png";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import { useDispatch } from "react-redux";
import moment from "moment";
import { fetchlabourReport } from "../../redux/Slices/getlabourReportSlice";
import Loader from "../NoDataComponent/Loader";
import { useSelector } from "react-redux";

export default function LabourServiceReporttable({ data }) {
  const { data: labourReport } = useSelector((state) => state.labourReport);

  const [TotalPages, setTotalPages] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const [totalPost, settotalPost] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (page) => setCurrentPage(page);

  const [StartDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [EndDate, setEndDate] = useState(
    moment().endOf("month").format("YYYY-MM-DD")
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchlabourReport({ StartDate, EndDate, currentPage }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    setTotalPages(labourReport.totalPages);
    setpostsPerPage(labourReport.pageSize);
    settotalPost(labourReport.totalCount);
  }, [labourReport]);

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}/${day}/${year}`;
  }

  return (
    <Fragment>
      <div className="routedashboard mainpage customertable">
        <div className="ct-chart" id="chartActivity">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Tech</th>

                <th>Finished Stops</th>
                {/* <th>Labor Cost/Type</th> */}
                <th>labor Amount</th>

                <th></th>
              </tr>
            </thead>

            <tbody>
              {labourReport?.items?.map((item, key) => (
                <tr>
                  <td>{formatDate(item?.ServiceDate)}</td>
                  <td>
                    <b>
                      {item?.CompletedServiceRoutes_Technician_id?.first_name}
                    </b>
                  </td>
                  <td>{item?.FinishedStop}</td>
                  {/* <td>{item?.CompletedServiceLocationLaborTypeDetail?.name}</td> */}
                  <td>${item?.TotalAmount}</td>

                  <td></td>
                  <td>
                    <Link to={`/labor-report/${item?._id}`}>
                      <img src={Analyze} alt="" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={totalPost}
            TotalPages={TotalPages}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </Fragment>
  );
}
