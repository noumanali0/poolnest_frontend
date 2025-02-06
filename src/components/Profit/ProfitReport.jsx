import { Fragment, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { fetchgetWaterbodyProfitData } from "../../redux/Slices/getWaterbodyProfileData";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function ProfitReport({ Itemdata }) {
  const dispatch = useDispatch();

  const { data: getWaterbodyProfitData, status } = useSelector(
    (state) => state.getWaterbodyProfitData
  );

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}/${day}/${year}`;
  }

  console.log(getWaterbodyProfitData, " getWaterbodyProfitDatas");
  return (
    <Fragment>
      <div className="filteraccordian">
        <div className="main">
          <div className="row profileReportDescription cslocation">
            <div className="col-sm-8 profitMaker">
              <p>
                <b>Customer</b>{" "}
                {Itemdata ? Itemdata?.first_name + Itemdata?.last_name : ""}
              </p>
            </div>
            <div className="col-sm-4 totalProfitsssss">
              <p>
                <b>Total Profit: </b>$
                {Itemdata?.TotalProfit ? Itemdata?.TotalProfit : 0}
              </p>
            </div>
          </div>
          {getWaterbodyProfitData?.data?.map((item) => (
            <div className="row cslocation pprofitRepoort">
              <div className="col-sm-12">
                <Accordion defaultActiveKey="0" flush>
                  <Accordion.Item>
                    <Accordion.Header>
                      <div className="row">
                        <div className="col-sm-5 serviceLocation">
                          <p>
                            <b>Service Name: </b>
                            <br />
                            {item?.ServiceLocationName}
                          </p>
                        </div>
                        <div className="col-sm-4 poolWaterBody">
                          <p>
                            <b>Pool / Water Body: </b>
                            <br />
                            {item?.name}
                          </p>
                        </div>
                        <div className="col-sm-3 totalProfitsDetails">
                          <p>
                            <b>Total Profit: </b>
                            <br />${item?.TotalProfit}
                          </p>
                        </div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="row profitreportTableesssss">
                        <div className="col-sm-3">
                          <p>
                            <b>Service Rate </b>
                          </p>
                        </div>
                        <div className="col-sm-9">
                          <p>
                            ${item?.rate} {item?.RateTypeDetail?.label}
                          </p>
                        </div>
                        <div className="col-sm-3">
                          <p>
                            <b>Labor Cost </b>
                          </p>
                        </div>
                        <div className="col-sm-9">
                          <p>
                            ${item?.labor_cost} {item?.LaborCostDetail?.label}
                          </p>
                        </div>
                        {item?.RouteAssignmentWaterBody?.map((data) => {
                          return (
                            <>
                              <div className="col-sm-12 tableee">
                                {data?.CompletedServiceRouteAssignmentData
                                  ?.length == 0 ? (
                                  <></>
                                ) : (
                                  <>
                                    <table>
                                      <thead>
                                        <tr>
                                          <th>Service Date</th>
                                          <th>Labor Cost</th>
                                          <th>Rate</th>
                                          <th>Profit</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {data?.CompletedServiceRouteAssignmentData?.map(
                                          (service) => {
                                            return (
                                              <>
                                                <tr>
                                                  <td>{formatDate(service?.ServiceDate)}</td>
                                                  <td>${service?.LaborCost}</td>
                                                  <td>${service?.RateCost}</td>
                                                  <td>${service?.ServiceProfit}</td>
                                                </tr>
                                                <tr>
                                                  <td colSpan="3"><b>Service Profit</b></td>
                                                  <td colSpan="1" align="right">${service?.ServiceProfit}</td>
                                                </tr>
                                                <tr style={{border: 'unset'}} >
                                                  <td colSpan="4" style={{padding: '0'}} className="aboveTD">
                                                    <table>
                                                      <thead>
                                                        <tr>
                                                          <th>Chemicals</th>
                                                          <th>Dosages</th>
                                                          <th>Cost</th>
                                                          <th>Price</th>
                                                          <th>Profit</th>
                                                        </tr>
                                                      </thead>
                                                      <tbody>
                                                        {service?.CompletedServiceRoutesDosageActivity?.map(
                                                          (single) => {
                                                            return (
                                                              <tr>
                                                                <td>{single?.CompletedServiceRoutesDosageDosageValueData?.DosageData?.name}</td>
                                                                <td>{single?.CompletedServiceRoutesDosageDosageValueData?.DosageData?.unit_of_measurement}</td>
                                                                <td>${single?.TotalCost}</td>
                                                                <td>${single?.TotalPrice}</td>
                                                                <td>{single?.TotalProfit}</td>
                                                              </tr>
                                                            );
                                                          }
                                                        )}
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td colSpan="3"><b>Chemical Profit</b></td>
                                                  <td align="right">${service?.ChemicalProfit}</td>
                                                </tr>
                                                
                                              </>
                                            );
                                          }
                                        )}
                                      </tbody>
                                    </table>
                                  </>
                                )}
                              </div>
                            </>
                          );
                        })}
                        <div className="col-sm-12 tableee">
                          {getWaterbodyProfitData?.data
                            ?.CompletedServiceRoutesWaterBody?.length == 0 ? (
                            <></>
                          ) : (
                            <>
                              <table>
                                <thead>
                                  <tr>
                                    <th>Service Date</th>
                                    <th>WorkOrder Labor Cost</th>
                                    <th>WorkOrder Price</th>
                                    <th>Tax</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {getWaterbodyProfitData?.data?.CompletedServiceRoutesWaterBody?.map(
                                    (service) => {
                                      return (
                                        <>
                                          <tr>
                                            <td>{formatDate(service?.ServiceDate)}</td>
                                            <td>${service?.WorkOrderLaborCost}</td>
                                            <td>${service?.WorkOrderPrice}</td>
                                            <td>${service?.Tax}</td>
                                          </tr>
                                        </>
                                      );
                                    }
                                  )}
                                </tbody>
                              </table>
                            </>
                          )}
                        </div>
                      </div>
                      <table>
                        <tbody>
                          <tr>
                            <td colSpan="3"><b>Total Profit</b></td>
                            <td align="right">${item?.TotalProfit}</td>
                          </tr>
                        </tbody>
                      </table>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}
