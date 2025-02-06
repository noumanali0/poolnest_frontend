import React, { Fragment, useEffect, useState } from "react";
import { Form, Select, Input, DatePicker, InputNumber, Button } from "antd";
import {
  postwaterbodyTypeData,
  resetData,
} from "../../redux/postReducer/postwaterbodyType";
import { useDispatch } from "react-redux";
import { fetchgetwaterbodyType } from "../../redux/Slices/getWaterbodyType";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function ServiceListModal({ data }) {
  const { loading, success, error } = useSelector(
    (state) => state.postwaterbodyType
  );
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

  /* eslint-enable no-template-curly-in-string */
  const onFinish = async (values) => {
    dispatch(postwaterbodyTypeData({ values }));
    await dispatch(fetchgetwaterbodyType());
  };
  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetData());
      data();
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, success]);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Fragment>
      <div className="container-fluid modals workOrderTypee">
        <Form
          name="nest-messages"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          validateMessages={validateMessages}
          autoComplete="off"
        >
          <div className="row myselect">
            <div className="col-sm-12 tooppppAd">
              <Form.Item name="name" rules={[{ required: true }]}>
                <Input placeholder="Name" />
              </Form.Item>
            </div>
            <div className="col-sm-12">
              <Form.Item className="pooltypeModaaallllll">
                <Button type="primary" htmlType="submit" disabled={loading}>
                  {" "}
                  Save{" "}
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </Fragment>
  );
}

export default ServiceListModal;
