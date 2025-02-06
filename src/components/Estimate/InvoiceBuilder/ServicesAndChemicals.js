import React from "react";

/**
 * Receives:
 *   - services: Array of items like:
 *        { id: 1, description: "Per Visit Without Chems", qty: 20, rate: 3, total: 60 }
 *   - chemicals: Array of items like:
 *        { id: 1, name: "Chlorine", qty: 15, rate: 1 }
 *   - totalChemicals: e.g. 97.5 (if you want a single "Total Chemicals" line)
 *
 * Renders a layout that looks like:
 *   Service (lines)
 *   Chemicals:
 *      Chlorine ...
 *      Shock ...
 *   Total Chemicals: $xxx
 */
const ServicesAndChemicals = ({
  services = [],
  chemicals = [],
  totalChemicals = 0,
}) => {
  return (
    <div
      style={{
        padding: "2rem 0rem 0rem 0rem",
      }}
    >
      {/** 1) SERVICE LINES (Only if we have services) */}
      {services.length > 0 &&
        services.map((srv) => (
          <div
            key={srv.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <div style={{ fontWeight: "bold", width: "15%" }}>Service</div>
            <div style={{ width: "55%" }}>{srv.description}</div>
            <div style={{ width: "10%", textAlign: "right" }}>{srv.qty}</div>
            <div style={{ width: "20%", textAlign: "right" }}>
              {srv.total ? `$${srv.total.toFixed(2)}` : ""}
            </div>
          </div>
        ))}

      {/** 2) CHEMICALS SECTION (If we have chemicals) */}
      {chemicals.length > 0 && (
        <div
          style={{
            marginTop: services.length > 0 ? "1rem" : 0,
            display: "flex",
            padding: "0.5rem 0",
          }}
        >
          <div className="w-50"></div>
          <div className="w-50">
            <div style={{ fontWeight: "bold" }}>Chemicals:</div>
            <div style={{ marginTop: 8 }}>
              {chemicals.map((chem) => (
                <div
                  key={chem.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ width: "40%" }}>{chem.name}</div>
                  {/* e.g. "15 1" or "3 5" based on your screenshot */}
                  <div style={{ width: "60%", textAlign: "right" }}>
                    {chem.qty}{" "}
                    {chem.rate !== undefined ? `@ $${chem.rate}` : ""}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 6,
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
              }}
            >
              <div style={{ width: "40%" }}>Total Chemicals</div>
              <div style={{ width: "60%", textAlign: "right" }}>
                {totalChemicals ? `$${totalChemicals.toFixed(2)}` : ""}
              </div>
            </div>
          </div>

          {/** 2.1) If you want a "Total Chemicals" row at the bottom */}
        </div>
      )}
    </div>
  );
};

export default ServicesAndChemicals;
