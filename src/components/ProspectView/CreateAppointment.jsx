import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Select, DatePicker, TimePicker } from "antd";
import { fetchTechnician } from "../../redux/Slices/GetTechnician";
import { fetchgetfrequency } from "../../redux/Slices/getfrequency";
import { useSelector, useDispatch } from "react-redux";
import { fetchgetCustomerType } from "../../redux/Slices/getCustomerType";
import { fetchgetCustomerCountry } from "../../redux/Slices/getCustomerCountry";
import { fetchSalesTaxGroupName } from "../../redux/Slices/getSaleGroupName";
import { fetchgetwaterbodyType } from "../../redux/Slices/getWaterbodyType";
import { fetchgetRateType } from "../../redux/Slices/getRateType";
import {
  postProspectNewWaterBody,
  clearData,
} from "../../redux/postReducer/postProspectWaterBody";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const { Option } = Select;

const CreateAppointment = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  const [form] = Form.useForm();

  const param = useParams();
  const { error, success } = useSelector(
    (state) => state.postProspectWaterBody
  );

  const racetype = useSelector((state) => state.getRateType);
  const postfrequency = useSelector((state) => state.getfrequency);
  const [ProspectArray, setProspectArray] = useState([]);
  const [ProspectArrayTemp, setProspectArrayTemp] = useState([]);
  const [ratetypedata, setRateType] = useState("");

  const [ratedata, setRateData] = useState("");

  const { data: Technician } = useSelector((state) => state.Technician);
  const postwaterType = useSelector((state) => state.getwaterbodyType);
  const [Frequencydata, setFrequencydata] = useState("");

  const [AppointmentDateData, setAppointmentDate] = useState("");
  const [AppointmentTimeData, setAppointmentTime] = useState("");

  const [waterBodyType, setWaterBodyType] = useState(true);
  const [selectedFrequencies, setSelectedFrequencies] = useState([]);
  const dispatch = useDispatch();

  const AppointmentDate = (data, i) => {
    setAppointmentDate(i);
  };
  const AppointmentTime = (data, i) => {
    setAppointmentTime(i);
  };

  const handleAddRow = () => {
    formRef.current
      .validateFields()
      .then((values) => {
        // Resetting fields after successful validation
        formRef.current.resetFields();
        const newRow = {
          rate: ratedata,
          rate_type_id: ratetypedata.id, // Check if rate_type_id is defined
          rate_type_name: ratetypedata.name, // Check if rate_type_id is defined
          FrequencyId: Frequencydata.id, // Check if frequency is defined
          Frequencyname: Frequencydata.name, // Check if frequency is defined
        };

        const newRowTemp = {
          rate: ratedata,
          rate_type_id: ratetypedata.id, // Check if rate_type_id is defined
          FrequencyId: Frequencydata.id, // Check if frequency is defined
        };
        setProspectArray([...ProspectArray, newRow]);
        setProspectArrayTemp([...ProspectArrayTemp, newRowTemp]);

        // Clearing state variables
        setRateData("");
        setRateType("");
        setFrequencydata("");
      })
      .catch((errorInfo) => {
        // Handling form validation errors
        console.log("Validation failed:", errorInfo);
      });
  };
  useEffect(() => {
    dispatch(fetchSalesTaxGroupName());
    dispatch(fetchgetCustomerType());
    dispatch(fetchgetCustomerCountry());
    dispatch(fetchgetwaterbodyType());
    dispatch(fetchgetRateType());
  }, []);

  useEffect(() => {
    if (Technician?.length === 0) {
      dispatch(fetchTechnician());
    }

    if (postfrequency?.data?.length === 0) {
      dispatch(fetchgetfrequency());
    }
  }, [dispatch]);

  const onFinish = (values) => {
    //   if (!values?.customer_type_id) {
    //     values.customer_type_id = customertype?.data[0]?._id;
    //   }
    console.log(values, "<=====WaterBodyType");
    const Data = {
      // first_name: values.firstName,
      // last_name: values.lastName,
      // Customer_type: values.customer_type_id,
      // company_name: values.companyName,
      // company_address: values.companyCode,
      // email: values.email,
      // address: address,
      // mobile_no_primary: values.phone,
      // billing_address: values.address,
      // billing_details: values.firstName,
      // city_id: values.city_id,
      // zipcode: values.zipCode,
      // ServiceLocationName: values.serviceLocationName,
      // SalesTaxGroup: values.sales_tax_group,
      FrequencyData: ProspectArrayTemp,
      AssigneeData: [
        {
          AssignedRepresentative: values.technician_id,
          AppointmentDate: AppointmentDateData,
          AppointmentTime: AppointmentTimeData,
        },
      ],
      WaterBodyData: [
        {
          WaterBodyName: values.waterbodyName,
          WaterBodyType: values.waterBodyType,
          minutes_per_stop: values.minutes_per_stop,
          pressure: values.pressure,
          estimated_time_minutes: values.estimated_time_minutes,
          size: values.size,
          price: values.price,
          work_needed: values.work_needed,
        },
      ],
    };
    const { id } = param;

    dispatch(postProspectNewWaterBody({ Data, id }));
  };
  const handleCustomerTypeChange = (value) => {
    if (value === "service") {
      setWaterBodyType(true);
    } else {
      setWaterBodyType(false);
    }
  };
  const handleFrequencyChange = (checkedValues) => {
    const sortedFrequencies = checkedValues.sort(); // Sort frequencies in ascending order
    setSelectedFrequencies(sortedFrequencies);
  };
  useEffect(() => {
    if (Technician?.length === 0) {
      dispatch(fetchTechnician());
    }

    // if (postfrequency?.data?.length === 0) {
    //   dispatch(fetchgetfrequency());
    // }
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      form.resetFields();
      toast.success(success);
      dispatch(clearData());
      navigate("/prospect");
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearData());
    }
  }, [error]);

  return (
    <div className="row fomik addRoute addProspectService">
      <Form
        name="dynamic_form_nest_item"
        autoComplete="off"
        form={form}
        onFinish={onFinish}
      >
        <div className="row adrrLocation">
          <div className="col-sm-12 heads">
            {waterBodyType ? (
              <h3>Add Service Prospect for New Water Body</h3>
            ) : (
              <h3>Add Work Order Prospect for New Water Body</h3>
            )}
          </div>
          <div className="col-sm-4 forFifty ">
            <Form.Item
              name="prospectfor"
              label="Prospect For ?"
              rules={[
                {
                  required: true,
                  message: "Please Select Prospect For",
                },
              ]}
            >
              <Select
                placeholder="Prospect For ?"
                onChange={handleCustomerTypeChange}
              >
                <Option value="service">Service</Option>
                <Option value="workOrder">Work Order</Option>
              </Select>
            </Form.Item>
          </div>

          {/* Appointment Details */}
          <div className="col-sm-12 workTypeSection">
            <div className="row cslocation">
              <div className="col-sm-12">
                {/* <div className="col-sm-12"> */}
                <div className="row cslocation">
                  <div className="col-sm-12 appointmentDeatisl noPadd">
                    <h3 className="subHeadingAddProspect">
                      Appointment Details
                    </h3>
                  </div>
                  {/* <div className="col-sm-12">
                      <div className="row cslocation"> */}
                  <div className="col-sm-4 forFifty ">
                    <Form.Item
                      name="technician_id"
                      label="Assigned Representative"
                      rules={[
                        {
                          required: true,
                          message: "Please Select Technician",
                        },
                      ]}
                    >
                      <Select placeholder="Tech">
                        {Technician?.items &&
                          Technician.items?.map((item, i) => {
                            return (
                              <Option value={item._id}>
                                {item.first_name}
                              </Option>
                            );
                          })}
                      </Select>
                    </Form.Item>
                  </div>

                  <div className="col-sm-4 forFifty ">
                    <Form.Item
                      name="AppointmentDate"
                      label="Date"
                      rules={[
                        {
                          required: true,
                          message: "Please Select Date",
                        },
                      ]}
                    >
                      <DatePicker
                        onChange={AppointmentDate}
                        placeholder="Select Date"
                      />
                    </Form.Item>
                  </div>

                  <div className="col-sm-4 forFifty ">
                    <Form.Item
                      name="AppointmentTime"
                      label="Time"
                      rules={[
                        {
                          required: true,
                          message: "Please Select Time",
                        },
                      ]}
                    >
                      <TimePicker
                        onChange={AppointmentTime}
                        format="HH:mm:ss"
                      />
                    </Form.Item>
                  </div>
                  {/* </div>
                    </div> */}
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>

          {/* Waterbody Information */}
          {waterBodyType ? (
            <div className="col-sm-12 workTypeSection">
              <div className="row cslocation">
                <div className="col-sm-12">
                  <h3 className="subHeadingAddProspect">
                    Water Body Information
                  </h3>
                </div>
                <div className="col-sm-12">
                  <div className="row cslocation">
                    <div className="col-sm-4 forFifty ">
                      <Form.Item
                        name="waterbodyName"
                        label="Water Body Name"
                        rules={[
                          {
                            required: true,
                            message: "Please Enter Water Body Name",
                          },
                        ]}
                      >
                        <Input type="text" placeholder="Water Body Name" />
                      </Form.Item>
                    </div>
                    <div className="col-sm-4 forFifty ">
                      <Form.Item
                        name="waterBodyType"
                        label="Water Body Type"
                        rules={[
                          {
                            required: true,
                            message: "Please Select Water Body Type",
                          },
                        ]}
                      >
                        <Select placeholder="Water Body Type">
                          {postwaterType?.data?.map((item) => {
                            return (
                              <Option value={item._id}>{item.name}</Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="col-sm-4 forFifty ">
                      <Form.Item
                        name="minutes_per_stop"
                        label="Minutes at Stop"
                      >
                        <Input type="text" placeholder="Minutes at Stop" />
                      </Form.Item>
                    </div>
                    <div className="col-sm-4 forFifty ">
                      <Form.Item name="size" label="Gallons">
                        <Input type="text" placeholder="Gallons" />
                      </Form.Item>
                    </div>
                    <div className="col-sm-4 forFifty ">
                      <Form.Item name="pressure" label="Base Filter Pressure">
                        <Input type="text" placeholder="Base Filter Pressure" />
                      </Form.Item>
                    </div>
                    <div className="col-sm-4 forFifty ">
                      <Form.Item name="estimated_time_minutes" label='Est. Minutes'>
                        <Input type="text" placeholder="Est. Minutes" />
                      </Form.Item>
                    </div>
                    {/* <div className="col-sm-12">
                        <Form.Item
                          name="frequency"
                          label="Select Frequency"
                          className="checkboXFreq"
                        >
                          <Checkbox.Group onChange={handleFrequencyChange}>
                            <Checkbox value="Daily">Daily</Checkbox>
                            <Checkbox value="Weekly">Weekly</Checkbox>
                            <Checkbox value="Bi-Weekly">Bi-Weekly</Checkbox>
                            <Checkbox value="Every Third Week">
                              Every Third Week
                            </Checkbox>
                            <Checkbox value="Monthly">Monthly</Checkbox>
                          </Checkbox.Group>
                        </Form.Item>
                      </div> */}

                    {/* <div className="col-sm-12">
                                            <div className="row cslocation frequency detail">
                                                <div className="col-sm-12">
                                                    <h2>Frequency Daily</h2>
                                                </div>
                                                <div className="col-sm-4 forFifty ">
                                                    <Form.Item
                                                        name="Rate"
                                                        label="Rate"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "Please Enter Rate",
                                                            },
                                                        ]}
                                                    >
                                                        <Input type="text" placeholder="Rate"/>
                                                    </Form.Item>
                                                </div>
                                                <div className="col-sm-4 forFifty ">
                                                    <Form.Item
                                                        name="rateType"
                                                        label="Rate Type"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "Please Select Rate Type",
                                                            },
                                                        ]}
                                                    >
                                                        <Select
                                                            placeholder="Rate Type"
                                                        >
                                                            <Option value="1">Per Visit With Chemical</Option>
                                                            <Option value="2">Per Visit Without Chemical</Option>
                                                            <Option value="3">Per Month With Chemical</Option>
                                                            <Option value="4">Per Month Without Chemical</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </div>
                                                <div className="col-sm-2">
                                                    <Button>
                                                        Add New
                                                    </Button>
                                                </div>
                                            </div>
                                        </div> */}
                    {/* {selectedFrequencies.map((frequency) => (
                        <div key={frequency} className="col-sm-12 frwquencyss">
                          <div className="row cslocation frequencyDetail">
                            <div className="col-sm-12">
                              <h2>{`Frequency ${frequency}`}</h2>
                            </div>
                            <div className="col-sm-4 forFifty ">
                              <Form.Item
                                name={`rate_${frequency}`}
                                label="Rate"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Enter Rate",
                                  },
                                ]}
                              >
                                <Input type="text" placeholder="Rate" />
                              </Form.Item>
                            </div>
                            <div className="col-sm-4 forFifty ">
                              <Form.Item
                                name={`rateType_${frequency}`}
                                label="Rate Type"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Select Rate Type",
                                  },
                                ]}
                              >
                                <Select placeholder="Rate Type">
                                  <Option value="Per Visit With Chemical">
                                    Per Visit With Chemical
                                  </Option>
                                  <Option value="Per Visit Without Chemical">
                                    Per Visit Without Chemical
                                  </Option>
                                  <Option value="Per Month With Chemical">
                                    Per Month With Chemical
                                  </Option>
                                  <Option value="Per Month Without Chemical">
                                    Per Month Without Chemical
                                  </Option>
                                </Select>
                              </Form.Item>
                            </div>
                            <div className="col-sm-2">
                              <Button type="primary" className="bluebtn">
                                Add New
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))} */}

                    <div className="col-sm-12">
                      <h3 className="subHeadingAddProspect">Frequency</h3>
                    </div>
                    <div className="col-sm-12 frwquencyss">
                      <div className="row cslocation frequencyDetail">
                        <Form ref={formRef} style={{ width: "100%" }}>
                          <div className="col-sm-3 forFifty ">
                            <Form.Item
                              name={`rate`}
                              label="Rate"
                              rules={[
                                {
                                  required: true,
                                  message: "Please Enter Rate",
                                },
                              ]}
                              onChange={(e) => setRateData(e.target.value)}
                            >
                              <Input type="text" placeholder="Rate" />
                            </Form.Item>
                          </div>
                          <div className="col-sm-3 forFifty ">
                            <Form.Item
                              name={"rate_type_id"}
                              label="Rate Type"
                              rules={[
                                {
                                  required: true,
                                  message: "Rate Type is required",
                                },
                              ]}
                            >
                              <Select
                                placeholder="Rate Type"
                                onChange={(value, option) =>
                                  setRateType({
                                    id: value,
                                    name: option.children,
                                  })
                                }
                              >
                                {racetype?.data?.map((item) => (
                                  <Select.Option
                                    key={item._id}
                                    value={item._id}
                                  >
                                    {item.label}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </div>
                          <div className="col-sm-3 forFifty ">
                            <Form.Item
                              name={"FrequencyId"}
                              label="Frequency"
                              rules={[
                                {
                                  required: true,
                                  message: "Frequency is required",
                                },
                              ]}
                            >
                              <Select
                                placeholder="Frequency"
                                onChange={(value, option) =>
                                  setFrequencydata({
                                    id: value,
                                    name: option.children,
                                  })
                                }
                                value={Frequencydata}
                              >
                                {postfrequency?.data?.map((item) => (
                                  <Select.Option
                                    key={item._id}
                                    value={item._id}
                                  >
                                    {item.label}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </div>
                          <div className="col-sm-2">
                            <Button
                              type="primary"
                              onClick={handleAddRow}
                              className="bluebtn handleAddRow"
                            >
                              Add New
                            </Button>
                          </div>
                        </Form>
                      </div>

                      {ProspectArray.map((item, i) => (
                        <div key={i} className="row cslocation frequencyDetail">
                          <div className="col-sm-3 forFifty ">
                            <Form.Item label="Rate">
                              <Input
                                value={item?.rate}
                                type="text"
                                placeholder="Rate"
                              />
                            </Form.Item>
                          </div>
                          <div className="col-sm-3 forFifty ">
                            <Form.Item label="Rate Type">
                              <Input
                                value={item?.rate_type_name}
                                type="text"
                                placeholder="Rate Type"
                              />
                            </Form.Item>
                          </div>
                          <div className="col-sm-3 forFifty ">
                            <Form.Item label="FrequencyId">
                              <Input
                                value={item?.Frequencyname}
                                type="text"
                                placeholder="FrequencyId"
                              />
                            </Form.Item>
                          </div>
                          <div className="col-sm-2">
                            <Button
                              type="primary"
                              onClick={() => handleRemove(i)}
                              className="bluebtn"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-sm-12 workTypeSection">
              <div className="row cslocation">
                <div className="col-sm-12">
                  <h3 className="subHeadingAddProspect">
                    Water Body Information
                  </h3>
                </div>
                <div className="col-sm-12">
                  <div className="row cslocation">
                    <div className="col-sm-4 forFifty ">
                      <Form.Item
                        name="waterbodyName"
                        label="Water Body Name"
                        rules={[
                          {
                            required: true,
                            message: "Please Enter Water Body Name",
                          },
                        ]}
                      >
                        <Input type="text" placeholder="Water Body Name" />
                      </Form.Item>
                    </div>
                    <div className="col-sm-4 forFifty ">
                      <Form.Item
                        name="waterBodyType"
                        label="Water Body Type"
                        rules={[
                          {
                            required: true,
                            message: "Please Select Water Body Type",
                          },
                        ]}
                      >
                        <Select placeholder="Water Body Type">
                          {postwaterType?.data?.map((item) => {
                            return (
                              <Option value={item._id}>{item.name}</Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    </div>
                    {/* <div className="col-sm-4 forFifty ">
                      <Form.Item
                        name="workOrderType"
                        label="Work Order Type"
                        rules={[
                          {
                            required: true,
                            message: "Please Select Work Order Type",
                          },
                        ]}
                      >
                        <Select placeholder="Work Order Type">
                          <Option value="1">Abc</Option>
                          <Option value="2">Def</Option>
                        </Select>
                      </Form.Item>
                    </div> */}
                    <div className="col-sm-4 forFifty ">
                      <Form.Item
                        name="size"
                        label="Gallons"
                        rules={[
                          {
                            required: true,
                            message: "Please Enter Gallons",
                          },
                        ]}
                      >
                        <Input type="text" placeholder="Gallons" />
                      </Form.Item>
                    </div>
                    <div className="col-sm-4 forFifty ">
                      <Form.Item
                        name="pressure"
                        label="Base Filter Pressure"
                        rules={[
                          {
                            required: true,
                            message: "Please Enter Base Filter Pressure",
                          },
                        ]}
                      >
                        <Input type="text" placeholder="Base Filter Pressure" />
                      </Form.Item>
                    </div>
                    <div className="col-sm-4 forFifty ">
                      <Form.Item
                        name="estimated_time_minutes"
                        label="Est. Minutes"
                        rules={[
                          {
                            required: true,
                            message: "Please Enter Estimated Minutes ",
                          },
                        ]}
                      >
                        <Input type="text" placeholder="Est. Minutes" />
                      </Form.Item>
                    </div>
                    <div className="col-sm-4 forFifty ">
                      <Form.Item
                        name="minutes_per_stop"
                        label="Minutes at Stop"
                        rules={[
                          {
                            required: true,
                            message: "Please Enter Minutes at Stop",
                          },
                        ]}
                      >
                        <Input type="text" placeholder="Minutes at Stop" />
                      </Form.Item>
                    </div>
                    {/* <div className="col-sm-4 forFifty ">
                      <Form.Item
                        name="scheduleTime"
                        label="Schedule Time"
                        rules={[
                          {
                            required: false,
                            message: "Enter Schedule Time",
                          },
                        ]}
                      >
                        <Input type="text" placeholder="Schedule TIme" />
                      </Form.Item>
                    </div> */}
                    <div className="col-sm-4 forFifty ">
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
                        <Input type="text" placeholder="Price" />
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
                          type="text"
                          placeholder="Work Needed"
                          rows={5}
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
                type="primary"
                className="bluebtn handleAddRow"
                htmlType="submit"
              >
                Send Prospect
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CreateAppointment;
