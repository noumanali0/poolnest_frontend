import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Form,
  Select,
  Input,
  DatePicker,
  InputNumber,
  Button,
  Card,
  TimePicker,
  Switch,
} from "antd";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetWorkOrderType } from "../../redux/Slices/getWorkOrderType";
import {
  postworkorderData,
  resetData,
} from "../../redux/postReducer/postWorkorder";
import { fetchTechnician } from "../../redux/Slices/GetTechnician";
import { Modal } from "react-bootstrap";
import WorkTypeForm from "../Pool/WorkorderTypeModal";
import { toast } from "react-toastify";
import { fetchgetSingleCustomers } from "../../redux/Slices/getSingleCustomer";
import { fetchsinglewaterbody } from "../../redux/Slices/getSingleWaterBody";

const { Option } = Select;
function Workorderform({ handleCloseWorkOrder, waterbodyid }) {
  const { id } = useParams();

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [activestatus, setactivestatus] = useState(false);

  const { data: Technician } = useSelector((state) => state.Technician);
  const { data: getWorkOrderType, status } = useSelector(
    (state) => state.getWorkOrderType
  );
  const { loading, error, successpost } = useSelector(
    (state) => state.postworkorder
  );

  const { data: singlewaterbody, statusdata } = useSelector(
    (state) => state.singlewaterbody
  );
  const [value, setValue] = useState(null);
  const [serviceDate, setserviceDate] = useState(null);

  useEffect(() => {
    const id = waterbodyid;

    dispatch(fetchgetWorkOrderType({}));
    dispatch(fetchsinglewaterbody({ id }));
  }, []);

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

  const [formData, setFormData] = useState();

  useEffect(() => {
    dispatch(fetchTechnician());
  }, []);
  const handleChangeStatus = (e) => {
    setactivestatus(e);
  };
  useEffect(() => {
    setFormData({
      customer_id:
        singlewaterbody?.RouteAssignmentServiceLocation?.CustomerServiceLocation
          ?.first_name +
        " " +
        singlewaterbody?.RouteAssignmentServiceLocation?.CustomerServiceLocation
          ?.last_name,
      service_location_id:
        singlewaterbody?.RouteAssignmentServiceLocation?.name || "",
      waterbody_type_id: singlewaterbody?.WaterBodyType?.name || "",
    });
  }, [singlewaterbody]);

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
  const onFinish = async (values) => {
    const Data = {
      estimated_time_minutes: values.estimated_time_in_mins,
      work_needed: values.work_needed,
      work_performed: values.work_performed,
      notes: values.notes,
      service_time: value,
      service_date: serviceDate,
      price: values.price,
      technician_id: values.technician_id,
      workordertype_id: values.work_order_type_id,
      waterbody_id: waterbodyid,
      // customer_id: singlewaterbody?.Customer?.customer_id,
      // service_location_id:
      //   singlewaterbody?.Service_location?.service_location_id,
      labor_cost: values.labor_cost,
      WorkOrderTypePrice: activestatus,
    };

    await dispatch(postworkorderData({ Data }));
  };

  const prevErrorRef = useRef();
  const prevSuccessRef = useRef();

  useEffect(() => {
    if (error && error !== prevErrorRef.current) {
      toast.error(error);
      dispatch(resetData());
      prevErrorRef.current = error; // Update previous error value
    }

    if (successpost && successpost !== prevSuccessRef.current) {
      toast.success(successpost);
      dispatch(fetchgetSingleCustomers({ id }));

      dispatch(resetData());
      handleCloseWorkOrder();
      prevSuccessRef.current = successpost; // Update previous success value
    }
  }, [error, successpost]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = (saa, time) => {
    setValue(time);
  };

  const onChangeService = (saa, time) => {
    setserviceDate(time);
  };

  form.setFieldsValue({
    customer_id: formData?.customer_id,
    service_location_id: formData?.service_location_id || "",
    waterbody_type_id: formData?.waterbody_type_id || "",
  });

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  return (
    <Fragment>
      <div className="container-fluid modals">
        <Form
          name="nest-messages"
          onValuesChange={handleFormValuesChange}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          validateMessages={validateMessages}
          initialValues={formData}
          disabled={false}
        >
          <div className="row addWorkOrderPoolModal">
            <div className="col-sm-12">
              <div className="row ">
                <div className="row addWorkOrderPoolModal">
                  <div className="col-sm-8">
                    <div className="row ">
                      <div className="col-sm-12 aaddViieeww">
                        <h4>Customer Detail</h4>
                        {/* <div className="addnew-workorder-type">
                          
                            
                        </div> */}
                      </div>
                      <div className="col-sm-12 myselect">
                        <Form.Item
                          name="work_order_type_id"
                          label="Workorder Type"
                          rules={[
                            {
                              required: true,
                              message: "Work Order Type is required",
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
                        <Button
                          disabled={false}
                          className="AddWorkOrderTypeBtn"
                          onClick={handleShow}
                          block
                        >
                          + Add New Type
                        </Button>
                      </div>

                      <div className="col-sm-12">
                        <Form.Item
                          label="Work Needed"
                          name="work_needed"
                          rules={[{ required: true }]}
                        >
                          <Input.TextArea
                            showCount
                            maxLength={500}
                            placeholder="work needed"
                            rows={5}
                          />
                        </Form.Item>
                      </div>
                      <div className="col-sm-12">
                        <Form.Item
                          label="Work Performed"
                          name="work_performed"
                          // rules={[{ required: true }]}
                        >
                          <Input.TextArea
                            showCount
                            maxLength={500}
                            rows={5}
                            placeholder="Work Performed"
                          />
                        </Form.Item>
                      </div>
                      <div className="col-sm-12">
                        <Form.Item
                          label="Office Notes"
                          name="notes"
                          // rules={[{ required: true }]}
                        >
                          <Input.TextArea
                            showCount
                            maxLength={500}
                            rows={5}
                            placeholder="notes"
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-4">
                    <h4>Route Assignment Info</h4>

                    {singlewaterbody &&
                      singlewaterbody?.RouteAssignmentWaterBody?.map(
                        (item, i) => {
                          return (
                            <>
                              <Card
                                title={
                                  item.RouteAssignmentTechnician?.first_name +
                                  " " +
                                  item.RouteAssignmentTechnician?.last_name
                                }
                              >
                                <p>{item?.assigned_date} </p>
                                <p>{item?.RouteAssignmentFrequency?.label} </p>
                              </Card>
                            </>
                          );
                        }
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row midsec">
            <div className="col-sm-4 forFifty">
              <Form.Item
                rules={[{ required: true }]}
                name="technician_id"
                label="Tech Name"
              >
                <Select placeholder="Tech Name">
                  {Technician &&
                    Technician?.items?.map((item, i) => {
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
                name="service_date"
                rules={[{ required: true }]}
                label="Service Date"
              >
                <DatePicker
                  onChange={onChangeService}
                  placeholder="Service Date"
                />
              </Form.Item>
            </div>
            <div className="col-sm-4 forFifty">
              <Form.Item
                name="estimated_time_in_mins"
                rules={[{ required: true }]}
                label="Est Minutes"
                type="number"
              >
                <Input
                  value={estimated_time_in_mins}
                  onChange={handleTimeChange}
                  placeholder="Est Minutes"
                />
              </Form.Item>
            </div>
            <div className="col-sm-4 forFifty anttPicker">
              <Form.Item name="service_time" label="Service Time">
                <TimePicker onChange={onChange} />
              </Form.Item>
            </div>
            <div className="col-sm-4 forFifty">
              <Form.Item
                name="labor_cost"
                label="Labor Cost"
                rules={[{ required: true }]}
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
                rules={[{ required: true }]}
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

            <div className="col-sm-12 savebtn addProductType taxRate">
              <Form.Item>
                <Button disabled={loading} type="primary" htmlType="submit">
                  {" "}
                  Save{" "}
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
