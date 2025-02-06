import React, { useState } from "react";
import { Button, Form, Input, Space, Select, Radio } from "antd";
import { postwaterbodyData } from "../../redux/postReducer/postWaterbody";
import "react-datepicker/dist/react-datepicker.css";
import Checkbox from "antd/es/checkbox/Checkbox";
import { toast } from "react-toastify";

const { Option } = Select;

const CustomerInfo = () => {
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const [dossageValue, setDossageValue] = useState([]);
  const [mapValue, setMapValue] = useState([]);
  const [formData, setFormData] = useState({
    Pools: [{ name: "" }],
  });
  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  const onFinish = (values, key) => {
    const pooldata = values.Pools;
    dispatch(postwaterbodyData({ pooldata }));
  };

  const handleValues = () => {
    if (!dossageValue) {
      setDossageValue("");
    } else {
      setMapValue([...mapValue, dossageValue]);
    }
  };
  const deleteItems = (id) => {
    const updateItems = items.filter((elem, ind) => {
      return ind !== id;
    });
    setitems(updateItems);
  };

  const Remove = () => {
    setitems([]);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    toast.error("Please fill all required fields!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  };

  return (
    <div className="row fomik addRoute ">
      <Form
        name="Customer"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="row customerInfo">
          <div className="col-sm-8">
            <h3>Customer Info</h3>
          </div>
          <div className="col-sm-6">
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Please input your From Name!" },
              ]}
            >
              <Input placeholder="From Name" />
            </Form.Item>
          </div>

          <div className="col-sm-6">
            <Form.Item
              name="Email"
              rules={[
                { required: true, message: "Please input your From Email!" },
              ]}
            >
              <Input placeholder="From Email" />
            </Form.Item>
          </div>

          <div className="col-sm-6">
            <Form.Item
              name="Company"
              rules={[
                { required: true, message: "Please input your Company Name!" },
              ]}
            >
              <Input placeholder="Company Name" />
            </Form.Item>
          </div>

          <div className="col-sm-6">
            <Form.Item
              name="BCC"
              rules={[{ required: true, message: "Please input your BCC!" }]}
            >
              <Input placeholder="BCC" type="text" />
            </Form.Item>
          </div>

          <div className="col-sm-12 ">
            <Form.Item name="Address">
              <Input
                placeholder="Company Address"
                rules={[
                  { required: true, message: "Please Add  Company Address!" },
                ]}
              />
            </Form.Item>
          </div>
          <div className="col-sm-4">
            <Form.Item name="City">
              <Input
                placeholder="City"
                rules={[{ required: true, message: "Please Add  City!" }]}
              />
            </Form.Item>
          </div>

          <div className="col-sm-4">
            <Form.Item name="State">
              <Input
                placeholder="State"
                rules={[{ required: true, message: "Please Add State!" }]}
              />
            </Form.Item>
          </div>
          <div className="col-sm-4">
            <Form.Item name="ZipCode">
              <Input
                placeholder="Zip Code"
                rules={[{ required: true, message: "Please Add Zip Code!" }]}
              />
            </Form.Item>
          </div>
          <div className="col-sm-4">
            <Form.Item name="Email">
              <Input
                placeholder="Email"
                rules={[{ required: true, message: "Please Add  Email!" }]}
              />
            </Form.Item>
          </div>

          <div className="col-sm-4">
            <Form.Item name="Mobile">
              <Input
                placeholder="Mobile # (Primary)"
                rules={[
                  { required: true, message: "Please Add Mobile # (Primary)!" },
                ]}
              />
            </Form.Item>
          </div>
          <div className="col-sm-4">
            <Form.Item name="MobileS">
              <Input
                placeholder="Mobile # (Secondary)"
                rules={[
                  {
                    required: true,
                    message: "Please Add Mobile # (Secondary)!",
                  },
                ]}
              />
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CustomerInfo;
