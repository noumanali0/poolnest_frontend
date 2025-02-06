import { Form, Input } from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";
import React, { Fragment } from "react";

export default function SendMail() {
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <Fragment>
      <div className="row routefilters">
        <div className="col-sm-12">
          <h3>Where to Send Emails</h3>
        </div>
        <div className="col-sm-6">
          <Checkbox onChange={onChange}>
            <p> Send to customer email unless on Do Not Email List.</p>
          </Checkbox>
        </div>
        <div className="col-sm-6">
          <Checkbox onChange={onChange}>
            <p> Send to Alternate Email below instead of customer email.</p>
          </Checkbox>
        </div>

        <div className="col-sm-6">
          <Checkbox onChange={onChange}>
            <p>
              Send to customer email. If email is missing or on Do Not Email ow.
            </p>
          </Checkbox>
        </div>
        <div className="col-sm-6">
          <Form.Item
            name="Alternate Email"
            rules={[{ required: true, message: "Alternate Email is required" }]}
          >
            <Input placeholder="Alternate Email" />
          </Form.Item>
        </div>
      </div>
    </Fragment>
  );
}
