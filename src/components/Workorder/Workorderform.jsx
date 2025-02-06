import React, { Fragment, useEffect } from "react";
import {
  Form,
  Select,
  Input,
  InputNumber,
  Button,
  Card,
  DatePicker,
  TimePicker,
  Switch,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetWorkOrderType } from "../../redux/Slices/getWorkOrderType";
import { fetchAllgetCustomers } from "../../redux/Slices/getCustomer";
import { fetchgetCustomerServices } from "../../redux/Slices/getCustomerService";
import { fetchwaterbody } from "../../redux/Slices/getWaterBody";
import moment from "moment";
import { fetchTechnician } from "../../redux/Slices/GetTechnician";
import { useState } from "react";
import {
  postworkorderData,
  resetData,
} from "../../redux/postReducer/postWorkorder";
import { toast } from "react-toastify";
import WorkTypeForm from "../Pool/WorkorderTypeModal";
import { Modal } from "react-bootstrap";

const { Option } = Select;
function Workorderform() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDatenew, setSelectedDatenew] = useState(null);
  const [value, setValue] = useState(null);
  const [activestatus, setactivestatus] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayChange = (value) => {
    setSelectedDay(value);
  };

  const handleChangeStatus = (e) => {
    setactivestatus(e);
  };
  const [form] = Form.useForm();
  const { data, loading, successpost, error } = useSelector(
    (state) => state.postworkorder
  );
  const postworkorders = useSelector((state) => state.postworkorder);
  const { data: getWorkOrderType } = useSelector(
    (state) => state.getWorkOrderType
  );
  const { data: getCustomer, statusdata } = useSelector(
    (state) => state.getCustomer
  );
  const { data: getCustomerService } = useSelector(
    (state) => state.getCustomerService
  );
  const { data: waterbody } = useSelector((state) => state.waterbody);

  const { data: Technician } = useSelector((state) => state.Technician);
  const [selectedWorkOrderType, setSelectedWorkOrderType] = useState(null);
  const [price, setPrice] = useState("");
  const [description, setdescription] = useState("");
  const [labor_cost, setlabor_cost] = useState("");
  const [estimated_time_in_mins, setestimated_time_in_mins] = useState("");

  const handleChange = (value) => {
    const selectedOption = getWorkOrderType?.items?.find(
      (item) => item._id === value
    );

    setSelectedWorkOrderType(selectedOption);
    setPrice(selectedOption?.price || ""); // Assuming price is a property of work order type
    setdescription(selectedOption?.description || ""); // Assuming price is a property of work order type
    setlabor_cost(selectedOption?.labor_cost || ""); // Assuming price is a property of work order type
    setestimated_time_in_mins(selectedOption?.estimated_time_in_mins); // Assuming price is a property of work order type
  };
  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setdescription(e.target.value);
  };

  const handleLabourChange = (e) => {
    setlabor_cost(e.target.value);
  };

  const handleTimeChange = (e) => {
    setestimated_time_in_mins(e.target.value);
  };

  useEffect(() => {
    form.setFieldsValue({
      price: price,
      labor_cost: labor_cost,
      work_needed: description,
      estimated_time_in_mins: estimated_time_in_mins,
    });
  }, [price, form, selectedWorkOrderType]);

  const handleDateChange = (e, date) => {
    const utcDate = moment.utc(date).format(); // Convert date to UTC format
    setSelectedDate(utcDate);
  };
  const onChange = (saa, time) => {
    setValue(time);
  };
  /* eslint-enable no-template-curly-in-string */
  const onFinish = (values, key) => {
    const Data = {
      technician_id: values.technician_id,
      service_time: value,
      work_performed: values.work_performed,
      service_location_id: values.service_location_id,
      customer_id: values.customer_id,
      estimated_time_minutes: values.estimated_time_minutes,
      status: "active",
      price: values.price,
      work_needed: values.work_needed,
      waterbody_id: values.waterbody_id,
      workordertype_id: values.work_order_type_id,
      service_date: selectedDate,
      labor_cost: values.labor_cost,
      // WorkOrderTypePrice: activestatus,
    };
    dispatch(postworkorderData({ Data }));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:");
  };

  const CustomerSelect = (id) => {
    dispatch(fetchgetCustomerServices({ id }));
  };
  const LocationSelect = (ServiceLocationID) => {
    dispatch(fetchwaterbody({ ServiceLocationID }));
  };

  useEffect(() => {
    dispatch(fetchgetWorkOrderType({}));
    dispatch(fetchAllgetCustomers({}));
    dispatch(fetchTechnician());
  }, [dispatch]);

  useEffect(() => {
    if (successpost) {
      toast.success(successpost);
      dispatch(resetData());
      navigate("/work-order");
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, successpost]);

  return (
    <Fragment>
      <div className="container-fluid modals addRoute">
        <Form
          name="nest-messages"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <div className="row addWorkOrderPoolModal">
            <div className="col-sm-8 forfulllll">
              <h4 className="custInfoh4">Customer Detail</h4>

              <div className="row cslocation">
                <div className="col-sm-6 myselect">
                  <Button
                    disabled={false}
                    className="AddNewTypeBtnWorkOrder"
                    onClick={handleShow}
                    block
                  >
                    + Add New Type
                  </Button>
                  <Form.Item
                    name="work_order_type_id"
                    label="Work Order type"
                    rules={[
                      {
                        required: true,
                        message: "Please select a Work Order Type",
                      },
                    ]}
                  >
                    <Select
                      onChange={handleChange}
                      placeholder="Work Order Type"
                    >
                      {getWorkOrderType?.items?.map((item) => (
                        <Option value={item._id}>{item?.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>

                <div className="col-sm-6">
                  <Form.Item
                    label="Customer"
                    name="customer_id"
                    rules={[
                      {
                        required: true,
                        message: "Please select a Customer",
                      },
                    ]}
                  >
                    <Select
                      filterOption={filterOption}
                      showSearch
                      placeholder="Customer"
                      onChange={CustomerSelect}
                    >
                      {getCustomer?.items?.map((item, i) => (
                        <Option key={i} value={item?._id}>
                          {item?.first_name + " " + item?.last_name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>

                <div className="col-sm-6">
                  <Form.Item
                    name="service_location_id"
                    label="Service Location"
                    rules={[
                      {
                        required: true,
                        message: "Please select a Service Location",
                      },
                    ]}
                  >
                    <Select
                      onChange={LocationSelect}
                      placeholder="Service Location"
                      filterOption={filterOption}
                      showSearch
                    >
                      {getCustomerService?.map((item, i) => {
                        return <Option value={item?._id}>{item.name}</Option>;
                      })}
                    </Select>
                  </Form.Item>
                </div>

                <div className="col-sm-6">
                  <Form.Item
                    name="waterbody_id"
                    label="Waterbody Type"
                    rules={[
                      {
                        required: true,
                        message: "Please select a Waterbody Type",
                      },
                    ]}
                  >
                    <Select placeholder="Waterbody Type">
                      {waterbody?.map((item, i) => {
                        return <Option value={item?._id}>{item?.name}</Option>;
                      })}
                    </Select>
                  </Form.Item>
                </div>

                <div className="col-sm-12">
                  <Form.Item
                    label="Work Needed"
                    name="work_needed"
                    rules={[
                      {
                        required: true,
                        message:
                          "Please provide a description of the work needed",
                      },
                    ]}
                  >
                    <Input.TextArea
                      rows={8}
                      showCount
                      maxLength={500}
                      placeholder="Work needed"
                    />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="col-sm-4 forfulllll">
              <h4 className="custInfoh4">Route Assignment Info</h4>
              {waterbody?.map((item) =>
                item.RouteAssignmentWaterBody?.map((elem, index) => (
                  <Card
                    key={index}
                    title={`${elem?.RouteAssignmentTechnician?.first_name} ${elem?.RouteAssignmentTechnician?.last_name}`}
                  >
                    <div className="row">
                      <div className="col-sm-6">
                        <p>
                          {elem?.assigned_date} |{" "}
                          {elem?.RouteAssignmentFrequency?.name}{" "}
                        </p>
                      </div>
                      <div className="col-sm-6 dateALign">
                        <p>{moment(elem.start_date).format("DD/MM/YYYY")}</p>
                        <p>{moment(elem.stop_date).format("DD/MM/YYYY")}</p>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>

          <div className="row midsec addWorkOrder">
            <div className="col-sm-12">
              <h4 className="custInfoh4">Technician Details</h4>
            </div>

            <div className="col-sm-4 forFifty">
              <Form.Item
                name="technician_id"
                rules={[
                  { required: true, message: "Please select a Technician" },
                ]}
                label="Tech Name"
              >
                <Select
                  filterOption={filterOption}
                  showSearch
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
            <div className="col-sm-4 forFifty anttPicker">
              <Form.Item
                name={["form", "service_date"]}
                label="Service Date"
                rules={[
                  { required: true, message: "Please select a Service Date" },
                ]}
              >
                <DatePicker
                  onChange={handleDateChange}
                  placeholder="Select Start date"
                  format="MM/DD/YYYY"
                />
              </Form.Item>
            </div>
            <div className="col-sm-4 forFifty">
              <Form.Item
                name="estimated_time_minutes"
                rules={[
                  {
                    required: true,
                    message: "Please enter estimated time in minutes",
                  },
                ]}
                label="Est Minutes"
              >
                <Input placeholder="Est Minutes" />
              </Form.Item>
            </div>
            <div className="col-sm-4 forFifty anttPicker">
              <Form.Item name="service_time" label="Scheduled Time (optional)">
                <TimePicker onChange={onChange} />
              </Form.Item>
            </div>
            <div className="col-sm-4 forFifty">
              <Form.Item
                name="labor_cost"
                label="Labor Cost"
                rules={[
                  {
                    required: true,
                    message: "Please provide the Labor Cost",
                  },
                ]}
              >
                <Input
                  value={labor_cost}
                  onChange={handleLabourChange}
                  placeholder="Labor Cost"
                  type="number"
                />
              </Form.Item>
            </div>

            <div className="col-sm-4 forFifty">
              <Form.Item
                name="price"
                rules={[
                  { required: true, message: "Please provide the Price" },
                ]}
                label="Price"
              >
                <Input
                  placeholder="Price"
                  type="number"
                  value={price}
                  onChange={handlePriceChange}
                />
              </Form.Item>
            </div>

            <div className="col-sm-12 submitbtn">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="saaavvveeeBtnnn"
                  loading={loading}
                  disabled={loading}
                >
                  Save
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="taxratemodal taxGrpModal"
      >
        <Modal.Body>
          Add Work Order Type
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <WorkTypeForm data={handleClose} />
      </Modal>
    </Fragment>
  );
}

export default Workorderform;
