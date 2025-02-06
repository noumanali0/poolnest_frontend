import React, { Fragment, useEffect, useState } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import Noti from "../../assets/img/more.png";
import Analyze from "../../assets/img/Analyze.png";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";
import Loader from "../NoDataComponent/Loader";
import Accordion from "react-bootstrap/Accordion";
import { Button, Modal, DatePicker } from "antd";
import { fetchInvoiceTemplate } from "../../redux/Slices/getInvoiceTemplateReportSlice";
import moment from "moment";
import { useDispatch } from "react-redux";
import { fetchgetInvoiceData } from "../../redux/Slices/getInvoiceData";
import { Tooltip } from "antd";

export default function InvoicingTable() {
  const { RangePicker } = DatePicker;

  const { data: getInvoiceData, statusdata } = useSelector(
    (state) => state.getInvoiceData
  );
  const { data: InvoiceTemplate, loading } = useSelector(
    (state) => state.InvoiceTemplate
  );

  const [StartDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [EndDate, setEndDate] = useState(
    moment().endOf("month").format("YYYY-MM-DD")
  );

  const [page, setpage] = useState(1);
  const [TotalPages, setTotalPages] = useState(1);
  const [totalPost, settotalPost] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const paginate = (page) => setpage(page);

  const [ID, setId] = useState("");
  const [SID, setSId] = useState("");
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState(null);
  const [disable, setdisable] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (e, _id, s_id) => {
    setId(_id);
    setSId(s_id);
    e.stopPropagation();
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDateChange = (dates, i) => {
    setStartDate(i[0]);
    setEndDate(i[1]);
  };
  useEffect(() => {
    dispatch(fetchgetInvoiceData({ StartDate, EndDate, page }));
  }, [page]);

  const handleAccordion = (id, StartDate, EndDate) => {};

  const handleSubmit = async () => {
    setdisable(true);
    await dispatch(fetchInvoiceTemplate({ ID, SID, StartDate, EndDate }));
    toast(InvoiceTemplate?.message);

    if (loading) {
      setdisable(false);
      setIsModalOpen(false);
      handleCancel();
    }
    setdisable(false);
  };

  useEffect(() => {
    setTotalPages(getInvoiceData?.totalPages);
    setpostsPerPage(getInvoiceData?.pageSize);
    settotalPost(getInvoiceData?.totalCount);
  }, [getInvoiceData]);

  useEffect(() => {
    if (loading) {
      setIsModalOpen(false);
      handleCancel();
    }
  }, [InvoiceTemplate, loading]);

  function getPaymentStatus(TotalToBePaid, PaidCount) {
    if (TotalToBePaid > 0 && TotalToBePaid === PaidCount) {
      return "paid";
    } else if (TotalToBePaid === 0 && PaidCount !== 0) {
      return "partial paid";
    } else if (TotalToBePaid !== 0 && PaidCount == 0) {
      return "not paid";
    } else {
      return "no invoice";
    }
  }

  const getBackgroundColor = (status) => {
    switch (status) {
      case "paid":
        return "green";
      case "partial paid":
        return "blue";
      case "not paid":
        return "red";
      case "no amount":
      case "status unknown":
      default:
        return "#fab51c ";
    }
  };

  return (
    <Fragment>
      {statusdata == "idle" ? (
        <div className="routedashboard mainpage customertable invoicingTables">
          <div className="ct-chart" id="chartActivity">
            <div className="row new-head-invoice cslocation">
              <div className="col-sm-2">Customer Name</div>
              <div className="col-sm-1">Address</div>
              <div className="col-sm-1">Route Stop</div>
              <div className="col-sm-1">Chemical Dosages</div>
              <div className="col-sm-1">Installed Items Service</div>
              <div className="col-sm-1">Work Order</div>
              <div className="col-sm-2">Paid This Month</div>
              <div className="col-sm-1">Total</div>
              <div className="col-sm-1">Status</div>
            </div>

            <hr />

            {getInvoiceData?.items?.map((item, key) => (
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
                    onClick={() => handleAccordion()}
                    className="invoice-header"
                  >
                    <div className="row invoice-css-data cslocation">
                      <div className="col-sm-2">
                        <b>{item?.first_name + " " + item?.last_name}</b>
                      </div>
                      <div className="col-sm-1">
                        <Tooltip title={item?.address}>
                          <span className="address-tooltip">
                            {item?.address?.substring(0, 10)}
                          </span>
                        </Tooltip>
                      </div>
                      <div className="col-sm-1">{item?.RoutesStop}</div>
                      <div className="col-sm-1">{item?.ChemicalDosage}</div>
                      <div className="col-sm-1">{item?.InstalledItems}</div>
                      <div className="col-sm-1">{item?.RoutesStop}</div>
                      <div className="col-sm-2">
                        $
                        {item?.AmountPaidThisMonth
                          ? item?.AmountPaidThisMonth
                          : "00"}
                      </div>
                      <div className="col-sm-1">
                        ${" "}
                        {item?.ServiceLocationChargesAfterTax
                          ? Math.round(item?.ServiceLocationChargesAfterTax)
                          : "00"}{" "}
                      </div>
                      <div
                        className="col-sm-1 notttPaid"
                        style={{
                          backgroundColor: getBackgroundColor(
                            getPaymentStatus(item.TotalToBePaid, item.PaidCount)
                          ),
                          color: "white",
                          textAlign: "center",
                          padding: "5px",
                          borderRadius: "5px",
                        }}
                      >
                        {getPaymentStatus(item.TotalToBePaid, item.PaidCount)}
                      </div>
                    </div>
                  </Accordion.Header>
                  <hr />
                  <Accordion.Body>
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>

                          <th>Route Stop</th>
                          <th>Chemical Dosages</th>

                          <th>Sales Tax</th>

                          <th>Charges Before Tax</th>

                          <th>Monthly Service Paid</th>

                          <th>Total</th>
                          <th>Action</th>
                          <th></th>
                        </tr>
                      </thead>

                      <tbody>
                        {item?.CustomerServiceLocation?.map((data, i) => (
                          <tr>
                            <td>{data?.name}</td>
                            <td>{data?.RoutesStop}</td>
                            <td>{data?.ChemicalDosage}</td>
                            <td>{data?.TotalSalesTax}</td>
                            <td>
                              $
                              {Math.round(
                                data?.ServiceLocationChargesBeforeTax
                              )}
                            </td>
                            <td>
                              $
                              {Math.round(
                                data?.AmountPaidThisMonthForServiceLocation
                              )}
                            </td>
                            <td>
                              $
                              {Math.round(data?.ServiceLocationChargesAfterTax)}
                            </td>

                            <td>
                              {data?.ServiceLocationChargesAfterTax ? (
                                <button
                                  className="SendInvoice"
                                  onClick={(e) =>
                                    showModal(e, item?._id, data?._id)
                                  }
                                >
                                  Send Invoice
                                </button>
                              ) : (
                                <button
                                  className="SendInvoice"
                                  style={{
                                    cursor: "not-allowed",
                                    background: "#b5b1ac",
                                  }}
                                >
                                  Send Invoice
                                </button>
                              )}
                            </td>
                            <td>
                              {data?.AmountPaidThisMonth == null ? (
                                <Link
                                  to={`/invoice-detail/${item?._id}/${data?._id}/${getInvoiceData?.start}/${getInvoiceData?.end}`}
                                >
                                  <img src={Analyze} alt="" />
                                </Link>
                              ) : (
                                <></>
                              )}
                            </td>
                            <Modal
                              title="Date Range"
                              open={isModalOpen}
                              onOk={handleOk}
                              onCancel={handleCancel}
                              footer={[
                                <Button
                                  key="submit"
                                  type="primary"
                                  onClick={() => handleSubmit()}
                                  disabled={disable}
                                >
                                  Send
                                </Button>,
                                <Button key="cancel" onClick={handleCancel}>
                                  Cancel
                                </Button>,
                              ]}
                            >
                              <form className="">
                                <DatePicker.RangePicker
                                  allowClear={true}
                                  onChange={handleDateChange}
                                  format="MM/DD/YYYY"
                                />
                              </form>
                            </Modal>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))}
          </div>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={totalPost}
            TotalPages={TotalPages}
            paginate={paginate}
            currentPage={page}
          />
        </div>
      ) : (
        <Loader />
      )}
    </Fragment>
  );
}
