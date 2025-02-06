import React from "react";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Checkbox, Form, Input, Select, Tooltip, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

import Switch from "antd/lib/switch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  postCustomerData,
  resetData,
} from "../../redux/postReducer/postCustomer";
import { fetchgetCustomerType } from "../../redux/Slices/getCustomerType";
import { fetchgetCustomerCity } from "../../redux/Slices/getCustomerCity";
import { fetchgetCustomerCountry } from "../../redux/Slices/getCustomerCountry";
import { fetchtag } from "../../redux/Slices/getTags";
import ProfileDetail, {
  fetchprofileDetail,
} from "../../redux/Slices/ProfileDetail";
import { useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { InfoCircleOutlined } from "@ant-design/icons";

import { fetchClientSource } from "../../redux/Slices/getClientSource";
import { fetchgetCustomerState } from "../../redux/Slices/getCustomerState";
const { Item } = Form;

export default function AddCustomerForm() {
  const { Option } = Select;
  const [form] = Form.useForm();
  const navigate = useNavigate(); // Initialize useHistory
  const dispatch = useDispatch();

  const { data, loading, success, error } = useSelector(
    (state) => state.postsCustomer
  );
  const postDataResult = useSelector((state) => state.postsCustomer);
  const customertype = useSelector((state) => state.getCustomerType);
  const customercity = useSelector((state) => state.getCustomerCity);
  const customercountry = useSelector((state) => state.getCustomerCountry);
  const customertags = useSelector((state) => state.tag);
  const userProfile = useSelector((state) => state.profileDetail);
  const clientSource = useSelector((state) => state.clientSource);
  const customerstate = useSelector((state) => state.getCustomerState);

  const [options, setOptions] = useState(customertags?.data); // Use state to manage options
  const [isCommercial, setIsCommercial] = useState(false);
  const [sourceoptions, setSourceOptions] = useState(clientSource?.data);
  const [isSameAddress, setIsSameAddress] = useState(true);
  const [sameLocation, setsameLocation] = useState(true);
  const [isBillingEmail, setIsBillingEmail] = useState(true);
  const [isServiceNotification, setIsServiceNotification] = useState(true);

  const [isBillingPhone, setIsBillingPhone] = useState(true);
  const [isServiceNotificationPhone, setIsServiceNotificationPhone] =
    useState(true);

  const [additionalEmail, setAdditionalEmail] = useState([]);
  const [additionalMobileNo, setAdditionalMobileNo] = useState([]);
  const [countryid, setcountryid] = useState("");
  const [State, setState] = useState();
  const [stateid, setstateid] = useState("");

  useEffect(() => {
    setcountryid(userProfile?.data?.data?.CountryId);
  }, [userProfile]);

  const removeMobileNo = (fieldId) => {
    setAdditionalMobileNo(
      additionalMobileNo.filter((field) => field.id !== fieldId)
    );
  };

  const [address, setAddress] = useState("");
  const [billing_address, setbillingAddress] = useState("");

  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const handleChangeTags = (value) => {
    setOptions(value);
  };
  const handleCustomerTypeChange = (value, option) => {
    if (option.children !== "residential") {
      setIsCommercial(true);
    } else {
      setIsCommercial(false);
    }
  };

  const handleChangeSource = (value) => {
    setSourceOptions(value);
  };

  const handleChange = (id) => {
    setstateid(id);
    dispatch(fetchgetCustomerCity({ id, name: "" }));
  };

  const handleChangeCity = (id) => {
    setState(id);
    dispatch(fetchgetCustomerState({ id }));
  };

  const onFinish = (values) => {
    console.log(values);

    if (!values._id) {
      // values.customer_type_id = customertype?.data[1]?._id;
      values.address = address;
      values.billing_address = billing_address;
      values.same_location = sameLocation;
      values.billing_email = isBillingEmail;
      values.service_notification = isServiceNotification;
      values.billing_phone = isBillingPhone;
      values.service_notification_phone = isServiceNotificationPhone;
      values.customer_email_title = values.customer_email_title
        ? values.customer_email_title
        : values.first_name;
      values.customer_phone_title = values.customer_phone_title
        ? values.customer_phone_title
        : values.first_name;
    }
    if (!values?.customer_type_id) {
      values.customer_type_id = customertype?.data[1]?._id;
    }

    const formData = values?.EmailData?.map(
      ({ title, Email, billing_email, service_notification }) => ({
        title,
        Email,
        billing_email: billing_email || false,
        service_notification: service_notification || false,
      })
    );

    const phoneValues = values?.PhoneData?.map(
      ({ title, Phone, billing_notification, service_notification }) => ({
        title,
        Phone,
        billing_notification: billing_notification || false,
        service_notification: service_notification || false,
      })
    );

    values.EmailData = formData;
    values.PhoneData = phoneValues;

    dispatch(postCustomerData({ values }));
  };

  // Handle successful form submission
  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetData());
      navigate(`/customer-servicelocation/${postDataResult?.data?.data?._id}`);
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, success]);

  const name = "";

  useEffect(() => {
    let id = countryid;
    if (id) {
      dispatch(fetchgetCustomerState({ id }));
    }
  }, [dispatch, countryid, stateid]);

  useEffect(() => {
    dispatch(fetchgetCustomerType());
    dispatch(fetchprofileDetail());
    dispatch(fetchgetCustomerCountry());
    dispatch(fetchtag());
    dispatch(fetchClientSource());
    setOptions(customertags?.data);
  }, [dispatch]);

  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!");
  };

  const onSearch = (name) => {
    dispatch(fetchgetCustomerCity({ name: name ? name : "", id: stateid }));
  };

  const handleCheckboxChange = (e) => {
    if (e.target.checked === true) {
      setIsSameAddress(true);
    } else {
      setIsSameAddress(false);
    }
  };

  const handleCheckboxLocation = (e) => {
    if (e.target.checked === true) {
      setsameLocation(true);
    } else {
      setsameLocation(false);
    }
  };

  const handleBillingCheckboxChange = (e) => {
    if (e.target.checked === true) {
      setIsBillingEmail(true);
    } else {
      setIsBillingEmail(false);
    }
  };
  const handleBillingPhoneCheckboxChange = (e) => {
    if (e.target.checked === true) {
      setIsBillingPhone(true);
    } else {
      setIsBillingPhone(false);
    }
  };
  const handleServiceCheckboxChange = (e) => {
    if (e.target.checked === true) {
      setIsServiceNotification(true);
    } else {
      setIsServiceNotification(false);
    }
  };
  const handlePhoneServiceCheckboxChange = (e) => {
    if (e.target.checked === true) {
      setIsServiceNotificationPhone(true);
    } else {
      setIsServiceNotificationPhone(false);
    }
  };

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

  const handleSelect = async (selectedAddress) => {
    console.log(selectedAddress);
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      setAddress(selectedAddress);
    } catch (error) {
      console.error("Error fetching coordinates", error);
    }
  };

  const handleFirstNameChange = (e) => {
    // const firstName = e.target.value;
    // form.setFieldsValue({
    //   first_name: firstName,
    //   customer_email_title: firstName,
    //   customer_phone_title:firstName
    // });
  };
  return (
    <Fragment>
      <div className="row fomik customer cslocation">
        <Form
          name="Customer"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="row addPoolROw">
            <div className="col-sm-2 forFifty customertype customertypesssss">
              <Form.Item name="customer_type_id" label="Customer Type">
                <Select
                  placeholder="Customer Type"
                  defaultValue={customertype?.data[1]?._id || "residential"}
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
            <div className="col-sm-2 forFifty switchbtn prospect">
              <div className="inside">
                <span>Status</span>
              </div>
              <Form.Item
                name="status"
                label="Inactive Active"
                valuePropName="checked"
                className="prospectusss"
                initialValue={true}
              >
                <Switch />
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
            <div className="col-sm-6 forFifty customerNameeeee">
              <Form.Item
                name="first_name"
                label="First Name"
                rules={[
                  { required: true, message: "Please input your firstname!" },
                ]}
              >
                <Input
                  placeholder="First Name"
                  onChange={handleFirstNameChange}
                />
              </Form.Item>
            </div>

            <div className="col-sm-6 forFifty customerNameeeee">
              <Form.Item
                name="last_name"
                label="Last Name"
                rules={[
                  { required: true, message: "Please input your Lastname!" },
                ]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </div>

            <div className="col-sm-3 forFifty">
              <Form.Item
                label="Address"
                name="Address"
                rules={[{ required: true, message: "Address is Required" }]}
              >
                <PlacesAutocomplete
                  value={address}
                  onChange={setAddress}
                  onSelect={handleSelect}
                >
                  {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                    <div>
                      <Input
                        {...getInputProps({
                          placeholder: "Enter Address",
                        })}
                        value={address} // Ensure the value is set to address state
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

            <div className="col-sm-3 forFifty">
              <Form.Item
                label="State"
                name={[name, "state_id"]}
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
                      return <Option value={item._id}>{item.name}</Option>;
                    })}
                </Select>
              </Form.Item>
            </div>

            <div className="col-sm-3 forFifty">
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
                >
                  {customercity?.data?.map((item, i) => {
                    return <Option value={item?._id}>{item?.name}</Option>;
                  })}
                </Select>
              </Form.Item>
            </div>

            <div className="col-sm-3 forFifty">
              <Form.Item
                label="Zip Code"
                name="zipcode"
                rules={[
                  { required: true, message: "Please input your zipcode!" },
                ]}
              >
                <Input placeholder="Zip-Code" type="number" />
              </Form.Item>
            </div>
            <div className="row additionalDetailsss">
              <div className="col-sm-4 forFifty">
                <Form.Item
                  name="customer_email_title"
                  label="Contact"
                  // rules={[
                  //   { required: true, message: "Please Email Contact!" },
                  // ]}
                >
                  <Input placeholder="E-mail Title" value={"."} />
                </Form.Item>
              </div>
              <div className="col-sm-4 forFifty">
                <Form.Item
                  name="email"
                  label={
                    <span>
                      Email&nbsp;
                      <Tooltip title="Kindly enter a valid email because the customer will receive important announcements via email.">
                        <InfoCircleOutlined />
                      </Tooltip>
                    </span>
                  }
                  rules={[
                    {
                      type: "email",
                      message: "Email is not valid",
                    },
                    {
                      required: true,
                      message: "Please enter Email",
                    },
                  ]}
                >
                  <Input placeholder="E-mail" />
                </Form.Item>
              </div>

              <div className="col-sm-2 forFifty">
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
              <div className="col-sm-2 forFifty">
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
            </div>

            <div className="col-sm-12 noPad">
              <Form.List
                name="EmailData"
                initialValue={[]}
                rules={[
                  {
                    validator: async (_, emails) => {
                      if (emails.length > 5) {
                        throw new Error("You can add a maximum of 5 emails");
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
                        <div className="col-sm-4 forFifty">
                          <Form.Item
                            {...restField}
                            name={[name, "title"]}
                            fieldKey={[fieldKey, "title"]}
                            rules={[
                              {
                                required: true,
                                message: "Missing title",
                              },
                            ]}
                          >
                            <Input type="text" placeholder={`Title`} />
                          </Form.Item>
                        </div>
                        <div className="col-sm-4 forFifty">
                          <Form.Item
                            {...restField}
                            name={[name, "Email"]}
                            fieldKey={[fieldKey, "Email"]}
                            rules={[
                              {
                                required: true,
                                message: "Missing Email",
                              },
                            ]}
                          >
                            <Input type="email" placeholder={`Emails`} />
                          </Form.Item>
                        </div>
                        <div className="col-sm-2 newwwss">
                          <Form.Item
                            {...restField}
                            name={[name, "billing_email"]}
                            fieldKey={[fieldKey, "billing_email"]}
                            valuePropName="checked" // Ensure valuePropName is set to "checked"
                            normalize={(value) => value || false}
                          >
                            <Checkbox>Billing Email</Checkbox>
                          </Form.Item>
                        </div>
                        <div className="col-sm-2 newwwss">
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
                    <Form.Item className="forPAd">
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                        disabled={fields.length >= 5}
                      >
                        Add Multiple Emails
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>

            <div className="row additionalDetailsssOne">
              <div className="col-sm-4 forFifty">
                <Form.Item
                  label="Contact"
                  name="customer_phone_title"
                  // rules={[
                  //   { required: true, message: "Mobile Number is Required" },
                  // ]}
                  defaultValue={"contact"}
                >
                  <Input placeholder="Mobile Number Title" />
                </Form.Item>
              </div>

              <div className="col-sm-4 forFifty">
                <Form.Item
                  label="Mobile No"
                  name="mobile_no_primary"
                  rules={[
                    { required: true, message: "Mobile Number is Required" },
                  ]}
                >
                  <Input placeholder="Mobile Number" type="number" />
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

              {additionalMobileNo.map((field, index) => (
                <>
                  <div key={field.id} className="col-sm-5">
                    <Form.Item
                      name="mobile_no_secondary"
                      label="Mobile No Secondary"
                      // rules={[
                      //   { required: true, message: "Please input your mobile!" },
                      // ]}
                    >
                      <Input placeholder="Mobile # (secondary)" type="number" />
                    </Form.Item>
                  </div>
                  <Tooltip
                    title="Remove Additional Email"
                    color="#1a4a5b"
                    onClick={() => removeMobileNo(field.id)}
                  >
                    <span className="formIconOne">
                      <MinusOutlined />
                    </span>
                  </Tooltip>
                </>
              ))}
            </div>

            <div className="col-sm-12 noPad">
              <Form.List
                name="PhoneData"
                initialValue={[]}
                rules={[
                  {
                    validator: async (_, phone) => {
                      if (phone.length > 5) {
                        throw new Error("You can add a maximum of 5 Mobile No");
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
                        <div className="col-sm-4 forFifty">
                          <Form.Item
                            {...restField}
                            name={[name, "title"]}
                            fieldKey={[fieldKey, "title"]}
                            rules={[
                              {
                                required: true,
                                message: "Missing title",
                              },
                            ]}
                          >
                            <Input type="text" placeholder="Title" />
                          </Form.Item>
                        </div>
                        <div className="col-sm-4 forFifty">
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
                        <div className="col-sm-2 newwwss">
                          <Form.Item
                            {...restField}
                            name={[name, "billing_notification"]}
                            fieldKey={[fieldKey, "billing_notification"]}
                            valuePropName="checked"
                            normalize={(value) => value || false}
                          >
                            <Checkbox>Billing Notification</Checkbox>
                          </Form.Item>
                        </div>
                        <div className="col-sm-2 newwwss">
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
                    <Form.Item className="forPAd">
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                        disabled={fields.length >= 5}
                      >
                        Add Multiple Mobile No
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>

            {/* <div className="col-sm-4">
              <Form.Item name="country_id" label="Country">
                <Select
                  placeholder="Country"
                  onChange={handleChangeCity}
                  showSearch
                  // disabled
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
              <Form.Item name="billing_details" label="Billing Details">
                <Input placeholder="Billing Details" />
              </Form.Item>
            </div>

            {!isSameAddress && (
              <div className="col-sm-4 forFifty ">
                <Form.Item
                  name="billing_address"
                  label="Billing Address"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Billing Address!",
                    },
                  ]}
                >
                  <PlacesAutocomplete
                    value={billing_address}
                    onChange={setbillingAddress}
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
                            placeholder: "Enter billing Address",
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
            )}

            <div className="col-sm-4 forFifty  addCustomTags">
              <Form.Item name="TagsId" label="Tags">
                <Select
                  mode="tags"
                  style={{
                    width: "100%",
                  }}
                  placeholder="Tags Mode"
                  onChange={handleChangeTags}
                  value={options}
                >
                  {customertags?.data?.map((item) => {
                    return <Option value={item._id}>{item.name}</Option>;
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className="col-sm-4 forFifty  addCustomTags">
              <Form.Item name="SourceId" label="Client Source">
                <Select
                  mode="tags"
                  style={{
                    width: "100%",
                  }}
                  placeholder="Client Source"
                  onChange={handleChangeSource}
                  value={sourceoptions}
                >
                  {clientSource?.data?.map((item) => {
                    return <Option value={item._id}>{item.name}</Option>;
                  })}
                </Select>
              </Form.Item>
            </div>

            <div className="col-sm-4 forFifty ">
              <Form.Item name="billingCycle" label="Billing Cycle">
                <Select placeholder="billing Cycle">
                  {billingCycle?.map((item, i) => {
                    return <Option value={item?.value}>{item?.label}</Option>;
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className="col-sm-3 forFifty">
              <Form.Item name="">
                <Checkbox
                  name="Billing_Address"
                  checked={isSameAddress}
                  onChange={handleCheckboxChange}
                >
                  Billing address is same as a service address?
                </Checkbox>
              </Form.Item>
            </div>

            <div className="col-sm-3 forFifty">
              <Form.Item name="samelocation">
                <Checkbox
                  name="samelocation"
                  checked={sameLocation}
                  onChange={handleCheckboxLocation}
                  initialValue={true}
                >
                  Service Location Same Address
                </Checkbox>
              </Form.Item>
            </div>
            <div className="col-sm-12 savebtn">
              <Form.Item>
                <Button
                  className="yellowbtn addCustomerSaveBtn"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disable={loading}
                >
                  {" "}
                  Save Customer
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </Fragment>
  );
}
