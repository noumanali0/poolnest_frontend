import React, { useState } from "react";
import { Checkbox, Input } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";

const DefaultTaxUI = () => {
  // State for each checkbox
  const [serviceChecked, setServiceChecked] = useState(false);
  const [laborChecked, setLaborChecked] = useState(false);
  const [workOrderItemsChecked, setWorkOrderItemsChecked] = useState(false);
  const [installedItemsChecked, setInstalledItemsChecked] = useState(false);
  const [chemicalsChecked, setChemicalsChecked] = useState(false);
  const [otherChecked, setOtherChecked] = useState(false);

  return (
    <div
      className="container my-4"
      style={{
        gap: "5px",
        backgroundColor: "white",
        borderRadius: "12px",
        marginTop: "12px",
        padding: "10px",
      }}
    >
      <h4>Default Tax:</h4>

      {/* Gray box (use bg-light or custom styling) */}
      <div className="p-3">
        {/* Header Row */}
        <div className="row mb-2">
          <div className="col-4"></div>
          <div className="col-2 fw-bold">Taxed:</div>
          <div className="col-2 fw-bold">Default Tax Rate:</div>
        </div>

        {/* Service */}
        <div className="row mb-2">
          <div className="col-4">Service:</div>
          <div className="col-2">
            <Checkbox
              checked={serviceChecked}
              onChange={(e) => setServiceChecked(e.target.checked)}
            />
          </div>
          <div className="col-2">
            <Input placeholder="%" disabled={!serviceChecked} />
          </div>
        </div>

        {/* Work Orders */}
        <div className="row mb-2">
          <div className="col-4 fw-bold">Work Orders:</div>
        </div>

        {/* Work Orders -> Labor */}
        <div className="row mb-2 ms-5">
          <div className=" offset-1 col-3 ">Labor</div>
          <div className="col-2">
            <Checkbox
              checked={laborChecked}
              onChange={(e) => setLaborChecked(e.target.checked)}
            />
          </div>
          <div className="col-2">
            <Input placeholder="%" disabled={!laborChecked} />
          </div>
        </div>

        {/* Work Orders -> Installed Items */}
        <div className="row mb-2 ms-5">
          <div className="offset-1 col-3">Installed Items</div>
          <div className="col-2">
            <Checkbox
              checked={workOrderItemsChecked}
              onChange={(e) => setWorkOrderItemsChecked(e.target.checked)}
            />
          </div>
          <div className="col-2">
            <Input placeholder="%" disabled={!workOrderItemsChecked} />
          </div>
        </div>

        {/* Installed Items */}
        <div className="row mb-2">
          <div className="col-4">Installed Items:</div>
          <div className="col-2">
            <Checkbox
              checked={installedItemsChecked}
              onChange={(e) => setInstalledItemsChecked(e.target.checked)}
            />
          </div>
          <div className="col-2">
            <Input placeholder="%" disabled={!installedItemsChecked} />
          </div>
        </div>

        {/* Chemicals */}
        <div className="row mb-2">
          <div className="col-4">Chemicals:</div>
          <div className="col-2">
            <Checkbox
              checked={chemicalsChecked}
              onChange={(e) => setChemicalsChecked(e.target.checked)}
            />
          </div>
          <div className="col-2">
            <Input placeholder="%" disabled={!chemicalsChecked} />
          </div>
        </div>

        {/* Other */}
        <div className="row mb-2">
          <div className="col-4">Other:</div>
          <div className="col-2">
            <Checkbox
              checked={otherChecked}
              onChange={(e) => setOtherChecked(e.target.checked)}
            />
          </div>
          <div className="col-2">
            <Input placeholder="%" disabled={!otherChecked} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultTaxUI;
