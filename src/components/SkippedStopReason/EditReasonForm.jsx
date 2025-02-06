import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateitemTypeData } from "../../redux/postReducer/postProductType";
import { fetchgetProductType } from "../../redux/Slices/getProductType";
import { UpdateReason } from "../../redux/postReducer/postReason";
import { fetchReason } from "../../redux/Slices/getReason";

const EditReasonForm = ({ data1 }) => {
  const id = data1?.Edit?._id;
  const [form] = Form.useForm();

  const [formData, setFormData] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    setFormData({
      reason: data1?.Edit?.reason,
    });
  }, [data1]);

  const onFinish = async (values) => {

    await dispatch(UpdateReason({ id, values }));
    data1.handleCloseEdit();
    dispatch(fetchReason({}));
  };

  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!");
  };

  form.setFieldsValue({
    reason: formData?.reason || "",
  });
  return (
    <div className="row fomik addRoute taxratee AddProductt">
      <Form
        name="Customer"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        // onValuesChange={handleFormValuesChange}
        form={form}
        autoComplete="off"
        initialValues={formData}
      >
        <div className="row cslocation">
          <div className="col-sm-12">
            <Form.Item
              label="Reason"
              name="reason"
              rules={[
                { required: true, message: "Please input Product Type Name!" },
              ]}
            >
              <Input placeholder="Reason" />
            </Form.Item>
          </div>

          <div className="col-sm-12 savebtn addProductType taxRate">
            <Form.Item>
              <Button className="yellowbtn" type="primary" htmlType="submit">
                Save Reason
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EditReasonForm;
