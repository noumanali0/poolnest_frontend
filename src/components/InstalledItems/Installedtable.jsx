import React, { Fragment, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { fetchinstalledItemsReport } from "../../redux/Slices/getinstalledItemsReport";
import Loader from "../NoDataComponent/Loader";

export default function Installedtable() {
  const [currentPage, setCurrentPage] = useState(11);
  const [isLoading, setIsLoading] = useState(false);

  const { data: installedItemsReport, statusdata } = useSelector(
    (state) => state.installedItemsReport
  );

  const [StartDate] = useState(moment().startOf("month").format("YYYY-MM-DD"));
  const [EndDate] = useState(moment().endOf("month").format("YYYY-MM-DD"));

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch initial data
    dispatch(
      fetchinstalledItemsReport({
        StartDate,
        EndDate,
        currentPage,
        pageSize: 11,
      })
    );
  }, [dispatch, StartDate, EndDate]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50 &&
      !isLoading &&
      currentPage < installedItemsReport.totalCount
    ) {
      setIsLoading(true);
      setCurrentPage((prevPage) => prevPage + 11);
    }
  }, [isLoading, currentPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (isLoading) {
      dispatch(
        fetchinstalledItemsReport({
          StartDate,
          EndDate,
          currentPage,
          pageSize: 11,
        })
      ).then(() => {
        setIsLoading(false);
      });
    }
  }, [isLoading, dispatch, StartDate, EndDate, currentPage]);

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
          {statusdata === "idle" ? (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Pool</th>
                  <th>Items Installed</th>
                  <th>Items Names</th>
                  <th>Labor Cost/Type</th>
                  <th>Labor Amount</th>
                  <th>Installed Item Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {installedItemsReport?.items?.map((item, key) => (
                  <tr key={key}>
                    <td>{formatDate(item?.ServiceDate)}</td>
                    <td>
                      <b>
                        {item?.CompletedServiceRoutesCustomerId?.first_name +
                          " " +
                          item?.CompletedServiceRoutesCustomerId?.last_name}
                      </b>
                    </td>
                    <td>{item?.CompletedServiceRoutesWaterBody?.name}</td>
                    <td>{item?.InstalledItems}</td>
                    <td>
                      {item?.CompletedServiceRouteItemNeededServiceData
                        ?.length > 1 ? (
                        item?.CompletedServiceRouteItemNeededServiceData?.map(
                          (itemNeeded, i) => (
                            <span key={i}>
                              {
                                itemNeeded
                                  ?.CompletedServiceRouteItemNeededItemNeededData
                                  ?.name
                              }
                              ,{" "}
                            </span>
                          )
                        )
                      ) : (
                        <>-</>
                      )}
                    </td>
                    <td>
                      {item?.CompletedServiceLocationLaborTypeDetail?.name}
                    </td>
                    <td>${item?.LaborCost}</td>
                    <td>
                      ${item?.InstalledItemTotal ? item?.InstalledItemTotal : 0}
                    </td>
                    <td>
                      {item?.PaidStatus ? (
                        <span className="paidclass">Paid</span>
                      ) : (
                        <span className="unpaidclass">Unpaid</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Loader />
          )}
          {isLoading && <Loader />}
        </div>
      </div>
    </Fragment>
  );
}
