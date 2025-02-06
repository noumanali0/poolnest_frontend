import React, { Fragment } from "react";
import InvoicingStackedChart from "./InvoicingStackedChart";
import full_screen_preview from "../../../assets/img/full-screen-preview.svg";
import InvoiceStatus from "./InvoiceStatus";
import InvoiceTable from "./InvoiceTable";

const InvoicingMain = () => {
  return (
    <Fragment>
      <div className="row position-relative">
        <div
          className="full-screen-preview__header"
          style={{ right: "12px", zIndex: "9999999999" }}
        >
          <img src={full_screen_preview} alt="not found" />
        </div>
        <div
          className="col-sm-12  "
          style={{ backgroundColor: "#fff", borderRadius: "12px" }}
        >
          <div className="d-flex flex-column align-items-center">
            <h3
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Invoice Status
            </h3>
            <div className="w-75 ">
              <InvoicingStackedChart />
            </div>

            <div className="col-sm-8">
              <div class="row">
                <div class="col-3"></div>
                <div class="col-8 d-flex justify-content-center">
                  {" "}
                  <p>
                    <strong>Overdue</strong>
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-3 d-flex justify-content-center">
                  {" "}
                  <p>
                    Current <br /> $12137
                  </p>
                </div>
                <div class="col-8">
                  <div className="d-flex justify-content-between border-top border-secondary">
                    <p>
                      1-15 Days <br /> $1030
                    </p>
                    <p>
                      16-30 Days <br /> $1063
                    </p>
                    <p>
                      31-45 Days <br /> $525
                    </p>
                    <p>
                      Above 45 Days <br /> $2905
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-sm-12 mt-5 "
          style={{ backgroundColor: "#fff", borderRadius: "12px" }}
        >
          <InvoiceStatus />
        </div>
        <div
          className="col-sm-12 mt-5"
          style={{ backgroundColor: "#fff", borderRadius: "12px" }}
        >
          <InvoiceTable />
        </div>
      </div>
    </Fragment>
  );
};

export default InvoicingMain;
