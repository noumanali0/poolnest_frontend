import React, { Fragment } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import { chemicalData } from "../../Data/Data";
import Analyze from "../../assets/img/Analyze.png";
import { toast } from "react-toastify";

export default function LabourReportSkippedTable() {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
              {array.map(() => (
                <tr>
                  <td>
                    <img
                      src={
                        chemicalData.image
                          ? chemicalData.image
                          : "../images/avatar.png"
                      }
                      alt="image"
                    />
                    <b>Alisher Lwani</b>
                  </td>
                  <td>01</td>

                  <td>
                    <img
                      src={chemicalData.image ? chemicalData.image : Analyze}
                      alt="image"
                    />
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
