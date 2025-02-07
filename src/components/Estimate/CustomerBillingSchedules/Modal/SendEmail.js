import React, { useState } from "react";
import { Modal, Button, Form, Input, Checkbox, Row, Col } from "antd";

const SendEmail = ({ visible, onClose, notify = false, title = "" }) => {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
    cc: "",
    subject: "",
    notify: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal
      title={
        <h4
          className="text-center fw-bolder"
          style={{ fontWeight: "700", fontSize: "24px", fontFamily: "Inter" }}
        >
          {title}
        </h4>
      }
      open={visible}
      onCancel={() => {
        onClose(); // Close the modal
        setFormData({}); // Reset the form
      }}
      footer={[
        <Button
          key="cancel"
          onClick={onClose}
          className="estimate-builder-greybtn"
          style={{ fontWeight: "700" }}
        >
          Cancel
        </Button>,
        <Button
          key="save"
          type="primary"
          style={{
            backgroundColor: "#5DADE2",
            color: "black",
            textTransform: "none",
          }}
        >
          Preview
        </Button>,
        <Button
          key="send"
          type="primary"
          style={{ color: "black", textTransform: "none" }}
          onClick={onClose}
        >
          Send
        </Button>,
      ]}
      centered
      width={600}
      className="p-4"
    >
      <Form layout="vertical">
        <Row gutter={16}>
          {/* If notify is true, Customer Email and Notify via SMS will be in the same row */}
          {notify ? (
            <>
              <Col span={12}>
                <Form.Item label="Customer Email:" className="fw-bold">
                  <Input
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item className="fw-bold " style={{ marginTop: "25px" }}>
                  <Row
                    align="middle"
                    justify="center"
                    style={{ height: "100%", display: "flex" }}
                  >
                    <span
                      style={{
                        paddingRight: "10px",
                        fontWeight: "700",
                        fontSize: "12px",
                      }}
                    >
                      Notify via SMS
                    </span>
                    <Checkbox
                      style={{ marginLeft: "10px" }}
                      checked={formData.notify}
                      onChange={(e) =>
                        setFormData({ ...formData, notify: e.target.checked })
                      }
                    />
                  </Row>
                </Form.Item>
              </Col>
            </>
          ) : (
            /* If notify is false, Customer Email will be in its own row with half width */
            <Col span={12}>
              <Form.Item label="Customer Email:" className="fw-bold">
                <Input
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          )}

          {/* CC will always be half-width and in column form */}
        </Row>
        <Row>
          {" "}
          <Col span={12}>
            <Form.Item label="CC:" className="fw-bold">
              <Input
                className="form-control"
                name="cc"
                value={formData.cc}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          {/* Third Row: Email Subject (Col span 24) */}
          <Col span={24}>
            <Form.Item label="Email Subject:" className="fw-bold">
              <Input
                className="form-control"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>

          {/* Fourth Row: Message (Col span 24) */}
          <Col span={24}>
            <Form.Item label="Message:" className="fw-bold">
              <Input.TextArea
                style={{ height: "150px" }}
                className="form-control"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default SendEmail;
