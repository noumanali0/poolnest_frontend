import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import {
  postitemTypeData,
  clearData,
} from "../../redux/postReducer/postProductType";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetProductType } from "../../redux/Slices/getProductType";

const AddProductTypeForm = ({ data }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [isLoad, setisLoad] = useState(false);
  const { success, error, loading } = useSelector(
    (state) => state.postsProductType
  );

  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!");
  };

  console.log(success, error, loading, "success, error");
  const onFinish = async (values, key) => {
    setisLoad(true);
    await dispatch(postitemTypeData({ values }));
    dispatch(fetchgetProductType({}));
    data();
  };

  return (
    <div className="row fomik addRoute taxratee AddProductt">
      <Form
        name="Customer"
        form={form}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        onFinish={onFinish}
      >
        <div className="row cslocation">
          <div className="col-sm-12">
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: "Please input Product Type Name!" },
              ]}
            >
              <Input placeholder="Product Type Name" />
            </Form.Item>
          </div>

          <div className="col-sm-12 savebtn addProductType taxRate">
            <Form.Item>
              <Button
                className="yellowbtn"
                type="primary"
                disabled={loading}
                htmlType="submit"
              >
                Save Product Type
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddProductTypeForm;
