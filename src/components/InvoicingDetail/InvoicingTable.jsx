import React, { Fragment } from "react";

import { chemicalData } from "../../Data/Data";

import { toast } from "react-toastify";

export default function InvoicingTable({data}) {
  const array = [1];
  return (
    <Fragment>
      <div className="routedashboard mainpage customertable">
        <div className="ct-chart" id="chartActivity">
          <table>
            <thead>
              <tr>
                <th>Customer Name</th>

                <th>Route Stop</th>
                <th>Chemical Dosages</th>

                <th>Installed Items Service || Work Order</th>

                <th>Work Order</th>

                <th>Total</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
            <tr>
                  <td>
                   
                    <b>{data?.Detail?.first_name +" " + data?.Detail?.last_name}</b>
                  </td>
                  <td>{data?.Detail?.RoutesStop}</td>
                  <td>{data?.Detail?.ChemicalDosage}</td>
                  <td>{data?.Detail?.InstalledItems}</td>
                  <td>{data?.Detail?.InstalledItems}</td>
                  <td>${data?.Detail?.Total}</td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}
