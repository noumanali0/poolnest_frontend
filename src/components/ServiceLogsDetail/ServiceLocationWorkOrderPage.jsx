import React from "react";
import { Fragment } from "react";
import { Form, Space } from "antd";
import ServiceLogsFilter from "./ServiceLogsFilter";
import ServiceInfo from "./ServiceRouteInfo";
import ServiceReading from "./ServiceReading";
import ServiceEquipment from "./ServiceEquipment";
import ServiceItemNeeded from "./ServiceItemNeeded";
import DosagesList from "./DosagesList";
import ServiceCheckList from "./ServiceCheckList";
import ServiceEmail from "./ServiceEmail";
import ServiceImageSlider from "./ServiceImageSlider";
import { CheckOutlined } from "@ant-design/icons";

export default function ServiceLogDetailPage({ data }) {
  const onFinishs = (values) => {
    console.log("Received values of form:");
  };

  return (
    <Fragment>
      <div className="serviceLog">
        <Form name="dynamic_form_item" onFinish={onFinishs}>
          <div className="row serviceLogDetailPageCols cslocation">
            <div className="col-sm-4 ddx">
              <div className="container-fluid wordkorder">
                <div className="row headwork">
                  <div className="col-sm-12">
                    <h3>Completed Checklist Items</h3>
                  </div>
                </div>
                <div className="row fomik dynamic_form_nest_item cslocation ">
                  <Space
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    {data?.CheckListData?.map((item, i) => {
                      return (
                        <div className="serviceRedings" key={i}>
                          <div className="row cslocation checks">
                            <div className="col-sm-2 check"><CheckOutlined /></div>
                            <div className="col-sm-10 checkc">
                              <p>{item?.Description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </Space>
                </div>
              </div>
            </div>
            <div className="col-sm-8">
              <div className="container-fluid wordkorder">
                <ServiceInfo data={data}/> 
              </div>
            </div>
          </div>
        </Form>
      </div>
    </Fragment>
  );
}
