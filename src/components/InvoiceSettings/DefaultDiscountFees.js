import React, { useState } from "react";
import { Checkbox, Input } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";

const DefaultDiscountFees = () => {
  const [discountEnabled, setDiscountEnabled] = useState(false);
  const [lateFeeEnabled, setLateFeeEnabled] = useState(false);
  const [gratuityEnabled, setGratuityEnabled] = useState(false);

  return (
    <div
      style={{
        gap: "5px",
        backgroundColor: "white",
        borderRadius: "12px",
        marginTop: "12px",
        padding: "10px",
      }}
    >
      <h5>Default Discount & Fees:</h5>

      {/* Light gray container */}
      <div className="p-3">
        {/* Default Discount Heading */}
        <div className="row mb-2">
          <div className="col fw-bold">Default Discount:</div>
        </div>

        {/* Discount Fields (indented) */}
        <div className="row mb-3 ms-4">
          <div className=" offset-1 col-auto d-flex align-items-center">
            <div className="col">
              <Checkbox
                className="me-2"
                checked={discountEnabled}
                onChange={(e) => setDiscountEnabled(e.target.checked)}
              />
            </div>
            <div className="col">
              <span className="me-2">Discount:</span>
            </div>
            <div className="col">
              <Input
                className="me-2"
                style={{ width: "80px" }}
                placeholder="Amount"
                disabled={!discountEnabled}
              />
            </div>
            <select style={{ width: "60px" }} disabled={!discountEnabled}>
              <option>$</option>
              <option>%</option>
            </select>
          </div>
        </div>

        {/* Late Payment Fees Heading */}
        <div className="row mb-2">
          <div className="col fw-bold">Late Payment Fees:</div>
        </div>

        {/* Late Payment Fee Checkbox & Text (indented) */}
        <div className="row mb-2 ms-4">
          <div className="col-auto d-flex align-items-center">
            <div className="col-1">
              <Checkbox
                className="me-2"
                checked={lateFeeEnabled}
                onChange={(e) => setLateFeeEnabled(e.target.checked)}
              />
            </div>
            <div className="col">
              <span>Automatically add a late payment fee</span>
            </div>
          </div>
        </div>

        {/* Days After Due Date (indented) */}
        <div className="row mb-2 ms-4">
          <div className="offset-1 col-auto d-flex align-items-center">
            <div className="col-4">
              <Input
                className="me-2"
                style={{ width: "60px" }}
                disabled={!lateFeeEnabled}
              />
            </div>
            <div className="col">
              <span>Days After Due Date</span>
            </div>
          </div>
        </div>

        {/* Fee Fields (indented) */}
        <div className="row mb-3 ms-4">
          <div className="offset-2 col-auto d-flex align-items-center">
            <div className="col">
              <span className="me-2">Fee:</span>
            </div>
            <div className="col">
              <Input
                className="me-2"
                style={{ width: "80px" }}
                placeholder="Amount"
                disabled={!lateFeeEnabled}
              />
            </div>
            <div className="col">
              <select style={{ width: "60px" }} disabled={!lateFeeEnabled}>
                <option>$</option>
                <option>%</option>
              </select>
            </div>
          </div>
        </div>

        {/* Enable Gratuity (not indented, but you can add "ms-4" if you want) */}
        <div className="row">
          <div className="col-auto d-flex align-items-center">
            <div className="">
              <span className="me-2">Enable Gratuity</span>
            </div>
            <div className="col">
              <Checkbox
                checked={gratuityEnabled}
                onChange={(e) => setGratuityEnabled(e.target.checked)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultDiscountFees;
