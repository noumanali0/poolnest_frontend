import React, { Fragment } from "react";
import { Form, Select, Input, DatePicker, InputNumber, Button } from "antd";

const { Option } = Select;
function ServiceListModal() {
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  /* eslint-enable no-template-curly-in-string */
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Fragment>
      <div className="container-fluid modals">
        <Form
          name="nest-messages"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          validateMessages={validateMessages}
        >
          <div className="row">
            <div className="col-sm-8">
              <h4>Customer Detail</h4>
              <div className="row myselect">
                <div className="col-sm-6">
                  <Form.Item
                    name="recurringwork"
                    rules={[
                      { required: true, message: "Reccuring Work is required" },
                    ]}
                  >
                    <Select placeholder="Recurring Work Order">
                      <Option value="commercial">Commercial</Option>
                      <Option value="residential">Residential</Option>
                    </Select>
                  </Form.Item>
                </div>

                {/* <div className='col-sm-3'>
                                    <Form.Item name="reccuringwork" rules={[{ required: true, message: "Customer Type is required" }]}       >
                                        <Select placeholder="Recurring Work Order">
                                            <Option value="commercial">Commercial</Option>
                                            <Option value="residential">Residential</Option>
                                        </Select>
                                    </Form.Item>
                                </div> */}

                <div className="col-sm-6">
                  <Form.Item name="customername" rules={[{ required: true }]}>
                    <Input placeholder="Customer Name" />
                  </Form.Item>
                </div>

                <div className="col-sm-6">
                  <Form.Item
                    name="servicelocation"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Service Location" />
                  </Form.Item>
                </div>

                <div className="col-sm-6">
                  <Form.Item name="bodyname" rules={[{ required: true }]}>
                    <Input placeholder="Pool/SPA" />
                  </Form.Item>
                </div>

                <div className="col-sm-12">
                  <Form.Item name="workneed" rules={[{ required: true }]}>
                    <Input.TextArea showCount maxLength={500} />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <h4>Route Assignment Info</h4>
              <Form.Item
                name="tech"
                rules={[{ required: true }]}
                initialValue="Alisher"
              >
                <Input placeholder="Tech" disabled />
              </Form.Item>

              <Form.Item
                name="dayofweek"
                rules={[{ required: true }]}
                initialValue="Monday"
              >
                <Input placeholder="Day Of Week" disabled />
              </Form.Item>

              <Form.Item
                name="frequency"
                rules={[{ required: true }]}
                initialValue="20 feet"
              >
                <Input placeholder="Frequency" disabled />
              </Form.Item>

              <Form.Item
                name="starton"
                rules={[{ required: true }]}
                initialValue="Start On"
              >
                <Input placeholder="Start On" disabled />
              </Form.Item>

              <Form.Item
                name="startafter"
                rules={[{ required: true }]}
                initialValue="Start After"
              >
                <Input placeholder="Start After" disabled />
              </Form.Item>
            </div>
          </div>

          <div className="row midsec">
            <div className="col-sm-4">
              <Form.Item>
                <DatePicker placeholder="Start Date" />
              </Form.Item>
            </div>
            <div className="col-sm-4">
              <Form.Item name="endminutes" rules={[{ required: true }]}>
                <Input placeholder="End Minutes" />
              </Form.Item>
            </div>
            <div className="col-sm-4">
              <Form.Item name="scheduletime" rules={[{ required: true }]}>
                <Input placeholder="Scheduled Time (optional)" />
              </Form.Item>
            </div>
            <div className="col-sm-4">
              <Form.Item name="labourcost" rules={[{ required: true }]}>
                <InputNumber placeholder="Labor Cost" />
              </Form.Item>
            </div>
            <div className="col-sm-4">
              <Form.Item name="price" rules={[{ required: true }]}>
                <InputNumber placeholder="Price" />
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <h4>Route Assignment Info</h4>
            </div>
            <div className="col-sm-3">
              <Form.Item
                name="tech"
                rules={[
                  { required: true, message: "Customer Type is required" },
                ]}
              >
                <Select placeholder="Tech">
                  <Option value="commercial">Aeron</Option>
                  <Option value="residential">Alisher Alwani</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="col-sm-3">
              <Form.Item
                name="dayofweek"
                rules={[
                  { required: true, message: "Customer Type is required" },
                ]}
              >
                <Select placeholder="Day Of Week">
                  <Option value="monday">Monday</Option>
                  <Option value="tuesday">Tuesday</Option>
                  <Option value="wednesday">Wednesday</Option>
                  <Option value="thursday">Thursday</Option>
                  <Option value="friday">Friday</Option>
                  <Option value="saturday">Saturday</Option>
                  <Option value="sunday">Sunday</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="col-sm-2">
              <Form.Item
                name="frequency"
                rules={[
                  { required: true, message: "Customer Type is required" },
                ]}
              >
                <Select placeholder="frequency">
                  <Option value="10_feet">10 Feet</Option>
                  <Option value="20_feet">20 Feet</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="col-sm-2">
              <Form.Item
                name="starton"
                rules={[
                  { required: true, message: "Customer Type is required" },
                ]}
              >
                <Select placeholder="Start on">
                  <Option value="commercial">Commercial</Option>
                  <Option value="residential">Residential</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="col-sm-2">
              <Form.Item
                name="startafter"
                rules={[
                  { required: true, message: "Customer Type is required" },
                ]}
              >
                <Select placeholder="Start After">
                  <Option value="commercial">Commercial</Option>
                  <Option value="residential">Residential</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="col-sm-12 submitbtn">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {" "}
                  Save{" "}
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </Fragment>
  );
}

export default ServiceListModal;
