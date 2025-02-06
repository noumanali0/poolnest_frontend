import React, { Fragment, useState } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import Noti from "../../assets/img/more.png";
import Analyze from "../../assets/img/Analyze.png";
import Pagination from "../Pagination/Pagination";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

export default function TechDetailTable({ data }) {
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

  // useEffect(() => {
  //     setTotalPages(labourReport.totalPages);
  //     setpostsPerPage(labourReport.pageSize);
  //     settotalPost(labourReport.totalCount);
  // },[labourReport]);

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
                <th>Customer</th>
                <th>Pool/SPA</th>
                {/* <th>Chemical</th>
                <th>Dosages</th> */}
                <th>Price</th>
                <th>Cost</th>
                <th>Profit</th>
              </tr>
            </thead>

            <tbody>
              {data?.result?.items?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{formatDate(item?.ServiceDate)}</td>
                    <td>{item?.CustomerName}</td>
                    <td>{item?.WaterBodyName}</td>
                    {/* <td>Tabs</td>
                    <td>{item?.DosageName}</td> */}
                    <td>${item?.TotalPrice}</td>
                    <td>${item?.TotalCost}</td>
                    <td>${item?.TotalProfit}</td>
                  </tr>
                );
              })}
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
