import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, Select, Radio, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchTechnician } from "../../redux/Slices/GetTechnician";
import { fetchgetfrequency } from "../../redux/Slices/getfrequency";
import { fetchAllgetCustomers } from "../../redux/Slices/getCustomer";
import { fetchgetCustomerServices } from "../../redux/Slices/getCustomerService";
import { fetchwaterbody } from "../../redux/Slices/getWaterBody";
import {
  postrouteAssignmentData,
  resetData,
} from "../../redux/postReducer/postRouteAssignment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { fetchGeneralSettingsDays } from "../../redux/Slices/getAllDays";
// import DatePicker from "react-datepicker";
import dayjs from "dayjs";

const { Option } = Select;

const AddRouteForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState();
  const GetGeneralSettingsDays = useSelector(
    (state) => state.GeneralSettingsDays
  );

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const [formData, setFormData] = useState({
    Pools: [{ name: "" }],
  });
  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayChange = (value) => {
    setSelectedDay(value);
  };

  const { loading, successpost, error } = useSelector(
    (state) => state.postrouteAssignment
  );

  const { data: Technician } = useSelector((state) => state.Technician);

  const postfrequency = useSelector((state) => state.getfrequency);

  const { data: getCustomerService } = useSelector(
    (state) => state.getCustomerService
  );

  const { data: getCustomer } = useSelector((state) => state.getCustomer);
  const { data: waterbody } = useSelector((state) => state.waterbody);

  useEffect(() => {
    if (Technician?.length === 0) {
      dispatch(fetchTechnician());
    }

    if (postfrequency?.data?.length === 0) {
      dispatch(fetchgetfrequency());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllgetCustomers({}));
    dispatch(fetchGeneralSettingsDays());
  }, [dispatch]);

  const CustomerSelect = (id) => {
    dispatch(fetchgetCustomerServices({ id }));
  };
  const LocationSelect = (ServiceLocationID) => {
    dispatch(fetchwaterbody({ ServiceLocationID }));
  };

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
    console.log(allValues, "allValues");
  };

  const handleDateChange = (e, date) => {
    const utcDate = moment.utc(date).format(); // Convert date to UTC format
    console.log(utcDate);
    setSelectedDate(utcDate);
  };
  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  const handleEndDateChange = (e, date) => {
    setSelectedEndDate(date);
  };
  const onFinish = (values, key) => {
    const Data = {
      technician_id: values.technician_id,
      waterbody_id: values.waterbody_id,
      frequency_id: values.frequency_id,
      service_location_id: values.service_location_id,
      customer_id: values.customer_id,
      assigned_date: values.assigned_day,
      start_date: selectedDate,
      end_date: selectedEndDate ? selectedEndDate : null,
    };

    dispatch(postrouteAssignmentData({ Data }));
  };
  useEffect(() => {
    if (successpost) {
      toast.success(successpost);
      dispatch(resetData());
      navigate("/route-assignment");
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, successpost]);

  const daysData = GetGeneralSettingsDays && GetGeneralSettingsDays?.data[0];
  const trueDays = [];
  for (const day in daysData) {
    if (daysData.hasOwnProperty(day) && daysData[day]) {
      trueDays.push(day);
    }
  }

  const disabledDate = (current) => {
    return current && current < dayjs().endOf("day");
  };
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
    <div className="row fomik addRoute ">
      <Form
        name="dynamic_form_nest_item"
        onValuesChange={handleFormValuesChange}
        autoComplete="off"
        onFinish={onFinish}
      >
        <>
          <div className="row adrrLocation">
            <div className="col-sm-12 heads">
              <h3>Customer Info </h3>
            </div>

            <div className="col-sm-4">
              <Form.Item
                name="customer_id"
                label="Select Customer"
                rules={[
                  {
                    required: true,
                    message: "Please Select Select Customer",
                  },
                ]}
              >
                <Select
                  onChange={CustomerSelect}
                  filterOption={filterOption}
                  showSearch
                  allowClear
                  placeholder="Select Customer"
                >
                  {getCustomer?.items?.map((item, i) => {
                    return (
                      <Option value={item._id}>
                        {item.first_name + " " + item.last_name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className="col-sm-4 swicthbtn">
              <Form.Item
                name="service_location_id"
                label="Select Service Location"
                rules={[
                  {
                    required: true,
                    message: "Please Select Service Location",
                  },
                ]}
              >
                <Select
                  filterOption={filterOption}
                  showSearch
                  onChange={LocationSelect}
                  placeholder="Select Location"
                >
                  {getCustomerService?.map((item, i) => {
                    return <Option value={item?._id}>{item.name}</Option>;
                  })}
                </Select>
              </Form.Item>
            </div>

            <div className="col-sm-4">
              <Form.Item
                name="waterbody_id"
                label="Select WaterBody"
                rules={[
                  {
                    required: true,
                    message: "Please Select Pool",
                  },
                ]}
              >
                <Select
                  filterOption={filterOption}
                  showSearch
                  placeholder="Select WaterBody"
                >
                  {waterbody?.map((item, i) => {
                    return <Option value={item?._id}>{item?.name}</Option>;
                  })}
                </Select>
              </Form.Item>
            </div>

            <div className="col-sm-12 heads">
              <h3>Route Assignment Info</h3>
            </div>

            <div className="col-sm-3 underAddPool">
              <Form.Item
                name="technician_id"
                label="Tech"
                rules={[
                  {
                    required: true,
                    message: "Please Select Technician",
                  },
                ]}
              >
                <Select
                  filterOption={filterOption}
                  showSearch
                  placeholder="Tech"
                >
                  {Technician?.items &&
                    Technician.items?.map((item, i) => {
                      return (
                        <Option value={item._id}>
                          {item.first_name + " " + item.last_name}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </div>
            <div className="col-sm-3 underAddPool">
              <Form.Item
                name="assigned_day"
                label="Day of Week"
                rules={[
                  {
                    required: true,
                    message: "Please Select Day of Week",
                  },
                ]}
              >
                <Select onChange={handleDayChange} placeholder="Day Of Week">
                  {trueDays?.map((item, i) => {
                    return <Option value={item}>{item}</Option>;
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className="col-sm-2 underAddPool">
              <Form.Item
                name="frequency_id"
                label="Frequency"
                rules={[
                  {
                    required: true,
                    message: "Please Select Frequency",
                  },
                ]}
              >
                <Select placeholder="Frequency">
                  {postfrequency?.data?.map((item) => (
                    <Option key={item._id} value={item.frequency_id}>
                      {item.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-sm-2 routeDateee underAddPool">
              <Form.Item
                name={[name, "start_date"]}
                label="Start date"
                rules={[
                  {
                    required: true,
                    message: "Please Select Start Date",
                  },
                ]}
              >
                <DatePicker
                  onChange={handleDateChange}
                  disabledDate={(current) => {
                    if (!selectedDay) {
                      return false;
                    }

                    const selectedDayIndex = moment(selectedDay, "dddd").day();
                    const currentDateIndex = current.day();

                    return selectedDayIndex !== currentDateIndex;
                  }}
                  placeholder="Select Start date"
                />
              </Form.Item>
            </div>

            <div className="col-sm-2 routeDateee underAddPool">
              <Form.Item name={[name, "end_date"]} label="End date">
                <DatePicker
                  selected={selectedEndDate}
                  disabledDate={disabledDateNew}
                  onChange={handleEndDateChange}
                  // minDate={new Date()} // Disable past dates (today and beyond)
                  // dateFormat="yyyy-MM-dd" // Set the desired date format
                  placeholderText="Select End date"
                />
              </Form.Item>
            </div>

            <div className="col-sm-12 savebtn">
              <Form.Item>
                <Button
                  className="yellowbtn addCustomerSaveBtn"
                  loading={loading}
                  disabled={loading}
                  htmlType="submit"
                  type="primary"
                >
                  {" "}
                  Save
                </Button>
              </Form.Item>
            </div>
          </div>
        </>
      </Form>
    </div>
  );
};

export default AddRouteForm;
