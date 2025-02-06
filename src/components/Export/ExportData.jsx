import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { CSVLink, CSVDownload } from "react-csv";

const AddChecklistform = () => {
  const { data: getCustomer, statusdata } = useSelector(
    (state) => state.getCustomer
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = getCustomer?.items
    ? getCustomer?.items
    : [
        ["firstname", "lastname", "email"],
        ["Ahmed", "Tomi", "ah@smthing.co.com"],
        ["Raed", "Labes", "rl@smthing.co.com"],
        ["Yezzi", "Min l3b", "ymin@cocococo.com"],
      ];

  console.log(getCustomer);
  return (
    <div className="routedashboard mainpage customertable">
      <div className="ct-chart" id="chartActivity">
        <table>
          <thead>
            <tr>
              <th>Data Name</th>
              <th></th>
              <th></th>
              <th>Button</th>
              <th> </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan={3}>Customer</td>
              <td colSpan={3}>
                <button type="submit" className="exportbtn">
                  <CSVLink data={data}>Export</CSVLink>
                </button>
              </td>
            </tr>

            <tr>
              <td colSpan={3}>Service History</td>
              <td colSpan={3}>
                <button type="submit" className="exportbtn">
                  <CSVLink data={data}>Export</CSVLink>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddChecklistform;
