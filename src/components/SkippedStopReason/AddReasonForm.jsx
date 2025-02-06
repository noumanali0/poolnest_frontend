import React from "react";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { postReason } from "../../redux/postReducer/postReason";
import { fetchReason } from "../../redux/Slices/getReason";

const AddReasonForm = ({ handleClose }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinishFailed = (errorInfo) => {
    console.log("Failed: ", errorInfo);
    toast.error("Please input reason!");
  };

  const onFinish = (values) => {
    console.log(values);
    form.resetFields();
    dispatch(postReason({ values }));
    dispatch(fetchReason({}));

    handleClose();
    toast.success("Form Submitted Successfully!");
  };

  return (
    <div className="row fomik addRoute taxratee reason">
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
              name="reason"
              label="Reason"
              rules={[{ required: true, message: "Please input reason!" }]}
            >
              <Input.TextArea rows={5} placeholder="Enter Text" />
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

export default AddReasonForm;
