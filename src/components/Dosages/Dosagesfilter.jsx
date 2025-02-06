import React, { useState } from "react";
import { Fragment } from "react";
import { fetchgetAlldosage } from "../../redux/Slices/getAllDosages";
import { useDispatch } from "react-redux";
export default function Dosagesfilter() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price_per_unit, setPrice_per_unit] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    dispatch(fetchgetAlldosage({ name, price_per_unit }));
    // e.target.reset();
  };

  return (
    <Fragment>
      <form className="myfilters dosaaaggeesss" onSubmit={handleSearch}>
        <div className="row cslocation">
          <div className="col-sm-5">
            <input
              type="text"
              placeholder="Search for Name"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-sm-5">
            <input
              type="text"
              placeholder="Search for Price"
              name="price"
              onChange={(e) => setPrice_per_unit(e.target.value)}
            />
          </div>
          <div className="col-sm-2">
            {" "}
            <button type="submit">
              {" "}
              <i className="fa fa-search" aria-hidden="true" />
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
}
