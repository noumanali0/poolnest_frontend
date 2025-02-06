import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, Select, Radio } from "antd";
import { postwaterbodyData } from "../../redux/postReducer/postWaterbody";
import "react-datepicker/dist/react-datepicker.css";
import Checkbox from "antd/es/checkbox/Checkbox";
import { toast } from "react-toastify";
import {
  postserviceCheckListData,
  resetData,
} from "../../redux/postReducer/postServiceCheckList";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AddChecklistform = () => {
  const { success, error, loading } = useSelector(
    (state) => state.postserviceCheckList
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!");
  };
  const onFinish = (values) => {
    dispatch(postserviceCheckListData({ values }));
    navigate("/checklist");
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetData());
      navigate("/checklist");
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, success]);
  return (
    <div className="checkForm fomik addRoute checklst">
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="row cslocation">
          <div className="col-sm-12">
            <Form.Item
              name="type"
              type="hidden"
              style={{ display: "none" }}
              initialValue={"general"}
              rules={[
                { required: true, message: "Service Description  is required" },
              ]}
            >
              <Input placeholder="List Type" />
            </Form.Item>
          </div>

          <div className="col-sm-12">
            <Form.Item
              name="Description"
              rules={[
                {
                  required: true,
                  message: "Service Description is required",
                },
              ]}
              label="Default Description"
            >
              <Input.TextArea
                placeholder="Default Description"
                showCount
                maxLength={500}
                rows={8}
              />
            </Form.Item>
          </div>

          <div className="col-sm-12">
            <Form.Item
              name="DescriptionOnComplete"
              rules={[
                {
                  required: true,
                  message: "Service Description on Complete is required",
                },
              ]}
              label="Description when done"
            >
              <Input.TextArea
                placeholder="Description when done"
                showCount
                maxLength={500}
                rows={8}
              />
            </Form.Item>
          </div>
          <div className="col-sm-12 submitbtn">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={loading}
              >
                {" "}
                Save{" "}
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddChecklistform;
