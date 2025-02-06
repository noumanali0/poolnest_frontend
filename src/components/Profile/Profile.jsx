import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Checkbox, Form, Input, Select, Tooltip, Switch } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Import useHistory
import { useDispatch, useSelector } from "react-redux";
import {
  fetchgetSingleCustomers,
  STATUSES,
} from "../../redux/Slices/getSingleCustomer";
import { useParams } from "react-router-dom";
import {
  fetchgetAllCityByCountry,
  fetchgetCustomerCity,
} from "../../redux/Slices/getCustomerCity";
import { fetchgetCustomerCountry } from "../../redux/Slices/getCustomerCountry";
import {
  updateCustomerData,
  resetData,
} from "../../redux/postReducer/postCustomer";
import Loader from "../NoDataComponent/Loader";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { fetchClientSource } from "../../redux/Slices/getClientSource";
import { fetchtag } from "../../redux/Slices/getTags";
import { fetchgetCustomerState } from "../../redux/Slices/getCustomerState";
import { fetchgetCustomerType } from "../../redux/Slices/getCustomerType";

export default function Profile({ isFieldsDisabled }) {
  const dispatch = useDispatch();

  console.log(isFieldsDisabled);

  const { id } = useParams();

  const { data: getSingleCustomer, status } = useSelector(
    (state) => state.getSingleCustomer
  );
  const [address, setAddress] = useState("");
  const [isBillingEmail, setIsBillingEmail] = useState();
  const [isServiceNotification, setIsServiceNotification] = useState();
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [isCommercial, setIsCommercial] = useState(false);
  const [activestatus, setactivestatus] = useState(getSingleCustomer.status);

  const [isBillingPhone, setIsBillingPhone] = useState(true);
  const [isServiceNotificationPhone, setIsServiceNotificationPhone] =
    useState(true);

  const handleSelect = async (selectedAddress) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      setAddress(selectedAddress);
      setCoordinates(latLng);
      console.log(results);
    } catch (error) {
      console.error("Error fetching coordinates", error);
    }
  };

  const customertype = useSelector((state) => state.getCustomerType);
  const customercity = useSelector((state) => state.getCustomerCity);
  const customercountry = useSelector((state) => state.getCustomerCountry);
  const customerstate = useSelector((state) => state.getCustomerState);
  const userProfile = useSelector((state) => state.profileDetail);

  const [countryid, setcountryid] = useState("");
  const [State, setState] = useState();

  const addEmailField = () => {
    setAdditionalEmail([...additionalEmail, { type: "text", value: "" }]);
  };

  useEffect(() => {
    setcountryid(userProfile?.data?.data?.CountryId);
  }, [userProfile]);

  const postsCustomer = useSelector((state) => state.postsCustomer);
  const { data, loading, success, error } = useSelector(
    (state) => state.postsCustomer
  );
  const clientSource = useSelector((state) => state.clientSource);

  const customertags = useSelector((state) => state.tag);

  const [Country, setCountry] = useState(getSingleCustomer.countryname);
  const [City, setCity] = useState(getSingleCustomer.city_id);
  const [CustomerId, setCustomerId] = useState(getSingleCustomer.Customer_type);
  const [options, setOptions] = useState(customertags?.data); // Use state to manage options
  const [sourceoptions, setSourceOptions] = useState(clientSource?.data);

  const [formData, setFormData] = useState();

  const resultArray = getSingleCustomer?.CustomerTags?.map((item) => {
    const idParts = item._id.split("-"); // Split _id by '-' to get an array of parts
    const newName = `${item.TagsData.name}`;
    return newName.toLowerCase(); // Convert to lowercase as per your example
  });

  const clientSourceData = getSingleCustomer?.CustomerSource?.map((item) => {
    const idParts = item._id.split("-"); // Split _id by '-' to get an array of parts
    const newName = `${item.SourceData.name}`;
    return newName.toLowerCase();
  });

  const handleBillingCheckboxChange = (e) => {
    if (e.target.checked === true) {
      setIsBillingEmail(true);
    } else {
      setIsBillingEmail(false);
    }
  };
  const handleServiceCheckboxChange = (e) => {
    if (e.target.checked === true) {
      setIsServiceNotification(true);
    } else {
      setIsServiceNotification(false);
    }
  };
  const handleBillingPhoneCheckboxChange = (e) => {
    if (e.target.checked === true) {
      setIsBillingPhone(true);
    } else {
      setIsBillingPhone(false);
    }
  };
  const handlePhoneServiceCheckboxChange = (e) => {
    if (e.target.checked === true) {
      setIsServiceNotificationPhone(true);
    } else {
      setIsServiceNotificationPhone(false);
    }
  };

  useEffect(() => {
    let id = countryid;
    if (id) {
      dispatch(fetchgetCustomerState({ id }));
    }
  }, [dispatch, countryid]);

  useEffect(() => {
    setFormData({
      address: getSingleCustomer?.address,
      billing_details: getSingleCustomer?.billing_details || "",
      company_address: getSingleCustomer?.company_address || "",
      company_name: getSingleCustomer?.company_name || "",
      company_code: getSingleCustomer?.company_code || "",
      customer_type_id: getSingleCustomer?.customertypename,
      customer_type: getSingleCustomer?.customertypename,
      email: getSingleCustomer?.email || "",
      first_name: getSingleCustomer?.first_name,
      last_name: getSingleCustomer?.last_name || "",
      mobile_no_primary: getSingleCustomer?.mobile_no_primary || "",
      mobile_no_secondary: getSingleCustomer?.mobile_no_secondary || "",
      state_id: getSingleCustomer?.statename || "",
      city_id: getSingleCustomer?.cityname || "",
      country_id: getSingleCustomer?.countryname || "",
      customer_email_title: getSingleCustomer?.customer_email_title || "",
      customer_phone_title: getSingleCustomer?.customer_phone_title || "",
      status: getSingleCustomer?.status || "",
      billing_address: getSingleCustomer?.billing_address || "",
      billingCycle:
        getSingleCustomer?.CustomerInvoicingSetting &&
        getSingleCustomer?.CustomerInvoicingSetting[0]?.billingCycle,

      zipcode: getSingleCustomer?.zipcode,
      updatedAt: getSingleCustomer?.updatedAt || "",
    });
    setIsBillingEmail(getSingleCustomer.billing_email);
    setIsServiceNotification(getSingleCustomer.service_notification);
    setIsBillingPhone(getSingleCustomer.billing_phone);
    setIsServiceNotificationPhone(getSingleCustomer.service_notification_phone);
  }, [getSingleCustomer]);

  useEffect(() => {
    dispatch(fetchgetSingleCustomers({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchgetCustomerType());
    dispatch(fetchgetCustomerCountry());
    dispatch(fetchClientSource());
    dispatch(fetchtag());
  }, [dispatch]);

  const UpdateServiceLocationNavigation = () => {
    navigate(`/edit-service-location/${id}`);
  };
  const { Option } = Select;
  const [form] = Form.useForm();
  const navigate = useNavigate(); // Initialize useHistory

  const emailData = getSingleCustomer?.CustomerEmailsData?.map((item) => ({
    Email: item.Email,
    title: item.title,
    billing_email: item.billing_email,
    service_notification: item.service_notification,
  }));

  const phoneData = getSingleCustomer?.CustomerPhoneData?.map((item) => ({
    Phone: item.Phone,
    title: item.title,
    billing_notification: item.billing_notification,
    service_notification: item.service_notification,
  }));

  const [EmailData, setEmailData] = useState(emailData);
  const [PhoneData, setPhoneData] = useState(phoneData);

  useEffect(() => {
    setEmailData(emailData);
    setPhoneData(phoneData);
    setAddress(getSingleCustomer?.address);
  }, [getSingleCustomer]);

  const handleInputEmailChange = (index, field, value) => {
    setEmailData((prevEmailData) => {
      const updatedEmailData = [...prevEmailData];
      // If the field is a checkbox and the value is undefined, set it to false
      if (
        field.includes("billing_email") ||
        field.includes("service_notification")
      ) {
        value = value || false;
      }
      // Update the specific field for the given index
      updatedEmailData[index] = {
        ...updatedEmailData[index],
        [field]: value,
      };
      return updatedEmailData;
    });
  };
  const handleInputPhoneChange = (index, field, value) => {
    setPhoneData((prevPhoneData) => {
      const updatedPhoneData = [...prevPhoneData];
      // If the field is a checkbox and the value is undefined, set it to false
      if (
        field.includes("billing_notification") ||
        field.includes("service_notification")
      ) {
        value = value || false;
      }
      // Update the specific field for the given index
      updatedPhoneData[index] = {
        ...updatedPhoneData[index],
        [field]: value,
      };
      console.log(updatedPhoneData, "<===updatedPhoneData)");
      return updatedPhoneData;
    });
  };
  const onFinish = async (values) => {
    const existingEmailData = await values?.EmailData;

    const mergedEmailData = existingEmailData?.concat(EmailData);
    const existingPhoneData = await values?.PhoneData;

    const mergedPhoneData = existingPhoneData?.concat(PhoneData);

    const newEmailData = mergedEmailData?.map((item) => ({
      title: item.title ? item.title : null,
      Email: item.Email ? item.Email : null,
      billing_email: item.billing_email ? item.billing_email : false,
      service_notification: item.service_notification
        ? item.service_notification
        : false,
    }));
    const newPhoneData = mergedPhoneData?.map((item) => ({
      title: item.title ? item.title : null,
      Phone: item.Phone ? item.Phone : null,
      billing_notification: item.billing_notification
        ? item.billing_notification
        : false,
      service_notification: item.service_notification
        ? item.service_notification
        : false,
    }));

    const postData = {
      customer_type_id:
        CustomerId == null ? getSingleCustomer.Customer_type : CustomerId,
      city_id: City,
      country_id: Country,
      first_name: values.first_name,
      last_name: values.last_name,
      address: address,
      zipcode: values.zipcode,
      customer_phone_title: values.customer_phone_title,
      customer_email_title: values.customer_email_title,
      status: activestatus,
      email: values.email,
      company_code: values.company_code,
      mobile_no_primary: values.mobile_no_primary,
      company_name: values.company_name,
      company_address: values.company_address,
      billing_address: values.billing_address,
      billing_details: values.billing_details,
      PhoneData: newPhoneData ? newPhoneData : PhoneData,
      EmailData: newEmailData ? newEmailData : EmailData,
      SourceId: values.SourceId,
      TagsId: values.tags,
      billing_email: isBillingEmail,
      service_notification: isServiceNotification,
      billing_phone: isBillingPhone,
      service_notification_phone: isServiceNotificationPhone,
      billingCycle: values.billingCycle,
    };
    dispatch(updateCustomerData({ id, postData }));
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetData());
      navigate(-1);
      isFieldsDisabled?.setIsFieldsDisabled(true);
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, success]);

  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!");
  };

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  if (status === STATUSES.LOADING) {
    return <Loader />;
  }

  if (status === STATUSES.ERROR) {
    return (
      <h2
        style={{
          margin: "100px",
        }}
      >
        Something went wrong!
      </h2>
    );
  }

  const handleChangeCountry = (id) => {
    dispatch(fetchgetCustomerState({ id }));
  };

  const handleChangeCity = (cityid) => {
    setCity(cityid);
    console.log(cityid, "cityid");
  };

  const HandleEmail = (key) => {
    const newEmailData = [...EmailData];
    newEmailData.splice(key, 1);
    setEmailData(newEmailData);
  };

  const HandlePhone = (key) => {
    const newPhoneData = [...PhoneData];
    newPhoneData.splice(key, 1);
    setPhoneData(newPhoneData);
  };

  const onSearch = (name) => {
    dispatch(fetchgetAllCityByCountry({ countryid, name }));
  };

  form.setFieldsValue({
    address: formData?.address,
    billing_details: formData?.billing_details || "",
    country_id: formData?.country_id || "",
    city_id: formData?.city_id || "",
    company_address: formData?.company_address || "",
    company_name: formData?.company_name || "",
    customer_type_id: formData?.customer_type_id,
    email: formData?.email || "",
    customer_email_title: formData?.customer_email_title || "",
    customer_phone_title: formData?.customer_phone_title || "",
    first_name: formData?.first_name,
    last_name: formData?.last_name || "",
    mobile_no_primary: formData?.mobile_no_primary || "",
    state_id: formData?.state_id || "",
    status: formData?.status || "",
    billing_address: formData?.billing_address || "",
    zipcode: formData?.zipcode,
    // EmailData: EmailData,
    updatedAt: formData?.updatedAt || "",
  });

  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const handleChange = (id) => {
    dispatch(fetchgetCustomerCity({ id }));
  };

  // const serviceType = [
  //   {
  //     id: 1,
  //     value: "true",
  //     label: "Post Paid",
  //   },
  //   {
  //     id: 2,
  //     value: "false",
  //     label: "Pre Paid",
  //   },
  // ];
  const billingCycle = [
    // {
    //   id: 10,
    //   value: "2",
    //   label: "2 Days",
    // },
    {
      id: 0,
      value: "7",
      label: "7 Days",
    },
    {
      id: 1,
      value: "15",
      label: "15 Days",
    },
    {
      id: 2,
      value: "30",
      label: "30 Days",
    },
    {
      id: 3,
      value: "45",
      label: "45 Days",
    },
    {
      id: 4,
      value: "60",
      label: "60 Days",
    },
  ];
  const handleCustomerTypeChange = (value) => {
    setCustomerId(value);
  };

  const handleChangeStatus = (e) => {
    setactivestatus(e);
  };
  return (
    <Fragment>
      <div className="row fomik customer editCustomer editedit cslocation">
        {!getSingleCustomer?._id ? (
          <></>
        ) : (
          <Form
            name="Customer"
            onValuesChange={handleFormValuesChange}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            disabled={isFieldsDisabled?.isFieldsDisabled}
            initialValues={formData}
          >
            <div className="row">
              <div className="col-sm-2 forFifty customertype">
                <Form.Item name="customer_type_id" label="Customer Type">
                  <Select
                    placeholder="Customer Type"
                    defaultValue={customertype?.data[0]?._id || "residential"}
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
              <div className="col-sm-2 forFifty new121">
                <Form.Item
                  name="status"
                  label="Inactive Active"
                  valuePropName="checked"
                  className="prospectusss activeInactiveSwitch"
                >
                  <Switch onChange={handleChangeStatus} />
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
              <div className="col-sm-6 forFifty">
                <Form.Item
                  name="first_name"
                  label="First Name"
                  rules={[
                    { required: true, message: "Please input your firstname!" },
                  ]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
              </div>

              <div className="col-sm-6 forFifty">
                <Form.Item
                  name="last_name"
                  label="Last Name"
                  // rules={[
                  //   { required: true, message: "Please input your Lastname!" },
                  // ]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
              </div>

              {/* <div className="col-sm-4">
                <Form.Item
                  //  name={[name, "country_id"]}
                  label="Country"
                  name="country_id"
                  rules={[
                    { required: true, message: "Please input your Country!" },
                  ]}
                >
                  <Select
                    placeholder="Country"
                    onChange={handleChangeCountry}
                    showSearch
                    filterOption={filterOption}
                    defaultValue={"United States"}
                  >
                    {customercountry &&
                      customercountry?.data?.map((item) => (
                        <Option key={item._id} value={item._id}>
                          {item.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </div> */}

              <div className="col-sm-4 forFifty">
                <Form.Item
                  label={
                    <span>
                      <span style={{ color: "red" }}>*</span> Address
                    </span>
                  }
                  name="Address"
                  // rules={[{ required: true, message: 'Address is Required' }]}
                >
                  <PlacesAutocomplete
                    value={address}
                    onChange={setAddress}
                    onSelect={handleSelect}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                    }) => (
                      <div>
                        <Input
                          {...getInputProps({
                            placeholder: "Enter Address",
                          })}
                          value={address} // Ensure the value is set to address state
                          disabled={isFieldsDisabled?.isFieldsDisabled}
                        />
                        <div className="suggestion_class">
                          {suggestions?.map((suggestion) => {
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
                  //  name={[name, "country_id"]}
                  label="State"
                  name="state_id"
                  rules={[
                    { required: true, message: "Please input your State!" },
                  ]}
                >
                  <Select
                    placeholder="State"
                    onChange={handleChange}
                    showSearch
                    filterOption={filterOption}
                    defaultValue={"United States"}
                  >
                    {customerstate &&
                      customerstate?.data?.items?.map((item) => (
                        <Option key={item._id} value={item._id}>
                          {item.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </div>

              <div className="col-sm-4 forFifty">
                <Form.Item
                  name="city_id"
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
                      return <Option value={item?._id}>{item?.name}</Option>;
                    })}
                  </Select>
                </Form.Item>
              </div>
              <div className="col-sm-4 forFifty">
                <Form.Item
                  label="Email Title"
                  name="customer_email_title"
                  rules={[
                    {
                      message: "The input is not valid E-mail Title!",
                    },
                  ]}
                  // initialValue={formData?.email}
                >
                  <Input placeholder="E-mail Title" />
                </Form.Item>
              </div>
              <div className="col-sm-4 forFifty">
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    { required: true, message: "Email is Invalid" },
                  ]}
                  // initialValue={formData?.email}
                >
                  <Input placeholder="E-mail" />
                </Form.Item>
              </div>
              <div className="col-sm-2">
                <Form.Item name="billing_email">
                  <Checkbox
                    name="billing_email"
                    checked={isBillingEmail}
                    onChange={handleBillingCheckboxChange}
                  >
                    billing email
                  </Checkbox>
                </Form.Item>
              </div>
              <div className="col-sm-2">
                <Form.Item name="service_notification">
                  <Checkbox
                    name="service_notification"
                    checked={isServiceNotification}
                    onChange={handleServiceCheckboxChange}
                  >
                    service notification
                  </Checkbox>
                </Form.Item>
              </div>

              <div className="col-sm-12 noPad">
                {EmailData?.map((item, key) => {
                  return (
                    <span className="row display-flex-1" key={key}>
                      <div className="col-sm-3 forFifty">
                        <Form.Item
                          name={`Title ${key + 1}`}
                          label={`Title ${key + 1}`}
                          initialValue={item?.title}
                        >
                          <Input
                            type="text"
                            placeholder={`title`}
                            onChange={(e) =>
                              handleInputEmailChange(
                                key,
                                "title",
                                e.target.value
                              )
                            }
                          />
                        </Form.Item>
                      </div>
                      <div className="col-sm-4 forFifty">
                        <Form.Item
                          name={`Email ${key + 1}`}
                          label={`Email ${key + 1}`}
                          initialValue={item?.Email}
                        >
                          <Input
                            type="email"
                            placeholder={`Email`}
                            onChange={(e) =>
                              handleInputEmailChange(
                                key,
                                "Email",
                                e.target.value
                              )
                            }
                          />
                        </Form.Item>
                      </div>
                      <div className="col-sm-2">
                        <Form.Item
                          name={`billing_email ${key + 1}`}
                          valuePropName="checked" // Ensure valuePropName is set to "checked"
                          normalize={(value) => value || false}
                        >
                          <Checkbox
                            defaultChecked={item.billing_email}
                            onChange={(e) =>
                              handleInputEmailChange(
                                key,
                                "billing_email",
                                e.target.checked
                              )
                            }
                          >
                            Billing Email
                          </Checkbox>
                        </Form.Item>
                      </div>
                      <div className="col-sm-2">
                        <Form.Item
                          name={`service_notification ${key + 1}`}
                          valuePropName="checked"
                          normalize={(value) => value || false}
                        >
                          <Checkbox
                            onChange={(e) =>
                              handleInputEmailChange(
                                key,
                                "service_notification",
                                e.target.checked
                              )
                            }
                            defaultChecked={item.service_notification}
                          >
                            Service Notification
                          </Checkbox>
                        </Form.Item>
                      </div>

                      <div className="col-sm-1">
                        <MinusCircleOutlined onClick={() => HandleEmail(key)} />
                      </div>
                    </span>
                  );
                })}
                <Form.List name="EmailData">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <span
                          className="row cslocation"
                          key={key}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            position: "relative",
                          }}
                        >
                          <div className="col-sm-4 forFifty">
                            <Form.Item {...restField} name={[name, "title"]}>
                              <Input type="text" placeholder={`Title`} />
                            </Form.Item>
                          </div>
                          <div className="col-sm-4 forFifty">
                            <Form.Item {...restField} name={[name, "Email"]}>
                              <Input type="email" placeholder={`Emails`} />
                            </Form.Item>
                          </div>

                          <div className="col-sm-2">
                            <Form.Item
                              {...restField}
                              name={[name, "billing_email"]}
                              valuePropName="checked"
                              defaultValue={false}
                              normalize={(value) => value || false}
                            >
                              <Checkbox>Billing Email</Checkbox>
                            </Form.Item>
                          </div>
                          <div className="col-sm-2">
                            <Form.Item
                              {...restField}
                              name={[name, "service_notification"]}
                              valuePropName="checked"
                              defaultValue={false}
                              normalize={(value) => value || false}
                            >
                              <Checkbox>Service Notification</Checkbox>
                            </Form.Item>
                          </div>
                          <div
                            style={{
                              position: "absolute",
                              left: "calc(100% - 30px)",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <MinusCircleOutlined
                              onClick={() => remove(name)}
                              style={{
                                backgroundColor: "red",
                                fontSize: "20px",
                                color: "#fff",
                                borderRadius: "50%",
                              }}
                            />
                          </div>
                        </span>
                      ))}
                      <Form.Item className="forPAd ">
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Add Multiple Emails
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </div>

              <div className="col-sm-4 forFifty">
                <Form.Item
                  name="customer_phone_title"
                  label="Mobile No Title"
                  // rules={[
                  //   { required: true, message: "Please input your mobile!" },
                  // ]}
                >
                  <Input placeholder="Mobile # (primary) Title" />
                </Form.Item>
              </div>

              <div className="col-sm-4 forFifty">
                <Form.Item
                  name="mobile_no_primary"
                  label="Mobile No"
                  // rules={[
                  //   { required: true, message: "Please input your mobile!" },
                  // ]}
                  initialValue={formData?.mobile_no_primary}
                >
                  <Input placeholder="Mobile # (primary)" type="number" />
                </Form.Item>
              </div>
              <div className="col-sm-2 forFifty">
                <Form.Item name="billing_phone">
                  <Checkbox
                    name="billing_phone"
                    checked={isBillingPhone}
                    onChange={handleBillingPhoneCheckboxChange}
                  >
                    billing notification
                  </Checkbox>
                </Form.Item>
              </div>
              <div className="col-sm-2 forFifty">
                <Form.Item name="service_notification_phone">
                  <Checkbox
                    name="service_notification_phone"
                    checked={isServiceNotificationPhone}
                    onChange={handlePhoneServiceCheckboxChange}
                  >
                    service notification
                  </Checkbox>
                </Form.Item>
              </div>

              <div className="col-sm-12 noPad">
                {PhoneData?.map((item, key1) => {
                  return (
                    <span className="row display-flex-1" key={key1}>
                      <div className="col-sm-3">
                        <Form.Item
                          name={`title ${key1 + 1}`}
                          label={`Title ${key1 + 1}`}
                          initialValue={item?.title}
                        >
                          <Input
                            type="text"
                            placeholder={`title`}
                            onChange={(e) =>
                              handleInputPhoneChange(
                                key1,
                                "title",
                                e.target.checked
                              )
                            }
                          />
                        </Form.Item>
                      </div>
                      <div className="col-sm-3">
                        <Form.Item
                          name={`Phone ${key1 + 1}`}
                          label={`Phone ${key1 + 1}`}
                          initialValue={item?.Phone}
                        >
                          <Input
                            type="phone"
                            placeholder={`Phone`}
                            onChange={(e) =>
                              handleInputPhoneChange(
                                key1,
                                "Phone",
                                e.target.checked
                              )
                            }
                          />
                        </Form.Item>
                      </div>

                      <div className="col-sm-2">
                        <Form.Item
                          name={`billing_notification ${key1 + 1}`}
                          valuePropName="checked" // Ensure valuePropName is set to "checked"
                          normalize={(value) => value || false}
                        >
                          <Checkbox
                            defaultChecked={item.billing_notification}
                            onChange={(e) =>
                              handleInputPhoneChange(
                                key1,
                                "billing_notification",
                                e.target.checked
                              )
                            }
                          >
                            Billing Notification
                          </Checkbox>
                        </Form.Item>
                      </div>
                      <div className="col-sm-2">
                        <Form.Item
                          name={`service_notification ${key1 + 1}`}
                          valuePropName="checked"
                          normalize={(value) => value || false}
                        >
                          <Checkbox
                            onChange={(e) =>
                              handleInputPhoneChange(
                                key1,
                                "service_notification",
                                e.target.checked
                              )
                            }
                            defaultChecked={item.service_notification}
                          >
                            Service Notification
                          </Checkbox>
                        </Form.Item>
                      </div>

                      <div className="col-sm-1">
                        {" "}
                        <MinusCircleOutlined
                          onClick={() => HandlePhone(key1)}
                        />
                      </div>
                    </span>
                  );
                })}
                <Form.List
                  name="PhoneData"
                  initialValue={[]}
                  rules={[
                    {
                      validator: async (_, phone) => {
                        if (phone.length > 5) {
                          throw new Error(
                            "You can add a maximum of 5 Mobile No"
                          );
                        }
                      },
                    },
                  ]}
                >
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, fieldKey, ...restField }) => (
                        <span
                          className="row cslocation"
                          key={key}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            position: "relative",
                          }}
                        >
                          <div className="col-sm-4">
                            <Form.Item
                              {...restField}
                              name={[name, "title"]}
                              fieldKey={[fieldKey, "title"]}
                            >
                              <Input type="text" placeholder={`Title`} />
                            </Form.Item>
                          </div>
                          <div className="col-sm-4">
                            <Form.Item
                              {...restField}
                              name={[name, "Phone"]}
                              fieldKey={[fieldKey, "Phone"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Missing Phone",
                                },
                              ]}
                            >
                              <Input placeholder="Mobile #" type="number" />
                            </Form.Item>
                          </div>
                          <div className="col-sm-2">
                            <Form.Item
                              {...restField}
                              name={[name, "billing_notification"]}
                              fieldKey={[fieldKey, "billing_notification"]}
                              valuePropName="checked" // Ensure valuePropName is set to "checked"
                              normalize={(value) => value || false}
                            >
                              <Checkbox>Billing Notification</Checkbox>
                            </Form.Item>
                          </div>
                          <div className="col-sm-2">
                            <Form.Item
                              {...restField}
                              name={[name, "service_notification"]}
                              fieldKey={[fieldKey, "service_notification"]}
                              valuePropName="checked"
                              normalize={(value) => value || false}
                            >
                              <Checkbox>Service Notification</Checkbox>
                            </Form.Item>
                          </div>
                          <div
                            style={{
                              position: "absolute",
                              left: "calc(100% - 30px)",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <MinusCircleOutlined
                              onClick={() => remove(name)}
                              style={{
                                backgroundColor: "red",
                                fontSize: "20px",
                                color: "#fff",
                                borderRadius: "50%",
                              }}
                            />
                          </div>
                        </span>
                      ))}
                      <Form.Item className="forPAd ">
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                          // disabled={fields.length >= 5}
                        >
                          Add Multiple Mobile No
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </div>

              <div className="col-sm-6">
                <Form.Item
                  name="zipcode"
                  label="Zip Code"
                  rules={[
                    { required: true, message: "Please input your zipcode!" },
                  ]}
                  initialValue={formData?.zipcode}
                >
                  <Input placeholder="Zip-Code" type="number" />
                </Form.Item>
              </div>

              {formData?.customer_type_id === "commerical" ? (
                <>
                  <div className="col-sm-6">
                    <Form.Item
                      name="company_name"
                      label="Company Name"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Please input your Company Name!",
                      //   },
                      // ]}
                      initialValue={formData?.company_name}
                    >
                      <Input placeholder="Company Name" />
                    </Form.Item>
                  </div>

                  <div className="col-sm-6">
                    <Form.Item
                      label="Company Code"
                      name="company_address"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Please input your Company Code!",
                      //   },
                      // ]}
                      initialValue={formData?.company_address}
                    >
                      <Input placeholder="Company Code" />
                    </Form.Item>
                  </div>
                </>
              ) : (
                <></>
              )}

              <div className="col-sm-6">
                <Form.Item name="billing_details" label="Billing Details">
                  <Input placeholder="Billing Details" />
                </Form.Item>
              </div>

              {/* <div className="col-sm-6">
                <Form.Item
                  name="billing_address"
                  label="Billing Address"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please input your Billing Address!",
                  //   },
                  // ]}
                >
                  <Input placeholder="Billing Address" />
                </Form.Item>
              </div> */}

              <div className="col-sm-4 addCustomTags forFifty ">
                <Form.Item name="tags" label="Tags">
                  <Select
                    mode="tags"
                    style={{
                      width: "100%",
                    }}
                    placeholder="Tags Mode"
                    defaultValue={resultArray}
                    // onChange={handleChangeTags}
                    value={options}
                  >
                    {customertags?.data?.map((item) => {
                      return <Option value={item._id}>{item.name}</Option>;
                    })}
                  </Select>
                </Form.Item>
              </div>
              <div className="col-sm-4 addCustomTags forFifty ">
                <Form.Item name="SourceId" label="Client Source">
                  <Select
                    mode="tags"
                    style={{
                      width: "100%",
                    }}
                    placeholder="Client Source"
                    defaultValue={clientSourceData}
                    // onChange={handleChangeTags}
                    value={sourceoptions}
                  >
                    {clientSource?.data?.map((item) => {
                      return <Option value={item._id}>{item.name}</Option>;
                    })}
                  </Select>
                </Form.Item>
              </div>

              {/* <div className="col-sm-4">
              <Form.Item
                name="serviceType"
                label="Billing Type"
                
              >
                <Select
                  placeholder="Billing Type"
                >
                  {serviceType?.map((item, i) => {
                    return <Option value={item?.value}>{item?.label}</Option>;
                  })}
                </Select>
              </Form.Item>
            </div> */}
              <div className="col-sm-4 forFifty ">
                <Form.Item name="billingCycle" label="Billing Cycle">
                  <Select placeholder="billing Cycle">
                    {billingCycle?.map((item, i) => {
                      return <Option value={item?.value}>{item?.label}</Option>;
                    })}
                  </Select>
                </Form.Item>
              </div>

              <div className="col-sm-12 savebtn">
                <Form.Item>
                  <Button
                    className="bluebtn viewServiceLocation"
                    type="secondary"
                    onClick={() => UpdateServiceLocationNavigation()}
                    disabled={false}
                  >
                    {" "}
                    View ServiceLocation
                  </Button>
                  {!isFieldsDisabled?.isFieldsDisabled ? (
                    <Button
                      className="yellowbtn updateCustomer"
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                    >
                      {" "}
                      Update Customer
                    </Button>
                  ) : (
                    <></>
                  )}
                </Form.Item>
                <Form.Item></Form.Item>
              </div>
            </div>
          </Form>
        )}
      </div>
    </Fragment>
  );
}
