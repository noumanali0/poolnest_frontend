import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import ChemicalDosageSearch from "../components/NewChemicalDosageReport/ChemicalDosageSearch";
import NewChemicalDosageFilter from "../components/NewChemicalDosageReport/NewChemicalDosageFilter";
import TechDetailTable from "../components/NewChemicalDosageReport/TechDetailTable";
import TechDetailHEader from "../components/NewChemicalDosageReport/TechDetailHEader";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchChemicalDosagesDetail } from "../redux/Slices/getchemicalReportSlice";
import moment from "moment";

function NewChemicalTechDetail() {
  const [value, setValue] = useState("Tech");
  const [data, setData] = useState(null);
  const [StartDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [EndDate, setEndDate] = useState(
    moment().endOf("month").format("YYYY-MM-DD")
  );
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data: chemicalReport } = useSelector((state) => state.chemicalReport);

  useEffect(() => {
    dispatch(fetchChemicalDosagesDetail({ id, StartDate, EndDate }));
  }, [dispatch, StartDate, EndDate, id]);
  console.log(chemicalReport);
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <div className="container-fluid">
            <ChemicalDosageSearch />
            <NewChemicalDosageFilter
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              value={value}
              setValue={setValue}
            />
            <TechDetailHEader data={chemicalReport} />
            <TechDetailTable data={chemicalReport} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default NewChemicalTechDetail;
