import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, Select, DatePicker, Radio } from "antd";
import { MdOutlineSaveAlt } from "react-icons/md";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchTechnician } from "../../redux/Slices/GetTechnician";
import {
  postInvoiceRowData,
  resetData,
} from "../../redux/postReducer/postNewInvoiceRow";
import { toast } from "react-toastify";
import { fetchgetinvoiceMiscellaneousListing } from "../../redux/Slices/getinvoiceMiscellaneousListing";
import moment from "moment";
import { fetchgetInvoiceSingle } from "../../redux/Slices/getInvoiceDetail";

const AddItemInvoice = ({ showRow }) => {
  const { data: Technician } = useSelector((state) => state.Technician);
  const { data: invoiceMiscellaneousListing } = useSelector(
    (state) => state.invoiceMiscellaneousListing
  );

  const { success, error, loading } = useSelector(
    (state) => state.postInvoiceRow
  );

  console.log(showRow);

  const parts1 = window.location.href;

  const parts = parts1.split("/");

  const Id = parts[4]; // 45441524-16d2-401b-9eed-edca9b156cdb
  const locationId = parts[5]; // 45441524-16d2-401b-9eed-edca9b156cdb
  const variable2 = parts[6]; // 2023-12-31T19:00:00Z
  const variable3 = parts[7]; // 2024-01-30T19:00:00Z

  const [StartDate, setStartDate] = useState(
    moment(variable2).startOf("month").format("YYYY-MM-DD")
  );
  const [EndDate, setEndDate] = useState(
    moment(variable3).endOf("month").format("YYYY-MM-DD")
  );

  const [ServiceDate, setServiceDate] = useState("");
  const [Description, setDescription] = useState("");
  const [LaborCost, setLaborCost] = useState("");
  const [Tax, setTax] = useState("");
  const [PaidStatus, setPaidStatus] = useState(false);
  const [technician_id, settechnician_id] = useState("");
  const [PriceToBeCharge, setPriceToBeCharge] = useState("");
  const [ShowDescriptionToClient, setShowDescriptionToClient] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTechnician({}));
  }, []);
  const handleSave = async () => {
    const values = {
      Description: Description,
      PriceToBeCharge: PriceToBeCharge,
      ShowDescriptionToClient: ShowDescriptionToClient,
      LaborCost: LaborCost,
      technician_id: technician_id,
      CustomerId: Id,
      Tax: Tax,
      ServiceLocation: locationId,
      ServiceDate: ServiceDate,
      PaidStatus: PaidStatus,
    };
    dispatch(postInvoiceRowData({ values }));
  };

  useEffect(() => {
    if (success) {
      toast.success("Data Submitted Successfully");
      dispatch(resetData());
      dispatch(fetchgetinvoiceMiscellaneousListing({ Id }));
      dispatch(fetchgetInvoiceSingle({ Id, locationId, StartDate, EndDate }));

      showRow((prevState) => !prevState);
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, success]);

  const handleChange = (e, date) => {
    setServiceDate(date);
  };
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}/${day}/${year}`;
  }
  console.log(invoiceMiscellaneousListing, "invoiceMiscellaneousListing");

  return (
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

          <td></td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="no-line text-center">
            <Form.Item className="editinvoice-forminput">
              <DatePicker
                onChange={handleChange}
                placeholder="Service date"
                className="editinvoice-input"
              />
            </Form.Item>
          </td>
          <td className="no-line text-center">
            <Form.Item className="editinvoice-forminput">
              <select
                onChange={(e) => settechnician_id(e.target.value)}
                placeholder="Technician Name"
                className="customselect-css"
              >
                <option value="">Select Technician</option>
                {Technician?.items?.map((item) => {
                  return (
                    <option value={item._id}>
                      {item.first_name + " " + item.last_name}
                    </option>
                  );
                })}
              </select>
            </Form.Item>
          </td>
          <td className="no-line text-center">
            <Form.Item className="editinvoice-forminput">
              <Input
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                type="text"
                className="editinvoice-input"
              />
            </Form.Item>
          </td>

          <td className="no-line text-center">
            {/* <Form.Item className="editinvoice-forminput">
              <Input
                onChange={(e) => setShowDescriptionToClient(e.target.value)}
                placeholder="Description To Client"
                type="text"
                className="editinvoice-input"
              />
            </Form.Item> */}

            <select
              onChange={(e) => setShowDescriptionToClient(e.target.value)}
              placeholder="Show Description"
              className="customselect-css"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </td>

          <td className="no-line text-center">
            {" "}
            <Form.Item className="editinvoice-forminput">
              <Input
                onChange={(e) => setLaborCost(e.target.value)}
                placeholder="LaborCost"
                type="number"
                className="editinvoice-input no-arrow"
              />
            </Form.Item>
          </td>

          <td className="no-line text-center">
            {" "}
            <Form.Item className="editinvoice-forminput">
              <Input
                onChange={(e) => setPriceToBeCharge(e.target.value)}
                placeholder="Price"
                type="number"
                className="editinvoice-input no-arrow"
              />
            </Form.Item>
          </td>

          <td className="no-line text-center">
            {" "}
            <Form.Item className="editinvoice-forminput">
              <Input
                onChange={(e) => setTax(e.target.value)}
                placeholder="Tax"
                type="number"
                className="editinvoice-input no-arrow"
              />
            </Form.Item>
          </td>

          <td>
            <select
              onChange={(e) => setPaidStatus(e.target.value)}
              placeholder="Paid Status"
              className="customselect-css"
            >
              <option value="false">False</option>
              <option value="true">True</option>
            </select>
          </td>

          {/* <td className="text-center">Unpaid</td> */}
          <td className="no-line text-center">
            <MdOutlineSaveAlt onClick={handleSave} className="addnewlist" />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default AddItemInvoice;
