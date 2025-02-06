import React, { useEffect, useState } from "react";
import Loader from "../NoDataComponent/Loader.jsx";
import { useDispatch } from "react-redux";
import { fetchgetInvoiceRetrieveServiceDetail } from "../../redux/Slices/getInvoiceRetrieveServiceDetail.js";
import { useSelector } from "react-redux";
import { RiDeleteBin3Line } from "react-icons/ri";
import { Skeleton } from "antd";
import { HiSave } from "react-icons/hi";
import {
  putInvoiceDosageEditData,
  putInvoiceItemEditData,
  resetData,
} from "../../redux/postReducer/postNewInvoiceRow.js";
import { toast } from "react-toastify";

const RetrieveServiceDetailModal = ({ data }) => {
  let id = data?.servicesId;
  const { dosagesuccess, error, loading } = useSelector(
    (state) => state.postInvoiceRow
  );

  const { itemsuccess , itemerror } = useSelector(
    (state) => state.postInvoiceRow
  );

  const [EditData, setEditData] = useState(false);

  const [cost_per_unit, setcost_per_unit] = useState("");
  const [price_per_unit, setprice_per_unit] = useState("");
  const [valuesdata, setvalues] = useState("");

  const [pricedata, setprice] = useState("");
  const [isTaxabledata, setisTaxable] = useState("");
  const [isInvoiceddata, setisInvoiced] = useState("");

  const dispatch = useDispatch();
  const { data: InvoiceRetrieveServiceDetail, statusdata } = useSelector(
    (state) => state.InvoiceRetrieveServiceDetail
  );

  useEffect(() => {
    dispatch(fetchgetInvoiceRetrieveServiceDetail({ id }));
  }, [dispatch]);

  const EditFunction = () => {
    setEditData(!EditData);
  };

  const SaveFunction = (id) => {
    const values = {};
      if (cost_per_unit !== "") {
      values.cost_per_unit = cost_per_unit;
    }
      if (price_per_unit !== "") {
      values.price_per_unit = price_per_unit;
    }
      if (valuesdata) {
      values.values = valuesdata;
    }
      dispatch(putInvoiceDosageEditData({ id, values }));
  };
  

  const SaveItemFunction = (id) => {
    const values = {};
  
    if (isTaxabledata !== "") {
      values.isTaxable = isTaxabledata;
    }
  
    if (isInvoiceddata !== "") {
      values.isInvoiced = isInvoiceddata;
    }
  
    if (pricedata !== "") {
      values.price = pricedata;
    }
  
    dispatch(putInvoiceItemEditData({ id, values }));
  };
  


  useEffect(() => {
    if (dosagesuccess) {
      toast.success("Data Updated Successfully");
      dispatch(fetchgetInvoiceRetrieveServiceDetail({ id }));
      setvalues("")
      setprice_per_unit("")
      setcost_per_unit("")
      setEditData(false);
      dispatch(resetData());
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, dosagesuccess]);
  

  useEffect(() => {
    if (itemsuccess) {
      toast.success("Data Updated Successfully");
      dispatch(fetchgetInvoiceRetrieveServiceDetail({ id }));
      setprice("")
      setisInvoiced("")
      setisTaxable("")
      setEditData(false);
      dispatch(resetData());
    }
    if (itemerror) {
      toast.error(itemerror);
      dispatch(resetData());
    }
  }, [itemerror, itemsuccess]);

  
  return (
    <>
      {statusdata == "loading" ? (
        <Loader />
      ) : (
        <>
          {
            <div className="row cslocation">
              <div className="col-sm-12 editInvoice">
                <button className="bluebtn" onClick={EditFunction}>
                  Edit
                </button>
              </div>
            </div>
          }
          <div className="row retrivedata cslocation">
            <div className="col-sm-6">
              <div className="routedashboard mainpage customertable">
                <div>
                  {InvoiceRetrieveServiceDetail &&
                  InvoiceRetrieveServiceDetail?.Dosages?.length == 0 ? (
                    <div className="nodata_div">
                      <h2>No Data Found</h2>
                      <Skeleton />
                    </div>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>Dosage Name</th>
                          <th>Value</th>
                          <th>Cost</th>
                          <th>Price</th>
                          <th>Unit</th>
                        </tr>
                      </thead>

                      <tbody>
                        {InvoiceRetrieveServiceDetail?.Dosages?.map(
                          (item, i) => (
                            <tr>
                              <td className="table-head">
                                {
                                  item?.CompletedServiceRoutesDosageDosageData
                                    ?.name
                                }
                              </td>
                              <td className="table-head">
                                {EditData ? (
                                  <input
                                    type="text"
                                    placeholder="Value"
                                    defaultValue={item?.values}
                                    onChange={(e) => setvalues(e.target.value)}
                                    className="edittextcss1"
                                  />
                                ) : (
                                  <> {item?.values}</>
                                )}
                              </td>
                              <td className="table-head">
                                {EditData ? (
                                  <input
                                    type="number"
                                    placeholder="Cost"
                                    defaultValue={item?.cost_per_unit}
                                    onChange={(e) =>
                                      setcost_per_unit(e.target.value)
                                    }
                                    className="edittextcss1"
                                  />
                                ) : (
                                  <> {item?.cost_per_unit} $</>
                                )}
                              </td>
                              <td className="table-head">
                                {EditData ? (
                                  <input
                                    type="number"
                                    placeholder="Price Per Unit"
                                    defaultValue={item?.price_per_unit}
                                    onChange={(e) =>
                                      setprice_per_unit(e.target.value)
                                    }
                                    className="edittextcss1"
                                  />
                                ) : (
                                  <> {item?.price_per_unit} $</>
                                )}
                              </td>
                              <td className="table-head">
                                {
                                  item?.CompletedServiceRoutesDosageDosageData
                                    ?.unit_of_measurement
                                }
                              </td>
                              {EditData ? (
                                <td>
                                  <HiSave
                                    onClick={() => SaveFunction(item._id)}
                                    className="newIcon2"
                                  />
                                </td>
                              ) : (
                                <></>
                              )}
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="routedashboard mainpage customertable">
                <div>
                  {InvoiceRetrieveServiceDetail &&
                  InvoiceRetrieveServiceDetail?.Items?.length == 0 ? (
                    <div className="nodata_div">
                      <h2>No Data Found</h2>
                      <Skeleton />
                    </div>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>Item Name</th>

                          <th>Description</th>
                          <th>isInvoiced</th>
                          <th>isTaxable</th>
                          <th>Price</th>

                          {/* <th>Unit</th> */}
                        </tr>
                      </thead>

                      <tbody>
                        {InvoiceRetrieveServiceDetail?.Items?.map((item, i) => (
                          <tr>
                            <td className="table-head">
                              {
                                item
                                  ?.CompletedServiceRouteItemNeededItemNeededData
                                  ?.name
                              }
                            </td>
                            <td className="table-head">
                              {
                                item
                                  ?.CompletedServiceRouteItemNeededItemNeededData
                                  ?.description
                              }
                            </td>
                            <td className="table-head">
                              {EditData ? (
                                <select
                                  className="edittextcss1"
                                  defaultValue={item.isInvoiced}
                                  onChange={(e) =>
                                    setisInvoiced(e.target.value)
                                  }
                                >
                                  <option value={true}>Yes</option>
                                  <option value={false}>No</option>
                                </select>
                              ) : (
                                <> {item.isInvoiced ? "Yes" : "No"}</>
                              )}
                            </td>
                            <td className="table-head">
                              {EditData ? (
                                <select
                                  className="edittextcss1"
                                  defaultValue={item.isTaxable}
                                  onChange={(e) => setisTaxable(e.target.value)}
                                >
                                  <option value={true}>Yes</option>
                                  <option value={false}>No</option>
                                </select>
                              ) : (
                                <> {item.isTaxable ? "Yes" : "No"}</>
                              )}
                            </td>
                            <td className="table-head">
                              {EditData ? (
                                <input
                                  type="number"
                                  placeholder="Value"
                                  defaultValue={item.price}
                                  onChange={(e) => setprice(e.target.value)}
                                  className="edittextcss1"
                                />
                              ) : (
                                <> {item.price}</>
                              )}
                            </td>
                            {EditData ? (
                              <td>
                                <HiSave
                                  onClick={() => SaveItemFunction(item._id)}
                                  className="newIcon2"
                                />
                              </td>
                            ) : (
                              <></>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RetrieveServiceDetailModal;
