import React, { useEffect, useState, useRef } from "react";
import { Button, Form, Input, Select, TimePicker, Checkbox, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { fetchTechnician } from "../../redux/Slices/GetTechnician";
import { fetchgetfrequency } from "../../redux/Slices/getfrequency";
import { useSelector, useDispatch } from "react-redux";
import { fetchgetCustomerType } from "../../redux/Slices/getCustomerType";
import {
  fetchgetAllCityByCountry,
  fetchgetCustomerCity,
} from "../../redux/Slices/getCustomerCity";
import { fetchgetCustomerCountry } from "../../redux/Slices/getCustomerCountry";
import { fetchSalesTaxGroupName } from "../../redux/Slices/getSaleGroupName";
import { fetchgetwaterbodyType } from "../../redux/Slices/getWaterbodyType";
import { fetchgetRateType } from "../../redux/Slices/getRateType";
import { fetchgetWorkOrderType } from "../../redux/Slices/getWorkOrderType";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  postProspectData,
  clearData,
  updateProspectData,
  PreAppointmentEmailProspect,
  PreAppointmentQuoteEmailProspect,
} from "../../redux/postReducer/postProspectData";
import { fetchgetCustomerState } from "../../redux/Slices/getCustomerState";
import PlacesAutocomplete from "react-places-autocomplete";
import { Modal } from "react-bootstrap";
import WorkTypeForm from "../Pool/WorkorderTypeModal";
import { fetchgetAllprospectSingle } from "../../redux/Slices/getProspect";
import moment from "moment";
import DatePicker from "react-datepicker";

const { Option } = Select;

const AddProspectWorkOrderForm = () => {
  const { success, error, loading } = useSelector(
    (state) => state.postProspectData
  );
  const { data: getAllprospect, statusdata } = useSelector(
    (state) => state.getAllprospect
  );

  const [address, setAddress] = useState("");

  const formRef = useRef();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState();
  const [selectedDate, setSelectedDate] = useState("");
  const [cityId, setCityid] = useState("");

  const { data: Technician } = useSelector((state) => state.Technician);
  const postfrequency = useSelector((state) => state.getfrequency);
  const customertype = useSelector((state) => state.getCustomerType);
  const customercity = useSelector((state) => state.getCustomerCity);
  const userProfile = useSelector((state) => state.profileDetail);
  const GetSaleGroup = useSelector((state) => state.SalesTaxGroupName);
  const postwaterType = useSelector((state) => state.getwaterbodyType);
  const racetype = useSelector((state) => state.getRateType);
  const customerstate = useSelector((state) => state.getCustomerState);

  const { data: getWorkOrderType } = useSelector(
    (state) => state.getWorkOrderType
  );

  const [countryid, setcountryid] = useState(
    userProfile?.data?.data?.CountryId
  );
  const [isCommercial, setIsCommercial] = useState(false);

  const [ratetypedata, setRateType] = useState("");
  const [Frequencydata, setFrequencydata] = useState("");
  const [ratedata, setRateData] = useState("");
  const [ProspectArray, setProspectArray] = useState([]);
  const [ProspectArrayTemp, setProspectArrayTemp] = useState([]);

  const [AppointmentDateData, setAppointmentDate] = useState("");
  const [AppointmentTimeData, setAppointmentTime] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      first_name: getAllprospect?.data?.first_name,
      last_name: getAllprospect?.data?.last_name,
      Customer_type: getAllprospect?.data?.customer_type_id,
      company_name: getAllprospect?.data?.company_name,
      company_code: getAllprospect?.data?.company_code,
      email: getAllprospect?.data?.email,
      mobile_no_primary: getAllprospect?.data?.mobile_no_primary,
      billing_address: getAllprospect?.data?.billing_address,
      address: getAllprospect?.data?.address,
      billing_details: getAllprospect?.data?.billing_details,
      city_id: getAllprospect?.data?.ProspectCity_id?.name,
      state_id: getAllprospect?.data?.statename,
      zipcode: getAllprospect?.data?.zipcode,
      serviceLocationName: getAllprospect?.data?.ServiceLocationName,
      SalesTaxGroup: getAllprospect?.data?.SalesTaxGroup,
    });
    setCityid(getAllprospect?.data?.city_id);
  }, [getAllprospect]);

  form.setFieldsValue({});
  useEffect(() => {
    if (getAllprospect && getAllprospect?.data) {
      const data = getAllprospect?.data?.ProspectAssigneeProspectId[0];
      const waterbodydata =
        getAllprospect?.data?.ProspectWaterBodyProspectId[0];
      form.setFieldsValue({
        technician_id: data?.AssignedRepresentative,
        AppointmentDate: moment(data?.AppointmentDate),
        AppointmentTime: moment(data?.AppointmentTime, "HH:mm:ss"),
        waterbodyName: waterbodydata?.WaterBodyName,
        waterBodyType: waterbodydata?.WaterBodyType,
        work_order_type_id: waterbodydata?.work_order_type_id,
        Gallons: waterbodydata?.size,
        baseFilterPressure: waterbodydata?.pressure,
        estimated_time_minutes: waterbodydata?.estimated_time_minutes,
        estminutes: waterbodydata?.estimated_time_minutes,
        minutes: waterbodydata?.minutes_per_stop,
        scheduleTime: waterbodydata?.scheduleTime,
        price: waterbodydata?.price,
        notes: waterbodydata?.notes,
        workNeeded: waterbodydata?.work_needed,
        first_name: formData?.first_name,
        last_name: formData?.last_name,
        Customer_type: formData?.customer_type_id,
        company_name: formData?.company_name,
        company_code: formData?.company_code,
        email: formData?.email,
        mobile_no_primary: formData?.mobile_no_primary,
        billing_address: formData?.address,
        address: formData?.address,
        billing_details: formData?.firstName,
        city_id: formData?.city_id,
        state_id: formData?.state_id,
        zipcode: formData?.zipcode,
        serviceLocationName: formData?.serviceLocationName,
        SalesTaxGroup: formData?.SalesTaxGroup,
      });
      setSelectedDate(data?.AppointmentDate);
    }
  }, [getAllprospect, form]);

  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchgetAllprospectSingle({ id }));
  }, [dispatch, id]);
  useEffect(() => {
    setcountryid(userProfile?.data?.data?.CountryId);
  }, [userProfile]);

  const onFinish = (values) => {
    if (!values?.customer_type_id) {
      values.customer_type_id = customertype?.data[0]?._id;
    }

    const Data = {
      first_name: values.first_name,
      last_name: values.last_name,
      Customer_type: values.customer_type_id,
      company_name: values.company_name,
      company_code: values.company_code,
      email: values.email,
      phone: values.mobile_no_primary,
      mobile_no_primary: values.mobile_no_primary,
      billing_address: values.address,
      billing_details: values.firstName,
      city_id: cityId,
      zipcode: values.zipCode,
      ServiceLocationName: values.serviceLocationName,
      SalesTaxGroup: values.sales_tax_group,
      FrequencyData: ProspectArrayTemp,
      AssigneeData: [
        {
          AssignedRepresentative: values.technician_id,
          AppointmentDate: AppointmentDateData
            ? AppointmentDateData
            : values?.AppointmentDate._i,
          AppointmentTime: AppointmentTimeData
            ? AppointmentTimeData
            : values?.AppointmentTime._i,
        },
      ],
      WaterBodyData: [
        {
          WaterBodyName: values.waterbodyName,
          WaterBodyType: values.waterBodyType,
          minutes_per_stop: values.minutes,
          pressure: values.baseFilterPressure,
          estimated_time_minutes: values.estimated_time_minutes,
          size: values.Gallons,
          price: values.price,
          work_order_type_id: values.work_order_type_id,
          work_needed: values.workNeeded,
          notes: values.notes,
        },
      ],
    };

    dispatch(updateProspectData({ Data, id }));
  };

  const handleChange = (id) => {
    dispatch(fetchgetCustomerCity({ id }));
  };

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

  const handleCustomerTypeChange = (value, option) => {
    if (option.children !== "residential") {
      setIsCommercial(true);
    } else {
      setIsCommercial(false);
    }
  };
  useEffect(() => {
    dispatch(fetchSalesTaxGroupName());
    dispatch(fetchgetCustomerType());
    dispatch(fetchgetCustomerCountry());
    dispatch(fetchgetwaterbodyType());
    dispatch(fetchgetRateType());
    dispatch(fetchgetWorkOrderType({}));
  }, []);

  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const onSearch = (name) => {
    dispatch(fetchgetAllCityByCountry({ countryid, name }));
  };

  useEffect(() => {
    let id = countryid;
    dispatch(fetchgetAllCityByCountry({ countryid, name }));
    dispatch(fetchgetCustomerState({ id }));
  }, [dispatch, countryid]);

  useEffect(() => {
    const name = "";

    dispatch(fetchgetAllCityByCountry({ countryid, name }));
  }, [dispatch, countryid]);
  useEffect(() => {
    if (Technician?.length === 0) {
      dispatch(fetchTechnician());
    }

    if (postfrequency?.data?.length === 0) {
      dispatch(fetchgetfrequency());
    }
  }, [dispatch]);

  const handleChangeCity = (id) => {
    dispatch(fetchgetCustomerState({ id }));
  };

  useEffect(() => {
    setcountryid(userProfile?.data?.data?.CountryId);
  }, [userProfile]);
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

  const handleRemove = (indexToRemove) => {
    setProspectArray((prevArray) => {
      return prevArray.filter((_, index) => index !== indexToRemove);
    });

    setProspectArrayTemp((prevArray) => {
      return prevArray.filter((_, index) => index !== indexToRemove);
    });
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const AppointmentDate = (data, i) => {
    setAppointmentDate(i);
  };

  const AppointmentTime = (data, i) => {
    setAppointmentTime(i);
  };

  const SendAppointment = async () => {
    const res = await dispatch(PreAppointmentEmailProspect({ id }));
  };

  const SendQuote = async () => {
    const res = await dispatch(PreAppointmentQuoteEmailProspect({ id }));
  };
  return (
    <div className="row fomik addRoute addProspectService">
      <Form
        name="dynamic_form_nest_item"
        // onValuesChange={handleFormValuesChange}
        autoComplete="off"
        onFinish={onFinish}
        form={form}
        initialValues={formData}
      >
        <div className="row adrrLocation">
          <div className="col-sm-12 heads">
            <h3>Customer Prospect </h3>
          </div>
          {/* Appointment Details */}
          <div className="col-sm-12 workTypeSection">
            <div className="row cslocation">
              <div className="col-sm-12">
                <h3 className="subHeadingAddProspect">Appointment Details</h3>
              </div>
              <div className="col-sm-12">
                <div className="row cslocation">
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
                      <Select
                        placeholder="Tech"
                        showSearch
                        filterOption={filterOption}
                      >
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
                        selected={selectedDate ? new Date(selectedDate) : null}
                        isClearable
                        onChange={handleDateChange}
                        // dateFormat="yyyy-MM-dd" // Set the desired date format for displayed value
                        placeholderText="Select Start date"
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
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="col-sm-12 workTypeSection">
            <div className="row cslocation customerInformationProspect">
              <div className="col-sm-12">
                <h3 className="subHeadingAddProspect">Customer Information</h3>
              </div>
              <div className="col-sm-12">
                <div className="row cslocation">
                  <div className="col-sm-4 forFifty ">
                    <Form.Item
                      name="first_name"
                      label="First Name"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter First Name",
                        },
                      ]}
                    >
                      <Input type="text" placeholder="First Name" />
                    </Form.Item>
                  </div>
                  <div className="col-sm-4 forFifty ">
                    <Form.Item
                      name="last_name"
                      label="Last Name"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Last Name",
                        },
                      ]}
                    >
                      <Input type="text" placeholder="Last Name" />
                    </Form.Item>
                  </div>

                  <div className="col-sm-4 forFifty ">
                    <Form.Item name="customer_type_id" label="Customer Type">
                      <Select
                        placeholder="Customer Type"
                        defaultValue={
                          customertype?.data[0]?._id || "residential"
                        }
                        onChange={handleCustomerTypeChange}
                      >
                        {customertype?.data?.map((item) => {
                          return (
                            <Option key={item._id} value={item._id}>
                              {item.name}
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </div>

                  {isCommercial ? (
                    <>
                      <div className="col-sm-4 forFifty">
                        <Form.Item
                          label="Company Name"
                          name="company_name"
                          rules={[
                            {
                              required: true,
                              message: "Please input your Company Name!",
                            },
                          ]}
                        >
                          <Input placeholder="Company Name" />
                        </Form.Item>
                      </div>

                      <div className="col-sm-4 forFifty">
                        <Form.Item
                          name="company_code"
                          label="Company Code"
                          rules={[
                            {
                              required: true,
                              message: "Please input your Company Code!",
                            },
                          ]}
                        >
                          <Input placeholder="Company Code" />
                        </Form.Item>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="col-sm-4 forFifty">
                        <Form.Item label="Company Name" name="company_name">
                          <Input placeholder="Company Name" />
                        </Form.Item>
                      </div>
                      <div className="col-sm-4 forFifty">
                        <Form.Item name="company_code" label="Company Code">
                          <Input placeholder="Company Code" />
                        </Form.Item>
                      </div>
                    </>
                  )}

                  <div className="col-sm-4 forFifty ">
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Email",
                        },
                      ]}
                    >
                      <Input type="email" placeholder="Email" />
                    </Form.Item>
                  </div>

                  <div className="col-sm-4 forFifty ">
                    <Form.Item
                      name="mobile_no_primary"
                      label="Phone Number"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Phone Number",
                        },
                      ]}
                    >
                      <Input type="text" placeholder="Phone No" />
                    </Form.Item>
                  </div>

                  <div className="col-sm-4 forFifty ">
                    <Form.Item
                      name="address"
                      label="Address"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Address",
                        },
                      ]}
                    >
                      <PlacesAutocomplete
                        value={address}
                        onChange={setAddress}
                        // onSelect={data}
                      >
                        {({
                          getInputProps,
                          suggestions,
                          getSuggestionItemProps,
                          loading,
                        }) => (
                          <div>
                            <Input
                              {...getInputProps({
                                placeholder: "Enter Address",
                              })}
                            />
                            <div className="address-suggestion">
                              {loading && <div>Loading...</div>}
                              {suggestions.map((suggestion) => {
                                const style = {
                                  backgroundColor: suggestion.active
                                    ? "#41b6e6"
                                    : "#fff",
                                };
                                return (
                                  <div
                                    key={suggestion.placeId}
                                    {...getSuggestionItemProps(suggestion, {
                                      style,
                                    })}
                                  >
                                    {suggestion.description}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </PlacesAutocomplete>
                    </Form.Item>
                  </div>

                  <div className="col-sm-4 forFifty">
                    <Form.Item
                      label="State"
                      name="state_id"
                      rules={[
                        {
                          required: true,
                          message: "Please input your state!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="State"
                        onChange={handleChange}
                        showSearch
                        filterOption={filterOption}
                      >
                        {customerstate &&
                          customerstate?.data?.items?.map((item) => {
                            return (
                              <Option value={item._id}>{item.name}</Option>
                            );
                          })}
                      </Select>
                    </Form.Item>
                  </div>

                  <div className="col-sm-4 forFifty">
                    <Form.Item
                      name="city_id"
                      // name="city_id"
                      label="City"
                      rules={[
                        {
                          required: true,
                          message: "Please input your city!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="City"
                        showSearch
                        filterOption={filterOption}
                        onSearch={onSearch}
                        onChange={handleChangeCity}
                      >
                        {customercity?.data?.map((item, i) => {
                          return (
                            <Option value={item?._id}>{item?.name}</Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </div>

                  <div className="col-sm-4 forFifty ">
                    <Form.Item
                      name="zipcode"
                      label="Zip Code"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Zip COde",
                        },
                      ]}
                    >
                      <Input type="text" placeholder="Zip Code" />
                    </Form.Item>
                  </div>

                  <div className="col-sm-4 forFifty ">
                    <Form.Item
                      name="serviceLocationName"
                      label="Service Location Name"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Service Location Name",
                        },
                      ]}
                    >
                      <Input type="text" placeholder="Service Location Name" />
                    </Form.Item>
                  </div>

                  <div className="col-sm-4 forFifty ">
                    <Form.Item
                      name="SalesTaxGroup"
                      label="Sales Tax"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Sales Tax is required",
                      //   },
                      // ]}
                    >
                      <Select placeholder="Sales Tax Group">
                        {GetSaleGroup?.data?.map((item) => {
                          return <Option value={item._id}>{item.name}</Option>;
                        })}
                      </Select>
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Waterbody Information */}
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
                          return <Option value={item._id}>{item.name}</Option>;
                        })}
                      </Select>
                    </Form.Item>
                  </div>
                  {/* <Form.Item>
                    <Button
                      disabled={false}
                      className="wbtn AddNewType-Btn prospect-add"
                      onClick={handleShow}
                      block
                    >
                      + Add New Type
                    </Button>
                  </Form.Item> */}
                  {/* <div className="col-sm-4 forFifty ">
                    <Form.Item
                      name="work_order_type_id"
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
                          <Option value={item._id}>{item?.name}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div> */}
                  <div className="col-sm-4 forFifty ">
                    <Form.Item name="Gallons" label="Gallons">
                      <Input type="text" placeholder="Gallons" />
                    </Form.Item>
                  </div>
                  <div className="col-sm-4 forFifty ">
                    <Form.Item
                      name="baseFilterPressure"
                      label="Base Filter Pressure"
                    >
                      <Input type="text" placeholder="Base Filter Pressure" />
                    </Form.Item>
                  </div>

                  <div className="col-sm-4 forFifty ">
                    <Form.Item
                      name="estimated_time_minutes"
                      label="Estimated Time Minutes"
                    >
                      <Input type="text" placeholder="Estimated Time Minutes" />
                    </Form.Item>
                  </div>

                  <div className="col-sm-4 forFifty ">
                    <Form.Item name="estminutes" label="Est. Minutes">
                      <Input type="text" placeholder="Est. Minutes" />
                    </Form.Item>
                  </div>
                  <div className="col-sm-4 forFifty ">
                    <Form.Item name="minutes" label="Minutes at Stop">
                      <Input type="text" placeholder="Minutes at Stop" />
                    </Form.Item>
                  </div>

                  <div className="col-sm-4 forFifty ">
                    <Form.Item
                      name="price"
                      label="Price"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Please Enter Price",
                      //   },
                      // ]}
                    >
                      <Input type="text" placeholder="Price" />
                    </Form.Item>
                  </div>
                  <div className="col-sm-12">
                    <Form.Item name="notes" label="Notes">
                      <Input.TextArea
                        type="text"
                        placeholder="Notes"
                        rows={5}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-sm-12">
                    <Form.Item
                      name="workNeeded"
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

          <div className="col-sm-12 buttonsservice prospect">
            <Form.Item className="savebtn">
              <Button
                onClick={SendAppointment}
                disabled={getAllprospect?.isPreAppointed ? true : false}
                type="primary"
                className="bluebtn handleAddRow"
              >
                Send Appointment Email
              </Button>
            </Form.Item>
            <Form.Item className="savebtn">
              <Button
                onClick={SendQuote}
                disabled={getAllprospect?.isQuoted ? true : false}
                type="primary"
                className="bluebtn handleAddRow"
              >
                Send Quote Email
              </Button>
            </Form.Item>
            <Form.Item className="savebtn">
              <Button
                className="bluebtn handleAddRow"
                type="primary"
                htmlType="submit"
              >
                Update
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Body>
          Work Order Type
          <Button variant="secondary" onClick={handleClose}>
            X
          </Button>
        </Modal.Body>
        <WorkTypeForm data={handleClose} />
      </Modal>
    </div>
  );
};

export default AddProspectWorkOrderForm;
