import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { message } from "antd";
import {
  UploadModelDataDosage,
  resetData,
} from "../../redux/postReducer/postUploadModel";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../NoDataComponent/Loader";
import Papa from "papaparse";
import { fetchgetAlldosage } from "../../redux/Slices/getAllDosages";

const DosageImportModal = ({ data1 }) => {
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

  const { data, successDosage, errorDosage, loadingDosage } = useSelector(
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

    const res = await dispatch(UploadModelDataDosage({ formData }));
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
    if (successDosage) {
      toast.success(successDosage);
      dispatch(fetchgetAlldosage({}));
      dispatch(resetData());
      data1.handleCloseImport();
      setShowPdfButton(false);
    }
    if (errorDosage) {
      toast.error(errorDosage);
      dispatch(resetData());
    }
  }, [errorDosage, successDosage, dispatch, data1]);

  return (
    <div>
      {loadingDosage ? (
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
            <a href="/dosage.csv" download>
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

export default DosageImportModal;
