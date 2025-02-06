import React, { Fragment, useState } from "react";
import Trash from "../../assets/img/Trash.png";
import Create from "../../assets/img/Create.png";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, DatePicker } from "antd";
import Switch from "antd/lib/switch";
import Modal from "react-bootstrap/Modal";
import ServiceListModal from "./ServiceListModal";

export default function Servicelist() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Fragment>
      <div className="container-fluid wordkorder">
        <div className="row headwork">
          <div className="col-sm-8">
            <h3>Service List</h3>
          </div>
          <div className="col-sm-4"></div>
        </div>

        <div className="row">
          <div className="row fomik dynamic_form_nest_item">
            <Form.List name="servicelist" initialValue={[{ filterclean: "" }]}>
              {(fields, { add, remove }) => (
                <>
                  <div className="row workaddbtn">
                    <div className="col-sm-6 btns">
                      <Form.Item>
                        <Button className="wbtn" onClick={handleShow} block>
                          + Add New
                        </Button>
                      </Form.Item>
                    </div>
                  </div>

                  {fields.map(({ key = [20], name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <div className="row slignc">
                        <div className="col-sm-9">
                          <Form.Item
                            {...restField}
                            name={[name, "filterclean1"]}
                            rules={[
                              {
                                required: true,
                                message: "Missing Filter Clean",
                              },
                            ]}
                          >
                            <Input placeholder="Filter Clean" />
                          </Form.Item>
                        </div>

                        <div className="col-sm-1">
                          <button className="wbtn" onClick={() => remove(name)}>
                            <img src={Create} />
                          </button>
                        </div>

                        <div className="col-sm-1">
                          <button className="wbtn" onClick={() => remove(name)}>
                            <img src={Trash} />
                          </button>
                        </div>

                        <div className="col-sm-1"></div>
                      </div>
                    </Space>
                  ))}
                </>
              )}
            </Form.List>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Body>
          Add Service
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X
          </Button>
        </Modal.Body>
        <ServiceListModal />
      </Modal>
    </Fragment>
  );
}
