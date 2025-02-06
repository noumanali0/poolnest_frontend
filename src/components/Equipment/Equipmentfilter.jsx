import React, { useState } from "react";
import { Fragment } from "react";
import { fetchgetAllEquipmemnt } from "../../redux/Slices/getAllEquipment";
import { useDispatch } from "react-redux";

export default function Equipmentfilter() {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchgetAllEquipmemnt({ name }));
    setName("");
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-sm-12 equipmentssss">
          <form
            className="myfilters tableFilters grayFilters equipment"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit">
              {" "}
              <i className="fa fa-search" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
