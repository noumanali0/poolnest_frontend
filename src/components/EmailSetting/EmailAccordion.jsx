import React from "react";
import { Fragment } from "react";
import Accordion from "react-bootstrap/Accordion";

import UploadImage from "./UploadImage";
import Previewslider from "./Previewslider";
import { Button, Form, Input } from "antd";
import SendMail from "./SendMail";
import CustomerInfo from "./CustomerInfo";

export default function EmailAccordion() {
  const onFinishs = (values) => {
    console.log("Received values of form:", values);
  };
  return (
    <Fragment>
      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <span>Send Email</span>
          </Accordion.Header>
          <Accordion.Body>
            <Form name="dynamic_form_item" onFinish={onFinishs}>
              <SendMail />
              <CustomerInfo />

              <UploadImage />
              <Previewslider />
              <div className="col-sm-12 accordfinalbtn">
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Save{" "}
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <span>Service Email</span>
          </Accordion.Header>
          <Accordion.Body>
            <SendMail />
            <CustomerInfo />

            <UploadImage />
            <Previewslider />

            <div className="col-sm-12 accordfinalbtn">
              <button className="yellowbtn">SAVE</button>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <span>Skipped Stop Email</span>
          </Accordion.Header>
          <Accordion.Body>
            <SendMail />
            <CustomerInfo />

            <UploadImage />
            <Previewslider />

            <div className="col-sm-12 accordfinalbtn">
              <button className="yellowbtn">SAVE</button>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Fragment>
  );
}
