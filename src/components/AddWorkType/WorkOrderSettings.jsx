import React from "react";
import { Form, Input, Space } from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";

const WorkOrderSettings = () => {
  return (
    <div>
      <div className="container-fluid wordkorder workSetting">
        <div className="col-sm-8">
          <h3>Work Order Settings</h3>
        </div>

        <div className="col-sm-12 workOrderSettingggss">
          <Form.Item>
            <Checkbox>This work needs to be invoiced</Checkbox>
            <Checkbox>Alert office when work order added</Checkbox>
            <Checkbox>Require a photo to finish</Checkbox>
            <Checkbox>Email the customer when finished</Checkbox>
            <Checkbox>Allow techs to add this type</Checkbox>
          </Form.Item>
        </div>
      </div>
    </div>
  );
};

export default WorkOrderSettings;
