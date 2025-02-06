import React, { Fragment, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchDashboardExpenses } from "../../redux/Slices/getDashboardExpenses";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
export default function Customers({ data }) {
  const dispatch = useDispatch();

  const { data: DashboardExpenses } = useSelector(
    (state) => state.DashboardExpenses
  );
  useEffect(() => {
    dispatch(fetchDashboardExpenses());
  }, [dispatch]);

  console.log(DashboardExpenses, "DashboardExpenses");
  return (
    <Fragment>
      <Card className="workorder customer routedashboard Expeensess">
        <Card.Header>
          <Card.Title as="h4">Expenses</Card.Title>
        </Card.Header>

        <Card.Body>
          <div className="ct-chart" id="chartActivity">
            <h6 className="Chemicalcss">Chemical Expenses</h6>

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Unit Of Measurement</th>
                  <th>Year Dosage Utilized</th>
                  <th>Year Expenses</th>
                  <th>Month Dosage Utilized</th>
                  <th>Month Expenses</th>
                </tr>
              </thead>

              <tbody>
                {DashboardExpenses?.Dosages?.map((item) => {
                  return (
                    <tr key={item.key}>
                      <td>
                        <b>{item?.name ? item?.name : "-"}</b>
                      </td>
                      <td>
                        {!item?.unit_of_measurement
                          ? "-"
                          : item?.unit_of_measurement}
                      </td>
                      <td>
                        {!item?.WeekDosageUtilized
                          ? "-"
                          : item?.WeekDosageUtilized}
                      </td>
                      <td>{!item.YearExpenses ? "-" : item.YearExpenses}</td>
                      <td>
                        {!item.MonthDosageUtilized
                          ? "-"
                          : item.MonthDosageUtilized}
                      </td>
                      <td>{!item.MonthExpenses ? "-" : item.MonthExpenses}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="ct-chart" id="chartActivity">
            <h6 className="Chemicalcss">Technician Expenses</h6>

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>MonthLaborAmount</th>
                  <th>WeekLaborAmount</th>
                  <th>WorkOrderWorksThisMonth</th>
                  <th>WorkOrderWorksThisYear</th>
                  <th>YearLaborAmount</th>
                </tr>
              </thead>

              <tbody>
                {DashboardExpenses?.Labor?.map((item) => {
                  return (
                    <tr key={item.key}>
                      <td>
                        <b>{item?.first_name + " " + item?.last_name}</b>
                      </td>
                      <td>
                        {!item?.MonthLaborAmount ? "-" : item?.MonthLaborAmount}
                      </td>
                      <td>
                        {!item?.WeekLaborAmount ? "-" : item?.WeekLaborAmount}
                      </td>
                      <td>
                        {!item.WorkOrderWorksThisMonth
                          ? "-"
                          : item.WorkOrderWorksThisMonth}
                      </td>
                      <td>
                        {!item.WorkOrderWorksThisYear
                          ? "-"
                          : item.WorkOrderWorksThisYear}
                      </td>
                      <td>
                        {!item.YearLaborAmount ? "-" : item.YearLaborAmount}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </Fragment>
  );
}
