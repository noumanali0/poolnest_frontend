import React, { useRef, useState, Fragment, useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { LoadScript } from "@react-google-maps/api";
import { Button, Form, Input, Space, Select, Checkbox, Tooltip } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import Switch from "antd/lib/switch";
import Accordion from "react-bootstrap/Accordion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import {
  postServiceLocationData,
  resetData,
} from "../../redux/postReducer/postServiceLocation";
import { toast } from "react-toastify";
import {
  fetchgetAllCityByCountry,
  fetchgetCustomerCity,
} from "../../redux/Slices/getCustomerCity";
import { fetchgetCustomerCountry } from "../../redux/Slices/getCustomerCountry";
import { fetchSalesTaxGroupName } from "../../redux/Slices/getSaleGroupName";
import { fetchgetSingleCustomers } from "../../redux/Slices/getSingleCustomer";
import { fetchgetCustomerState } from "../../redux/Slices/getCustomerState";
import { Modal } from "react-bootstrap";
import TaxGroupForm from "../TaxGroup/TaxGroupForm";

const { Option } = Select;
const { Item } = Form;

const CustomerServiceLocation = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate(); // Initialize useHistory
  const { pathname } = useLocation();
  const format = "HH:mm";

  const userProfile = useSelector((state) => state.profileDetail);

  const { data, loading, success, error } = useSelector(
    (state) => state.postServiceLocation
  );

  const postDataResult = useSelector((state) => state.postServiceLocation);
  const GetSaleGroup = useSelector((state) => state.SalesTaxGroupName);
  const customercity = useSelector((state) => state.getCustomerCity);
  const customercountry = useSelector((state) => state.getCustomerCountry);
  const [isHasDog, setIsHasDog] = useState(false);
  const [countryid, setcountryid] = useState("");
  const customerstate = useSelector((state) => state.getCustomerState);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { data: getSingleCustomer, status } = useSelector(
    (state) => state.getSingleCustomer
  );
  const [formData, setFormData] = useState();
  const [formData2, setFormData2] = useState();

  useEffect(() => {
    if (getSingleCustomer?.same_location) {
      setFormData({
        address: getSingleCustomer?.address,
        billing_details: getSingleCustomer?.billing_details || "",
        company_address: getSingleCustomer?.company_address || "",
        company_name: getSingleCustomer?.company_name || "",
        customer_type_id: getSingleCustomer?.customertypename,
        customer_type: getSingleCustomer?.customertypename,
        email: getSingleCustomer?.email || "",
        service_phone_title: getSingleCustomer?.customer_phone_title,
        service_email_title: getSingleCustomer?.customer_email_title,
        mobile_no_primary: getSingleCustomer?.mobile_no_primary || "",
        mobile_no_secondary: getSingleCustomer?.mobile_no_secondary || "",
        city_id_data: getSingleCustomer?.city_id || "",
        state_id: getSingleCustomer?.statename || "",
        city_id: getSingleCustomer?.cityname || "",
        country_id: getSingleCustomer?.countryname || "",
        same_location: getSingleCustomer?.same_location || "",
        status: getSingleCustomer?.status || "",
        billing_address: getSingleCustomer?.billing_address || "",
        zipcode: getSingleCustomer?.zipcode,
        updatedAt: getSingleCustomer?.updatedAt || "",
        EmailData: getSingleCustomer?.CustomerEmailsData,
        PhoneData: getSingleCustomer?.CustomerPhoneData,
      });
    } else {
      setFormData({
        address: "",
        billing_details: "",
        company_address: "",
        company_name: "",
        customer_type_id: "",
        customer_type: "",
        email: "",
        first_name: "",
        last_name: "",
        mobile_no_primary: "",
        mobile_no_secondary: "",
        state_id: "",
        city_id: "",
        country_id: "",
        same_location: "",
        status: "",
        billing_address: "",
        zipcode: "",
        updatedAt: "",
      });
    }
  }, [getSingleCustomer]);

  const [City, setCity] = useState(getSingleCustomer?.city_id);
  const [State, setState] = useState(getSingleCustomer?.city_id);

  useEffect(() => {
    setCity(getSingleCustomer?.city_id);
    setAddress(getSingleCustomer?.address);
  }, [getSingleCustomer]);

  useEffect(() => {
    setcountryid(userProfile?.data?.data?.CountryId);
  }, [userProfile]);

  const parts = pathname.split("/"); // Split the URL by slashes
  const id = parts[2];

  useEffect(() => {
    dispatch(fetchgetSingleCustomers({ id }));
  }, [dispatch, id]);

  const onSearch = (name) => {
    dispatch(fetchgetAllCityByCountry({ countryid, name }));
  };

  const name = "";

  useEffect(() => {
    let id = countryid;
    dispatch(fetchgetAllCityByCountry({ countryid, name }));
    dispatch(fetchgetCustomerState({ id }));
  }, [dispatch, countryid]);

  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const handleSelect = async (selectedAddress) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      console.log(latLng, "latLng");
      setAddress(selectedAddress);
      setCoordinates(latLng);
    } catch (error) {
      console.error("Error fetching coordinates", error);
    }
  };

  const handleSwitchChange = (fieldName, checked) => {
    // Clear the value of the corresponding TimePicker field if switch is turned off
    if (!checked) {
      form.setFieldsValue({
        [`${fieldName}_Time`]: undefined, // Clear the value
      });
    }

    // Set the switch value
    form.setFieldsValue({
      [fieldName]: checked,
    });
  };

  const onFinish = (values) => {
    let locationData1 = values;
    const locationData = {
      name: locationData1?.name,
      customer_id: id,
      country_id: locationData1?.country_id,
      state_id: locationData1?.state_id,
      service_email_title: locationData1?.service_email_title,
      service_phone_title: locationData1?.service_phone_title,
      city_id: City,
      zipcode: locationData1?.zipcode,
      email: locationData1?.email,
      mobile_no_primary: locationData1?.mobile_no_primary,
      PhoneData: values?.PhoneData,
      EmailData: values?.EmailData,
      longitude: coordinates?.lng?.toString(),
      latitude: coordinates?.lat?.toString(),
      address: address ? address : values?.address,
      gate_code: locationData1?.gate_code,
      sales_tax_group: locationData1?.sales_tax_group,
      notes: locationData1?.notes,
      notify_sms: locationData1?.notify_sms,
      notify_work_completion_sms: locationData1?.notify_work_completion_sms,
      dog_name: locationData1?.dog_name,
      mobile_no_secondary: locationData1?.mobile_no_secondary,
      notify_work_completion_email: locationData1?.notify_work_completion_email,
      notify_email: locationData1?.notify_email,
      notify_email_Time: locationData1.notify_email_Time,
      notify_sms_Time: locationData1.notify_sms_Time,
      notify_work_completion_sms_Time:
        locationData1.notify_work_completion_sms_Time,
      notify_work_completion_email_Time:
        locationData1.notify_work_completion_email_Time,
    };

    dispatch(postServiceLocationData({ locationData }));
  };

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetData());
      const serviceid = postDataResult.data.data._id;
      dispatch(resetData());
      navigate(`/customer-addpools/${id}/${serviceid}`);
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, success]);
  useEffect(() => {
    dispatch(fetchgetCustomerCountry());
    dispatch(fetchSalesTaxGroupName());
  }, [dispatch]);

  // const handleChangeCity = (countryid) => {
  //   setcountryid(countryid);
  //   const value = "";
  //   dispatch(fetchgetAllCityByCountry({ countryid, value }));
  // };

  const handleChange = (id) => {
    dispatch(fetchgetCustomerCity({ id }));
  };

  const handleChangeCity = (id) => {
    setState(id);
    dispatch(fetchgetCustomerState({ id }));
  };
  const handleCheckboxChange = (e) => {
    if (e.target.checked === true) {
      setIsHasDog(true);
    } else {
      setIsHasDog(false);
    }
  };

  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  form.setFieldsValue({
    address: formData?.address,
    billing_details: formData?.billing_details || "",
    country_id: formData?.country_id || "",
    city_id: formData?.city_id,
    city_id_data: formData?.city_id_data || "",
    company_address: formData?.company_address || "",
    company_name: formData?.company_name || "",
    customer_type_id: formData?.customer_type_id,
    email: formData?.email || "",
    service_phone_title: formData?.service_phone_title || "",
    service_email_title: formData?.service_email_title || "",
    first_name: formData?.first_name,
    last_name: formData?.last_name || "",
    mobile_no_primary: formData?.mobile_no_primary || "",
    mobile_no_secondary: formData?.mobile_no_secondary || "",
    state_id: formData?.state_id || "",
    status: formData?.status || "",
    billing_address: formData?.billing_address || "",
    zipcode: formData?.zipcode,
    same_location: formData?.same_location,
    updatedAt: formData?.updatedAt || "",
    EmailData: formData?.EmailData || "",
    PhoneData: formData?.PhoneData || "",
  });

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const results = await geocodeByAddress(address);
        if (results && results.length > 0) {
          const latLng = await getLatLng(results[0]);
          setCoordinates(latLng);
        } else {
          // Handle case where no results are found
          console.error("No results found for the address:", address);
        }
      } catch (error) {
        // Handle any errors that occur during geocoding
        console.error("Error geocoding address:", error);
      }
    };

    fetchCoordinates();
  }, [address]);

  const NotificationTime = [
    {
      id: 1,
      label: "10 minutes",
      value: 0.166,
    },
    {
      id: 2,
      label: "15 minutes",
      value: 0.25,
    },
    {
      id: 3,
      label: "30 minutes",
      value: 0.5,
    },
    {
      id: 4,
      label: "1 hour",
      value: 1,
    },
    {
      id: 5,
      label: "2 hours",
      value: 2,
    },
  ];

  return (
    <Fragment>
      <div className="row fomik custServLocagtion">
        <Form
          name="dynamic_form_nest_item"
          form={form}
          onFinish={onFinish}
          onValuesChange={handleFormValuesChange}
          autoComplete="off"
          initialValues={
            getSingleCustomer?.same_location ? formData : formData2
          }
        >
          <>
            <div className="col-sm-12 margin-top-css">
              <div className="row">
                <div className="col-sm-6">
                  <h2>
                    Service Location (
                    {getSingleCustomer?.first_name +
                      " " +
                      getSingleCustomer?.last_name}
                    )
                  </h2>
                </div>
                <div className="col-sm-6 addbuttons"></div>
              </div>
            </div>

            <Accordion flush>
              <Accordion.Item>
                <Accordion.Header>
                  <span>Location {1}</span>
                </Accordion.Header>
                <Accordion.Body>
                  <Space
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <div className="row cslocation">
                      <div className="col-sm-12">
                        <Form.Item
                          name="name"
                          label="Location Name"
                          rules={[
                            {
                              required: true,
                              message: "Missing Location name",
                            },
                          ]}
                        >
                          <Input placeholder="Location Name" />
                        </Form.Item>
                      </div>

                      {/* <div className="col-sm-4">
                        <Form.Item name="country_id" label="Country">
                          <Select
                            placeholder="Country"
                            onChange={handleChangeCity}
                            showSearch
                            // disabled
                            filterOption={filterOption}
                            // defaultValue={"United States"}
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
                      <div className="col-sm-3">
                        <Form.Item
                          label="Address"
                          name="Address"
                          rules={[
                            { required: false, message: "Address is Required" },
                          ]}
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
                      <div className="col-sm-3">
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

                      <div className="col-sm-3">
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
                              return (
                                <Option value={item?._id}>{item?.name}</Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </div>

                      <div className="col-sm-3">
                        <Form.Item
                          label="Zip Code"
                          name="zipcode"
                          rules={[
                            {
                              required: true,
                              message: "Missing Zip Code for service location",
                            },
                          ]}
                        >
                          <Input placeholder="Zip-Code" type="number" />
                        </Form.Item>
                      </div>

                      <div className="col-sm-6">
                        <Form.Item
                          name="service_email_title"
                          label="Email Title"
                          rules={[
                            {
                              message: "The input is not valid E-mail Title!",
                            },
                          ]}
                        >
                          <Input placeholder="E-mail" />
                        </Form.Item>
                      </div>
                      <div className="col-sm-6">
                        <Form.Item
                          name="email"
                          label="Email"
                          rules={[
                            {
                              type: "email",
                              message: "The input is not valid E-mail!",
                            },
                            {
                              required: true,
                              message: "Email is Invalid",
                            },
                          ]}
                        >
                          <Input placeholder="E-mail" />
                        </Form.Item>
                      </div>
                      <div className="col-sm-12">
                        <Form.List
                          name="EmailData"
                          initialValue={[]}
                          rules={[
                            {
                              validator: async (_, emails) => {
                                if (emails.length > 4) {
                                  throw new Error(
                                    "You can add a maximum of 5 emails"
                                  );
                                }
                              },
                            },
                          ]}
                        >
                          {(fields, { add, remove }) => (
                            <>
                              {fields.map(
                                ({ key, name, fieldKey, ...restField }) => (
                                  <span
                                    className="row display-flex-1"
                                    key={key}
                                  >
                                    <div className="col-sm-5">
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
                                        <Input
                                          type="text"
                                          placeholder={`Title`}
                                        />
                                      </Form.Item>
                                    </div>
                                    <div className="col-sm-6">
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
                                        <Input
                                          type="email"
                                          placeholder={`Emails`}
                                        />
                                      </Form.Item>
                                    </div>
                                    <div className="col-sm-1">
                                      <MinusCircleOutlined
                                        onClick={() => remove(name)}
                                      />
                                    </div>
                                  </span>
                                )
                              )}
                              <Form.Item>
                                <Button
                                  type="dashed"
                                  onClick={() => add()}
                                  block
                                  icon={<PlusOutlined />}
                                  disabled={fields.length >= 4}
                                >
                                  Add Multiple Emails
                                </Button>
                              </Form.Item>
                            </>
                          )}
                        </Form.List>
                      </div>

                      <div className="col-sm-6">
                        <Form.Item
                          name="service_phone_title"
                          label="Mobile No Primary Title"
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: "Number is Invalid Title",
                          //   },
                          // ]}
                        >
                          <Input placeholder="Mobile # (Primary) Title" />
                        </Form.Item>
                      </div>

                      <div className="col-sm-6">
                        <Form.Item
                          name="mobile_no_primary"
                          label="Mobile No Primary"
                          rules={[
                            {
                              required: true,
                              message: "Number is Invalid",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Mobile # (Primary)"
                            type="number"
                          />
                        </Form.Item>
                      </div>

                      <div className="col-sm-12">
                        <Form.List
                          name="PhoneData"
                          initialValue={[]}
                          rules={[
                            {
                              validator: async (_, phone) => {
                                if (phone.length > 4) {
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
                              {fields.map(
                                ({ key, name, fieldKey, ...restField }) => (
                                  <span
                                    className="row display-flex-1"
                                    key={key}
                                  >
                                    <div className="col-sm-5">
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
                                        <Input
                                          type="text"
                                          placeholder={`Title`}
                                        />
                                      </Form.Item>
                                    </div>
                                    <div className="col-sm-6">
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
                                        <Input
                                          placeholder="Mobile #"
                                          type="number"
                                        />
                                      </Form.Item>
                                    </div>
                                    <div className="col-sm-1">
                                      <MinusCircleOutlined
                                        onClick={() => remove(name)}
                                      />
                                    </div>
                                  </span>
                                )
                              )}
                              <Form.Item>
                                <Button
                                  type="dashed"
                                  onClick={() => add()}
                                  block
                                  icon={<PlusOutlined />}
                                  disabled={fields.length >= 4}
                                >
                                  Add Multiple Mobile No
                                </Button>
                              </Form.Item>
                            </>
                          )}
                        </Form.List>
                      </div>

                      <div className="col-sm-4">
                        <Form.Item
                          name="gate_code"
                          label="Gate Code"
                          // rules={[
                          //   {
                          //     required: true,
                          //     message:
                          //       "Missing Gate Code for service location",
                          //   },
                          // ]}
                        >
                          <Input placeholder="Gate Code" />
                        </Form.Item>
                      </div>

                      <div className="col-sm-2 dogTwo">
                        <Checkbox
                          name="hasDog"
                          // checked={formData.rearrange_routes}
                          onChange={handleCheckboxChange}
                        >
                          Do They Have a Dog?
                        </Checkbox>
                      </div>

                      {isHasDog === true ? (
                        <div className="col-sm-6">
                          <Form.Item
                            name="dog_name"
                            label="Dogs Name "
                            // rules={[
                            //   {
                            //     required: true,
                            //     message: "Dog Name is Required",
                            //   },
                            // ]}
                          >
                            <Input placeholder="Dogs Name " type="text" />
                          </Form.Item>
                        </div>
                      ) : (
                        <></>
                      )}

                      <div className="col-sm-4">
                        <Form.Item
                          name="sales_tax_group"
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
                              return (
                                <Option value={item._id}>{item.name}</Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </div>
                      <div className="col-sm-2">
                        <Button
                          className="bluebtn"
                          type="primary"
                          onClick={handleShow}
                        >
                          Add Group
                        </Button>
                      </div>

                      <div className="col-sm-12">
                        <Form.Item
                          name="notes"
                          label="Notes"
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: "Notes are Invalid",
                          //   },
                          // ]}
                        >
                          <Input placeholder="Notes" type="text" />
                        </Form.Item>
                      </div>

                      <div className="col-sm-12 heads">
                        <h3>Communications</h3>
                      </div>
                      <div className="col-sm-3 com switchbtn">
                        <label>Notify Customer Through SMS on Arrival</label>

                        <Form.Item
                          valuePropName="checked"
                          name="notify_sms"
                          label="Turn On To Notify"
                          dependencies={["notify_sms"]}
                        >
                          <Switch
                            onChange={(checked) =>
                              handleSwitchChange("notify_sms", checked)
                            }
                          />
                        </Form.Item>
                      </div>
                      <div className="col-sm-3 com switchbtn">
                        <label>Notify Customer Through Email on Arrival</label>
                        <Form.Item
                          valuePropName="checked"
                          name="notify_email"
                          label="Turn On To Notify"
                        >
                          <Switch
                            onChange={(checked) =>
                              handleSwitchChange("notify_email", checked)
                            }
                          />
                        </Form.Item>
                      </div>
                      <div className="col-sm-3 com switchbtn">
                        <label>
                          Notify Customer on work compeleted via SMS
                        </label>
                        <Form.Item
                          valuePropName="checked"
                          name="notify_work_completion_sms"
                          label="Turn On To Notify"
                        >
                          <Switch
                            onChange={(checked) =>
                              handleSwitchChange(
                                "notify_work_completion_sms",
                                checked
                              )
                            }
                          />
                        </Form.Item>
                      </div>
                      <div className="col-sm-3 com switchbtn">
                        <label>
                          Notify Customer on work compeleted via Email
                        </label>
                        <Form.Item
                          valuePropName="checked"
                          name="notify_work_completion_email"
                          label="Turn On To Notify"
                        >
                          <Switch
                            onChange={(checked) =>
                              handleSwitchChange(
                                "notify_work_completion_email",
                                checked
                              )
                            }
                          />
                        </Form.Item>
                      </div>

                      <div className="col-sm-3 com">
                        <Form.Item
                          name="notify_sms_Time"
                          label="Notify SMS Time"
                        >
                          <Select
                            placeholder="Notify SMS Time"
                            disabled={!form.getFieldValue("notify_sms")}
                            filterOption={filterOption}
                            options={NotificationTime}
                          ></Select>
                        </Form.Item>
                      </div>
                      <div className="col-sm-3 com">
                        <Form.Item
                          name="notify_email_Time"
                          label="Notify Email Time"
                        >
                          <Select
                            placeholder="Notify Email Time"
                            disabled={!form.getFieldValue("notify_email")}
                            filterOption={filterOption}
                            options={NotificationTime}
                          ></Select>
                        </Form.Item>
                      </div>
                      <div className="col-sm-3 com">
                        <Form.Item
                          name="notify_work_completion_sms_Time"
                          label="Notify Work Completion SMS Time"
                        >
                          <Select
                            placeholder="Notify Work Completion SMS Time"
                            disabled={
                              !form.getFieldValue("notify_work_completion_sms")
                            }
                            filterOption={filterOption}
                            options={NotificationTime}
                          ></Select>
                        </Form.Item>
                      </div>
                      <div className="col-sm-3 com">
                        <Form.Item
                          name="notify_work_completion_email_Time"
                          label="Notify Work Completion Email Time"
                        >
                          <Select
                            placeholder="Notify Work Completion Email Time"
                            disabled={
                              !form.getFieldValue(
                                "notify_work_completion_email"
                              )
                            }
                            filterOption={filterOption}
                            options={NotificationTime}
                          ></Select>
                        </Form.Item>
                      </div>

                      <div className="col-sm-12 buttonsservice">
                        <Form.Item>
                          <Button
                            className="bluebtn"
                            htmlType="submit"
                            type="primary"
                            // onClick={() => onFinish(form.getFieldsValue())}
                            loading={loading}
                            disabled={loading}
                          >
                            Save Location
                          </Button>
                        </Form.Item>
                      </div>
                    </div>
                  </Space>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </>
        </Form>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="taxratemodal taxGrpModal"
      >
        <Modal.Body>
          Add Tax Group
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <TaxGroupForm data={handleClose} />
      </Modal>
    </Fragment>
  );
};

export default CustomerServiceLocation;
