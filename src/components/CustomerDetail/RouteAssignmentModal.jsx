import React, { useRef, useState } from "react";
import { Button, Form, Input, Space, Select, Radio, DatePicker } from "antd";
import Switch from "antd/lib/switch";
import Accordion from "react-bootstrap/Accordion";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTechnician } from "../../redux/Slices/GetTechnician";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
// import { fetchgetSingleCustomers } from "../../redux/Slices/getSingleCustomer";
import { fetchgetfrequency } from "../../redux/Slices/getfrequency";
import {
  postrouteAssignmentData,
  resetData,
} from "../../redux/postReducer/postRouteAssignment";
import { fetchgetRouteAssingnment } from "../../redux/Slices/getRouteAssignment";
import moment from "moment";
import { fetchGeneralSettingsDays } from "../../redux/Slices/getAllDays";
import { fetchgetSingleCustomers } from "../../redux/Slices/getSingleCustomer";

const { Option } = Select;

const AddpoolsCustomer = ({ handleClose, waterbodyid }) => {
  const { id } = useParams();

  const [value, setValue] = useState();
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const { pathname } = useLocation();

  const [formData, setFormData] = useState({
    Pools: [{ name: "" }],
  });

  // let waterbody_id = data?.dataroute;

  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const GetGeneralSettingsDays = useSelector(
    (state) => state.GeneralSettingsDays
  );
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayChange = (value) => {
    setSelectedDay(value);
  };

  const handleDateChange = (e, date) => {
    const utcDate = moment.utc(date).format(); // Convert date to UTC format
    setSelectedDate(utcDate);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };
  const navigate = useNavigate(); // Initialize useory
  // URL from which to extract IDs
  const url = pathname;

  // Split the URL by "/"
  const parts = url.split("/");

  const dispatch = useDispatch();
  const postDataResult = useSelector((state) => state.Technician);
  // const postwaterResult = useSelector((state) => state.postrouteAssignment);
  const postfrequency = useSelector((state) => state.getfrequency);
  const { successpost, error, loading } = useSelector(
    (state) => state.postrouteAssignment
  );

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };
  useEffect(() => {
    dispatch(fetchTechnician());
    dispatch(fetchgetfrequency());
    dispatch(fetchGeneralSettingsDays());
  }, [dispatch]);

  const onFinish = async (values, key) => {
    const Data = {
      technician_id: values?.technician_id,
      waterbody_id: waterbodyid,
      frequency_id: values?.frequency_id,
      assigned_date: values?.assigned_day,
      status: "active",
      start_date: selectedDate,
      end_date: selectedEndDate,
    };
    await dispatch(postrouteAssignmentData({ Data }));
  };
  const prevErrorRef = useRef();
  const prevSuccessRef = useRef();

  useEffect(() => {
    // Compare current and previous error values
    if (error && error !== prevErrorRef.current) {
      toast.error(error);
      dispatch(resetData());
      prevErrorRef.current = error; // Update previous error value
    }

    // Compare current and previous success values
    if (successpost && successpost !== prevSuccessRef.current) {
      toast.success(successpost);
      dispatch(resetData());
      dispatch(fetchgetSingleCustomers({ id }));

      handleClose();
      prevSuccessRef.current = successpost; // Update previous success value
    }
  }, [error, successpost]);

  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!");
  };

  const daysData = GetGeneralSettingsDays && GetGeneralSettingsDays?.data[0];
  const trueDays = [];
  for (const day in daysData) {
    if (daysData.hasOwnProperty(day) && daysData[day]) {
      trueDays.push(day);
    }
  }
  const disabledDateNew = (current) => {
    if (!selectedDate || !selectedDay) {
      return false; // If no selected start date or selected day, don't disable any dates
    }

    const isBeforeStartDate =
      current && current < moment(selectedDate).startOf("day");
    const selectedDayIndex = moment(selectedDay, "dddd").day();
    const currentDateIndex = current.day();
    const isInvalidDay = selectedDayIndex !== currentDateIndex;

    // Disable dates that are before the start date or don't match the selected day
    return isBeforeStartDate || isInvalidDay;
  };
  return (
    <div className="row fomik addRoute taxratee">
      <Form
        name="dynamic_form_nest_item"
        onValuesChange={handleFormValuesChange}
        autoComplete="off"
        onFinish={onFinish}
        form={form}
        disabled={false}
        onFinishFailed={onFinishFailed}
      >
        <div className="row routeFilterr cslocation">
          <div className="col-sm-12 heads">
            <h3>Route Assignment</h3>
          </div>

          <div className="col-sm-4">
            <Form.Item name="technician_id" label="Tech Name">
              <Select placeholder="Tech">
                {postDataResult.data &&
                  postDataResult?.data?.items?.map((item) => {
                    return (
                      <Option value={item._id}>
                        {" "}
                        {item.first_name + " " + item.last_name}
                      </Option>
                    );
                  })}
              </Select>
            </Form.Item>
          </div>
          <div className="col-sm-4">
            <Form.Item name="assigned_day" label="Day Of Week">
              <Select onChange={handleDayChange} placeholder="Day Of Week">
                {trueDays?.map((item, i) => {
                  return <Option value={item}>{item}</Option>;
                })}
              </Select>
            </Form.Item>
          </div>
          <div className="col-sm-4">
            <Form.Item name="frequency_id" label="Frequency">
              <Select placeholder="Frequency">
                {postfrequency?.data?.map((item) => {
                  return <Option value={item._id}>{item.label}</Option>;
                })}
              </Select>
            </Form.Item>
          </div>
          <div className="col-sm-6">
            <Form.Item name="start_date" label="Start Date">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                disabledDate={(current) => {
                  if (!selectedDay) {
                    return false;
                  }

                  const selectedDayIndex = moment(selectedDay, "dddd").day();
                  const currentDateIndex = current.day();

                  return selectedDayIndex !== currentDateIndex;
                }}
                // dateFormat="yyyy-MM-dd" // Set the desired date format
                placeholderText="Select Start date"
              />
            </Form.Item>
          </div>
          <div className="col-sm-6">
            <Form.Item name="end_date" label="End Date">
              <DatePicker
                selected={selectedEndDate}
                onChange={handleEndDateChange}
                disabledDate={disabledDateNew}
                placeholderText="Select End date"
              />
            </Form.Item>
          </div>

          <div className="col-sm-12 savebtn addProductType taxRate">
            <Form.Item>
              <Button
                disabled={loading}
                className="yellowbtn"
                type="primary"
                htmlType="submit"
              >
                Save
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddpoolsCustomer;
