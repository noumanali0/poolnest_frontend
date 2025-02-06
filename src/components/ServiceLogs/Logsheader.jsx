import React from "react";
import { Fragment } from "react";
import { fetchgetOptimizeRoute } from "../../redux/Slices/getOptimizeRoute";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchactiveServicedashboard } from "../../redux/Slices/getActiveServiceRoute";

function Logsheader() {
  const dispatch = useDispatch();

  const { data: activeServicedashboard, statusdata } = useSelector(
    (state) => state.activeServicedashboard
  );

  const handleOptized = async () => {
    const date = activeServicedashboard?.givenDate;
    const technician_id = null;

    await dispatch(fetchgetOptimizeRoute({ date }));
    dispatch(fetchactiveServicedashboard({ date, technician_id }));

    toast.success("Route has been Optimized");
  };

  return (
    <Fragment>
      <div className="row customers srvieLOgHEader cslocation">
        <div className="col-sm-5 slog">
          <h2>Service Logs</h2>
        </div>
        <div className="col-sm-3 right slog">
          <button
            className="bluebtn equipmentssssblue"
            disabled={activeServicedashboard?.data?.length != 0 ? false : true}
            onClick={() => handleOptized()}
          >
            Optimize Route
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default Logsheader;
