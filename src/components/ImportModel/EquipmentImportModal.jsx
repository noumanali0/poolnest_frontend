import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { message } from "antd";
import {
  UploadModelDataEquitment,
  resetData,
} from "../../redux/postReducer/postUploadModel";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchgetCustomers } from "../../redux/Slices/getCustomer";
import Loader from "../NoDataComponent/Loader";
import Papa from "papaparse";
import axios from "axios";
import { fetchgetAllEquipmemnt } from "../../redux/Slices/getAllEquipment";

const EquipmentImportModal = ({ data1 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [fileContent, setFileContent] = useState(null);
  const [state, setState] = useState({
    fileName: "",
    fileContent: "",
    parsedContent: [],
    errorContent: null,
  });

  const { data, successEquitment, errorEquitment, loading } = useSelector(
    (state) => state.UploadModel
  );
  const dispatch = useDispatch();

  const onSelectFile = (e) => {
    const file = e.target.files[0];
    setFileContent(file);
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      setState({
        fileName: file.name,
        fileContent: reader.result,
        parsedContent: [],
        errorContent: null,
      });

      if (
        file.type === "application/vnd.ms-excel" ||
        file.name.endsWith(".csv")
      ) {
        Papa.parse(file, {
          header: true,
          complete: (result) => {
            setState((prevState) => ({
              ...prevState,
              parsedContent: result.data,
            }));
          },
        });
      }
    };

    reader.onerror = () => {
      message.error("Failed to read the file!");
    };
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", fileContent);

    const res = await dispatch(UploadModelDataEquitment({ formData }));
    const pdfLink = res?.payload?.PdfLink;

    if (pdfLink) {
      window.open(pdfLink, "_blank");
    }
  };

  useEffect(() => {
    if (successEquitment) {
      toast.success(successEquitment);
      dispatch(fetchgetAllEquipmemnt({}));
      dispatch(resetData());
      data1.handleCloseImport();
    }
    if (errorEquitment) {
      toast.error(errorEquitment);
      dispatch(resetData());
    }
  }, [errorEquitment, successEquitment, dispatch, data1]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="import_css">
          <input
            className="import_css_input"
            type="file"
            accept=".csv, application/json, .xlsx"
            onChange={onSelectFile}
          />
          {state.fileName && (
            <div className="file-preview">
              <p>
                <b>File Name:</b> {state.fileName}
              </p>
            </div>
          )}
          <div className="download_xlsx">
            <a href="/equipment.csv" download>
              <Button className="yellowbtn">Download Sample File</Button>
            </a>
          </div>
          <div className="upload_css_btn">
            <button className="bluebtn" onClick={handleSubmit}>
              Upload
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentImportModal;
