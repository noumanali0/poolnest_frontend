import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Tooltip,
  Space,
  Breadcrumb,
} from "antd";
import { Modal } from "react-bootstrap";

import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import Switch from "antd/lib/switch";
import Accordion from "react-bootstrap/Accordion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
const { Option } = Select;
import axios from "axios";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchgetCustomerServices,
  STATUSES,
} from "../../redux/Slices/getCustomerService";
import {
  updateServiceLocationData,
  resetData,
  deleteServiceLocationData,
} from "../../redux/postReducer/postServiceLocation";
import { useParams } from "react-router-dom";
import { fetchgetCustomerCountry } from "../../redux/Slices/getCustomerCountry";
import {
  fetchgetAllCityByCountry,
  fetchgetCustomerCity,
} from "../../redux/Slices/getCustomerCity";
import { fetchSalesTaxGroupName } from "../../redux/Slices/getSaleGroupName";

import Loader from "../NoDataComponent/Loader";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { LoadScript } from "@react-google-maps/api";
import { fetchgetCustomerState } from "../../redux/Slices/getCustomerState";
import { fetchgetSingleCustomers } from "../../redux/Slices/getSingleCustomer";
import TaxGroupForm from "../TaxGroup/TaxGroupForm";

const { Item } = Form;

const ProfServicelocation = () => {
  const { data: getCustomerService, status } = useSelector(
    (state) => state.getCustomerService
  );

  const { dataupdate, loadingupdate, successupdate, errorupdate } = useSelector(
    (state) => state.postServiceLocation
  );

  const { data, loading, success, error } = useSelector(
    (state) => state.postServiceLocation
  );

  const { id } = useParams();
  const GetSaleGroup = useSelector((state) => state.SalesTaxGroupName);
  const [activeKey, setActiveKey] = useState(0);
  const [showAccordion, setShowAccordion] = useState(true); // assuming initial state is true

  const customercity = useSelector((state) => state.getCustomerCity);
  const customercountry = useSelector((state) => state.getCustomerCountry);
  const customerstate = useSelector((state) => state.getCustomerState);
  const { data: getSingleCustomer } = useSelector(
    (state) => state.getSingleCustomer
  );
  const [Country, setCountry] = useState("");

  const [City, setCity] = useState("");
  const [isFieldsDisabled, setIsFieldsDisabled] = useState(true);
  const [countryid, setcountryid] = useState("");

  const dispatch = useDispatch();
  const [showAccoundion, setshowAccoundion] = useState(false);
  const form = Form.useForm()[0];

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const UpdatePoolLocationNavigation = (id1, key) => {
    const ids = getCustomerService[key]?._id;
    navigate(`/pool/${id}/${ids}`);
  };

  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const handleSelect = async (selectedAddress, key) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      setAddress(selectedAddress);
      setCoordinates(latLng);

      setFormData((prevFormData) => ({
        ...prevFormData,
        [key]: {
          ...prevFormData[key],
          address: selectedAddress,
          coordinates: latLng,
        },
      }));
    } catch (error) {
      console.error("Error fetching coordinates", error);
    }
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ServiceLocation: getCustomerService,
  });

  useEffect(() => {
    dispatch(fetchgetCustomerServices({ id }));
    dispatch(fetchSalesTaxGroupName());
    dispatch(fetchgetSingleCustomers({ id }));
  }, [dispatch]);

  useEffect(() => {
    setFormData(getCustomerService);
    setAddress(getSingleCustomer?.address);
  }, [getCustomerService]);

  useEffect(() => {
    if (getCustomerService?.length > 1) {
      setActiveKey(1000);
    } else {
      setActiveKey(0);
    }
  }, []);

  const value = "";

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchgetCustomerCountry());
  }, [dispatch]);

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  useEffect(() => {
    if (formData?.length == 0) {
      setshowAccoundion(true);
    } else {
      setshowAccoundion(false);
    }
  }, []);

  useEffect(() => {
    if (getCustomerService && getCustomerService) {
      form.setFieldsValue({
        ServiceLocation: getCustomerService.map((location, index) => ({
          address: location.address,
          state_id: location?.statename || "",
          city_id: location?.cityname || "",
          country_id: location?.countryname || "",
          dog_name: location.dog_name || "",
          email: location.email,
          service_phone_title: location?.service_phone_title,
          service_email_title: location?.service_email_title,
          gate_code: location.gate_code,
          latitude: location.latitude,
          longitude: location.longitude,
          mobile_no: location.mobile_no_primary,
          mobile_no_secondary: location.mobile_no_secondary || "",
          name: location.name,
          notes: location.notes,
          notify_email: location.notify_email,
          notify_sms: location.notify_sms,
          notify_work_completion_email: location.notify_work_completion_email,
          notify_work_completion_sms: location.notify_work_completion_sms,
          notify_sms_Time: location.notify_sms_Time,
          notify_email_Time: location.notify_email_Time,
          notify_work_completion_sms_Time:
            location.notify_work_completion_sms_Time,
          notify_work_completion_email_Time:
            location.notify_work_completion_email_Time,
          ServicePhoneData: location?.ServicePhoneData,
          ServiceEmailsData: location?.ServiceEmailsData,
          sales_tax_group: location?.ServiceLocationSalesTax?._id,
          _id: location._id,
          zipcode: location.zipcode,

          key: index.toString(),
        })),
      });
    }
  }, [getCustomerService, form]);

  const onSearch = (name) => {
    // dispatch(fetchgetAllCityByCountry({ countryid, name }));
  };

  const handleChangeCity = (id) => {
    setcountryid(id);
    const value = "";
    // dispatch(fetchgetAllCityByCountry({ countryid, value }));
    dispatch(fetchgetCustomerState({ id }));
  };

  const handleChange = (id) => {
    dispatch(fetchgetCustomerCity({ id }));
  };

  const handleSetCity = (cityid) => {
    setCity(cityid);
  };

  const handleCustomer = (id) => {
    setCustomerId(id);
  };

  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const AddMore = () => {
    navigate(`/customer-servicelocation/${id}`);
  };

  const DeleteLocation = async (data, key) => {
    const id = data && data[key]._id;
    console.log(key);
    dispatch(deleteServiceLocationData({ id }));
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      navigate(-1);
      dispatch(fetchgetCustomerServices({ id }));

      dispatch(resetData());
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, success]);

  const handleupdate = async (value, key) => {
    console.log(value);
    const values = value?.ServiceLocation
      ? value?.ServiceLocation[key]
      : value[key];
    const id = values?._id;
    setIsFieldsDisabled(!isFieldsDisabled);
    try {
      const data = {
        address: address,
        city_id: City === "" ? getCustomerService[key].city_id : City,
        country_id:
          countryid === "" ? getCustomerService[key].country_id : countryid,
        dog_name: values.dog_name || "",
        email: values.email,
        PhoneData: values?.ServicePhoneData,
        EmailData: values?.ServiceEmailsData,
        gate_code: values.gate_code,
        longitude: coordinates?.lng?.toString(),
        latitude: coordinates?.lat?.toString(),
        mobile_no: values.mobile_no,
        service_phone_title: values.service_phone_title,
        service_email_title: values.service_email_title,
        mobile_no_secondary: values.mobile_no_secondary || "",
        name: values.name,
        notes: values.notes,
        notify_email: values.notify_email,
        notify_sms: values.notify_sms,
        notify_work_completion_email: values.notify_work_completion_email,
        notify_work_completion_sms: values.notify_work_completion_sms,
        _id: values._id,
        sales_tax_group: values?.sales_tax_group,
        // state_id: State === "" ? getCustomerService[key].state_id : State,
        zipcode: values.zipcode,
        notify_email_Time: values.notify_email_Time,
        notify_sms_Time: values.notify_sms_Time,
        notify_work_completion_sms_Time: values.notify_work_completion_sms_Time,
        notify_work_completion_email_Time:
          values.notify_work_completion_email_Time,
      };
      await dispatch(updateServiceLocationData({ id, data }));
    } catch (err) {
      toast.error(err);
    }
  };
  useEffect(() => {
    if (successupdate) {
      toast.success(successupdate);
      dispatch(fetchgetCustomerServices({ id }));

      dispatch(resetData());
    }
    if (errorupdate) {
      toast.error(errorupdate);
      dispatch(resetData());
    }
  }, [errorupdate, successupdate]);

  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!");
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

  const HandleEdit = () => {
    setIsFieldsDisabled(!isFieldsDisabled);
  };

  const handleNav1 = () => {
    navigate(`/customerview/${id}`);
  };

  const handleNav2 = () => {
    navigate("/customer");
  };

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
    <div className="row fomik">
      <Form
        name="dynamic_form_nest_item"
        onValuesChange={handleFormValuesChange}
        form={form}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValue={formData.ServiceLocation}
      >
        <Form.List
          name="ServiceLocation"
          className="profServiceLocationAccordion"
        >
          {(fields, { add, remove }) => (
            <>
              <div className="col-sm-12 margin-top-css heading">
                <div className="row cslocation profServHeading">
                  <div className="col-sm-6 servLoch2">
                    <h2>
                      Service Location (
                      {getSingleCustomer?.first_name +
                        " " +
                        getSingleCustomer?.last_name}
                      )
                    </h2>

                    <Breadcrumb
                      items={[
                        {
                          title: (
                            <p
                              style={{ cursor: "pointer" }}
                              onClick={handleNav2}
                            >
                              Customer Listing
                            </p>
                          ),
                        },
                        {
                          title: (
                            <p
                              style={{ cursor: "pointer" }}
                              onClick={handleNav1}
                            >
                              Customer View
                            </p>
                          ),
                        },
                      ]}
                    />
                  </div>

                  <div className="col-sm-6 addbuttons">
                    {isFieldsDisabled ? (
                      <Button
                        className="bluebtn  profServiceLocationBlue inner1"
                        // style={{ padding: "6px 10px 4px 30px" }}
                        onClick={HandleEdit}
                      >
                        {" "}
                        Edit{" "}
                      </Button>
                    ) : (
                      <></>
                    )}

                    <Button
                      className="bluebtn profServiceLocationBlue"
                      onClick={AddMore}
                    >
                      {showAccoundion ? "Remove" : "Add More"}
                    </Button>
                  </div>
                </div>
              </div>

              <Accordion
                flush
                activeKey={activeKey}
                onSelect={(newActiveKey) => setActiveKey(newActiveKey)}
              >
                {fields?.map(({ key, name, ...restField }) => (
                  <Accordion.Item eventKey={key} key={key}>
                    <Accordion.Header>
                      <div className="profServiceLocationBlueflex1">
                        <span>{getCustomerService[key]?.name}</span>{" "}
                        <Button
                          className="bluebtn  profServiceLocationBlue inner1"
                          onClick={() =>
                            UpdatePoolLocationNavigation(
                              formData[key]?._id,
                              key
                            )
                          }
                        >
                          {" "}
                          View Pools{" "}
                        </Button>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body collapsible={!showAccordion}>
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <div className="row cslocation">
                          <div className="col-sm-12">
                            <Form.Item
                              {...restField}
                              name={[name, "name"]}
                              label="Location Name"
                              rules={[
                                {
                                  required: true,
                                  message: "Missing Location name",
                                },
                              ]}
                            >
                              <Input
                                disabled={isFieldsDisabled}
                                placeholder="Location Name"
                              />
                            </Form.Item>

                            <Form.Item
                              type="hidden"
                              name={[name, "customer_id"]}
                              style={{ display: "none" }}
                              initialValue={formData.customer_id}
                            >
                              <Input
                                disabled={isFieldsDisabled}
                                placeholder="Customer id "
                              />
                            </Form.Item>

                            <Form.Item
                              type="hidden"
                              name={[name, "_id"]}
                              style={{ display: "none" }}
                            >
                              <Input
                                disabled={isFieldsDisabled}
                                placeholder="Customer id "
                              />
                            </Form.Item>
                          </div>

                          <div className="col-sm-3">
                            <Form.Item
                              label="Address"
                              name="Address"
                              rules={[
                                {
                                  required: true,
                                  message: "Address is Required",
                                },
                              ]}
                            >
                              <PlacesAutocomplete
                                value={formData[key] && formData[key].address}
                                onChange={(newAddress) => {
                                  setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    [key]: {
                                      ...prevFormData[key],
                                      address: newAddress,
                                    },
                                  }));
                                }}
                                onSelect={(selectedAddress) =>
                                  handleSelect(selectedAddress, key)
                                }
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
                                      value={
                                        formData[key] && formData[key].address
                                      }
                                      disabled={isFieldsDisabled}
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
                                            {...getSuggestionItemProps(
                                              suggestion,
                                              {
                                                style,
                                              }
                                            )}
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
                              name={[name, "state_id"]}
                              // name="city_id"

                              label="State"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your State!",
                                },
                              ]}
                            >
                              <Select
                                placeholder="State"
                                onChange={handleChange}
                                disabled={isFieldsDisabled}
                                showSearch
                                filterOption={filterOption}
                              >
                                {customerstate &&
                                  customerstate?.data?.items?.map((item) => {
                                    return (
                                      <Option value={item._id}>
                                        {item.name}
                                      </Option>
                                    );
                                  })}
                              </Select>
                            </Form.Item>
                          </div>

                          <div className="col-sm-3">
                            <Form.Item
                              name={[name, "city_id"]}
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
                                onChange={handleSetCity}
                                disabled={isFieldsDisabled}
                                filterOption={filterOption}
                                onSearch={onSearch}
                              >
                                {customercity?.data?.map((item, i) => {
                                  return (
                                    <Option value={item?._id}>
                                      {item?.name}
                                    </Option>
                                  );
                                })}
                              </Select>
                            </Form.Item>
                          </div>

                          <div className="col-sm-3">
                            <Form.Item
                              {...restField}
                              name={[name, "zipcode"]}
                              label="Zip Code"
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Missing Zip Code for service location",
                                },
                              ]}
                            >
                              <Input
                                disabled={isFieldsDisabled}
                                placeholder="Zip-Code"
                                type="number"
                              />
                            </Form.Item>
                          </div>

                          <div className="col-sm-6">
                            <Form.Item
                              {...restField}
                              name={[name, "service_email_title"]}
                              label="Email Title"
                              rules={[
                                {
                                  message:
                                    "The input is not valid E-mail Title!",
                                },
                              ]}
                            >
                              <Input
                                disabled={isFieldsDisabled}
                                placeholder="E-mail Title"
                              />
                            </Form.Item>
                          </div>

                          <div className="col-sm-6">
                            <Form.Item
                              {...restField}
                              name={[name, "email"]}
                              label="Email"
                              rules={[
                                {
                                  type: "email",
                                  message: "The input is not valid E-mail!",
                                },
                                { required: true, message: "Email is Invalid" },
                              ]}
                            >
                              <Input
                                disabled={isFieldsDisabled}
                                placeholder="E-mail"
                              />
                            </Form.Item>
                          </div>

                          <div className="col-sm-12">
                            <Form.List
                              name={[name, "ServiceEmailsData"]}
                              initialValue={[]}
                              rules={[
                                {
                                  validator: async (_, emails) => {
                                    if (emails.length > 5) {
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
                                              disabled={isFieldsDisabled}
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
                                              disabled={isFieldsDisabled}
                                            />
                                          </Form.Item>
                                        </div>
                                        <div className="col-sm-1">
                                          <MinusCircleOutlined
                                            onClick={() => remove(name)}
                                            disabled={isFieldsDisabled}
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
                                      disabled={isFieldsDisabled}
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
                              {...restField}
                              label="Mobile No Title"
                              name={[name, "service_phone_title"]}
                              // rules={[
                              //   {
                              //     required: true,
                              //     message: "Number is Invalid",
                              //   },
                              // ]}
                            >
                              <Input
                                placeholder="Mobile # (Primary)"
                                disabled={isFieldsDisabled}
                              />
                            </Form.Item>
                          </div>

                          <div className="col-sm-6">
                            <Form.Item
                              {...restField}
                              label="Mobile No"
                              name={[name, "mobile_no"]}
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
                                disabled={isFieldsDisabled}
                              />
                            </Form.Item>
                          </div>

                          <div className="col-sm-12">
                            <Form.List name={[name, "ServicePhoneData"]}>
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
                                          >
                                            <Input
                                              type="text"
                                              placeholder={`Title`}
                                              disabled={isFieldsDisabled}
                                            />
                                          </Form.Item>
                                        </div>
                                        <div className="col-sm-6">
                                          <Form.Item
                                            {...restField}
                                            name={[name, "Phone"]}
                                            fieldKey={[fieldKey, "Phone"]}
                                          >
                                            <Input
                                              placeholder="Mobile #"
                                              type="number"
                                              disabled={isFieldsDisabled}
                                            />
                                          </Form.Item>
                                        </div>
                                        <div className="col-sm-1">
                                          <MinusCircleOutlined
                                            onClick={() => remove(name)}
                                            disabled={isFieldsDisabled}
                                          />
                                        </div>
                                      </span>
                                    )
                                  )}
                                  <Form.Item>
                                    <Button
                                      type="dashed"
                                      onClick={() => add()}
                                      disabled={isFieldsDisabled}
                                      block
                                      icon={<PlusOutlined />}
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
                              name={[name, "sales_tax_group"]}
                              label="Sales Tax"
                              // rules={[
                              //   {
                              //     required: true,
                              //     message: "Sales Tax is required",
                              //   },
                              // ]}
                            >
                              <Select
                                placeholder="Sales Tax"
                                showSearch
                                disabled={isFieldsDisabled}
                                filterOption={filterOption}
                                onSearch={onSearch}
                              >
                                {GetSaleGroup?.data?.map((item, i) => {
                                  return (
                                    <Option value={item?._id}>
                                      {item?.name}
                                    </Option>
                                  );
                                })}
                              </Select>
                            </Form.Item>
                          </div>

                          <div className="col-sm-6">
                            <Button
                              className="bluebtn"
                              type="primary"
                              onClick={handleShow}
                            >
                              Add Group
                            </Button>
                          </div>

                          <div className="col-sm-4">
                            <Form.Item
                              {...restField}
                              name={[name, "notes"]}
                              label="Notes"
                              // rules={[
                              //   {
                              //     required: true,
                              //     message: "Notes are Invalid",
                              //   },
                              // ]}
                              initialValue={formData?.notes}
                            >
                              <Input
                                disabled={isFieldsDisabled}
                                placeholder="Notes"
                                type="text"
                              />
                            </Form.Item>
                          </div>
                          <div className="col-sm-4">
                            <Form.Item
                              {...restField}
                              label="Gate Code"
                              name={[name, "gate_code"]}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Missing Gate Code for service location",
                                },
                              ]}
                            >
                              <Input
                                placeholder="Gate Code"
                                disabled={isFieldsDisabled}
                              />
                            </Form.Item>
                          </div>

                          <div className="col-sm-4">
                            <Form.Item
                              {...restField}
                              name={[name, "dog_name"]}
                              label="Dogs Name"
                            >
                              <Input
                                placeholder="Dogs Name (optional)"
                                type="text"
                                disabled={isFieldsDisabled}
                              />
                            </Form.Item>
                          </div>
                          <div className="col-sm-12 heads">
                            <h3>Communications</h3>
                          </div>
                          <div className="col-sm-3 com switchbtn">
                            <label>
                              Notify Customer Through SMS on Arrival
                            </label>

                            <Form.Item
                              valuePropName="checked"
                              name={[name, "notify_sms"]}
                              label="Turn On To Notify"
                              initialValue={formData?.notify_sms}
                              disabled={isFieldsDisabled}
                            >
                              <Switch />
                            </Form.Item>
                          </div>
                          <div className="col-sm-3 com switchbtn">
                            <label>
                              Notify Customer Through Email on Arrival
                            </label>
                            <Form.Item
                              valuePropName="checked"
                              name={[name, "notify_email"]}
                              label="Turn On To Notify"
                              initialValue={formData?.notify_email}
                              disabled={isFieldsDisabled}
                            >
                              <Switch />
                            </Form.Item>
                          </div>
                          <div className="col-sm-3 com switchbtn">
                            <label>
                              Notify Customer on work compeleted via SMS
                            </label>
                            <Form.Item
                              valuePropName="checked"
                              name={[name, "notify_work_completion_sms"]}
                              label="Turn On To Notify"
                              disabled={isFieldsDisabled}
                              initialValue={
                                formData?.notify_work_completion_sms
                              }
                            >
                              <Switch />
                            </Form.Item>
                          </div>
                          <div className="col-sm-3 com switchbtn">
                            <label>
                              Notify Customer on work compeleted via Email
                            </label>
                            <Form.Item
                              valuePropName="checked"
                              name={[name, "notify_work_completion_email"]}
                              label="Turn On To Notify"
                              initialValue={
                                formData?.notify_work_completion_email
                              }
                            >
                              <Switch />
                            </Form.Item>
                          </div>

                          <div className="col-sm-3 com">
                            <Form.Item
                              name={[name, "notify_sms_Time"]}
                              label="Notify SMS Time"
                            >
                              <Select
                                placeholder="Notify SMS Time"
                                disabled={isFieldsDisabled}
                                filterOption={filterOption}
                                options={NotificationTime}
                              ></Select>
                            </Form.Item>
                          </div>
                          <div className="col-sm-3 com">
                            <Form.Item
                              name={[name, "notify_email_Time"]}
                              label="Notify Email Time"
                            >
                              <Select
                                placeholder="Notify Email Time"
                                disabled={isFieldsDisabled}
                                filterOption={filterOption}
                                options={NotificationTime}
                              ></Select>
                            </Form.Item>
                          </div>
                          <div className="col-sm-3 com">
                            <Form.Item
                              name={[name, "notify_work_completion_sms_Time"]}
                              label="Notify Work Completion SMS Time"
                            >
                              <Select
                                placeholder="Notify Work Completion SMS Time"
                                disabled={isFieldsDisabled}
                                filterOption={filterOption}
                                options={NotificationTime}
                              ></Select>
                            </Form.Item>
                          </div>
                          <div className="col-sm-3 com">
                            <Form.Item
                              name={[name, "notify_work_completion_email_Time"]}
                              label="Notify Work Completion Email Time"
                            >
                              <Select
                                placeholder="Notify Work Completion Email Time"
                                disabled={isFieldsDisabled}
                                filterOption={filterOption}
                                options={NotificationTime}
                              ></Select>
                            </Form.Item>
                          </div>
                          <div className="col-sm-12 buttonsservice">
                            <Button
                              className="bluebtn  profServiceLocationBlue"
                              onClick={() => DeleteLocation(formData, key)}
                              disabled={isFieldsDisabled}
                            >
                              {" "}
                              Remove Location{" "}
                            </Button>
                            <Form.Item className="savebtn">
                              {" "}
                              {!isFieldsDisabled ? (
                                <Button
                                  className="yellowbtn profServiceLocationyellow"
                                  onClick={() => handleupdate(formData, key)}
                                  disabled={isFieldsDisabled}
                                  loading={loading}
                                  type="primary"
                                >
                                  {" "}
                                  Update Location{" "}
                                </Button>
                              ) : (
                                <></>
                              )}
                            </Form.Item>
                          </div>
                        </div>
                      </Space>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </>
          )}
        </Form.List>
      </Form>

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
    </div>
  );
};

export default ProfServicelocation;
