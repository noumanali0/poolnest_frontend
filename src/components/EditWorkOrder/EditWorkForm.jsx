import React, { Fragment, useEffect, useState } from "react";
import { Form, Select, Input, Button, Space, Upload, Card, Tag } from "antd";
import Trash from "../../assets/img/Trash.png";
import Create from "../../assets/img/Create.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import DatePicker from "react-datepicker";
import {
  UpdateWorkOrderData,
  resetData,
} from "../../redux/postReducer/postWorkorder";
import { fetchTechnician } from "../../redux/Slices/GetTechnician";
import { toast } from "react-toastify";

const { Option } = Select;
function EditWorkForm({ state }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id } = useParams();
  const [serviceDate, setServiceDate] = useState(null);
  const [TechnicianData, setTechnicianData] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const { successput, error, loading } = useSelector(
    (state) => state.postworkorder
  );

  const [formData, setFormData] = useState();
  const { data: Technician } = useSelector((state) => state.Technician);

  const navigate = useNavigate();
  const service_id = state?.data?.workOrder?._id;

  /* eslint-enable no-template-curly-in-string */
  const onFinish = async (values) => {
    const Data = {
      technician_id: TechnicianData
        ? TechnicianData
        : values.technician_id?.value,
      service_time: values.service_time,
      work_performed: values.work_performed,
      service_location_id: values.service_location_id,
      estimated_time_minutes: values.estimated_time_minutes,
      price: values.price,
      work_needed: values.work_needed,
      waterbody_id: values.waterbody_id,
      work_order_type_id: values.work_order_type_id,
      service_date: selectedDate ? selectedDate : values?.service_date,
      labor_cost: values.labor_cost,
      notes: values.notes,
    };
    await dispatch(UpdateWorkOrderData({ Data, service_id }));
  };

  useEffect(() => {
    if (successput) {
      form.resetFields();
      toast.success(successput);
      dispatch(resetData());
      navigate("/work-order");
    }
  }, [successput]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error]);

  const handleDateChange = (date) => {
    // Format the selected date as "YYYY-MM-DD"
    // const formattedDate = moment(date).format("YYYY-MM-DD");
    setSelectedDate(date);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  useEffect(() => {
    if (state) {
      form.setFieldsValue({
        technician_id: {
          label: state?.data?.workOrder?.TechnicianData?.first_name,
          value: state?.data?.workOrder?.TechnicianData?._id,
        },
        service_time: state?.data?.workOrder?.service_time,
        work_performed: state?.data?.workOrder?.work_performed,
        service_location_id: state?.data?.workOrder?.service_location_id,
        customer_id: state?.data?.workOrder?.customer_id,
        estimated_time_minutes: state?.data?.workOrder?.estimated_time_minutes,
        service_date: formatDate(state?.data?.workOrder?.service_date),
        notes: state?.data?.workOrder?.notes,
        price: state?.data?.workOrder?.price,
        work_needed: state?.data?.workOrder?.work_needed,
        waterbody_id: state?.data?.workOrder?.waterbody_id,
        work_order_type_id: state?.data?.workOrder?.work_order_type_id,
        labor_cost: state?.data?.workOrder?.labor_cost,
      });
    }
  }, [state]);
  useEffect(() => {
    dispatch(fetchTechnician());
    window.scroll(0, 0);
  }, [dispatch]);

  return (
    <Fragment>
      <div className="container-fluid modals fomik addRoute editWorkOrder">
        <Form
          name="Customer"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={formData}
        >
          <div className="row cslocation">
            <div className="col-sm-8 forfulllll">
              <h4 className="custInfoh4">Customer Detail</h4>

              <div className="repairSection">
                <button className="bluebtn">REPAIR</button>
                <div>
                  <h6>UNPAID</h6>
                </div>
              </div>

              {/* <p className="addedP">
                Added By :
                <Tag>
                  <span> Muhammad Faiz Raza </span>
                </Tag>
              </p> */}

              <div className="row myselect">
                <div className="col-sm-12">
                  <Form.Item
                    name="work_needed"
                    label="Work Needed"
                    rules={[{ required: true }]}
                  >
                    <Input.TextArea
                      rows={8}
                      showCount
                      maxLength={500}
                      placeholder="Work Needed"
                    />
                  </Form.Item>
                </div>
                <div className="col-sm-12">
                  <Form.Item
                    name="work_performed"
                    label="Work Performed"
                    rules={[{ required: true }]}
                  >
                    <Input.TextArea
                      showCount
                      rows={8}
                      maxLength={500}
                      placeholder="Work Performed"
                    />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="col-sm-4 forfulllll">
              {/* <Card
                  title={
                    state?.routeAssignment?.RouteAssignmentWaterBody?.RouteAssignmentServiceLocation?.CustomerServiceLocation?.first_name
                  }
                >
                  <div className="row">
                    <div className="col-sm-12 ccuusssttinfffooo">
                      <p>{state?.routeAssignment?.RouteAssignmentWaterBody?.name} - Pool</p>

                      <p>{state?.routeAssignment?.RouteAssignmentWaterBody?.RouteAssignmentServiceLocation?.name}  - Service Location</p>

                    
                    </div>
                  </div>
                </Card> */}

              <h4 className="custInfoh4 twwooo">Route Assignment Info</h4>
              {state?.routeAssignment?.map((elem, index) => (
                <Card
                  key={index}
                  title={
                    elem?.RouteAssignmentWaterBody
                      ?.RouteAssignmentServiceLocation?.CustomerServiceLocation
                      ?.first_name
                  }
                >
                  <div className="row">
                    <div className="col-sm-6 halfff">
                      <p>Start Date</p>
                      <p>End Date</p>
                    </div>

                    <div className="col-sm-6 dateALign halfff">
                      <p>{moment(elem.start_date).format("DD/MM/YYYY")}</p>
                      <p>{moment(elem.stop_date).format("DD/MM/YYYY")}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <h4 className="custInfoh4 three">Technician Details</h4>
              <div className="row ">
                <div className="col-sm-4">
                  <Form.Item
                    label="Technician Name"
                    name="technician_id"
                    rules={[
                      { required: true, message: "Tech Name  is required" },
                    ]}
                  >
                    <Select
                      onChange={(e) => setTechnicianData(e)}
                      placeholder="Tech Name"
                    >
                      {Technician?.items &&
                        Technician.items?.map((item, i) => {
                          return (
                            <Option value={item._id}>
                              {item.first_name + " " + item.last_name}
                            </Option>
                          );
                        })}
                    </Select>
                  </Form.Item>
                </div>

                <div className="col-sm-4">
                  <Form.Item name="service_date" label="Service date">
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      placeholderText="Select Start date"
                    />
                  </Form.Item>
                </div>
                <div className="col-sm-4">
                  <Form.Item
                    name="estimated_time_minutes"
                    label="Est. Minutes"
                    rules={[
                      { required: true, message: "Est. Minutes is required" },
                    ]}
                  >
                    <Input placeholder="Est. Minutes" />
                  </Form.Item>
                </div>

                <div className="col-sm-4">
                  <Form.Item
                    name="service_time"
                    label="Scheduled Time (optional)"
                  >
                    <Input
                      value={state?.data?.workOrder?.service_time}
                      placeholder="Scheduled Time (optional)"
                    />{" "}
                  </Form.Item>
                </div>
                <div className="col-sm-4">
                  <Form.Item
                    name="labor_cost"
                    label="Labor Cost"
                    rules={[
                      { required: true, message: "Labor Cost is required" },
                    ]}
                  >
                    <Input placeholder="Labor Cost" />
                  </Form.Item>
                </div>

                <div className="col-sm-4">
                  <Form.Item
                    name="price"
                    label="Price"
                    rules={[{ required: true, message: "Price is required" }]}
                  >
                    <Input placeholder="Price" />
                  </Form.Item>
                </div>
                <div className="col-sm-6 forFullWidth">
                  <Form.Item name="notes" label="Notes">
                    <Input.TextArea
                      showCount
                      maxLength={500}
                      placeholder="Notes"
                      rows={8}
                    />
                  </Form.Item>
                </div>

                {/* As per Ali requirments */}
                <div className="col-sm-6 forFullWidth">
                  <div className="container-fluid wordkorder imagesMT">
                    <div className="row headwork">
                      <div className="col-sm-8">
                        <h3>Items Used </h3>
                      </div>
                    </div>
                    <hr />
                    <div className="row item-needed-css">
                      <div className="col-sm-3">Name</div>
                      <div className="col-sm-3">Price</div>
                      <div className="col-sm-3">Quantity</div>
                      <div className="col-sm-3">Description</div>
                    </div>
                    {state?.data?.CompleteWorkOrderDetail?.CompletedServiceRouteItemNeededServiceData?.map(
                      (item, i) => {
                        return (
                          <div className="row item-needed-css">
                            <div className="col-sm-3">
                              {
                                item
                                  ?.CompletedServiceRouteItemNeededItemNeededData
                                  ?.name
                              }
                            </div>
                            <div className="col-sm-3">
                              {
                                item
                                  ?.CompletedServiceRouteItemNeededItemNeededData
                                  ?.price
                              }
                            </div>
                            <div className="col-sm-3">
                              {
                                item
                                  ?.CompletedServiceRouteItemNeededItemNeededData
                                  ?.quantity
                              }
                            </div>
                            <div className="col-sm-3">
                              {
                                item
                                  ?.CompletedServiceRouteItemNeededItemNeededData
                                  ?.description
                              }
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>

                <div className="col-sm-6 forFullWidth">
                  <div className="container-fluid wordkorder preview workSlider">
                    <div className="container-fluid">
                      <div className="row headwork">
                        <div className="col-sm-12 heads">
                          <h3>Images</h3>
                        </div>

                        {/* <Form.Item
                          name="upload"
                          valuePropName="fileList"
                          getValueFromEvent={normFile}
                        >
                          <Upload
                            name="logo"
                            action="/upload.do"
                            listType="picture-circle"
                          >
                            <Button icon={<UploadOutlined />} className="uplbtnnnn">
                              Click to upload
                            </Button>
                          </Upload>
                        </Form.Item> */}
                      </div>
                    </div>
                    <Swiper
                      slidesPerView={3}
                      spaceBetween={50}
                      loop={true}
                      navigation={true}
                      modules={[Navigation]}
                      className="mySwiper"
                    >
                      {state?.data?.CompleteWorkOrderDetail?.CompletedServiceRouteImageServiceData.map(
                        (data) => {
                          return (
                            <SwiperSlide key={data._id}>
                              <img
                                src={data.Image}
                                alt="Preview"
                                className="img-css-1"
                              />
                            </SwiperSlide>
                          );
                        }
                      )}
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 
          <div className="row">
             <div className="col-sm-6">
              <div className="container-fluid wordkorder">
                <div className="row headwork">
                  <div className="col-sm-8">
                    <h3>Items Used </h3>
                  </div>
                  
                 
                </div>
                <hr />
                <div className="row item-needed-css">
                  
                          <div className="col-sm-3">Name</div>
                          <div className="col-sm-3">Price</div>
                          <div className="col-sm-3">Quantity</div>
                          <div className="col-sm-3">Description</div>

                        </div>
                {
                    state?.data?.CompleteWorkOrderDetail?.CompletedServiceRouteItemNeededServiceData?.map((item , i) => {
                      return(
                        <div className="row item-needed-css">
                          <div className="col-sm-3">{item?.CompletedServiceRouteItemNeededItemNeededData?.name}</div>
                          <div className="col-sm-3">{item?.CompletedServiceRouteItemNeededItemNeededData?.price}</div>
                          <div className="col-sm-3">{item?.CompletedServiceRouteItemNeededItemNeededData?.quantity}</div>
                          <div className="col-sm-3">{item?.CompletedServiceRouteItemNeededItemNeededData?.description}</div>

                        </div>
                      )
                    })
                  }
             
              </div>
            </div> 
            <div className="col-sm-6">
              <div className="container-fluid wordkorder preview workSlider">
                <div className="container-fluid">
                  <div className="row headwork">
                    <div className="col-sm-12 heads">
                      <h3>Images</h3>
                    </div>

                    <Form.Item
                      name="upload"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                    >
                      <Upload
                        name="logo"
                        action="/upload.do"
                        listType="picture-circle"
                      >
                        <Button icon={<UploadOutlined />} className="uplbtnnnn">
                          Click to upload
                        </Button>
                      </Upload>
                    </Form.Item>
                  </div>
                </div>
                <Swiper
                  slidesPerView={3}
                  spaceBetween={50}
                  loop={true}
                  navigation={true}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  {state?.data?.CompleteWorkOrderDetail?.CompletedServiceRouteImageServiceData.map((data) => {
                    return (
                      <SwiperSlide key={data._id}>
                        <img src={data.Image} alt="Preview" className="img-css-1"/>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div> */}
          <div className="col-sm-12 submitbtn workBtn">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="saaavvveeeBtnnn"
              >
                {" "}
                Save{" "}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Fragment>
  );
}

export default EditWorkForm;
