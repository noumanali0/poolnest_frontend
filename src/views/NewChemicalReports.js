import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import ChemicalDosageSearch from "../components/NewChemicalDosageReport/ChemicalDosageSearch";
import NewChemicalDosageFilter from "../components/NewChemicalDosageReport/NewChemicalDosageFilter";
import NewChemicalReportCustomerHeader from "../components/NewChemicalDosageReport/NewChemicalReportCustomerHeader";
import NewChemicalDosageCustomerTable from "../components/NewChemicalDosageReport/NewChemicalDosageCustomerTable";
import { fetchCustomerSummary } from "../redux/Slices/getchemicalReportSlice";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useSelector } from "react-redux";

function NewChemicalReports() {
  const [value, setValue] = useState("Customer");
  const [data, setData] = useState(null);

  const [StartDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [EndDate, setEndDate] = useState(
    moment().endOf("month").format("YYYY-MM-DD")
  );

  const dispatch = useDispatch();
  const { data: chemicalReport, status } = useSelector(
    (state) => state.chemicalReport
  );
  console.log(chemicalReport);

  useEffect(() => {
    dispatch(fetchCustomerSummary({ StartDate, EndDate }));
  }, [dispatch, StartDate, EndDate]);
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <div className="container-fluid">
            <ChemicalDosageSearch />
            <NewChemicalDosageFilter
              value={value}
              setValue={setValue}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
            <NewChemicalReportCustomerHeader data={chemicalReport} />
            <NewChemicalDosageCustomerTable data={chemicalReport} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default NewChemicalReports;
