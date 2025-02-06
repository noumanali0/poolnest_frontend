import React, { Fragment } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import Noti from "../../assets/img/more.png";
import { chemicalData } from "../../Data/Data";

import { fetchgetAlldosage } from "../../redux/Slices/getAllDosages";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


export default function DosgesDetailTable() {
  const dispatch = useDispatch();


  useEffect(() => {
  },[])

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

                <th>Chemical</th>
                <th>Dosages</th>
                <th>Price</th>
                <th>Cost</th>
                <th>Profit</th>
              </tr>
            </thead>

            <tbody>
              {array.map(() => (
                <tr>
                  <td>12 May 2023</td>
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
                  <td>Kids Pool</td>

                  <td>01</td>
                  <td>$12</td>
                  <td>$120</td>
                  <td>$120</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}
