import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import ChemicalDosageSearch from "../components/NewChemicalDosageReport/ChemicalDosageSearch";
import NewChemicalDosageFilter from "../components/NewChemicalDosageReport/NewChemicalDosageFilter";
import NewChemicalDosageCustomerDetailTable from "../components/NewChemicalDosageReport/NewChemicalDosageCustomerDetailTable";
import NewChemicalReportCustomerDetailHeader from "../components/NewChemicalDosageReport/NewChemicalReportCustomerDetailHeader";
import { fetchCustomerDetailSummary } from "../redux/Slices/getchemicalReportSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import moment from "moment";

function NewChemicalReportsCustomerDetail() {
  const [value, setValue] = useState("CustomerDeatil");
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
    dispatch(fetchCustomerDetailSummary({ StartDate, EndDate }));
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
            <NewChemicalReportCustomerDetailHeader data={chemicalReport} />
            <NewChemicalDosageCustomerDetailTable data={chemicalReport} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default NewChemicalReportsCustomerDetail;
