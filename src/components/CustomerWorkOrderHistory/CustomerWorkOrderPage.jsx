import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Form, Skeleton, Space } from "antd";
import CustomerServiceDetail from "../ServiceLogsDetail/ServiceLocationPage";
import { useDispatch } from "react-redux";
import { fetchCustomereHistoryDetails } from "../../redux/Slices/getCustomerHistoryDetail";
import { useSelector } from "react-redux";

export default function CustomerWorkOrderPage({ data }) {
  const onFinishs = (values) => {
    console.log("Received values of form:");
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const PropsData = data;

  const handleButtonClick = (index) => {
    setActiveIndex(index);
    getSingleData(data?.data[index]?._id);
  };

  const { data: CustomereHistoryDetails } = useSelector(
    (state) => state.CustomereHistoryDetails
  );

  const MapData =
    CustomereHistoryDetails?.length !== 0
      ? CustomereHistoryDetails
      : PropsData?.data && PropsData?.data[0];

  const dispatch = useDispatch();

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}/${day}/${year}`;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getSingleData = async (id) => {
    dispatch(fetchCustomereHistoryDetails({ id }));
    window.scroll(0, 0);
  };

  return (
    <Fragment>
      <div className="serviceLog">
        {MapData?.ServiceDate ? (
          <Form name="dynamic_form_item" onFinish={onFinishs}>
            <div className="row serviceLogDetailPageCols">
              <div className="col-sm-2">
                <div className="container-fluid wordkorder">
                  <div className="row headwork">
                    <div className="col-sm-12">
                      <h3>Dates</h3>
                    </div>
                  </div>

                  <div className="row">
                    <div className="row fomik dynamic_form_nest_item ">
                      <Space
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        {data?.data?.map((item, i) => (
                          <div className="serviceRedings" key={i}>
                            <div className="row">
                              <button
                                onClick={() => handleButtonClick(i)}
                                className={`serviceRedings-btn ${
                                  activeIndex === i ? "active" : ""
                                }`}
                                style={{
                                  backgroundColor:
                                    activeIndex === i
                                      ? "#f0b51b"
                                      : "transparent",
                                  borderRadius: "10px",
                                }}
                              >
                                <div className="col-sm-1"></div>
                                <div className="col-sm-11">
                                  {item?.ServiceDate ? (
                                    <p>{formatDate(item?.ServiceDate)}</p>
                                  ) : null}
                                </div>
                              </button>
                            </div>
                          </div>
                        ))}
                      </Space>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-10">
                <div className="container-fluid wordkorder">
                  <CustomerServiceDetail data={MapData} />
                </div>
              </div>
            </div>
          </Form>
        ) : (
          <div className="nodata_div">
            <h2>{"No workorder is created in the Past"}</h2>
            <Skeleton />
          </div>
        )}
      </div>
    </Fragment>
  );
}
