import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchgetWorkOrderRouteApi } from "../../redux/Slices/getWorkOrderRoute";
import { fetchgetWorkOrder } from "../../redux/Slices/getWorkorder";
import { fetchTechnician } from "../../redux/Slices/GetTechnician";
import moment from "moment";
import { DatePicker } from "antd";
import { useSelector } from "react-redux";

const WorkFilters = () => {
  const { RangePicker } = DatePicker;

  const { data: Technician } = useSelector((state) => state.Technician);
  const { data: getWorkOrder } = useSelector((state) => state.getWorkOrder);

  // const [start_date, setStartDate] = useState(moment().startOf("month").format('MM/DD/YYYY'));
  // const [end_date, setEndDate] = useState(moment().endOf("month").format('MM/DD/YYYY'));

  const [start_date, setStartDate] = useState(
    moment().startOf("week").format("MM/DD/YYYY")
  );
  const [end_date, setEndDate] = useState(
    moment().endOf("week").format("MM/DD/YYYY")
  );

  const [assigned_day, setassigned_day] = useState("");
  const [PaidStatus, setstatus] = useState("");
  const [WorkOrder, setWorkOrder] = useState(false);
  const [TechId, setTechId] = useState("");

  const dispatch = useDispatch();

  const currentDate = new Date();
  const date1 = new Date(currentDate.toISOString().split("T")[0]);

  const dateClear = () => {
    dispatch(
      fetchgetWorkOrderRouteApi({
        start_date,
        end_date,
        assigned_day,
        PaidStatus,
        TechId,
      })
    );
    setWorkOrder(true);
  };

  const handleDateChange = (dates, i) => {
    setStartDate(
      i[0] == "" ? moment().startOf("week").format("MM/DD/YYYY") : i[0]
    );
    setEndDate(i[1] == "" ? moment().endOf("week").format("MM/DD/YYYY") : i[1]);
  };

  useEffect(() => {
    // dispatch(fetchgetWorkOrder())
    dispatch(fetchTechnician());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchgetWorkOrderRouteApi({
        start_date,
        end_date,
        assigned_day,
        PaidStatus,
        TechId,
      })
    );
  }, [dispatch, start_date, end_date, assigned_day, TechId, PaidStatus]);

  const AllDay = [
    {
      id: "",
      value: "",
      label: "All Day",
    },
    {
      id: "1",
      value: "sunday",
      label: "Sunday",
    },
    {
      id: "2",
      value: "monday",
      label: "Monday",
    },
    {
      id: "3",
      value: "tuesday",
      label: "Tuesday",
    },
    {
      id: "4",
      value: "wednesday",
      label: "Wednesday",
    },
    {
      id: "5",
      value: "thursday",
      label: "Thursday",
    },
    {
      id: "6",
      value: "friday",
      label: "Friday",
    },
    {
      id: "7",
      value: "saturday",
      label: "Saturday",
    },
  ];

  return (
    <div className="row grayshade workFilter">
      <div className="col-sm-3 workOrderFilterShort">
        <Select
          placeholder="All Tech"
          onChange={(e) => setTechId(e)}
          allowClear
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
      <div className="col-sm-3 workOrderFilterShort">
        <Select
          placeholder="All Day"
          onChange={(e) => setassigned_day(e)}
          allowClear
        >
          {AllDay.map((item, i) => {
            return <Option value={item?.value}>{item?.label}</Option>;
          })}
        </Select>
      </div>
      <div className="col-sm-3 workOrderFilterShort">
        <Select
          placeholder="Billing Status"
          onChange={(e) => setstatus(e)}
          allowClear
        >
          <Option value={"1"}>Paid</Option>
          <Option value={"0"}>Unpaid</Option>
        </Select>
      </div>
      <div className="col-sm-3 workOrderFilterLarge">
        <span className="myfilters tableFilters invoiceFilter">
          <DatePicker.RangePicker
            allowClear={true}
            onChange={handleDateChange}
            format="MM/DD/YYYY"
          />
        </span>
      </div>
    </div>
  );
};

export default WorkFilters;
