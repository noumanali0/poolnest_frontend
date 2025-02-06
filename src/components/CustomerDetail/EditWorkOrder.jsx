import React, { Fragment, useEffect, useState } from "react";
import { Form, Select, Input, Button, Card, TimePicker } from "antd";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetWorkOrderType } from "../../redux/Slices/getWorkOrderType";
import {
  UpdateWorkOrderData,
  resetData,
} from "../../redux/postReducer/postWorkorder";
import { fetchTechnician } from "../../redux/Slices/GetTechnician";
import moment from "moment";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import WorkTypeForm from "./WorkorderTypeModal";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { fetchgetSingleCustomers } from "../../redux/Slices/getSingleCustomer";
import { fetchsinglewaterbody } from "../../redux/Slices/getSingleWaterBody";

const { Option } = Select;
function Workorderform({ handleCloseWorkOrder, EditData, waterbodyid }) {
  const service_id = EditData?._id;
  const [value, setValue] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { error, successput, loading } = useSelector(
    (state) => state.postworkorder
  );
  const { data: Technician } = useSelector((state) => state.Technician);
  const { data: getWorkOrderType, status } = useSelector(
    (state) => state.getWorkOrderType
  );
  const { data: singlewaterbody, statusdata } = useSelector(
    (state) => state.singlewaterbody
  );

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const id = waterbodyid;

    dispatch(fetchgetWorkOrderType({}));
    dispatch(fetchsinglewaterbody({ id }));
  }, []);

  const waterbody_id = singlewaterbody?._id;

  const [formData, setFormData] = useState();

  useEffect(() => {
    dispatch(fetchTechnician());
  }, [dispatch]);

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}/${day}/${year}`;
  }
  const onChange = (saa, time) => {
    setValue(time);
  };

  useEffect(() => {
    setFormData({
      customer_id:
        singlewaterbody?.RouteAssignmentServiceLocation?.CustomerServiceLocation
          ?.first_name,
      service_location_id:
        singlewaterbody?.RouteAssignmentServiceLocation?.name || "",
      waterbody_type_id: singlewaterbody?.WaterBodyType?.name || "",
      work_needed: EditData?.work_needed,
      work_performed: EditData?.work_performed,
      price: EditData?.price,
      notes: EditData?.notes,
      service_time: EditData?.service_time,
      labor_cost: EditData?.labor_cost,
      estimated_time_minutes: EditData?.estimated_time_minutes,
      service_date: EditData?.service_date
        ? formatDate(EditData?.service_date)
        : "00:00:00",
      workordertype_id: EditData?.WorkOrderTypeData?._id,
      technician_id: EditData?.TechnicianData?._id,
      // technician_name: EditData?.TechnicianData?.first_name,
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
      estimated_time_minutes: values.estimated_time_minutes,
      work_needed: values.work_needed,
      work_performed: values.work_performed,
      notes: values.notes,
      service_time: value,
      service_date: selectedDate ? selectedDate : EditData?.service_date,
      price: values.price,
      technician_id: values.technician_id,
      workordertype_id: values.workordertype_id,
      waterbody_id: singlewaterbody?._id,
      customer_id: singlewaterbody?.Customer?.customer_id,
      service_location_id:
        singlewaterbody?.Service_location?.service_location_id,
      labor_cost: values.labor_cost,
      status: "active",
    };

    await dispatch(UpdateWorkOrderData({ Data, service_id }));
  };
  const { id } = useParams();

  useEffect(() => {
    if (successput) {
      toast.success(successput);
      dispatch(fetchgetSingleCustomers({ id }));

      dispatch(resetData());
      handleCloseWorkOrder();
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, successput]);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  form.setFieldsValue({
    customer_id: formData?.customer_id,
    service_location_id: formData?.service_location_id || "",
    work_needed: formData?.work_needed,
    work_performed: formData?.work_performed,
    price: formData?.price,
    notes: formData?.notes,
    service_time: formData?.service_time,
    labor_cost: formData?.labor_cost,
    estimated_time_minutes: formData?.estimated_time_minutes,
    service_date: formData?.service_date,
    workordertype_id: formData?.workordertype_id,
    technician_id: formData?.technician_id,
  });

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  let service_time1 = EditData?.service_time
    ? EditData?.service_time
    : "00:00:00";

  console.log(service_time1, "service_time1");
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
          <div className="row">
            <div className="col-sm-8 fullWIdthhhh">
              <div className="row ">
                <div className="col-sm-12 aaddViieeww">
                  <h4>Customer Detail</h4>
                  {/* <div className="addnew-workorder-type">
                    <FaPlus className="addviewbtn" onClick={handleShow} />
                  </div> */}
                  <div className="addnew-workorder-type">
                    <Form.Item>
                      <Button
                        disabled={false}
                        className="wbtn AddNewType-Btn"
                        onClick={handleShow}
                        block
                      >
                        + Add New Type
                      </Button>
                    </Form.Item>
                  </div>
                </div>
                <div className="col-sm-12 myselect">
                  <Form.Item
                    name="workordertype_id"
                    label="Workorder Type"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Work Order Type is required",
                    //   },
                    // ]}
                  >
                    <Select placeholder="Workorder Type">
                      {getWorkOrderType &&
                        getWorkOrderType?.items?.map((item, i) => {
                          return <Option value={item._id}>{item.name}</Option>;
                        })}
                    </Select>
                  </Form.Item>
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
                    label="Notes"
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

            <div className="col-sm-4 fullWIdthhhh">
              <h4>Route Assignment Info</h4>

              {singlewaterbody &&
                singlewaterbody?.RouteAssignmentWaterBody?.map((item, i) => {
                  return (
                    <>
                      <Card title={item.RouteAssignmentTechnician?.first_name}>
                        <p>{item?.RouteAssignmentFrequency?.name} </p>
                        <p>{item?.assigned_date} </p>
                      </Card>
                    </>
                  );
                })}
            </div>
          </div>

          <div className="row midsec">
            <div className="col-sm-4 forFifty">
              <Form.Item name="technician_id" label="Tech Name">
                <Select placeholder="Tech Name">
                  {Technician &&
                    Technician?.items?.map((item, i) => {
                      return (
                        <Option value={item._id}>{item.first_name}</Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </div>
            <div className="col-sm-4 forFifty anttPicker">
              <Form.Item name="service_date" label="Service Date">
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="yyyy-MM-dd" // Set the desired date format
                  placeholderText="Select Start date"
                />
              </Form.Item>
            </div>
            <div className="col-sm-4 forFifty">
              <Form.Item
                name="estimated_time_minutes"
                rules={[{ required: true }]}
                label="Est Minutes"
                type="number"
              >
                <Input placeholder="Est Minutes" />
              </Form.Item>
            </div>
            <div className="col-sm-4 forFifty anttPicker">
              <Form.Item name="service_time1" label="Service Time">
                <TimePicker
                  onChange={onChange}
                  defaultValue={dayjs(service_time1, "HH:mm:ss")}
                  size="large"
                />
              </Form.Item>
            </div>
            <div className="col-sm-4 forFifty">
              <Form.Item
                name="labor_cost"
                label="Labor Cost"
                rules={[{ required: true }]}
              >
                <Input placeholder="Labor Cost" type="number" />
              </Form.Item>
            </div>
            <div className="col-sm-4 forFifty">
              <Form.Item
                name="price"
                rules={[{ required: true }]}
                label="Price"
              >
                <Input placeholder="Price" type="number" />
              </Form.Item>
            </div>
            <div className="col-sm-12 savebtn addProductType taxRate">
              <Form.Item>
                <Button type="primary" htmlType="submit" disabled={loading}>
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
