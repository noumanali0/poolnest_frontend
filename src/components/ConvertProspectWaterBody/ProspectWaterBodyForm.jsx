import React, { Fragment, useEffect, useState } from "react";
import {
  Form,
  Checkbox,
  Select,
  DatePicker,
  Input,
  Button,
  TimePicker,
} from "antd";
import Accordion from "react-bootstrap/Accordion";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  fetchgetProspectWaterBody,
  fetchgetSingleProspectWaterBody,
} from "../../redux/Slices/getProspectWaterbody";
import { useSelector } from "react-redux";
import { fetchTechnician } from "../../redux/Slices/GetTechnician";
import { fetchgetwaterbodyType } from "../../redux/Slices/getWaterbodyType";
import { fetchgetfrequency } from "../../redux/Slices/getfrequency";
import { fetchgetRateType } from "../../redux/Slices/getRateType";
import { fetchgetLaborCost } from "../../redux/Slices/getLaborCost";
import { Modal } from "react-bootstrap";
import PoolProspectModal from "../ConvertProspectPool/PoolProspectModal";
import { fetchgetWorkOrderType } from "../../redux/Slices/getWorkOrderType";
import {
  postProspectWaterBody,
  clearData,
} from "../../redux/postReducer/postProspectWaterBody";
import { toast } from "react-toastify";
import moment from "moment";

const { Option } = Select;

const ProspectWaterBodyForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [value, setValue] = useState(null);

  const [selectedServiceDate, setSelectedServiceDate] = useState(null);
  const [activeKey, setActiveKey] = useState("0");
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const postfrequency = useSelector((state) => state.getfrequency);

  const [show, setShow] = useState(false);
  const { data, singleData } = useSelector(
    (state) => state.getProspectWaterBody
  );
  const { success, error } = useSelector(
    (state) => state.postProspectWaterBody
  );

  const waterType = useSelector((state) => state.getwaterbodyType);
  const postDataResult = useSelector((state) => state.Technician);
  const { data: getWorkOrderType } = useSelector(
    (state) => state.getWorkOrderType
  );
  const [selectedWaterBodies, setSelectedWaterBodies] = useState([]);
  const [formData, setFormData] = useState();

  const [selectedInputMapData, setSelectedInputMapData] = useState([]);
  const laborcosttype = useSelector((state) => state.getLaborCost);

  const ratetype = useSelector((state) => state.getRateType);

  const [options, setOptions] = useState([]);

  const [selectedProspects, setSelectedProspects] = useState([]);

  const onFinish = async (values) => {
    const Data = {
      name: values?.name,
      rate: values?.rate,
      labor_cost: values?.labor_cost,
      size: values?.size,
      pressure: values?.pressure,
      minutes_per_stop: values?.minutes_per_stop,
      notes: values?.notes,
      waterbody_type_id: values?.waterbody_type_id,

      workordertype_id: values?.workordertype_id,
      labor_cost_type_id: values?.labor_cost_type_id,
      rate_type_id: values?.rate_type_id,
      technician_id: values?.technician_id,
      frequency_id: values?.frequency_id,
      assigned_date: values?.assigned_date,
      start_date: selectedDate && selectedDate,
      end_date: (selectedEndDate && selectedEndDate) || null,

      // workordertype_id: values?.workordertype_id,
      work_needed: values?.work_needed,
      work_performed: values?.work_performed,
      estimated_time_minutes: values?.estimated_time_minutes,
      service_date: selectedDate && selectedDate,
      service_time: value,
      price: values.price,
    };

    // navigate("/prospect/pool");
    const { id } = param;

    await dispatch(postProspectWaterBody({ Data, id }));
  };

  const onChange = async (checkedValues) => {
    const id = checkedValues[0];

    setSelectedWaterBodies(checkedValues);
  };

  const onChangeTime = (saa, time) => {
    setValue(time);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onProspectChange = (waterBody, checkedValues) => {
    setSelectedProspects({
      ...selectedProspects,
      [waterBody]: checkedValues,
    });
  };
  const handleDayChange = (value) => {
    setSelectedDay(value);
  };
  const handleSingleApi = async (id) => {
    await dispatch(fetchgetSingleProspectWaterBody({ id }));
  };
  const handleServiceDateChange = (date) => {
    setSelectedServiceDate(date);
  };
  const handleDateChange = (e, date) => {
    const utcDate = moment.utc(date).format();
    setSelectedDate(utcDate);
  };
  const handleEndDateChange = (e, date) => {
    setSelectedEndDate(date);
    const utcDate = moment.utc(date).format();
    setSelectedEndDate(utcDate);
  };

  const waterBodyOption = [
    {
      label: "Service Prospect",
      value: "ServiceProspect",
    },
    {
      label: "Work Order Prospect",
      value: "WorkOrderProspect",
    },
  ];

  let id = param.id;

  useEffect(() => {
    dispatch(fetchTechnician());
    dispatch(fetchgetwaterbodyType());
    dispatch(fetchgetfrequency());
    dispatch(fetchgetRateType());
    dispatch(fetchgetWorkOrderType({}));
    dispatch(fetchgetLaborCost());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchgetProspectWaterBody({ id }));
  }, [dispatch]);

  useEffect(() => {
    let values = [];
    if (data) {
      values = data.map((item) => ({
        label: item.WaterBodyName,
        value: item._id,
      }));
      setOptions(values);
      setSelectedProspects(values);
    }
  }, [data]);

  useEffect(() => {
    setFormData({
      WaterBodyName: singleData?.WaterBodyName,
      minutes_per_stop: singleData?.minutes_per_stop || "",
      size: singleData?.size || "",
      company_name: singleData?.company_name || "",
      pressure: singleData?.pressure || "",
      estimated_time_minutes: singleData?.estimated_time_minutes,
      price: singleData?.price || "",
      work_needed: singleData?.work_needed || "",
      state_id: singleData?.statename || "",
      city_id: singleData?.ProspectCity_id?.name || "",
    });
  }, [singleData]);

  form.setFieldsValue({
    // name: formData?.WaterBodyName,
    // minutes_per_stop: formData?.minutes_per_stop || "",
    // city_id: {
    //   label: getAllprospect?.ProspectCity_id?.name,
    //   value: getAllprospect?.ProspectCity_id?._id,
    // },
    // size: formData?.size || "",
    // company_name: formData?.company_name || "",
    // customer_type_id: {
    //   label: getAllprospect?.ProspectCustomer_type?.name,
    //   value: getAllprospect?.ProspectCustomer_type?._id,
    // },
    // pressure: formData?.pressure || "",
    // estimated_time_minutes: formData?.estimated_time_minutes,
    // price: formData?.price || "",
    // work_needed: formData?.work_needed || "",
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearData());
    }
    if (success) {
      toast.success(success);

      dispatch(clearData());
      navigate("/prospect");
    }
  }, [error, success]);

  return (
    <Fragment>
      <div className="row fomik custServLocagtion">
        <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          autoComplete="off"
          form={form}
          initialValues={formData}
        >
          <>
            <div className="col-sm-12 margin-top-css">
              <div className="row">
                <div className="col-sm-6">
                  <h2>Service Location</h2>
                  <Checkbox.Group
                    options={options}
                    value={selectedWaterBodies}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
            <Accordion
              activeKey={activeKey}
              onSelect={(key) => setActiveKey(key)}
              flush
            >
              {selectedWaterBodies?.map((waterBody, index) => (
                <Accordion.Item key={waterBody} eventKey={`${index}`}>
                  <Accordion.Header onClick={() => handleSingleApi(waterBody)}>
                    <span>Water Body {waterBody?.label}</span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="row adrrLocation">
                      <div className="col-sm-12 heads">
                        <h3>Convert </h3>
                        <Checkbox.Group
                          options={waterBodyOption}
                          value={selectedProspects[waterBody.value] || []}
                          onChange={(checkedValues) =>
                            onProspectChange(waterBody.value, checkedValues)
                          }
                        />
                      </div>
                      {/* Service Prospect */}

                      <div className="col-sm-12 workTypeSection">
                        <div className="row cslocation">
                          <div className="col-sm-12">
                            <h3 className="subHeadingAddProspect">
                              Water Body
                            </h3>
                          </div>
                          <div className="col-sm-12">
                            <div className="row cslocation">
                              <div className="col-sm-6">
                                <Form.Item
                                  label="Pool Name"
                                  name={"name"}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Pool Name is Invalid",
                                    },
                                  ]}
                                >
                                  <Input placeholder="Pool Name" type="text" />
                                </Form.Item>
                              </div>

                              <div className="col-sm-3 forFifty">
                                <Form.Item
                                  name={"rate"}
                                  label="Rate"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Rate is required",
                                    },
                                  ]}
                                >
                                  <Input placeholder="Rate" type="number" />
                                </Form.Item>
                              </div>

                              <div className="col-sm-3 forFifty">
                                <Form.Item
                                  // name=""
                                  name={"rate_type_id"}
                                  label="Rate Type"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Rate Type is required",
                                    },
                                  ]}
                                >
                                  <Select placeholder="Rate Type">
                                    {ratetype?.data?.map((item) => {
                                      return (
                                        <Option value={item._id}>
                                          {item.label}
                                        </Option>
                                      );
                                    })}
                                  </Select>
                                </Form.Item>
                              </div>
                              <div className="col-sm-3 forFifty">
                                <Form.Item
                                  label="Labor Cost"
                                  // name=""
                                  name={"labor_cost"}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Labor Cost is required",
                                    },
                                  ]}
                                >
                                  <Input
                                    placeholder="Labor Cost"
                                    type="number"
                                  />
                                </Form.Item>
                              </div>
                              <div className="col-sm-3 forFifty">
                                <Form.Item
                                  name={"labor_cost_type_id"}
                                  label="Labor Cost Type"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Labor Cost Type is required",
                                    },
                                  ]}
                                >
                                  <Select placeholder="Labot Cost Type">
                                    {laborcosttype?.data?.map((item) => {
                                      return (
                                        <Option value={item._id}>
                                          {item.label}
                                        </Option>
                                      );
                                    })}
                                  </Select>
                                </Form.Item>
                              </div>

                              <div className="col-sm-3 forFifty">
                                <Form.Item
                                  name={"waterbody_type_id"}
                                  label="Water Body Type"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Labor Cost Type is required",
                                    },
                                  ]}
                                >
                                  <Select placeholder="Labot Cost Type">
                                    {waterType?.data?.map((item) => {
                                      return (
                                        <Option value={item._id}>
                                          {item?.name}
                                        </Option>
                                      );
                                    })}
                                  </Select>
                                </Form.Item>
                              </div>

                              <div className="col-sm-3 forFifty">
                                <Form.Item
                                  // name=""
                                  name={"minutes_per_stop"}
                                  label="Minutes at Stop"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Minutes at Stop is Invalid",
                                    },
                                  ]}
                                >
                                  <Input
                                    placeholder="Minutes Of Stop"
                                    type="number"
                                  />
                                </Form.Item>
                              </div>

                              <div className="col-sm-3 forFifty">
                                <Form.Item
                                  // name=""
                                  name={"size"}
                                  label="Gallons"
                                >
                                  <Input placeholder="Size" type="number" />
                                </Form.Item>
                              </div>

                              <div className="col-sm-3 forFifty">
                                <Form.Item label="Pressure" name={"pressure"}>
                                  <Input placeholder="Pressure" type="text" />
                                </Form.Item>
                              </div>

                              <div className="col-sm-6">
                                <Form.Item
                                  // name=""
                                  name={"notes"}
                                  label="Notes"
                                >
                                  <Input placeholder="Notes" type="text" />
                                </Form.Item>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {selectedProspects[waterBody.value]?.includes(
                        "ServiceProspect"
                      ) && (
                        <div className="col-sm-12 workTypeSection">
                          <div className="row cslocation">
                            <div className="col-sm-12">
                              <h3 className="subHeadingAddProspect">
                                Service Prospect
                              </h3>
                            </div>
                            <div className="col-sm-12">
                              <div className="row cslocation">
                                <div className="col-sm-4">
                                  <Form.Item
                                    name={"technician_id"}
                                    label="Tech Name"
                                  >
                                    <Select placeholder="Tech">
                                      {postDataResult.data &&
                                        postDataResult?.data?.items?.map(
                                          (item) => {
                                            return (
                                              <Option value={item._id}>
                                                {item.first_name +
                                                  " " +
                                                  item.last_name}
                                              </Option>
                                            );
                                          }
                                        )}
                                    </Select>
                                  </Form.Item>
                                </div>

                                <div className="col-sm-4">
                                  <Form.Item
                                    name={"assigned_date"}
                                    label="Day Of Week"
                                  >
                                    <Select
                                      placeholder="Day Of Week"
                                      onChange={handleDayChange}
                                      value={selectedDay}
                                    >
                                      <Option value="monday">Monday</Option>
                                      <Option value="tuesday">Tuesday</Option>
                                      <Option value="wednesday">
                                        Wednesday
                                      </Option>
                                      <Option value="thursday">Thursday</Option>
                                      <Option value="friday">Friday</Option>
                                      <Option value="saturday">Saturday</Option>
                                      <Option value="sunday">Sunday</Option>
                                    </Select>
                                  </Form.Item>
                                </div>
                                <div className="col-sm-4">
                                  <Form.Item
                                    name="frequency_id"
                                    label="Frequency"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please Select Frequency",
                                      },
                                    ]}
                                  >
                                    <Select placeholder="Frequency">
                                      {postfrequency?.data?.map((item) => (
                                        <Option
                                          key={item._id}
                                          value={item.frequency_id}
                                        >
                                          {item.label}
                                        </Option>
                                      ))}
                                    </Select>
                                  </Form.Item>
                                </div>

                                <div className="col-sm-4">
                                  <Form.Item
                                    name={"start_date"}
                                    label="Start date"
                                  >
                                    <DatePicker
                                      selected={selectedDate}
                                      onChange={handleDateChange}
                                      placeholderText="Select Start date"
                                    />
                                  </Form.Item>
                                </div>
                                <div className="col-sm-4">
                                  <Form.Item name={"end_date"} label="End date">
                                    <DatePicker
                                      selected={selectedEndDate}
                                      onChange={handleEndDateChange}
                                      placeholderText="Select End date"
                                    />
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Work Order Prospect */}
                      {selectedProspects[waterBody.value]?.includes(
                        "WorkOrderProspect"
                      ) && (
                        <div className="col-sm-12 workTypeSection">
                          <div className="row cslocation customerInformationProspect">
                            <div className="col-sm-12">
                              <h3 className="subHeadingAddProspect">
                                Work Order Prospect
                              </h3>
                            </div>
                            <div className="col-sm-12">
                              <div className="row cslocation">
                                <div className="col-sm-4">
                                  <Form.Item
                                    name="workordertype_id"
                                    label="Work Order type"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Work Order Type is required",
                                      },
                                    ]}
                                  >
                                    <Select placeholder="Work Order Type">
                                      {getWorkOrderType?.items?.map((item) => (
                                        <Option value={item._id}>
                                          {item?.name}
                                        </Option>
                                      ))}
                                    </Select>
                                  </Form.Item>
                                </div>
                                <div className="col-sm-4">
                                  <Form.Item
                                    name={"technician_id"}
                                    label="Tech Name"
                                  >
                                    <Select placeholder="Tech">
                                      {postDataResult.data &&
                                        postDataResult?.data?.items?.map(
                                          (item) => {
                                            return (
                                              <Option value={item._id}>
                                                {item.first_name}
                                              </Option>
                                            );
                                          }
                                        )}
                                    </Select>
                                  </Form.Item>
                                </div>
                                <div className="col-sm-4">
                                  <Form.Item
                                    name="estimated_time_minutes"
                                    label="Est. Minutes"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please Enter Est. Minutes",
                                      },
                                    ]}
                                  >
                                    <Input
                                      type="text"
                                      placeholder="Est. Minutes"
                                    />
                                  </Form.Item>
                                </div>
                                <div className="col-sm-4">
                                  <Form.Item
                                    name="minutesStop"
                                    label="Minutes at Stop"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please Enter Minutes at Stop",
                                      },
                                    ]}
                                  >
                                    <Input
                                      type="text"
                                      placeholder="Minutes at Stop"
                                    />
                                  </Form.Item>
                                </div>

                                <div className="col-sm-4">
                                  <Form.Item
                                    name="scheduleTime"
                                    label="Schedule Time"
                                  >
                                    <TimePicker onChange={onChangeTime} />
                                  </Form.Item>
                                </div>

                                <div className="col-sm-4">
                                  <Form.Item
                                    name="price"
                                    label="Price"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please Enter Price",
                                      },
                                    ]}
                                  >
                                    <Input type="number" placeholder="Price" />
                                  </Form.Item>
                                </div>

                                <div className="col-sm-4">
                                  <Form.Item
                                    name="laborCostWorkOrder"
                                    label="Labor Cost"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please Enter Labor Cost",
                                      },
                                    ]}
                                  >
                                    <Input
                                      type="text"
                                      placeholder="Labor Cost"
                                    />
                                  </Form.Item>
                                </div>

                                <div className="col-sm-4">
                                  <Form.Item
                                    name="service_date"
                                    label="Service Date"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please Enter Service Date",
                                      },
                                    ]}
                                  >
                                    <DatePicker
                                      selected={selectedServiceDate}
                                      onChange={handleServiceDateChange}
                                      placeholder="Service Date"
                                    />
                                  </Form.Item>
                                </div>
                                <div className="col-sm-12">
                                  <Form.Item
                                    name="work_needed"
                                    label="Work Needed"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please Enter Work Needed",
                                      },
                                    ]}
                                  >
                                    <Input.TextArea
                                      rows={5}
                                      type="text"
                                      placeholder="Work Needed"
                                    />
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="col-sm-12 buttonsservice prospect">
                        <Form.Item className="savebtn">
                          <Button
                            className="bluebtn handleAddRow"
                            type="primary"
                            htmlType="submit"
                          >
                            Submit
                          </Button>
                        </Form.Item>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </>
        </Form>
      </div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Body>
          Prospect Pool Type
          <Button variant="secondary" onClick={handleClose}>
            X
          </Button>
        </Modal.Body>
        <PoolProspectModal data={handleClose} />
      </Modal>
    </Fragment>
  );
};

export default ProspectWaterBodyForm;
