import React, { Fragment, useState } from "react";
import Trash from "../../assets/img/Trash.png";
import Create from "../../assets/img/Create.png";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, DatePicker } from "antd";
import TextArea from "antd/es/input/TextArea";

export default function ServiceEmail({data}) {

  console.log(data,">>>>>>>>>>>>>>>>>>>")
  return (
    <Fragment>
      <div className="container-fluid wordkorder serviceEmail">
        <div className="row">
          <div className="row fomik dynamic_form_nest_item ">
            <Space
              style={{ display: "flex", marginBottom: 8 }}
              align="baseline"
            >
              <div className="row slignc readingBox">
                <div className="col-sm-12">
                  <h3>Email Header</h3>
                  <Form.Item>
                    <Input
                      value={data?.EmailHeader}
                      readOnly
                    />
                  </Form.Item>
                </div>
                <div className="col-sm-12">
                  <h3>Email Content</h3>
                  <Form.Item>
                    <TextArea
                      rows={4}
                      readOnly
                      value={
                        data?.EmailContent
                      }
                      maxLength={6}
                    />
                  </Form.Item>
                </div>
              </div>
            </Space>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
