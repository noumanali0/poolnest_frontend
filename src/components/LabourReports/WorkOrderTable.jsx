import React, { Fragment } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import { chemicalData } from "../../Data/Data";
import Analyze from "../../assets/img/Analyze.png";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function WorkOrderTable({data}) {
  return (
    <Fragment>

      <div className="routedashboard mainpage customertable">
        <div className="ct-chart" id="chartActivity">
          <table>
            <thead>
              <tr>
                <th>Tech</th>
                <th>Finished Work Order</th>
                <th>Sales Price</th>
                <th>Job Cost</th>
                <th>Labor Amount</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {data?.items?.map((item, key) => (
                <tr>
                  <td>
                  <b>{item?.first_name + "" + item?.last_name}</b>
                  </td>
                  <td>{item?.FinishedWorkOrder ? Math.round(item?.FinishedWorkOrder) : 0}</td>
                  <td>{item?.SalesPrice ? Math.round(item?.SalesPrice) : 0}</td>
                  <td>{item?.JobCost ? Math.round(item?.JobCost) : 0}</td>
                  <td>${item?.LaborCost ? Math.round(item?.LaborCost) : 0}</td>
                  <td>
                    <Link to={`/finished-order/${item?._id}`}>
                      <img
                        src={chemicalData.image ? chemicalData.image : Analyze}
                        alt="image"
                      />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}
