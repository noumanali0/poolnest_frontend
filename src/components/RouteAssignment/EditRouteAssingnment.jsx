import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, Select, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchTechnician } from "../../redux/Slices/GetTechnician";
import { fetchgetfrequency } from "../../redux/Slices/getfrequency";
import { fetchAllgetCustomers } from "../../redux/Slices/getCustomer";
import { fetchgetCustomerServices } from "../../redux/Slices/getCustomerService";
import { fetchwaterbody } from "../../redux/Slices/getWaterBody";
import {
  EditRouteAssignmentData,
  resetData,
} from "../../redux/postReducer/postRouteAssignment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import DatePicker from "react-datepicker";
import { fetchactiveServicedashboard } from "../../redux/Slices/getActiveServiceRoute";

const { Option } = Select;

const AddRouteForm = ({ data1 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState();
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const [Data, setData] = useState([]);
  const [formData, setFormData] = useState({
    Pools: [{ name: "" }],
  });
  const [form] = Form.useForm();
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayChange = (value) => {
    setSelectedDay(value);
  };

  const { data, loading, success, error } = useSelector(
    (state) => state.postrouteAssignment
  );

  const { data: Technician } = useSelector((state) => state.Technician);
  const postfrequency = useSelector((state) => state.getfrequency);
  const getRouteAssingnment = useSelector((state) => state.getRouteAssingnment);

  const getRouteAssingnment_id = getRouteAssingnment?.data?._id;

  const { data: getCustomerService } = useSelector(
    (state) => state.getCustomerService
  );

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}/${day}/${year}`;
  }

  const { data: getCustomer } = useSelector((state) => state.getCustomer);
  const { data: waterbody } = useSelector((state) => state.waterbody);
  console.log(postfrequency, "<=====postfrequency?.data?.length");
  useEffect(() => {
    if (Technician?.length === 0) {
      dispatch(fetchTechnician());
    }

    dispatch(fetchgetfrequency());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllgetCustomers({}));
  }, [dispatch]);

  const CustomerSelect = (id) => {
    dispatch(fetchgetCustomerServices({ id }));
  };
  const LocationSelect = (ServiceLocationID) => {
    dispatch(fetchwaterbody({ ServiceLocationID }));
  };

  const handleFormValuesChange = (changedValues, allValues) => {
    // setFormData(allValues);
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  useEffect(() => {
    const formattedDate = moment(getRouteAssingnment?.data?.start_date).format(
      "YYYY-MM-DD"
    );
    const formattedDateEnd = getRouteAssingnment?.data?.end_date
      ? moment(getRouteAssingnment?.data?.end_date).format("YYYY-MM-DD")
      : null;
    setSelectedDate(formattedDate);
    setSelectedEndDate(formattedDateEnd);
  }, [getRouteAssingnment]);

  useEffect(() => {
    setFormData({
      customer_id:
        getRouteAssingnment?.data?.RouteAssignmentWaterBody
          ?.RouteAssignmentServiceLocation?.CustomerServiceLocation?.first_name,
      service_location_id:
        getRouteAssingnment?.data?.RouteAssignmentWaterBody
          ?.RouteAssignmentServiceLocation?.name,
      waterbody_id: getRouteAssingnment?.data?.RouteAssignmentWaterBody?._id,
      waterbody_name: getRouteAssingnment?.data?.RouteAssignmentWaterBody?.name,
      technician_id: getRouteAssingnment?.data?.RouteAssignmentTechnician?._id,
      technician_name:
        getRouteAssingnment?.data?.RouteAssignmentTechnician?.first_name,
      frequency_id: getRouteAssingnment?.data?.RouteAssignmentFrequency?._id,
      frequency_name: getRouteAssingnment?.data?.RouteAssignmentFrequency?.name,
      assigned_date: getRouteAssingnment?.data?.assigned_date,
      start_date: formatDate(getRouteAssingnment?.data?.start_date),
      end_date: getRouteAssingnment?.data?.end_date
        ? formatDate(getRouteAssingnment?.data?.end_date)
        : "No End",
    });
  }, [getRouteAssingnment]);

  const handleDateChange = (dateString) => {
    console.log(dateString);

    setSelectedDate(dateString);
  };

  const handleEndDateChange = (date) => {
    console.log(date);
    setSelectedEndDate(date);
  };

  const onFinish = (values, key) => {
    const Data = {
      technician_id: values.technician_id,
      waterbody_id: values.waterbody_id.value,
      frequency_id: values.frequency_id.value,
      service_location_id: values.service_location_id,
      customer_id: values.customer_id,
      assigned_date: values.assigned_date,
      start_date: selectedDate ? selectedDate : null,
      stop_date: selectedEndDate ? selectedEndDate : "no_end",
    };

    dispatch(EditRouteAssignmentData({ Data, getRouteAssingnment_id }));
  };

  form.setFieldsValue({
    technician_id: formData?.technician_id,
    assigned_date: formData?.assigned_date,
    frequency_id: {
      label: formData?.frequency_name,
      value: formData?.frequency_id,
    },
    start_date: formData?.start_date,
    end_date: formData?.end_date,
    customer_id: formData?.customer_id,
    service_location_id: formData?.service_location_id,
    waterbody_id: {
      label: formData?.waterbody_name,
      value: formData?.waterbody_id,
    },
  });
  console.log(success, "<=====data1");
  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetData());
      data1?.handleCloserouteEdit();
      dispatch(fetchactiveServicedashboard({}));
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, success]);

  return (
    <div className="row fomik addRoute taxratee">
      <Form
        name="dynamic_form_nest_item"
        onValuesChange={handleFormValuesChange}
        autoComplete="off"
        onFinish={onFinish}
        form={form}
        initialValues={formData}
      >
        <>
          <div className="row adrrLocation">
            <div className="col-sm-12 heads">
              <h3>Customer Info </h3>
            </div>

            <div className="col-sm-4">
              <Form.Item name="customer_id11" label="Select Customer">
                <Select onChange={CustomerSelect} placeholder="Select Customer">
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
                name="service_location_id11"
                label="Select Service Location"
              >
                <Select onChange={LocationSelect} placeholder="Select Location">
                  {getCustomerService?.map((item, i) => {
                    return <Option value={item?._id}>{item.name}</Option>;
                  })}
                </Select>
              </Form.Item>
            </div>

            <div className="col-sm-4">
              <Form.Item name="waterbody_id" label="Select WaterBody">
                <Select placeholder="Select WaterBody">
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
                <Select placeholder="Tech">
                  {Technician?.items &&
                    Technician.items?.map((item, i) => {
                      return (
                        <Option value={item._id}>{item.first_name}</Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </div>
            <div className="col-sm-3 underAddPool">
              <Form.Item name="assigned_date" label="Day Of Week">
                <Select placeholder="Day Of Week">
                  <Option value="monday">Monday</Option>
                  <Option value="tuesday">Tuesday</Option>
                  <Option value="wednesday">Wednesday</Option>
                  <Option value="thursday">Thursday</Option>
                  <Option value="friday">Friday</Option>
                  <Option value="saturday">Saturday</Option>
                  <Option value="sunday">Sunday</Option>
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
              <Form.Item name="start_date1" label="Start Date">
                <DatePicker
                  selected={selectedDate ? new Date(selectedDate) : null}
                  isClearable
                  onChange={handleDateChange}
                  dateFormat="yyyy-MM-dd" // Set the desired date format for displayed value
                  placeholderText="Select Start date"
                />
              </Form.Item>
            </div>

            <div className="col-sm-2 routeDateee underAddPool">
              <Form.Item name="stop_date" label="End date">
                <DatePicker
                  selected={selectedEndDate ? new Date(selectedEndDate) : null}
                  onChange={handleEndDateChange}
                  isClearable
                  placeholderText="Select End date"
                />
              </Form.Item>
            </div>

            <div className="col-sm-12 savebtn addProductType taxRate">
              <Form.Item>
                <Button
                  className="yellowbtn"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={loading}
                >
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
