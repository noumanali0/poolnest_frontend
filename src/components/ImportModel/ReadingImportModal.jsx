import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { message } from "antd";
import {
  UploadModelDataReading,
  resetData,
} from "../../redux/postReducer/postUploadModel";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../NoDataComponent/Loader";
import Papa from "papaparse";
import axios from "axios";
import { fetchgetAllreading } from "../../redux/Slices/getAllReading";

const ReadingImportModal = ({ data1 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [fileContent, setFileContent] = useState(null);
  const [showPdfButton, setShowPdfButton] = useState(false);
  const [pdfLinks, setPdfLink] = useState(null);
  const [state, setState] = useState({
    fileName: "",
    fileContent: "",
    parsedContent: [],
    errorContent: null,
  });

  const { data, successReading, errorReading, loadingReading } = useSelector(
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

    const res = await dispatch(UploadModelDataReading({ formData }));
    console.log(res, "<============res?.payload?");
    const pdfLink = res?.payload?.pdfPath;

    if (pdfLink) {
      setPdfLink(pdfLink);
      setShowPdfButton(true);
    }
  };
  const handleOpenPdf = () => {
    if (pdfLinks) {
      window.open(pdfLinks, "_blank");
    }
  };

  useEffect(() => {
    if (successReading) {
      toast.success(successReading);
      const size = 5000;
      dispatch(fetchgetAllreading({ size }));
      dispatch(resetData());
      data1.handleCloseImport();
      setShowPdfButton(false);
    }
    if (errorReading) {
      toast.error(errorReading);
      dispatch(resetData());
    }
  }, [errorReading, successReading, dispatch, data1]);

  return (
    <div>
      {loadingReading ? (
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
            <a href="/reading.csv" download>
              <Button className="yellowbtn">Download Sample File</Button>
            </a>
          </div>
          {showPdfButton && (
            <div className="pdf-download redBtnDiv">
              <Button onClick={handleOpenPdf} className="redBtn">
                View Errors
              </Button>
            </div>
          )}
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

export default ReadingImportModal;
