import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { DatePicker, Select, Space } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchTechnician } from "../../redux/Slices/GetTechnician";
import { fetchactiveServicedashboard } from "../../redux/Slices/getActiveServiceRoute";
import { fetchgetOptimizeRoute } from "../../redux/Slices/getOptimizeRoute";
import { toast } from "react-toastify";
import socket from "../../Socket";

function RouteSearchFilters({ data, id }) {
  const { data: Technician } = useSelector((state) => state.Technician);
  const [routeData, setRouteData] = useState();

  const getCurrentDate = (date) => {
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because month index starts from 0
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}T00:00:00Z`;

    return formattedDate;
  };

  const currentDate = new Date(); // Example: replace this with your actual date
  const date1 = new Date(currentDate);

  const [date, setDate] = useState(date1);
  const [technician_id, setTechId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (Technician?.length === 0) {
      dispatch(fetchTechnician());
    }
  }, [dispatch]);

  const handleDateChange = (date) => {
    const momentDate = moment(date);
    const currentTimeUTC = moment.utc().format("HH:mm:ss");
    const utcDate = moment(
      momentDate.format("YYYY-MM-DD") + "T" + currentTimeUTC
    ).toISOString();
    return utcDate;
  };

  useEffect(() => {
    dispatch(fetchactiveServicedashboard({ date, technician_id }));
  }, [dispatch, technician_id]);

  const onChange = (date1, dateString) => {
    const room = `${id}/${data?.givenDate}`;
    const leaveRoom = () => {
      socket.emit("LeaveRoute", room, (data) => {
        if (data.status === "error") {
          console.error("Error leaving room:", data.message);
        } else {
          console.log("Successfully left room:", room);
        }
      });
    };
    leaveRoom();

    setDate(getCurrentDate(dateString));

    const date = handleDateChange(dateString);
    dispatch(fetchactiveServicedashboard({ date, technician_id }));
  };

  useEffect(() => {
    localStorage.setItem("date", date == "Invalid Date" ? new Date() : date);
  }, [date]);

  return (
    <Fragment>
      <div className="row routefilters cslocation">
        <div className="col-sm-6">
          <Select
            name="labortype"
            onChange={(e) => setTechId(e)}
            placeholder="All Tech"
          >
            <Option value="">All Tech</Option>
            {Technician?.items?.map((item, i) => {
              return (
                <Option value={item._id}>
                  {item.first_name + " " + item.last_name}
                </Option>
              );
            })}
          </Select>
        </div>

        <div className="col-sm-6">
          <DatePicker onChange={onChange} format="MM/DD/YYYY" />
        </div>
      </div>
    </Fragment>
  );
}

export default RouteSearchFilters;
