import React, { Fragment, useState } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import Noti from "../../assets/img/more.png";
import Analyze from "../../assets/img/Analyze.png";
import Pagination from "../Pagination/Pagination";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

export default function NewChemicalTechSummaryTable({ data }) {
  const [TotalPages, setTotalPages] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const [totalPost, settotalPost] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const paginate = (page) => setCurrentPage(page);

  return (
    <Fragment>
      <div className="routedashboard mainpage customertable">
        <div className="ct-chart" id="chartActivity">
          <table>
            <thead>
              <tr>
                <th>Tech</th>
                <th>Pool Counts</th>
                <th>Total Price</th>
                <th>Total Cost</th>
                <th>Total Profit</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {data?.items?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item?.first_name + " " + item?.last_name}</td>
                    <td>{item?.TotalWaterBodies}</td>
                    <td>${item?.TotalPrice ? item?.TotalPrice : 0}</td>
                    <td>${item?.TotalCost ? item?.TotalCost : 0}</td>
                    <td>${item?.TotalProfit ? item?.TotalProfit : 0}</td>
                    <td>
                      <Link to={`/chemical-tech/${item?._id}`}>
                        <img src={Analyze} alt="" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {data?.items?.length > 0 ? 
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={totalPost}
            TotalPages={TotalPages}
            paginate={paginate}
            currentPage={currentPage}
          /> : <></>
           }
        </div>
      </div>
    </Fragment>
  );
}
