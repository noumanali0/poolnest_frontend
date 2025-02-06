import React, { useState, useEffect } from "react";
import { Button, Form, Input, Radio } from "antd";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  postCancelPayment,
  clearData,
} from "../../redux/postReducer/postPaymentCancelation";

const CancelSubscriptionForm = ({ data1 }) => {
  const [form] = Form.useForm();

  const { error, success, loading } = useSelector(
    (state) => state.postCancelPayment
  );
  const dispatch = useDispatch();

  console.log(error, success, loading);

  const [formData, setFormData] = useState();
  const onFinish = async (values) => {
    console.log(values);
    dispatch(postCancelPayment({ values }));
  };

  useEffect(() => {
    if (success) {
      dispatch(clearData());
      toast.success(success);
      data1.handleClose();
    }
    if (error) {
      dispatch(clearData());
      toast.error(error);
    }
  }, [error, success]);
  const onFinishFailed = (errorInfo) => {
    toast.error(errorInfo, {
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
    <div className="row fomik addRoute taxratee paymenttt   ">
      <p className="cancelSubTitle">
        Please take a moment to tell us why you are cancelling
      </p>
      <p className="cancelSubtetx">
        We'd love to get your feedback. Let us know why you're cancelling and
        how we can make PoolNest better. We promise to read every word.
      </p>
      <Form
        name="Customer"
        form={form}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        onFinish={onFinish}
      >
        <div className="row cslocation">
          <div className="col-sm-12 radipoCancel">
            <Form.Item
              name="reason"
              label="Please select a reason"
              rules={[
                {
                  required: true,
                  message: "Please select a reason",
                },
              ]}
            >
              <Radio.Group>
                <div className="col-sm-12 radioValue">
                  <Radio value="Sold my route or pool company">
                    Sold my route or pool company.
                  </Radio>
                </div>

                <div className="col-sm-12 radioValue">
                  <Radio value="Never got started with the software">
                    Never got started with the software.
                  </Radio>
                </div>

                <div className="col-sm-12 radioValue">
                  <Radio value="My business is seasonal">
                    My business is seasonal.
                  </Radio>
                </div>

                <div className="col-sm-12 radioValue">
                  <Radio value="A feature I need is missing">
                    A feature I need is missing.
                  </Radio>
                </div>

                <div className="col-sm-12 radioValue">
                  <Radio value="Service is too expensive">
                    Service is too expensive.
                  </Radio>
                </div>
              </Radio.Group>
            </Form.Item>
          </div>

          <div className="col-sm-12">
            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                  message: "Reason is required",
                },
              ]}
              label="Anything else you would like to add ?"
            >
              <Input.TextArea
                placeholder="Anything else you would like to add ?"
                showCount
                maxLength={500}
                rows={8}
              />
            </Form.Item>
          </div>

          <div className="col-sm-12 savebtn addProductType taxRate">
            <Form.Item>
              <Button className="yellowbtn" type="primary" htmlType="submit">
                Cancel PoolNest Subscription
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CancelSubscriptionForm;
