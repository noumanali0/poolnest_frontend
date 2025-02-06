import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, Select, Radio, DatePicker } from "antd";
import { postwaterbodyData } from "../../redux/postReducer/postWaterbody";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTechnician } from "../../redux/Slices/GetTechnician";
import { fetchgetfrequency } from "../../redux/Slices/getfrequency";
import { fetchAllgetCustomers } from "../../redux/Slices/getCustomer";
import { fetchgetCustomerServices } from "../../redux/Slices/getCustomerService";
import { fetchwaterbody } from "../../redux/Slices/getWaterBody";
import {
  ChangerouteAssignmwntTech,
  UpdaterouteAssignmwnt,
  postrouteAssignmentData,
  resetData,
} from "../../redux/postReducer/postRouteAssignment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchactiveServicedashboard } from "../../redux/Slices/getActiveServiceRoute";
import moment from "moment";

const { Option } = Select;

const AddRouteForm = ({ data1, activeServicedashboard }) => {
  console.log(activeServicedashboard, "activeServicedashboard");

  const [formData, setFormData] = useState({
    Pools: [{ name: "" }],
  });
  const [loading, setIsloading] = useState(false);
  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dispatch = useDispatch();

  const { data: Technician } = useSelector((state) => state.Technician);
  const postfrequency = useSelector((state) => state.getfrequency);
  const postrouteAssignment = useSelector((state) => state.postrouteAssignment);

  const date1 = new Date();
  const [date, setDate] = useState(date1);

  const [technician_id, setTechId] = useState("");
  const active_service_id = data1.active_service_id._id;

  useEffect(() => {
    if (Technician?.length === 0) {
      dispatch(fetchTechnician());
    }

    if (postfrequency?.data?.length === 0) {
      dispatch(fetchgetfrequency());
    }
  }, [dispatch]);

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  const handleDateChange = (e, date) => {
    const utcDate = moment.utc(date).format(); // Convert date to UTC format
    setSelectedDate(utcDate);
  };
  const onFinish = async (values, key) => {
    setIsloading(true);
    const Data = {
      technician_id: values.technician_id,
      start_date: selectedDate,
      assigned_date: moment(selectedDate).format("dddd"),
      date: activeServicedashboard?.givenDate,
    };
    await dispatch(ChangerouteAssignmwntTech({ active_service_id, Data }));
  };

  useEffect(() => {
    if (postrouteAssignment && postrouteAssignment.data) {
      form.resetFields();
      toast.success("Form submitted successfully !");
      setIsloading(false);

      // dispatch(fetchactiveServicedashboard({ date, technician_id }));
      dispatch(resetData());

      data1.handleClose();
    }
  }, [postrouteAssignment.data]);

  useEffect(() => {
    if (postrouteAssignment && postrouteAssignment?.error) {
      const err = postrouteAssignment.error;
      setIsloading(false);

      toast.error(err);
    }
  }, [postrouteAssignment.error]);

  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  return (
    <div className="row fomik addRoute taxratee">
      <Form
        name="dynamic_form_nest_item"
        onValuesChange={handleFormValuesChange}
        form={form}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={formData}
      >
        <>
          <div className="row">
            <div className="col-sm-6">
              <Form.Item
                name="technician_id"
                label="Technician"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Technician!",
                  },
                ]}
              >
                <Select
                  placeholder="Tech"
                  showSearch
                  filterOption={filterOption}
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

            <div className="col-sm-6">
              <Form.Item
                name={[name, "Assign Date"]}
                label="Assign Date"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Assign Date!",
                  },
                ]}
              >
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  // minDate={new Date()}
                  // dateFormat="yyyy-mm-dd"
                  placeholderText="Assign Date"
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
        </>
      </Form>
    </div>
  );
};

export default AddRouteForm;
