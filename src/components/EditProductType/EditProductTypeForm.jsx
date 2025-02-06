import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateitemTypeData } from "../../redux/postReducer/postProductType";
import { fetchgetProductType } from "../../redux/Slices/getProductType";

const EditProductTypeForm = ({ data1 }) => {
  const id = data1?.Edit?._id;
  const [form] = Form.useForm();

  const [formData, setFormData] = useState();

  const dispatch = useDispatch();



  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  useEffect(() => {
    setFormData({
      name: data1?.Edit?.name,
    });
  }, [data1]);

  const onFinish = async (values) => {
    const postData = values;
    await dispatch(updateitemTypeData({ postData, id }));
    dispatch(fetchgetProductType({}));
    data1.handleCloseEdit();
  };

  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!");
  };

  form.setFieldsValue({
    name: formData?.name || "",
  });
  return (
    <div className="row fomik addRoute taxratee AddProductt">
      <Form
        name="Customer"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        validateMessages={validateMessages}
        // onValuesChange={handleFormValuesChange}
        form={form}
        autoComplete="off"
        initialValues={formData}
      >
        <div className="row cslocation">
          <div className="col-sm-12">
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please input Product Type Name!" },
              ]}
            >
              <Input placeholder="Product Name" />
            </Form.Item>
          </div>

          <div className="col-sm-12 savebtn addProductType taxRate">
            <Form.Item>
              <Button className="yellowbtn" type="primary" htmlType="submit">
                Save Product Type 
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EditProductTypeForm;
