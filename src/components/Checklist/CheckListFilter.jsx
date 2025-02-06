import React, { useState } from "react";
import { Fragment } from "react";
import {
  fetchgetCheckListAll,
  fetchgetserviceCheckListAll,
} from "../../redux/Slices/getserviceCheckList";
import { useDispatch } from "react-redux";

export default function CheckListFilter() {
  const [Description, setDescription] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchgetCheckListAll({ Description }));
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
              placeholder="Search With Description"
              onChange={(e) => setDescription(e.target.value)}
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
