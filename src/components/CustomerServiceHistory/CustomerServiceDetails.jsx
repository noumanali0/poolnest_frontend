import React from "react";
import { Fragment } from "react";
import { Button, Form, Input, Space, DatePicker } from "antd";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";

export default function ServiceLogDetailHeader({ data }) {
  const { data: CustomereHistoryDetails } = useSelector(
    (state) => state.CustomereHistoryDetails
  );

  const MapData = data?.data ? data?.data[0] : [];

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}/${day}/${year}`;
  }

  const UsedData = CustomereHistoryDetails ? CustomereHistoryDetails : MapData;


  return (
    <Fragment>
      <div className="row">
        <div className="row fomik dynamic_form_nest_item">
          <Space style={{ display: "flex", marginBottom: 8 }} align="baseline">
            <div className="row slignc">
              <div className="col-sm-4 serviceInfoInput">
                <Form.Item label="Technician Name">
                  <Input
                    readOnly
                    placeholder={
                      UsedData?.CompletedServiceRoutesAdmin?.first_name +
                      " " +
                      UsedData?.CompletedServiceRoutesAdmin?.last_name
                    }
                  />
                </Form.Item>
              </div>

              <div className="col-sm-4 serviceInfoInput">
                <Form.Item label="Service Date">
                  <Input
                    placeholder={moment(UsedData?.ServiceDate).format("LL")}
                    readOnly
                  />
                </Form.Item>
              </div>

              <div className="col-sm-4 serviceInfoInput">
                <Form.Item label="Duration">
                  <Input placeholder={UsedData?.Duration} readOnly />
                </Form.Item>
              </div>

              <div className="col-sm-4 serviceInfoInput">
                <Form.Item label="Labor Cost">
                  <Input placeholder={UsedData?.LaborCost} readOnly />
                </Form.Item>
              </div>

              <div className="col-sm-4 serviceInfoInput">
                <Form.Item label="Rate Cost">
                  <Input placeholder={UsedData?.RateCost} readOnly />
                </Form.Item>
              </div>

              <div className="col-sm-4 serviceInfoInput">
                <Form.Item label="Tax">
                  <Input placeholder={UsedData?.Tax} readOnly />
                </Form.Item>
              </div>

              <div className="col-sm-12 serviceInfoInput">
                <Form.Item label="Email Header">
                  <Input placeholder={UsedData?.EmailHeader} readOnly />
                </Form.Item>
              </div>

              <div className="col-sm-12 serviceInfoInput">
                <Form.Item label="Email Content">
                  <TextArea
                    rows={4}
                    readOnly
                    value={UsedData?.EmailContent}
                    maxLength={6}
                  />
                </Form.Item>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6 forFullWidth">
                <div className="container-fluid wordkorder">
                  <div className="row headwork">
                    <div className="col-sm-12">
                      <h3>Dosages</h3>
                    </div>
                  </div>

                  <div className="row">
                    <Space
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      {UsedData?.CompletedServiceRoutesDosageActivity?.map(
                        (item, i) => {
                          return (
                            <div className="serviceRedings" key={i}>
                              <div className="row ">
                                <div className="col-sm-6">
                                  <p>
                                    {
                                      item
                                        ?.CompletedServiceRoutesDosageDosageData
                                        ?.name
                                    }
                                  </p>
                                </div>
                                <div className="col-sm-4"></div>
                                <div className="col-sm-2">
                                  <p>
                                    {
                                      item
                                        ?.CompletedServiceRoutesDosageDosageData
                                        ?.unit_of_measurement
                                    }
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </Space>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 forFullWidth">
                <div className="container-fluid wordkorder">
                  <div className="row headwork">
                    <div className="col-sm-12">
                      <h3>Reading</h3>
                    </div>
                  </div>

                  <div className="row">
                    <div className="row fomik dynamic_form_nest_item ">
                      <Space
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        {UsedData?.CompletedServiceRoutesReadingActivity?.map(
                          (item, i) => {
                            return (
                              <div className="serviceRedings" key={i}>
                                <div className="row ">
                                  <div className="col-sm-6">
                                    <p>
                                      {
                                        item?.CompletedServiceRoutesReadingData
                                          ?.name
                                      }
                                    </p>
                                  </div>
                                  <div className="col-sm-4">
                                    <p>{item?.values}</p>
                                  </div>
                                  <div className="col-sm-2">
                                    <p>
                                      {
                                        item?.CompletedServiceRoutesReadingData
                                          ?.unit_of_measurement
                                      }
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </Space>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Space>
        </div>
      </div>
    </Fragment>
  );
}
