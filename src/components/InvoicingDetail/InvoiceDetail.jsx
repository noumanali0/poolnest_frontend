import React, { Fragment, useEffect, useState } from "react";
import AddItemInvoice from "./AddItemInvoice";
import image1 from "../../assets/img/avatar.png";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { Nav, Dropdown, Button } from "react-bootstrap";
import RetrieveServiceDetailModal from "./RetrieveServiceDetailModal";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { IoCheckmarkCircle } from "react-icons/io5";
import {
  deleteMiscellaneousInvoice,
  putInvoiceEditData,
  resetData,
} from "../../redux/postReducer/postNewInvoiceRow";
import { toast } from "react-toastify";
import moment from "moment";
import { FaEye, FaTrash } from "react-icons/fa";
import { fetchgetinvoiceMiscellaneousListing } from "../../redux/Slices/getinvoiceMiscellaneousListing";
import { fetchgetInvoiceSingle } from "../../redux/Slices/getInvoiceDetail";
import ConfirmDeleteMiscellaneousInvoice from "./ConfirmDeleteMiscellaneousInvoice";

export default function InvoicingDetail({ data }) {
  const { data: getInvoiceDetail, status } = useSelector(
    (state) => state.getInvoiceDetail
  );

  const { newsuccess, error, loading } = useSelector(
    (state) => state.postInvoiceRow
  );
  const { data: invoiceMiscellaneousListing } = useSelector(
    (state) => state.invoiceMiscellaneousListing
  );

  const {
    deleteMiscellaneousLoading,
    deleteMiscellaneousSuccess,
    deleteMiscellaneousError,
  } = useSelector((state) => state.postInvoiceRow);
  console.log(deleteMiscellaneousSuccess);
  console.log(deleteMiscellaneousError);

  const [showNewRow, setshowNewRow] = useState(false);
  const [servicedate, setservicedate] = useState("");
  const [MonthlyInvoice, setMonthlyInvoice] = useState(false);

  const [RateData, setRateData] = useState("");
  const [LaborCostData, setLaborCostData] = useState("");
  const [PriceData, setPriceData] = useState("");
  const [TaxData, setTaxData] = useState("");
  const parts1 = window.location.href;

  const parts = parts1.split("/");

  // Extract the required variables

  const locationId = parts[5];
  const variable2 = parts[6]; // 2023-12-31T19:00:00Z
  const variable3 = parts[7]; // 2024-01-30T19:00:00Z
  const [StartDate, setStartDate] = useState(
    moment(variable2).startOf("month").format("YYYY-MM-DD")
  );
  const [EndDate, setEndDate] = useState(
    moment(variable3).endOf("month").format("YYYY-MM-DD")
  );
  const dispatch = useDispatch();
  dayjs.extend(customParseFormat);
  const dateFormat = "YYYY-MM-DD";
  const [servicesId, setservicesId] = useState();
  const [showEdit, setShowEdit] = useState(false);
  const handleShow = (id) => {
    setservicesId(id);
    setShowEdit(true);
  };
  const handleCloseEdit = () => {
    setShowEdit(false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const showModal = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    console.log(selectedId);
    await dispatch(deleteMiscellaneousInvoice({ id: selectedId }));
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const Id = parts[4];

  useEffect(() => {
    dispatch(fetchgetinvoiceMiscellaneousListing({ Id }));
  }, [dispatch]);

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}/${day}/${year}`;
  }

  function calculateTotalServiceChargesAfterTax(data1, data2) {
    let totalsales = data1 - data2;

    return totalsales.toFixed(0); // Return the total with 2 decimal places
  }

  const AddNewItem = () => {
    setshowNewRow(!showNewRow);
  };

  const AddNewMonthlyService = () => {
    setMonthlyInvoice(!MonthlyInvoice);
  };

  const invoiceEditData = (id, Tax, LaborCost, RateCost) => {
    const waterbody_id =
      getInvoiceDetail.CustomerServiceLocation &&
      getInvoiceDetail.CustomerServiceLocation[0]
        ?.RouteAssignmentServiceLocation[data?.keyData]?._id;

    const values = {
      RateCost: RateData ? RateData : RateCost,
      LaborCost: LaborCostData ? LaborCostData : LaborCost,
      Tax: TaxData ? TaxData : Tax,
      WaterBody: waterbody_id,
    };
    dispatch(putInvoiceEditData({ id, values }));
  };

  useEffect(() => {
    if (newsuccess) {
      toast.success("Data Submitted Successfully");
      dispatch(resetData());
      dispatch(fetchgetInvoiceSingle({ Id, locationId, StartDate, EndDate }));
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
    if (deleteMiscellaneousSuccess) {
      toast.success("Miscellaneous Invoice Deleted Successfully");
      dispatch(fetchgetinvoiceMiscellaneousListing({ Id }));
      dispatch(resetData());
    }
    if (deleteMiscellaneousError) {
      toast.error(deleteMiscellaneousError);
      dispatch(resetData());
    }
  }, [error, newsuccess, deleteMiscellaneousSuccess, deleteMiscellaneousError]);

  const handlechange = (e, date) => {
    setservicedate(date);
  };
  function formatNumber(value) {
    if (value) {
      let formattedValue = value;

      // Convert it back to a number to remove any trailing zeros if needed
      let numberValue = parseFloat(formattedValue);

      return numberValue;
    } else {
      return 0;
    }
  }
  return (
    <Fragment>
      <div className="routedashboard">
        <div className="container-fluid new-invoice">
          <div className="row cslocation">
            <div className="col-xs-12">
              <div className="invoice-title">
                <h2>Invoice</h2>
                <h3 className="pull-right">
                  {/* <button onClick={invoiceEditData}>Save</button> */}
                </h3>
              </div>
              <hr />
              <div className="row cslocation">
                <div className="col-xs-3">
                  <address>
                    <strong>Bill To:</strong>
                    <br />
                    <div
                      id="firstName"
                      contentEditable={!data?.isFieldsDisabled}
                    >
                      {getInvoiceDetail?.first_name +
                        " " +
                        getInvoiceDetail?.last_name}
                    </div>
                    <div
                      id="billingAddress"
                      contentEditable={!data?.isFieldsDisabled}
                    >
                      {getInvoiceDetail?.billing_address}
                    </div>
                    <div
                      id="mobile_no_primary"
                      contentEditable={!data?.isFieldsDisabled}
                    >
                      {getInvoiceDetail?.mobile_no_primary || "-"}
                    </div>
                    <div
                      id="billingAddress"
                      contentEditable={!data?.isFieldsDisabled}
                    >
                      {getInvoiceDetail?.email}
                    </div>
                  </address>
                </div>
                <div className="col-xs-3">
                  <address>
                    <strong className="text-left">Terms:</strong>
                    <br />
                    <div>Invoice Date:</div>
                    <div>Due Date:</div>
                  </address>
                </div>
                <div className="col-xs-4">
                  <address>
                    <strong>{getInvoiceDetail?.company_name || "-"}</strong>
                    <br />
                    {/* <div>-</div>
                    <div>-</div> */}
                    {/* <div>{getInvoiceDetail?.billing_address}</div> */}
                  </address>
                </div>
                <div className="col-xs-2">
                  <img
                    src={
                      getInvoiceDetail?.CustomerSuperAdmin?.image
                        ? getInvoiceDetail?.CustomerSuperAdmin?.image
                        : image1
                    }
                    alt=""
                    style={{ width: "100px" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row invoice-data-pool cslocation">
            <div className="col-sm-12">
              <div>
                {getInvoiceDetail.CustomerServiceLocation &&
                getInvoiceDetail.CustomerServiceLocation[0]
                  ?.RouteAssignmentServiceLocation?.length == 0 ? (
                  <p className="poolname-css">
                    {getInvoiceDetail.CustomerServiceLocation &&
                      getInvoiceDetail.CustomerServiceLocation[0]
                        ?.RouteAssignmentWorkOrderServiceLocation[data?.keyData]
                        .name}{" "}
                    (
                    {getInvoiceDetail.CustomerServiceLocation &&
                      getInvoiceDetail.CustomerServiceLocation[0]
                        ?.RouteAssignmentWorkOrderServiceLocation[data?.keyData]
                        .WaterBodyType?.name}
                    )
                  </p>
                ) : (
                  <p className="poolname-css">
                    {getInvoiceDetail.CustomerServiceLocation &&
                      getInvoiceDetail.CustomerServiceLocation[0]
                        ?.RouteAssignmentServiceLocation[data?.keyData]
                        .name}{" "}
                    (
                    {getInvoiceDetail.CustomerServiceLocation &&
                      getInvoiceDetail.CustomerServiceLocation[0]
                        ?.RouteAssignmentServiceLocation[data?.keyData]
                        .WaterBodyType?.name}
                    )
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="row cslocation">
            <div className="col-md-12">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title new-alignment">
                    <strong>Repairs/Work Orders/Items</strong>
                  </h3>
                </div>

                <div className="panel-body">
                  <div className="table-responsive">
                    <table className="table table-condensed">
                      <thead>
                        <tr>
                          <td>
                            <strong>Service Date</strong>
                          </td>
                          <td className="text-center">
                            <strong>Work Order Type/Product Type </strong>
                          </td>
                          <td className="text-center">
                            <strong>Installed Items</strong>
                          </td>
                          <td className="text-center">
                            <strong>Description</strong>
                          </td>

                          {/* <td className="text-center">
                            <strong>
                              {" "}
                              <Tooltip title="Items Charges Before Tax">
                                <span>ICBT</span>
                              </Tooltip>
                            </strong>
                          </td>
                          <td className="text-center">
                            <strong>
                              {" "}
                              <Tooltip title="Items Charges After Tax">
                                <span>ICAT</span>
                              </Tooltip>
                            </strong>
                          </td> */}
                          <td className="text-center">
                            <strong>Labor Qty</strong>
                          </td>
                          {/* <td className="text-center">
                            <strong>Labor Cost</strong>
                          </td> */}
                          {/* <td className="text-center">
                              <strong>Qty</strong>
                            </td> */}
                          <td className="text-center">
                            <strong>Parts/Product Price</strong>
                          </td>
                          <td className="text-center">
                            <strong>Tax</strong>
                          </td>
                          <td className="text-center">
                            <strong>Total</strong>
                          </td>
                          <td className="text-center">
                            <strong>Status</strong>
                          </td>
                          <td>
                            {/* <span className="addnewlist">
                              {
                                !showNewRow ? <IoMdAdd onClick={() => AddNewItem()}/> : <FaMinus  onClick={() => AddNewItem()}/>
                              }
                            </span> */}
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        {getInvoiceDetail.CustomerServiceLocation &&
                        getInvoiceDetail.CustomerServiceLocation[0]
                          ?.RouteAssignmentWorkOrderServiceLocation?.length !==
                          0 ? (
                          <>
                            {getInvoiceDetail.CustomerServiceLocation[0]?.RouteAssignmentWorkOrderServiceLocation[
                              data?.keyData
                            ].CompletedServiceRoutesWaterBodyWorkOrder?.map(
                              (item, key) => {
                                return (
                                  <>
                                    <tr>
                                      <td
                                      // contentEditable={
                                      //   !data?.isFieldsDisabled
                                      // }
                                      >
                                        {formatDate(item?.ServiceDate)}
                                      </td>
                                      <td
                                        className="text-center"
                                        // contentEditable={
                                        //   !data?.isFieldsDisabled
                                        // }
                                      >
                                        {
                                          item
                                            ?.CompletedServiceLocationLaborTypeDetail
                                            ?.label
                                        }
                                      </td>

                                      <td
                                        className="text-center InstalledItems"
                                        // contentEditable={
                                        //   !data?.isFieldsDisabled
                                        // }
                                      >
                                        {item?.InstalledItems}
                                      </td>
                                      <td
                                        className="text-center"
                                        // contentEditable={
                                        //   !data?.isFieldsDisabled
                                        // }
                                      >
                                        {item?.work_needed
                                          ? item?.work_needed
                                          : "-"}
                                      </td>

                                      {/* <td
                                      className="text-center InstalledItems"
                                      // contentEditable={
                                      //   !data?.isFieldsDisabled
                                      // }
                                    >
                                      {item?.ServiceChargesBeforeTax}
                                    </td> */}
                                      {/* 
                                    <td
                                      className="text-center InstalledItems"
                                      // contentEditable={
                                      //   !data?.isFieldsDisabled
                                      // }
                                    >
                                      {item?.ServiceChargesAfterTax}
                                    </td> */}
                                      <td
                                        className="text-center"
                                        contentEditable={
                                          !data?.isFieldsDisabled
                                        }
                                      >
                                        {!data?.isFieldsDisabled ? (
                                          <>
                                            <input
                                              type="number"
                                              placeholder="Rate Cost"
                                              defaultValue={item?.RateCost}
                                              onChange={(e) =>
                                                setRateData(e.target.value)
                                              }
                                              className="edittextcss"
                                            />
                                          </>
                                        ) : (
                                          <> {item?.RateCost}</>
                                        )}
                                      </td>

                                      {/* <td
                                      className="text-center"
                                      // contentEditable={!data?.isFieldsDisabled}
                                    >
                                      {!data?.isFieldsDisabled ? (
                                        <>
                                          <input
                                            type="number"
                                            placeholder="Labor Cost"
                                            defaultValue={item?.LaborCost}
                                            onChange={(e) =>
                                              setLaborCostData(e.target.value)
                                            }
                                            className="edittextcss"
                                          />
                                        </>
                                      ) : (
                                        <> ${item?.LaborCost}</>
                                      )}
                                    </td> */}
                                      {/* <td
                                        className="text-center"
                                        contentEditable={
                                          !data?.isFieldsDisabled
                                        }
                                      >
                                        1
                                      </td> */}
                                      <td
                                        className="text-center"
                                        // contentEditable={
                                        //   !data?.isFieldsDisabled
                                        // }
                                      >
                                        $
                                        {formatNumber(
                                          item?.ServiceChargesBeforeTax
                                        )}
                                      </td>
                                      <td
                                        className="text-center"
                                        contentEditable={
                                          !data?.isFieldsDisabled
                                        }
                                      >
                                        {!data?.isFieldsDisabled ? (
                                          <>
                                            <input
                                              type="number"
                                              placeholder="Tax"
                                              defaultValue={item?.Tax}
                                              onChange={(e) =>
                                                setTaxData(e.target.value)
                                              }
                                              className="edittextcss"
                                            />
                                          </>
                                        ) : (
                                          <> {item?.Tax}%</>
                                        )}
                                      </td>
                                      <td
                                        className="text-center"
                                        // contentEditable={
                                        //   !data?.isFieldsDisabled
                                        // }
                                      >
                                        ${item?.ServiceChargesAfterTax}
                                      </td>
                                      <td
                                        className="text-center"
                                        // contentEditable={
                                        //   !data?.isFieldsDisabled
                                        // }
                                      >
                                        {item?.PaidStatus ? "paid" : "unpaid"}
                                      </td>
                                      <td onClick={() => handleShow(item?._id)}>
                                        <FaEye className="newIcon2" />
                                      </td>
                                      {!data?.isFieldsDisabled ? (
                                        <td>
                                          <IoCheckmarkCircle
                                            onClick={() =>
                                              invoiceEditData(
                                                item._id,
                                                item?.Tax,
                                                item?.LaborCost,
                                                item?.RateCost
                                              )
                                            }
                                            className="newIcon2"
                                          />
                                        </td>
                                      ) : (
                                        <></>
                                      )}
                                    </tr>
                                    {item
                                      ?.CompletedServiceRouteItemNeededServiceData
                                      ?.length == 0 ? (
                                      <></>
                                    ) : (
                                      <>
                                        <tr className="bg-color">
                                          <td
                                            className="bg-color-header"
                                            colSpan="2"
                                          >
                                            Items
                                          </td>
                                          <td
                                            className="bg-color-header"
                                            colSpan="4"
                                          >
                                            Description
                                          </td>

                                          <td
                                            className="bg-color-header"
                                            colSpan="2"
                                          >
                                            isInvoiced
                                          </td>

                                          <td
                                            className="bg-color-header"
                                            colSpan="2"
                                          >
                                            Price
                                          </td>
                                        </tr>
                                        {item?.CompletedServiceRouteItemNeededServiceData?.map(
                                          (single) => {
                                            return (
                                              <tr className="bg-color">
                                                <td colSpan="2">
                                                  {
                                                    single
                                                      ?.CompletedServiceRouteItemNeededItemNeededData
                                                      ?.name
                                                  }
                                                </td>
                                                <td colSpan="4">
                                                  {
                                                    single
                                                      ?.CompletedServiceRouteItemNeededItemNeededData
                                                      ?.description
                                                  }
                                                </td>
                                                <td colSpan="2">
                                                  {single?.isInvoiced
                                                    ? "Paid"
                                                    : "UnPaid"}
                                                </td>

                                                <td colSpan="2">
                                                  ${single?.price}
                                                </td>
                                              </tr>
                                            );
                                          }
                                        )}
                                      </>
                                    )}
                                  </>
                                );
                              }
                            )}
                          </>
                        ) : (
                          <></>
                        )}

                        <tr>
                          <td className="no-line"></td>
                          <td className="no-line"></td>
                          <td className="no-line"></td>
                          <td className="no-line"></td>
                          <td className="no-line"></td>
                          {/* <td className="no-line"></td>
                          <td className="no-line"></td> */}
                          <td className="no-line"></td>
                          <td className="no-line"></td>
                          <td className="no-line text-center">
                            <strong>Sales Tax</strong>
                          </td>
                          <td
                            className="no-line text-center"
                            contentEditable={!data?.isFieldsDisabled}
                          >
                            {getInvoiceDetail.CustomerServiceLocation &&
                            getInvoiceDetail.CustomerServiceLocation[0]
                              ?.RouteAssignmentWorkOrderServiceLocation
                              ?.length !== 0 ? (
                              <>
                                {" "}
                                {getInvoiceDetail.CustomerServiceLocation &&
                                getInvoiceDetail.CustomerServiceLocation[0]
                                  ?.TotalSalesTax
                                  ? getInvoiceDetail.CustomerServiceLocation &&
                                    getInvoiceDetail.CustomerServiceLocation[0]
                                      ?.TotalSalesTax
                                  : 0}{" "}
                                %
                              </>
                            ) : (
                              <>0</>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td className="no-line"></td>
                          <td className="no-line"></td>
                          <td className="no-line"></td>
                          <td className="no-line"></td>
                          <td className="no-line"></td>
                          {/* <td className="no-line"></td>
                          <td className="no-line"></td> */}
                          <td className="no-line"></td>
                          <td className="no-line"></td>
                          <td className="no-line text-center">
                            <strong>Repairs/Work Order Total</strong>
                          </td>
                          <td
                            className="no-line text-center"
                            contentEditable={!data?.isFieldsDisabled}
                          >
                            {getInvoiceDetail.CustomerServiceLocation &&
                            getInvoiceDetail.CustomerServiceLocation[0]
                              ?.RouteAssignmentWorkOrderServiceLocation
                              ?.length !== 0 ? (
                              <>
                                {" "}
                                $
                                {formatNumber(
                                  getInvoiceDetail.CustomerServiceLocation &&
                                    getInvoiceDetail.CustomerServiceLocation[0]
                                      ?.RouteAssignmentWorkOrderServiceLocation[
                                      data?.keyData
                                    ]?.WaterBodyChargesAfterTax
                                )}
                              </>
                            ) : (
                              <>$0</>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title new-alignment">
                    <strong>Monthly Service</strong>
                  </h3>
                </div>
                <div className="panel-body">
                  <div className="table-responsive">
                    <table className="table table-condensed">
                      <thead>
                        <tr>
                          <td>
                            <strong>Service Date</strong>
                          </td>
                          <td className="text-center">
                            <strong>Product/Service </strong>
                          </td>
                          <td className="text-center">
                            <strong>Rate Type </strong>
                          </td>
                          <td className="text-center">
                            <strong>Frequency</strong>
                          </td>

                          {/* <td className="text-center">
                            <strong>
                              {" "}
                              <Tooltip title="Dosages Charges Before Tax">
                                <span>DCBT</span>
                              </Tooltip>
                            </strong>
                          </td>
                          <td className="text-center">
                            <strong>
                              {" "}
                              <Tooltip title="Dosages Charges After Tax">
                                <span>DCAT</span>
                              </Tooltip>
                            </strong>
                          </td>
                          <td className="text-center">
                            <strong>
                              {" "}
                              <Tooltip title="Items Charges Before Tax">
                                <span>ICBT</span>
                              </Tooltip>
                            </strong>
                          </td>
                          <td className="text-center">
                            <strong>
                              {" "}
                              <Tooltip title="Items Charges After Tax">
                                <span>ICAT</span>
                              </Tooltip>
                            </strong>
                          </td> */}

                          <td className="text-center">
                            <strong>Rate</strong>
                          </td>
                          {/* <td className="text-center">
                            <strong>Labor Cost</strong>
                          </td> */}
                          <td className="text-center">
                            <strong>Price</strong>
                          </td>
                          {/* <td className="text-center">
                              <strong></strong>
                            </td> */}
                          <td className="text-center">
                            <strong>Tax</strong>
                          </td>

                          <td className="text-center">
                            <strong>Total</strong>
                          </td>
                          <td className="text-center">
                            <strong>Status</strong>
                          </td>
                          <td></td>
                        </tr>
                      </thead>
                      {getInvoiceDetail.CustomerServiceLocation[0]
                        ?.RouteAssignmentServiceLocation?.length == 0 ? (
                        <tbody>
                          {getInvoiceDetail.CustomerServiceLocation &&
                            getInvoiceDetail.CustomerServiceLocation[0]?.RouteAssignmentWorkOrderServiceLocation[
                              data?.keyData
                            ].CompletedServiceRoutesWaterBodyWorkOrder?.map(
                              (item, key) => {
                                return (
                                  <>
                                    <tr>
                                      {
                                        <td
                                          // contentEditable={!data?.isFieldsDisabled}
                                          id="ServiceDate"
                                        >
                                          {formatDate(item?.ServiceDate)}
                                        </td>
                                      }

                                      <td
                                        className="text-center"
                                        // contentEditable={!data?.isFieldsDisabled}
                                      >
                                        {
                                          item
                                            ?.CompletedServiceLocationLaborTypeDetail
                                            ?.label
                                        }
                                      </td>
                                      <td
                                        className="text-center"
                                        // contentEditable={!data?.isFieldsDisabled}
                                      >
                                        {
                                          item
                                            ?.CompletedServiceLocationRateTypeDetail
                                            ?.label
                                        }
                                      </td>
                                      <td
                                        className="text-center"
                                        // contentEditable={!data?.isFieldsDisabled}
                                      >
                                        {item?.Frequency}
                                      </td>
                                      {/* <td
                                    className="text-center"
                                    // contentEditable={!data?.isFieldsDisabled}
                                  >
                                    {item?.DosagesChargesBeforeTax}
                                  </td>
                                  <td
                                    className="text-center"
                                    // contentEditable={!data?.isFieldsDisabled}
                                  >
                                    {item?.DosagesChargesAfterTax}
                                  </td>
                                  <td
                                    className="text-center"
                                    // contentEditable={!data?.isFieldsDisabled}
                                  >
                                    {item?.ItemsChargesBeforeTax}
                                  </td>
                                  <td
                                    className="text-center"
                                    // contentEditable={!data?.isFieldsDisabled}
                                  >
                                    {item?.ItemsChargesAfterTax}
                                  </td> */}
                                      <td
                                        className="text-center"
                                        contentEditable={
                                          !data?.isFieldsDisabled
                                        }
                                      >
                                        {!data?.isFieldsDisabled ? (
                                          <>
                                            <input
                                              type="number"
                                              placeholder="Rate Cost"
                                              defaultValue={item?.RateCost}
                                              onChange={(e) =>
                                                setRateData(e.target.value)
                                              }
                                              className="edittextcss"
                                            />
                                          </>
                                        ) : (
                                          <> ${item?.RateCost}</>
                                        )}
                                      </td>
                                      {/* <td
                                    className="text-center"
                                    // contentEditable={!data?.isFieldsDisabled}
                                  >
                                    {!data?.isFieldsDisabled ? (
                                      <>
                                        <input
                                          type="number"
                                          placeholder="Labor Cost"
                                          defaultValue={item?.LaborCost}
                                          onChange={(e) =>
                                            setLaborCostData(e.target.value)
                                          }
                                          className="edittextcss"
                                        />
                                      </>
                                    ) : (
                                      <> ${item?.LaborCost}</>
                                    )}
                                  </td> */}
                                      <td
                                        className="text-center"
                                        id="ServiceChargesBeforeTax"
                                        // contentEditable={!data?.isFieldsDisabled}
                                      >
                                        $
                                        {formatNumber(
                                          item?.ServiceChargesBeforeTax
                                        )}
                                      </td>
                                      {/* <td
                                    className="text-center"
                                    contentEditable={!data?.isFieldsDisabled}
                                  ></td> */}
                                      <td
                                        className="text-center"
                                        contentEditable={
                                          !data?.isFieldsDisabled
                                        }
                                        id="Tax"
                                      >
                                        {!data?.isFieldsDisabled ? (
                                          <>
                                            <input
                                              type="number"
                                              placeholder="Tax"
                                              defaultValue={item?.Tax}
                                              onChange={(e) =>
                                                setTaxData(e.target.value)
                                              }
                                              className="edittextcss"
                                            />
                                          </>
                                        ) : (
                                          <> {item?.Tax} %</>
                                        )}
                                        {/* {item?.Tax}% */}
                                      </td>
                                      <td className="text-center">
                                        ${item?.ServiceChargesAfterTax}
                                      </td>
                                      <td
                                        className="text-center"
                                        // contentEditable={!data?.isFieldsDisabled}
                                      >
                                        {item?.PaidStatus ? "paid" : "unpaid"}
                                      </td>
                                      <td onClick={() => handleShow(item?._id)}>
                                        <FaEye className="newIcon2" />
                                      </td>
                                      {!data?.isFieldsDisabled ? (
                                        <td>
                                          <IoCheckmarkCircle
                                            onClick={() =>
                                              invoiceEditData(
                                                item._id,
                                                item?.Tax,
                                                item?.LaborCost,
                                                item?.RateCost
                                              )
                                            }
                                            className="newIcon2"
                                          />
                                        </td>
                                      ) : (
                                        <></>
                                      )}
                                    </tr>
                                    <tr className="bg-color">
                                      <td
                                        className="bg-color-header"
                                        colSpan="2"
                                      >
                                        Chemicals
                                      </td>
                                      <td
                                        className="bg-color-header"
                                        colSpan="4"
                                      >
                                        QTY
                                      </td>
                                      <td
                                        className="bg-color-header"
                                        colSpan="2"
                                      >
                                        Cost
                                      </td>
                                      <td
                                        className="bg-color-header"
                                        colSpan="2"
                                      >
                                        Total
                                      </td>
                                    </tr>
                                    {item?.CompletedServiceRoutesDosageActivity?.map(
                                      (single) => {
                                        return (
                                          <tr className="bg-color">
                                            <td colSpan="2">
                                              {
                                                single
                                                  ?.CompletedServiceRoutesDosageDosageValueData
                                                  ?.DosageData?.name
                                              }
                                            </td>
                                            <td colSpan="4">
                                              {single?.values}
                                            </td>
                                            <td colSpan="2">
                                              ${single?.price_per_unit}
                                            </td>
                                            <td colSpan="2">
                                              $
                                              {single?.price_per_unit *
                                                single?.values}
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </>
                                );
                              }
                            )}

                          <tr>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>

                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="thick-line text-center">
                              <strong>Subtotal</strong>
                            </td>
                            <td
                              className="thick-line text-center"
                              contentEditable={!data?.isFieldsDisabled}
                            >
                              $
                              {getInvoiceDetail.CustomerServiceLocation &&
                                getInvoiceDetail.CustomerServiceLocation[0]
                                  ?.RouteAssignmentServiceLocation[
                                  data?.keyData
                                ]?.WaterBodyChargesBeforeTax}
                            </td>
                          </tr>
                          <tr>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>

                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line text-center">
                              <strong>Sales Tax</strong>
                            </td>
                            <td
                              className="no-line text-center"
                              contentEditable={!data?.isFieldsDisabled}
                            >
                              {getInvoiceDetail.CustomerServiceLocation &&
                              getInvoiceDetail.CustomerServiceLocation[0]
                                ?.TotalSalesTax
                                ? getInvoiceDetail.CustomerServiceLocation &&
                                  getInvoiceDetail.CustomerServiceLocation[0]
                                    ?.TotalSalesTax
                                : 0}
                              %
                            </td>
                          </tr>

                          <tr>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>

                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line text-center">
                              <strong>Discount</strong>
                            </td>
                            <td
                              className="no-line text-center"
                              contentEditable={!data?.isFieldsDisabled}
                            >
                              -
                            </td>
                          </tr>

                          <tr>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>

                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line text-center">
                              <strong>Monthly Service Total</strong>
                            </td>
                            <td
                              className="no-line text-center"
                              contentEditable={!data?.isFieldsDisabled}
                            >
                              $
                              {getInvoiceDetail.CustomerServiceLocation &&
                                getInvoiceDetail.CustomerServiceLocation[0]
                                  ?.RouteAssignmentServiceLocation[
                                  data?.keyData
                                ]?.WaterBodyChargesAfterTax}
                            </td>
                          </tr>

                          <tr>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            {/* <td className="no-line text-center"><strong>Total Due </strong></td>
                          <td className="no-line text-center" contentEditable={!data?.isFieldsDisabled}>${getInvoiceDetail?.Total}</td> */}
                          </tr>
                        </tbody>
                      ) : (
                        <tbody>
                          {getInvoiceDetail.CustomerServiceLocation &&
                            getInvoiceDetail.CustomerServiceLocation[0]?.RouteAssignmentServiceLocation[
                              data?.keyData
                            ].CompletedServiceRoutesWaterBody?.map(
                              (item, key) => {
                                return (
                                  <>
                                    <tr>
                                      {
                                        <td
                                          // contentEditable={!data?.isFieldsDisabled}
                                          id="ServiceDate"
                                        >
                                          {formatDate(item?.ServiceDate)}
                                        </td>
                                      }

                                      <td
                                        className="text-center"
                                        // contentEditable={!data?.isFieldsDisabled}
                                      >
                                        {
                                          item
                                            ?.CompletedServiceLocationLaborTypeDetail
                                            ?.label
                                        }
                                      </td>
                                      <td
                                        className="text-center"
                                        // contentEditable={!data?.isFieldsDisabled}
                                      >
                                        {
                                          item
                                            ?.CompletedServiceLocationRateTypeDetail
                                            ?.label
                                        }
                                      </td>
                                      <td
                                        className="text-center"
                                        // contentEditable={!data?.isFieldsDisabled}
                                      >
                                        {item?.Frequency}
                                      </td>
                                      {/* <td
                                      className="text-center"
                                      // contentEditable={!data?.isFieldsDisabled}
                                    >
                                      {item?.DosagesChargesBeforeTax}
                                    </td>
                                    <td
                                      className="text-center"
                                      // contentEditable={!data?.isFieldsDisabled}
                                    >
                                      {item?.DosagesChargesAfterTax}
                                    </td>
                                    <td
                                      className="text-center"
                                      // contentEditable={!data?.isFieldsDisabled}
                                    >
                                      {item?.ItemsChargesBeforeTax}
                                    </td>
                                    <td
                                      className="text-center"
                                      // contentEditable={!data?.isFieldsDisabled}
                                    >
                                      {item?.ItemsChargesAfterTax}
                                    </td> */}
                                      <td
                                        className="text-center"
                                        contentEditable={
                                          !data?.isFieldsDisabled
                                        }
                                      >
                                        {!data?.isFieldsDisabled ? (
                                          <>
                                            <input
                                              type="number"
                                              placeholder="Rate Cost"
                                              defaultValue={item?.RateCost}
                                              onChange={(e) =>
                                                setRateData(e.target.value)
                                              }
                                              className="edittextcss"
                                            />
                                          </>
                                        ) : (
                                          <> ${item?.RateCost}</>
                                        )}
                                      </td>
                                      {/* <td
                                      className="text-center"
                                      // contentEditable={!data?.isFieldsDisabled}
                                    >
                                      {!data?.isFieldsDisabled ? (
                                        <>
                                          <input
                                            type="number"
                                            placeholder="Labor Cost"
                                            defaultValue={item?.LaborCost}
                                            onChange={(e) =>
                                              setLaborCostData(e.target.value)
                                            }
                                            className="edittextcss"
                                          />
                                        </>
                                      ) : (
                                        <> ${item?.LaborCost}</>
                                      )}
                                    </td> */}
                                      <td
                                        className="text-center"
                                        id="ServiceChargesBeforeTax"
                                        // contentEditable={!data?.isFieldsDisabled}
                                      >
                                        $
                                        {formatNumber(
                                          item?.ServiceChargesBeforeTax
                                        )}
                                      </td>
                                      {/* <td
                                      className="text-center"
                                      contentEditable={!data?.isFieldsDisabled}
                                    ></td> */}
                                      <td
                                        className="text-center"
                                        contentEditable={
                                          !data?.isFieldsDisabled
                                        }
                                        id="Tax"
                                      >
                                        {!data?.isFieldsDisabled ? (
                                          <>
                                            <input
                                              type="number"
                                              placeholder="Tax"
                                              defaultValue={item?.Tax}
                                              onChange={(e) =>
                                                setTaxData(e.target.value)
                                              }
                                              className="edittextcss"
                                            />
                                          </>
                                        ) : (
                                          <> {item?.Tax} %</>
                                        )}
                                        {/* {item?.Tax}% */}
                                      </td>
                                      <td className="text-center">
                                        ${item?.ServiceChargesAfterTax}
                                      </td>
                                      <td
                                        className="text-center"
                                        // contentEditable={!data?.isFieldsDisabled}
                                      >
                                        {item?.PaidStatus ? "paid" : "unpaid"}
                                      </td>
                                      <td onClick={() => handleShow(item?._id)}>
                                        <FaEye className="newIcon2" />
                                      </td>
                                      {!data?.isFieldsDisabled ? (
                                        <td>
                                          <IoCheckmarkCircle
                                            onClick={() =>
                                              invoiceEditData(
                                                item._id,
                                                item?.Tax,
                                                item?.LaborCost,
                                                item?.RateCost
                                              )
                                            }
                                            className="newIcon2"
                                          />
                                        </td>
                                      ) : (
                                        <></>
                                      )}
                                    </tr>
                                    <tr className="bg-color">
                                      <td
                                        className="bg-color-header"
                                        colSpan="2"
                                      >
                                        Chemicals
                                      </td>
                                      <td
                                        className="bg-color-header"
                                        colSpan="4"
                                      >
                                        QTY
                                      </td>
                                      <td
                                        className="bg-color-header"
                                        colSpan="2"
                                      >
                                        Cost
                                      </td>
                                      <td
                                        className="bg-color-header"
                                        colSpan="2"
                                      >
                                        Total
                                      </td>
                                    </tr>
                                    {item?.CompletedServiceRoutesDosageActivity?.map(
                                      (single) => {
                                        return (
                                          <tr className="bg-color">
                                            <td colSpan="2">
                                              {
                                                single
                                                  ?.CompletedServiceRoutesDosageDosageValueData
                                                  ?.DosageData?.name
                                              }
                                            </td>
                                            <td colSpan="4">
                                              {single?.values}
                                            </td>
                                            <td colSpan="2">
                                              ${single?.price_per_unit}
                                            </td>
                                            <td colSpan="2">
                                              $
                                              {single?.price_per_unit *
                                                single?.values}
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </>
                                );
                              }
                            )}

                          <tr>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            {/* <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td> */}
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="thick-line text-center">
                              <strong>Subtotal</strong>
                            </td>
                            <td
                              className="thick-line text-center"
                              contentEditable={!data?.isFieldsDisabled}
                            >
                              $
                              {getInvoiceDetail.CustomerServiceLocation &&
                                getInvoiceDetail.CustomerServiceLocation[0]
                                  ?.RouteAssignmentServiceLocation[
                                  data?.keyData
                                ]?.WaterBodyChargesBeforeTax}
                            </td>
                          </tr>
                          <tr>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            {/* <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td> */}
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line text-center">
                              <strong>Sales Tax</strong>
                            </td>
                            <td
                              className="no-line text-center"
                              contentEditable={!data?.isFieldsDisabled}
                            >
                              {getInvoiceDetail.CustomerServiceLocation &&
                              getInvoiceDetail.CustomerServiceLocation[0]
                                ?.TotalSalesTax
                                ? getInvoiceDetail.CustomerServiceLocation &&
                                  getInvoiceDetail.CustomerServiceLocation[0]
                                    ?.TotalSalesTax
                                : 0}
                              %
                            </td>
                          </tr>

                          <tr>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            {/* <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td> */}
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line text-center">
                              <strong>Discount</strong>
                            </td>
                            <td
                              className="no-line text-center"
                              contentEditable={!data?.isFieldsDisabled}
                            >
                              -
                            </td>
                          </tr>

                          <tr>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            {/* <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td> */}
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line text-center">
                              <strong>Monthly Service Total</strong>
                            </td>
                            <td
                              className="no-line text-center"
                              contentEditable={!data?.isFieldsDisabled}
                            >
                              $
                              {formatNumber(
                                getInvoiceDetail.CustomerServiceLocation &&
                                  getInvoiceDetail.CustomerServiceLocation[0]
                                    ?.RouteAssignmentServiceLocation[
                                    data?.keyData
                                  ]?.WaterBodyChargesAfterTax
                              )}
                            </td>
                          </tr>

                          <tr>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            {/* <td className="no-line text-center"><strong>Total Due </strong></td>
                          <td className="no-line text-center" contentEditable={!data?.isFieldsDisabled}>${getInvoiceDetail?.Total}</td> */}
                          </tr>
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title new-alignment">
                    <strong onClick={() => AddNewItem()}>
                      {!showNewRow ? "Add New" : "Remove New Row"}
                    </strong>
                  </h3>
                </div>

                {showNewRow ? (
                  <AddItemInvoice showRow={setshowNewRow} />
                ) : (
                  <></>
                )}
                {invoiceMiscellaneousListing?.length == 0 ? (
                  <></>
                ) : (
                  <>
                    <div className="panel-heading">
                      <h3 className="panel-title new-alignment">
                        <strong>Miscellaneous Listing</strong>
                      </h3>
                    </div>
                    <table className="table table-condensed">
                      <thead>
                        <tr>
                          <td>
                            <strong>Service Date</strong>
                          </td>
                          <td className="text-center">
                            <strong> Technician </strong>
                          </td>
                          <td className="text-center">
                            <strong>Description</strong>
                          </td>
                          <td className="text-center">
                            <strong>Description To Client</strong>
                          </td>
                          <td className="text-center">
                            <strong>Labour Cost</strong>
                          </td>
                          {/* <td className="text-center">
            <strong>Qty</strong>
          </td> */}
                          <td className="text-center">
                            <strong>Price</strong>
                          </td>

                          <td className="text-center">
                            <strong>Tax</strong>
                          </td>

                          <td className="text-center">
                            <strong>Status</strong>
                          </td>
                          <td className="text-center">
                            <strong>Action</strong>
                          </td>

                          <td></td>
                          <td></td>
                        </tr>
                      </thead>
                      <tbody>
                        {invoiceMiscellaneousListing?.map((item, i) => {
                          return (
                            <tr style={{ textAlign: "center" }}>
                              <td style={{ textAlign: "start" }}>
                                {" "}
                                {formatDate(item?.ServiceDate)}
                              </td>
                              <td>
                                {" "}
                                {item?.InvoiceMiscellaneousModelTechData
                                  ?.first_name +
                                  " " +
                                  item?.InvoiceMiscellaneousModelTechData
                                    ?.last_name}
                              </td>
                              <td> {item?.Description}</td>
                              <td>
                                {" "}
                                {item?.ShowDescriptionToClient ? "Yes" : "No"}
                              </td>
                              <td> {item?.LaborCost}</td>
                              <td> {item?.PriceToBeCharge}</td>
                              <td> {item?.Tax}</td>
                              <td> {item?.PaidStatus ? "Paid" : "UnPaid"}</td>
                              <td>
                                <FaTrash onClick={() => showModal(item._id)} />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            </div>

            <div className="col-md-12">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title new-alignment">
                    <strong>Service Summary</strong>
                  </h3>
                </div>
                <div className="panel-body">
                  <div className="table-responsive">
                    <table className="table table-condensed">
                      <thead>
                        <tr>
                          <td>
                            <strong>Route Stops</strong>
                          </td>
                          <td className="text-center">
                            <strong>Skipped Stops</strong>
                          </td>
                          <td className="text-center">
                            <strong>Chemical Dosages </strong>
                          </td>
                          <td className="text-center">
                            <strong>Repairs/Work Orders</strong>
                          </td>
                          <td className="text-center">
                            <strong></strong>
                          </td>
                          <td className="text-center">
                            <strong></strong>
                          </td>
                          <td className="text-center">
                            <strong></strong>
                          </td>
                          <td className="text-center">
                            <strong>Installed Items</strong>
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        {getInvoiceDetail?.CustomerServiceLocation?.map(
                          (item, key) => {
                            return (
                              <tr>
                                <td contentEditable={!data?.isFieldsDisabled}>
                                  {item?.RoutesStop}
                                </td>
                                <td
                                  className="text-center"
                                  contentEditable={!data?.isFieldsDisabled}
                                >
                                  {item?.SkipStop}
                                </td>
                                <td
                                  className="text-center"
                                  contentEditable={!data?.isFieldsDisabled}
                                >
                                  {item?.ChemicalDosage}
                                </td>
                                <td
                                  className="text-center"
                                  contentEditable={!data?.isFieldsDisabled}
                                >
                                  {item?.TotalWorkOrder}
                                </td>
                                <td
                                  className="text-center"
                                  contentEditable={!data?.isFieldsDisabled}
                                ></td>
                                <td
                                  className="text-center"
                                  contentEditable={!data?.isFieldsDisabled}
                                ></td>
                                <td
                                  className="text-center"
                                  contentEditable={!data?.isFieldsDisabled}
                                ></td>
                                <td
                                  className="text-center"
                                  contentEditable={!data?.isFieldsDisabled}
                                >
                                  {item?.InstalledItems}
                                </td>
                              </tr>
                            );
                          }
                        )}

                        <tr>
                          <td className="no-line"></td>
                          <td className="no-line"></td>
                          <td className="no-line"></td>
                          <td className="no-line"></td>
                          <td className="no-line"></td>
                          <td className="no-line"></td>
                          <td className="no-line"></td>
                          <td className="thick-line text-center">
                            <strong>Subtotal</strong>
                          </td>
                          <td
                            className="thick-line text-center"
                            contentEditable={!data?.isFieldsDisabled}
                          >
                            $
                            {formatNumber(
                              getInvoiceDetail.CustomerServiceLocation &&
                                getInvoiceDetail.CustomerServiceLocation[0]
                                  ?.ServiceLocationChargesBeforeTax
                            )}
                          </td>
                        </tr>

                        <tr>
                          <td className="no-line"></td>
                          <td className="no-line"></td>
                          <td className="no-line"></td>
                          <td className="no-line"></td>
                          <td className="no-line"></td>
                          <td className="no-line"></td>
                          <td className="no-line"></td>
                          <td className="thick-line text-center">
                            <strong> Total</strong>
                          </td>
                          <td
                            className="thick-line text-center"
                            contentEditable={!data?.isFieldsDisabled}
                          >
                            $
                            {formatNumber(
                              getInvoiceDetail.CustomerServiceLocation &&
                                getInvoiceDetail.CustomerServiceLocation[0]
                                  ?.ServiceLocationChargesAfterTax
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showEdit}
        onHide={handleCloseEdit}
        animation={false}
        className="taxratemodal taxGrpModal EditInvoice"
      >
        <Modal.Body>
          Service Detail
          <Button variant="secondary" onClick={handleCloseEdit}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <RetrieveServiceDetailModal data={{ servicesId, handleCloseEdit }} />
      </Modal>
      {isModalOpen && (
        <ConfirmDeleteMiscellaneousInvoice
          handleCancel={handleCancel}
          handleOk={handleOk}
          isModalOpen={isModalOpen}
        />
      )}
    </Fragment>
  );
}
