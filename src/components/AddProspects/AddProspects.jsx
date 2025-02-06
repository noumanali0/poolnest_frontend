import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";

import { toast } from "react-toastify";
import { postequipmwntData } from "../../redux/postReducer/postEquipment";
import { useDispatch } from "react-redux";
import { fetchgetAllEquipmemnt } from "../../redux/Slices/getAllEquipment";

const EquipmentForm = ({ data1 }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [needsInvoiced, setNeedsInvoiced] = useState(false);
  const [alertOffice, setAlertOffice] = useState(false);

  const [requiredPhoto, setRequiredPhoto] = useState(false);

  const onFinish = async (values, key) => {
    await dispatch(postequipmwntData({ values }));
    dispatch(fetchgetAllEquipmemnt({}));
    data1();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    toast.error("Please fill all required fields!");
  };

  return (
    <div className="row fomik addRoute">
      <Form
        name="Customer"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="row">
          <div className="col-sm-12 workOrderSettingggss">
            <Form.Item
              label="Service Location"
              name="needs_invoiced"
              valuePropName="checked"
            >
              <Checkbox
                checked={needsInvoiced}
                onChange={(e) => setNeedsInvoiced(e.target.checked)}
              >
                Test 1
              </Checkbox>
            </Form.Item>
          </div>

          <div className="col-sm-12 workOrderSettingggss">
            <Form.Item
              label="Service Location"
              name="needs_invoiced"
              valuePropName="checked"
            >
              <Checkbox
                checked={needsInvoiced}
                onChange={(e) => setNeedsInvoiced(e.target.checked)}
              >
                Test 1
              </Checkbox>
            </Form.Item>
          </div>

          <div className="col-sm-12 workOrderSettingggss">
            <Form.Item
              label="Service Location"
              name="needs_invoiced"
              valuePropName="checked"
            >
              <Checkbox
                checked={needsInvoiced}
                onChange={(e) => setNeedsInvoiced(e.target.checked)}
              >
                Test 1
              </Checkbox>
            </Form.Item>
          </div>

          <div className="col-sm-12 savebtn addEquipments">
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

export default EquipmentForm;
