import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { fetchgetProductType } from "../../redux/Slices/getProductType";

export default function ProductTypefilter() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchgetProductType({ name }));
    setName("");
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-sm-12 equipmentssss">
          <form
            className="myfilters tableFilters grayFilters equipment"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit">
              <i className="fa fa-search" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
