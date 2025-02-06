import React, { Fragment, useState } from "react";
import { Accordion } from "react-bootstrap";
import { useDispatch } from "react-redux";
import moment from "moment";
import { fetchgetAllCustomerSummaryDosageDetail } from "../../redux/Slices/getCustomerSummaryDosageDetail";
import { useSelector } from "react-redux";

export default function NewChemicalDosageCustomerTable({ data }) {
  const [TotalPages, setTotalPages] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const [totalPost, settotalPost] = useState(1);
  const [activeKey, setActiveKey] = useState(null);
  const { data: CustomerSummaryDosageDetail, statusdata } = useSelector(
    (state) => state.CustomerSummaryDosageDetail
  );
  const [currentPage, setCurrentPage] = useState(1);
  const paginate = (page) => setCurrentPage(page);
  const [StartDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [EndDate, setEndDate] = useState(
    moment().endOf("month").format("YYYY-MM-DD")
  );
  const dispatch = useDispatch();

  const handleAccordion = (id) => {
    dispatch(fetchgetAllCustomerSummaryDosageDetail({ id }));
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${month}/${day}/${year}`;
  }

  return (
    <Fragment>
      <div className="routedashboard mainpage customertable mainHeadChemical">
        <div>
          <div className="row newcss-1">
            <div className="col-sm-2">Name</div>
            <div className="col-sm-4">Address</div>
            <div className="col-sm-2">Total Cost</div>
            <div className="col-sm-2">Total Price</div>
            <div className="col-sm-2"> Total Profit</div>
          </div>
          {data?.items?.map((item, key) => {
            return (
              <Accordion
                activeKey={activeKey}
                onSelect={(key) => setActiveKey(key)}
                className="accordian-data-css"
              >
                <Accordion.Item
                  eventKey={key}
                  className="accordian-data-item-css"
                >
                  <Accordion.Header
                    onClick={() => handleAccordion(item._id)}
                    className="invoice-header"
                  >
                    <div className="row invoice-css-data cslocation">
                      <div className="col-sm-2">
                        <b>{item?.first_name + " " + item?.last_name}</b>
                      </div>
                      <div className="col-sm-4">{item?.address}</div>
                      <div className="col-sm-2">{item?.TotalCost}</div>
                      <div className="col-sm-2">{item?.TotalPrice}</div>
                      <div className="col-sm-2">{item?.TotalProfit}</div>
                    </div>
                  </Accordion.Header>
                  <hr />
                  <Accordion.Body>
                    <table>
                      <thead>
                        <tr>
                          <th>Chemical</th>

                          <th>Dosages</th>
                          <th>Unit </th>

                          <th>Total Price</th>
                          <th>Total Cost</th>
                          <th>Total Profit</th>

                          <th></th>
                        </tr>
                      </thead>

                      <tbody>
                        {statusdata ? (
                          <>
                            {CustomerSummaryDosageDetail?.data?.map(
                              (data, i) => (
                                <tr>
                                  <td>{data?.DosageName}</td>
                                  <td>{data?.values}</td>
                                  <td>{data?.unit}</td>
                                  <td>{data?.TotalPrice}</td>
                                  <td>{data?.TotalCost}</td>
                                  <td>{data?.TotalProfit}</td>
                                </tr>
                              )
                            )}
                          </>
                        ) : (
                          <h3>Loading ...</h3>
                        )}
                      </tbody>
                    </table>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            );
          })}
        </div>
        {/* {data?.items?.length > 0 ? (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={totalPost}
            TotalPages={TotalPages}
            paginate={paginate}
            currentPage={currentPage}
          />
        ) : (
          <></>
        )} */}
      </div>
    </Fragment>
  );
}
