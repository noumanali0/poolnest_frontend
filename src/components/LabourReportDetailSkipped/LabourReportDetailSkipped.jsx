import React, { Fragment, useState, useEffect } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import { chemicalData } from "../../Data/Data";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";

export default function LabourReportDetailSkipped() {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const { data: skippedStopReport, status } = useSelector(
    (state) => state.skippedStopReport
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
    setTotalPages(skippedStopReport.totalPages);
    setpostsPerPage(skippedStopReport.pageSize);
    settotalPost(skippedStopReport.totalCount);
  }, [skippedStopReport]);
  return (
    <Fragment>
      <div className="routedashboard mainpage customertable">
        <div className="ct-chart" id="chartActivity">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer</th>

                <th>Pool</th>
                <th>Route Assignment</th>
              </tr>
            </thead>

            <tbody>
              {skippedStopReport?.items?.map((item, key) => (
                <tr>
                  <td>{formatDate(item?.SkippedDate)}</td>
                  <td>
                    <b>
                      {
                        item?.SkipRouteAssignmentRouteAssignmentData
                          ?.RouteAssignmentWaterBody
                          ?.RouteAssignmentServiceLocation
                          ?.CustomerServiceLocation?.first_name
                      }
                    </b>
                  </td>
                  <td>
                    {
                      item?.SkipRouteAssignmentRouteAssignmentData
                        ?.RouteAssignmentWaterBody?.name
                    }
                  </td>
                  <td>
                    {
                      item?.SkipRouteAssignmentRouteAssignmentData
                        ?.RouteAssignmentFrequency?.name
                    }
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
