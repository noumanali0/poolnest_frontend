import React, { Fragment, useEffect, useState } from "react";
import Trash from "../../assets/img/Trash.png";
import Create from "../../assets/img/Create.png";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchgetAllreadingTaken } from "../../redux/Slices/getAllReading";

export default function ServiceReading({data}) {
  
  return (
    <Fragment>
      <div className="container-fluid wordkorder">
        <div className="row headwork">
          <div className="col-sm-12">
            <h3>Readings</h3>
          </div>
        </div>

        <div className="row">
          <div className="row fomik dynamic_form_nest_item ">
            <Space
              style={{ display: "flex", marginBottom: 8 }}
              align="baseline"
            >
              {data?.map((item, i) => {
                return (
                  <div className="serviceRedings">
                    <div className="row ">
                      <div className="col-sm-6">
                        <p>{item?.CompletedServiceRoutesReadingValueData?.ReadingValuesData?.name}</p>
                      </div>
                      <div className="col-sm-4">
                      <p>{item?.CompletedServiceRoutesReadingValueData?.values}</p>
                      </div>
                      <div className="col-sm-2">
                      <p>{item?.CompletedServiceRoutesReadingValueData?.ReadingValuesData?.unit_of_measurement}</p>
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
