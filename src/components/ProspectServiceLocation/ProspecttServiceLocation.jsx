import React, { useState, Fragment, useEffect } from "react";
import { Button, Form, Input, Select, Checkbox, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchgetAllCityByCountry,
  fetchgetCustomerCity,
} from "../../redux/Slices/getCustomerCity";
import { fetchgetCustomerCountry } from "../../redux/Slices/getCustomerCountry";
import { fetchSalesTaxGroupName } from "../../redux/Slices/getSaleGroupName";
import { useNavigate, useParams } from "react-router-dom";
import { fetchgetsingleProspectCustomer } from "../../redux/Slices/getProspect";
import {
  postconvertServiceLocation,
  clearData,
} from "../../redux/postReducer/postProspectData";
import { toast } from "react-toastify";
// import { MinusCircleOutlined } from "@ant-design/icons";
// import Switch from "antd/lib/switch";
// import Accordion from "react-bootstrap/Accordion";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Item from "antd/es/list/Item";
import { fetchgetCustomerState } from "../../redux/Slices/getCustomerState";

const { Option } = Select;

const ProspecttServiceLocation = ({ isFieldsDisabled }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = "";
  const [form] = Form.useForm();
  const [formData, setFormData] = useState();
  const { data, loading, success, error } = useSelector(
    (state) => state.postProspectData
  );
  const customerstate = useSelector((state) => state.getCustomerState);

  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  console.log(coordinates, "coordinates ===========>");
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

  const [countryid, setcountryid] = useState("");
  const [isHasDog, setIsHasDog] = useState(false);

  const GetSaleGroup = useSelector((state) => state.SalesTaxGroupName);
  const customercountry = useSelector((state) => state.getCustomerCountry);
  const customercity = useSelector((state) => state.getCustomerCity);
  const { data: getAllprospect, statusdata } = useSelector(
    (state) => state.getAllprospect
  );

  const { id } = useParams();

  console.log(getAllprospect, " >>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  const handleChangeCountry = (id) => {
    dispatch(fetchgetCustomerState({ id }));
  };
  const handleChange = (id) => {
    dispatch(fetchgetCustomerCity({ id }));
  };

  useEffect(() => {
    dispatch(fetchgetsingleProspectCustomer({ id }));
  }, [dispatch]);

  useEffect(() => {
    const fetchGeocode = async () => {
      if (getAllprospect?.address) {
        try {
          const results = await geocodeByAddress(getAllprospect.address);
          const latLng = await getLatLng(results[0]);
          setAddress(getAllprospect.address);
          setCoordinates(latLng);
        } catch (error) {
          console.error("Error fetching geocode:", error);
        }
      }
    };

    fetchGeocode();
  }, [getAllprospect]);

  useEffect(() => {
    setFormData({
      name: getAllprospect?.ServiceLocationName,
      address: getAllprospect?.address,
      billing_details: getAllprospect?.billing_details || "",
      company_address: getAllprospect?.company_address || "",
      company_name: getAllprospect?.company_name || "",
      email: getAllprospect?.email || "",
      first_name: getAllprospect?.first_name,
      last_name: getAllprospect?.last_name || "",
      mobile_no_primary: getAllprospect?.mobile_no_primary || "",
      mobile_no_secondary: getAllprospect?.mobile_no_secondary || "",
      status: getAllprospect?.status || "",
      billing_address: getAllprospect?.billing_address || "",
      zipcode: getAllprospect?.zipcode,

      updatedAt: getAllprospect?.updatedAt || "",
    });
  }, [getAllprospect]);

  useEffect(() => {
    form.setFieldsValue({
      address: formData?.address,
      name: formData?.name,
      billing_details: formData?.billing_details || "",
      city_id: {
        label: getAllprospect?.ProspectCity_id?.name,
        value: getAllprospect?.ProspectCity_id?._id,
      },
      state_id: getAllprospect?.statename || "",
      address: getAllprospect?.address,
      company_address: formData?.company_address || "",
      company_name: formData?.company_name || "",
      email: formData?.email || "",
      first_name: formData?.first_name,
      last_name: formData?.last_name || "",
      mobile_no_primary: formData?.mobile_no_primary || "",
      status: formData?.status || "",
      billing_address: formData?.billing_address || "",
      zipcode: formData?.zipcode,

      // EmailData: EmailData,
      updatedAt: formData?.updatedAt || "",
    });
  }, [getAllprospect]);

  const onFinish = (values) => {
    console.log(values);
    const ProspectCustomer = getAllprospect?.ProspectCustomer[0]?._id;

    const Data = {
      name: values?.name,
      customer_id: ProspectCustomer,
      country_id: values?.country_id,

      state_id: values?.state_id,
      city_id: values?.city_id?.value,
      zipcode: values?.zipcode,
      email: values?.email,
      mobile_no_primary: values?.mobile_no_primary,
      PhoneData: values?.PhoneData,
      EmailData: values?.EmailData,
      longitude: coordinates?.lng?.toString(),
      latitude: coordinates?.lat?.toString(),
      address: values?.address,
      gate_code: values?.gate_code,
      sales_tax_group: values?.sales_tax_group,
      notes: values?.notes,
      notify_sms: values?.notify_sms,
      notify_work_completion_sms: values?.notify_work_completion_sms,
      dog_name: values?.dog_name,
      mobile_no_secondary: values?.mobile_no_secondary,
      notify_work_completion_email: values?.notify_work_completion_email,
      notify_email: values?.notify_email,
      notify_email_Time: values.notify_email_Time,
      notify_sms_Time: values.notify_sms_Time,
      service_email_title: values.service_email_title
        ? values.service_email_title
        : values?.name,
      service_phone_title: values.service_phone_title
        ? values.service_phone_title
        : values?.name,
      notify_work_completion_sms_Time: values.notify_work_completion_sms_Time,
      notify_work_completion_email_Time:
        values.notify_work_completion_email_Time,
    };
    console.log(Data, "<======data");
    dispatch(postconvertServiceLocation({ Data, id }));
    // navigate('/prospect/waterbody');
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearData());
      navigate(`/prospect/waterbody/${id}`);
    }
    if (error) {
      toast.error(error);
      dispatch(clearData());
    }
  }, [error, success]);

  const handleChangeCity = (countryid) => {
    setcountryid(countryid);
    const value = "";
    dispatch(fetchgetAllCityByCountry({ countryid, value }));
  };

  const handleCheckboxChange = (e) => {
    if (e.target.checked === true) {
      setIsHasDog(true);
    } else {
      setIsHasDog(false);
    }
  };

  const onSearch = (name) => {
    dispatch(fetchgetAllCityByCountry({ countryid, name }));
  };

  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  useEffect(() => {
    dispatch(fetchgetAllCityByCountry({ countryid, name }));
  }, [dispatch, countryid]);

  useEffect(() => {
    dispatch(fetchgetCustomerCountry());
    dispatch(fetchSalesTaxGroupName());
  }, [dispatch]);

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

  const onFinishFailed = (errorInfo) => {
    console.log("Please fill all required fields!", errorInfo);
  };
  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  return (
    <Fragment>
      <div className="row fomik custServLocagtion">
        <Form
          name="dynamic_form_nest_item"
          onValuesChange={handleFormValuesChange}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={formData}
        >
          <div className="row cslocation">
            <div className="col-sm-6 forFifty">
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

              <Form.Item
                type="hidden"
                name="customer_id"
                style={{ display: "none" }}
              >
                <Input placeholder="Customer id " />
              </Form.Item>
            </div>

            <div className="col-sm-6">
              <div>
                <Form.Item
                  name="address"
                  label="Address"
                  rules={[
                    {
                      required: true,
                      message: "Please input Address!",
                    },
                  ]}
                >
                  <PlacesAutocomplete
                    value={formData?.address}
                    onChange={(address) =>
                      setFormData({ ...formData, address })
                    }
                    onSelect={handleSelect}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                    }) => (
                      <div>
                        <Item label="Address" name="address">
                          <Input
                            {...getInputProps({
                              placeholder: "Enter Address",
                            })}
                            disabled={isFieldsDisabled?.isFieldsDisabled}
                          />
                          <div>
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
                        </Item>
                      </div>
                    )}
                  </PlacesAutocomplete>
                </Form.Item>
              </div>
            </div>

            <div className="col-sm-4">
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

            <div className="col-sm-4">
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

            <div className="col-sm-4">
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
                label="Email Title "
                name="service_email_title"
                // rules={[
                //   {
                //     required: true,
                //     message: "Email Title is required",
                //   },
                // ]}
              >
                <Input placeholder="E-mail Title" />
              </Form.Item>
            </div>
            <div className="col-sm-6">
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    type: "email",
                    message: "This is not a valid E-mail!",
                  },
                  {
                    required: true,
                    message: "E-mail is missing!",
                  },
                ]}
              >
                <Input placeholder="E-mail" />
              </Form.Item>
            </div>
            {/* <div className="col-sm-12">
                            <Form.List
                                name="EmailData"
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
                                    disabled={fields.length >= 5}
                                    >
                                    Add Multiple Emails
                                    </Button>
                                </Form.Item>
                                </>
                            )}
                            </Form.List>
                        </div> */}

            <div className="col-sm-6">
              <Form.Item
                label="Phone Title "
                name="service_phone_title"
                // rules={[
                //   {
                //     required: true,
                //     message: "Phone Title is required",
                //   },
                // ]}
              >
                <Input placeholder="Phone Title" />
              </Form.Item>
            </div>
            <div className="col-sm-6">
              <Form.Item
                name="mobile_no_primary"
                label="Mobile No Primary"
                rules={[
                  {
                    required: true,
                    message: "Phone Number Is Missing",
                  },
                ]}
              >
                <Input placeholder="Mobile # (Primary)" type="number" />
              </Form.Item>
            </div>

            {/* <div className="col-sm-12">
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
                                    disabled={fields.length >= 5}
                                    >
                                    Add Multiple Mobile No
                                    </Button>
                                </Form.Item>
                                </>
                            )}
                            </Form.List>
                        </div> */}

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
                <Input placeholder="Gate Code" type="number" />
              </Form.Item>
            </div>

            <div className="col-sm-2">
              <Checkbox name="hasDog" onChange={handleCheckboxChange}>
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

            <div className="col-sm-6">
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
                    return <Option value={item._id}>{item.name}</Option>;
                  })}
                </Select>
              </Form.Item>
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
                <Switch />
              </Form.Item>
            </div>
            <div className="col-sm-3 com switchbtn">
              <label>Notify Customer Through Email on Arrival</label>
              <Form.Item
                valuePropName="checked"
                name="notify_email"
                label="Turn On To Notify"
              >
                <Switch />
              </Form.Item>
            </div>
            <div className="col-sm-3 com switchbtn">
              <label>Notify Customer on work compeleted via SMS</label>
              <Form.Item
                valuePropName="checked"
                name="notify_work_completion_sms"
                label="Turn On To Notify"
              >
                <Switch />
              </Form.Item>
            </div>
            <div className="col-sm-3 com switchbtn">
              <label>Notify Customer on work compeleted via Email</label>
              <Form.Item
                valuePropName="checked"
                name="notify_work_completion_email"
                label="Turn On To Notify"
              >
                <Switch />
              </Form.Item>
            </div>

            <div className="col-sm-3 com">
              <Form.Item name="notify_sms_Time" label="Notify SMS Time">
                <Select
                  placeholder="Notify SMS Time"
                  // disabled={!form.getFieldValue("notify_sms")}
                  filterOption={filterOption}
                  options={NotificationTime}
                ></Select>
              </Form.Item>
            </div>
            <div className="col-sm-3 com">
              <Form.Item name="notify_email_Time" label="Notify Email Time">
                <Select
                  placeholder="Notify Email Time"
                  // disabled={!form.getFieldValue("notify_email")}
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
                  // disabled={!form.getFieldValue("notify_work_completion_sms")}
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
                  // disabled={!form.getFieldValue("notify_work_completion_email")}
                  filterOption={filterOption}
                  options={NotificationTime}
                ></Select>
              </Form.Item>
            </div>

            <div className="col-sm-12 buttonsservice">
              <Form.Item className="savebtn">
                <Button
                  className="bluebtn handleAddRow"
                  type="primary"
                  htmlType="submit"
                  // onClick={() => onFinish(form.getFieldsValue())}
                  loading={loading}
                  // disabled={loading}
                >
                  Next
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </Fragment>
  );
};

export default ProspecttServiceLocation;
