import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateRateTaxEdittData,
  UpdateRateTaxPostData,
  postRateTaxPostData,
} from "../../redux/postReducer/postRateTax";
import { fetchSalesTax } from "../../redux/Slices/getSaleTax";

const AddProductTypeForm = ({ data1 }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState();

  console.log(data1, "data");
  useEffect(() => {
    setFormData({
      name: data1?.Data?.name,
      Rate: data1?.Data?.Rate,
    });
  }, [data1]);
  const onFinish = async (values, key) => {
    const id = data1?.Data?._id;
    await dispatch(UpdateRateTaxEdittData({ id, values }));
   
    dispatch(fetchSalesTax({}));
    data1.handleClose();
  };

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  const onFinishFailed = (errorInfo) => {
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

  form.setFieldsValue({
    id: formData?.id,
    name: formData?.name,
    Rate: formData?.Rate,
  });

  return (
    <div className="row fomik addRoute taxratee">
      <Form
        name="Customer"
        form={form}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        onFinish={onFinish}
      >
        <div className="row cslocation">
          <div className="col-sm-8">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input Name!" }]}
            >
              <Input placeholder="Name" />
            </Form.Item>
          </div>

          <div className="col-sm-4">
            <Form.Item
              name="Rate"
              label="Rate"
              rules={[{ required: true, message: "Please input Rate!" }]}
            >
              <Input placeholder="Rate" type="number" />
            </Form.Item>
          </div>

          <div className="col-sm-12 savebtn addProductType taxRate">
            <Form.Item>
              <Button className="yellowbtn" type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddProductTypeForm;
