import React, { useState } from "react";
import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { Previewslides } from "../../Data/Data";
import InvoicingTable from "./InvoicingTable";
import { fetchInvoiceTemplate } from "../../redux/Slices/getInvoiceTemplateReportSlice";
import { useDispatch } from "react-redux";
import useSelection from "antd/es/table/hooks/useSelection";
import { toast } from "react-toastify";

export default function InvoicingHeader({ toggleFields }) {
  const myFunction = toggleFields?.toggleFields;

  const [loading, setloading] = useState(false);

  const dispatch = useDispatch();
  const parts1 = window.location.href;

  const parts = parts1.split("/");

  const ID = parts[4];
  const SID = parts[5];
  const StartDate = parts[6];
  const EndDate = parts[7];

  const handleSubmit = async () => {
    setloading(true);
    const res = await dispatch(
      fetchInvoiceTemplate({ ID, SID, StartDate, EndDate })
    );
    console.log(res);
    if (res?.error) {
      toast.error(res?.error?.message);
    } else {
      toast.success("Invoice Sent");
    }

    setloading(false);
  };
  console.log(loading);

  return (
    <Fragment>
      <div className="row customers invoicer">
        <div className="col-sm-10 ">
          <button className="bluebtn" onClick={myFunction}>
            {toggleFields?.isFieldsDisabled ? "Edit Invoice" : "Save Edits"}{" "}
          </button>
        </div>
        <div className="col-sm-2">
          <button disabled={loading} className="bluebtn" onClick={handleSubmit}>
            Send Invoice
          </button>
        </div>
      </div>
    </Fragment>
  );
}
