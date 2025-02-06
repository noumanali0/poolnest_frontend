import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchgetAllprospect } from "../../redux/Slices/getProspect";

export default function ProspectFilter() {
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [prospectType, setProspectType] = useState("");
  const [isconverted, setisconverted] = useState("");

  const page = 1;
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchgetAllprospect({ name, isconverted, page, prospectType }));
  };

  useEffect(() => {
    dispatch(fetchgetAllprospect({ name, page, isconverted, prospectType }));
  }, [name, page, prospectType, isconverted]);
  const handleSelectChange = (e) => {
    setProspectType(e.target.value);
  };

  const prospectTypeData = [
    {
      key: 1,
      name: "Service",
      value: "service",
    },
    {
      key: 2,
      name: "Work Order",
      value: "workorder",
    },
  ];

  return (
    <Fragment>
      <form className="myfilters custFiltwer">
        <input
          type="text"
          placeholder="Search Prospect"
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="form-select form-select-lg mb-3 select1"
          aria-label=".form-select-lg example"
          onChange={(e) => setisconverted(e.target.value)}
        >
          <option value="">Is Converted</option>
          <option value={"true"}>Yes</option>
          <option value={"false"}>No</option>
        </select>

        <select
          className="form-select form-select-sm select2"
          aria-label=".form-select-sm example"
          name="item_type_id"
          onChange={handleSelectChange}
          value={prospectType}
          // onChange={(e) => setItemId(e.target.value)}
        >
          <option selected value="">
            Prospect Type
          </option>
          {prospectTypeData?.map((item, i) => (
            <option value={item.value} key={i}>
              {item.name}
            </option>
          ))}
        </select>
        <button type="submit">
          {" "}
          <i className="fa fa-search" aria-hidden="true" />
        </button>
      </form>
    </Fragment>
  );
}
