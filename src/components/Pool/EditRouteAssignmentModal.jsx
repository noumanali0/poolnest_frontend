import React, { useState } from "react";
import { Button, Form, Input, Space, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTechnician } from "../../redux/Slices/GetTechnician";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";

import { fetchgetfrequency } from "../../redux/Slices/getfrequency";
import {
  UpdateSinglerouteAssignmwnt,
  resetData,
} from "../../redux/postReducer/postRouteAssignment";
import { fetchgetRouteAssingnment } from "../../redux/Slices/getRouteAssignment";
import moment from "moment";
import { fetchGeneralSettingsDays } from "../../redux/Slices/getAllDays";

const { Option } = Select;

const EditRouteAssignmentModal = ({ data }) => {
  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}/${day}/${year}`;
  }
  let waterbody_id = data?.EditData?.waterbody_id;
  let active_service_id = data?.EditData?._id;

  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(moment("2024-03-13"));
  const [formData, setFormData] = useState();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };
  const navigate = useNavigate(); // Initialize useory

  useEffect(() => {
    setFormData({
      technician_id: data?.EditData?.RouteAssignmentTechnician?._id,
      technician_name: data?.EditData?.RouteAssignmentTechnician?.first_name,
      frequency_id: data?.EditData?.RouteAssignmentFrequency?._id,
      frequency_name: data?.EditData?.RouteAssignmentFrequency?.name,
      assigned_date: data?.EditData?.assigned_date || "",
      start_date: moment(data?.EditData?.start_date),
      end_date: moment(data?.EditData?.end_date),
    });
  }, [data]);

  const dispatch = useDispatch();
  const postDataResult = useSelector((state) => state.Technician);
  const postwaterResult = useSelector((state) => state.postrouteAssignment);
  const postfrequency = useSelector((state) => state.getfrequency);
  const GetGeneralSettingsDays = useSelector(
    (state) => state.GeneralSettingsDays
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
      waterbody_id: waterbody_id,
      frequency_id: values?.frequency_id,
      assigned_date: values?.assigned_date,
      start_date: selectedDate,
      end_date: selectedEndDate,
    };
    await dispatch(UpdateSinglerouteAssignmwnt({ active_service_id, Data }));
  };

  useEffect(() => {
    if (postwaterResult.data) {
      toast.success("Form submitted successfully!");
      dispatch(resetData());
      dispatch(fetchgetRouteAssingnment({ waterbody_id }));
      data.handleCloseEdit();
    }
  }, [postwaterResult]);

  // Handle form submission error

  useEffect(() => {
    if (postwaterResult.error) {
      const err = postwaterResult?.error;
      toast.error(err);
    }
  }, [postwaterResult]);

  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!");
  };

  form.setFieldsValue({
    technician_id: formData?.technician_id,
    assigned_date: formData?.assigned_date || "",
    frequency_id: formData?.frequency_id,
    start_date: formData?.start_date,
    end_date: formData?.end_date,
  });

  useEffect(() => {
    const formattedDate = moment(data?.EditData?.start_date).format(
      "YYYY-MM-DD"
    );
    const formattedDateEnd = data?.EditData?.end_date
      ? moment(data?.EditData?.end_date).format("YYYY-MM-DD")
      : null;
    setSelectedDate(formattedDate);
    setSelectedEndDate(formattedDateEnd);
  }, [data]);

  const daysData = GetGeneralSettingsDays && GetGeneralSettingsDays?.data[0];
  const trueDays = [];
  for (const day in daysData) {
    if (daysData.hasOwnProperty(day) && daysData[day]) {
      trueDays.push(day);
    }
  }

  return (
    <div className="row fomik addRoute taxratee">
      <Form
        name="nest-messages"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        //  validateMessages={validateMessages}
        onValuesChange={handleFormValuesChange}
        form={form}
        autoComplete="off"
        initialValues={formData}
        disabled={false}
      >
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
          <Form.Item name="assigned_date" label="Day Of Week">
            <Select placeholder="Day Of Week">
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
          <Form.Item name="" label="Start Date">
            <DatePicker
              selected={selectedDate ? new Date(selectedDate) : null}
              isClearable
              onChange={handleDateChange}
              placeholderText="Select Start date"
            />
          </Form.Item>
        </div>
        <div className="col-sm-6">
          <Form.Item name="" label="End Date">
            <DatePicker
              selected={selectedEndDate ? new Date(selectedEndDate) : null}
              isClearable
              minDate={moment(selectedDate).toDate()}
              onChange={handleEndDateChange}
              // dateFormat="yyyy-MM-dd"
              placeholderText="Select End date"
            />
          </Form.Item>
        </div>

        <div className="col-sm-12 savebtn addProductType taxRate">
          <Form.Item>
            <Button className="yellowbtn" type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default EditRouteAssignmentModal;
