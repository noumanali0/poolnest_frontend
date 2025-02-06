import React, { Fragment, useEffect } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import { chemicalData } from "../../Data/Data";
import Analyze from "../../assets/img/Analyze.png";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


export default function SkipStopTable({data}) {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  console.log(data)

  return (
    <Fragment>
      <div className="routedashboard mainpage customertable">
        <div className="ct-chart" id="chartActivity">
          <table>
            <thead>
              <tr>
                <th>Tech</th>
                <th>Skipped Stops</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {data?.items?.map((item, key) => (
                <tr key={key}>
                  <td>
                    <b>{item?.first_name + "" + item?.last_name}</b>
                  </td>
                  <td>{item?.FinishedWorkOrder}</td>

                  <td>
                    <Link to={`/skipped-stop/${item?._id}`}>
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
