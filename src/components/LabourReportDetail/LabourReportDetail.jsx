import React, { Fragment, useState, useEffect } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import Noti from "../../assets/img/more.png";
import { chemicalData } from "../../Data/Data";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";
import NoData from "../NoDataComponent/Loader";

export default function LabourReportDetail() {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { data: labourReport, statusdata } = useSelector(
    (state) => state.labourReport
  );

  const [TotalPages, setTotalPages] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const [totalPost, settotalPost] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (page) => setCurrentPage(page);

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}/${day}/${year}`;
  }
  useEffect(() => {
    setTotalPages(labourReport.totalPages);
    setpostsPerPage(labourReport.pageSize);
    settotalPost(labourReport.totalCount);
  }, [labourReport]);

  console.log(labourReport);

  return (
    <Fragment>
      <div className="routedashboard mainpage customertable">
        <div className="ct-chart" id="chartActivity">
          {statusdata == "loading" ? (
            <NoData />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Customer</th>

                  <th>Pool</th>
                  <th>Labor Cost/type</th>

                  <th>Labor Amount</th>
                </tr>
              </thead>

              <tbody>
                {labourReport?.items?.map((item, key) => (
                  <tr>
                    <td>{formatDate(item?.ServiceDate)}</td>

                    <td>
                      <b>{item?.first_name + " " + item?.last_name}</b>
                    </td>
                    <td>{item?.CompletedServiceRoutesWaterBody?.name}</td>
                    <td>
                      {item?.CompletedServiceLocationLaborTypeDetail?.name}
                    </td>
                    <td>${item?.LaborCost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

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
