import React, { Fragment, useState } from "react";
import Trash from "../../assets/img/Trash.png";
import Create from "../../assets/img/Create.png";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, DatePicker } from "antd";
import { CheckOutlined } from "@ant-design/icons";

export default function ServiceCheckList({data}) {

  return (
    <Fragment>
      <div className="container-fluid wordkorder">
        <div className="row headwork">
          <div className="col-sm-12">
            <h3>completed checklist items</h3>
          </div>
        </div>

        <div className="row">
          <div className="row fomik dynamic_form_nest_item ">
            <Space
              style={{ display: "flex", marginBottom: 8 }}
              align="baseline"
            >
              {data?.map((item,i) => {
                return (
                  <div className="serviceRedings" key={i}>
                    <div className="row cslocation checks">
                      <div className="col-sm-2 check">
                        <p>
                          <CheckOutlined />
                          
                        </p>
                      </div>
                      <div className="col-sm-10 checkc">
                        <p>{item?.CompletedServiceRouteCheckListCheckListData?.DescriptionOnComplete}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Space>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
