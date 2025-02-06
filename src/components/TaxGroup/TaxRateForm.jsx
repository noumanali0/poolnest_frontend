import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { postRateTaxPostData } from "../../redux/postReducer/postRateTax";
import { fetchSalesTax } from "../../redux/Slices/getSaleTax";

const AddRateEditForm = ({ data }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:");
    toast.error("Please fill all required fields!");
  };


  const onFinish = async (values, key) => {
    await dispatch(postRateTaxPostData({ values }));
    const currentPage = 1;
    dispatch(fetchSalesTax({ currentPage }));
    data();
  };


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
              max="3"
              rules={[
                { required: true, message: "Rate must be between 0 and 100%!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || (value >= 0 && value <= 100)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Rate must be between 0 and 100%!")
                    );
                  },
                }),
              ]}
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

export default AddRateEditForm;
