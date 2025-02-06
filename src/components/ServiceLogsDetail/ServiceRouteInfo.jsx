import React, { Fragment, useState } from "react";
import Trash from "../../assets/img/Trash.png";
import Create from "../../assets/img/Create.png";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, DatePicker } from "antd";
import moment from "moment";

export default function ServiceInfo({ data }) {
  return (
    <Fragment>
      <div className="container-fluid wordkorder">
        <div className="row fomik dynamic_form_nest_item cslocation">
          <Space
            style={{ display: "flex", marginBottom: 8 }}
            align="baseline"
          >
            <div className="row slignc">

            <div className="col-sm-4 forFifty serviceInfoInput">
                <Form.Item label="Technician Name">
                  <Input
                    placeholder="Tech Name"
                    readOnly
                    value={
                      data?.RouteAssingmentData?.RouteAssignmentTechnician
                        ?.first_name +
                      " " +
                      data?.RouteAssingmentData?.RouteAssignmentTechnician
                        ?.last_name
                    }
                  />
                </Form.Item>
              </div>

              <div className="col-sm-4 forFifty serviceInfoInput">
                <Form.Item label="Start Date">
                  <Input
                    placeholder={moment(
                      data?.RouteAssingmentData?.start_date
                    ).format("LL")}
                    readOnly
                  />
                </Form.Item>
              </div>

              <div className="col-sm-4 forFifty serviceInfoInput">
                <Form.Item label="Assigned Date">
                  <Input
                    placeholder={data?.RouteAssingmentData?.assigned_date}
                    readOnly
                  />
                </Form.Item>
              </div>

              <div className="col-sm-4 forFifty serviceInfoInput">
                <Form.Item label="Pool Name">
                  <Input
                    placeholder="Tech Name"
                    readOnly
                    value={
                      data?.RouteAssingmentData?.RouteAssignmentWaterBody
                        ?.name
                    }
                  />
                </Form.Item>
              </div>

              <div className="col-sm-4 forFifty serviceInfoInput">
                <Form.Item label="Rate">
                  <Input
                    placeholder={
                      data?.RouteAssingmentData?.RouteAssignmentWaterBody.rate
                    }
                    readOnly
                  />
                </Form.Item>
              </div>

              <div className="col-sm-4 forFifty serviceInfoInput">
                <Form.Item label="Size">
                  <Input
                    placeholder={
                      data?.RouteAssingmentData?.RouteAssignmentWaterBody.size
                    }
                    readOnly
                  />
                </Form.Item>
              </div>

              <div className="col-sm-4 forFifty serviceInfoInput">
                <Form.Item label="Labor Cost">
                  <Input
                    placeholder={
                      data?.RouteAssingmentData?.RouteAssignmentWaterBody.labor_cost
                    }
                    readOnly
                  />
                </Form.Item>
              </div>

              <div className="col-sm-4 forFifty serviceInfoInput">
                <Form.Item label="Frequency">
                  <Input
                    placeholder="Tech Name"
                    readOnly
                    value={
                      data?.RouteAssingmentData?.RouteAssignmentFrequency
                        ?.name
                    }
                  />
                </Form.Item>
              </div>

              <div className="col-sm-4 forFifty serviceInfoInput">
                <Form.Item label="Frequency Value">
                  <Input
                    placeholder={
                      data?.RouteAssingmentData?.RouteAssignmentFrequency.value
                    }
                    readOnly
                  />
                </Form.Item>
              </div>
              
            </div>
          </Space>
        </div>
      </div>
    </Fragment>
  );
}
