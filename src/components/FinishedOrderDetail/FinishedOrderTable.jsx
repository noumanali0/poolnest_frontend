import React, { Fragment, useEffect, useState } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import Noti from "../../assets/img/more.png";
import { chemicalData } from "../../Data/Data";
import Round from "../../assets/img/GreenRound.png";
import { toast } from "react-toastify";
import Pagination from "../Pagination/Pagination";
import moment from "moment";
import { fetchworkorderReportByID } from "../../redux/Slices/getworkOrderReport";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function FinishedOrderTable({ data }) {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { id } = useParams();

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
    setTotalPages(data.totalPages);
    setpostsPerPage(data.pageSize);
    settotalPost(data.totalCount);
  }, []);

  useEffect(() => {
    dispatch(fetchworkorderReportByID({ StartDate, EndDate, id, currentPage }));
  }, [dispatch, StartDate, EndDate, currentPage]);

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
        <div className="ct-chart finishedOrder" id="chartActivity">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer</th>

                <th>Pool</th>
                <th>Work Order</th>
                <th>Sales Price</th>

                <th>Installed Items</th>
                <th>Labor Type</th>
              </tr>
            </thead>

            <tbody>
              {data?.items?.map((item, key) => (
                <tr>
                  <td>{formatDate(item?.ServiceDate)}</td>
                  <td>
                    <b>
                      {item?.CompletedServiceRoutesCustomerId?.first_name +
                        " " +
                        item?.CompletedServiceRoutesCustomerId?.last_name}
                    </b>
                  </td>
                  <td>{item?.CompletedServiceRoutesWaterBody?.name}</td>
                  <td>
                    Service Call <img src={Round} alt="" />{" "}
                  </td>
                  <td>${item?.WorkOrderLaborCost}</td>
                  <td>{item?.InstalledItems}</td>
                  <td>{item?.CompletedServiceLocationLaborTypeDetail?.name}</td>
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
