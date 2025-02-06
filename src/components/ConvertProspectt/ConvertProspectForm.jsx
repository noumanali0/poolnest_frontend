import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Switch,
  Tooltip,
  Space,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useHistory
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchgetCustomerState } from "../../redux/Slices/getCustomerState";
import {
  fetchgetAllCityByCountry,
  fetchgetCustomerCity,
} from "../../redux/Slices/getCustomerCity";
import { fetchgetCustomerCountry } from "../../redux/Slices/getCustomerCountry";
import Loader from "../NoDataComponent/Loader";
import { fetchtag } from "../../redux/Slices/getTags";
import {
  postConvertProspectData,
  clearData,
} from "../../redux/postReducer/postProspectData";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Item from "antd/es/list/Item";
import { fetchClientSource } from "../../redux/Slices/getClientSource";
import { fetchgetCustomerType } from "../../redux/Slices/getCustomerType";

export default function ConvertProspectForm({ isFieldsDisabled }) {
  const { Option } = Select;
  const [form] = Form.useForm();
  const navigate = useNavigate(); // Initialize useHistory
  const [customer_type, setCustomerType] = useState("residential");
  const [CustomerId, setCustomerId] = useState();

  const [formData, setFormData] = useState();
  const clientSource = useSelector((state) => state.clientSource);

  const [sourceoptions, setSourceOptions] = useState(clientSource?.data);

  const customertags = useSelector((state) => state.tag);

  const { data, loading, success, error } = useSelector(
    (state) => state.postProspectData
  );
  const customerstate = useSelector((state) => state.getCustomerState);
  const customercity = useSelector((state) => state.getCustomerCity);
  const dispatch = useDispatch();
  const { data: getAllprospect, statusdata } = useSelector(
    (state) => state.getAllprospect
  );
  const [City, setCity] = useState(getAllprospect?.ProspectCity_id?._id);
  const customercountry = useSelector((state) => state.getCustomerCountry);
  const userProfile = useSelector((state) => state.profileDetail);
  const customertype = useSelector((state) => state.getCustomerType);
  const [isCommercial, setIsCommercial] = useState(false);

  const [countryid, setcountryid] = useState(
    userProfile?.data?.data?.CountryId
  );
  const handleChangeCountry = (id) => {
    dispatch(fetchgetCustomerState({ id }));
  };
  const handleChange = (id) => {
    dispatch(fetchgetCustomerCity({ id }));
  };

  const handleChangeCity = (cityid) => {
    setCity(cityid);
  };
  const onSearch = (name) => {
    dispatch(fetchgetAllCityByCountry({ countryid, name }));
  };

  const handleChangeSource = (value) => {
    setSourceOptions(value);
  };

  const handleCustomerTypeChange = (value) => {
    setCustomerId(value);
  };

  const { id } = useParams();
  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  const handleSelect = async (selectedAddress) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      setAddress(selectedAddress);
      setCoordinates(latLng);
    } catch (error) {
      console.error("Error fetching coordinates", error);
    }
  };
  useEffect(() => {
    setcountryid(userProfile?.data?.data?.CountryId);
  }, [userProfile]);

  const [activestatus, setactivestatus] = useState(getAllprospect.status);

  const [options, setOptions] = useState(customertags?.data); // Use state to manage options

  //   const resultArray = getSingleCustomer?.CustomerTags?.map((item) => {
  //     const idParts = item._id.split("-"); // Split _id by '-' to get an array of parts
  //     const newName = `${item.TagsData.name}${idParts[idParts.length - 1].charAt(
  //       0
  //     )}${idParts[idParts.length - 1].charAt(1)}`;
  //     return newName.toLowerCase(); // Convert to lowercase as per your example
  //   });

  useEffect(() => {
    dispatch(fetchtag());
    dispatch(fetchgetCustomerType());

    dispatch(fetchClientSource());
    dispatch(fetchgetCustomerCountry());
  }, [dispatch]);
  const onFinish = async (values) => {
    const Data = {
      customer_type_id:
        CustomerId == null
          ? getAllprospect.ProspectCustomer_type._id
          : CustomerId,
      city_id: values?.city_id?.value,
      first_name: values?.first_name,
      last_name: values?.last_name,
      address: values?.address,
      zipcode: values?.zipcode,
      email: values?.email,
      customer_email_title: values.customer_email_title
        ? values.customer_email_title
        : values.first_name,
      customer_phone_title: values.customer_phone_title
        ? values.customer_phone_title
        : values.first_name,
      mobile_no_primary: values?.mobile_no_primary,
      mobile_no_secondary: values?.mobile_no_secondary,
      company_name: values?.company_name,
      company_address: values?.company_address,
      billing_address: values?.billing_address,
      billing_details: values?.billing_details,
      notes: values?.notes,
      SourceId: values.SourceId,
      serviceType: true,
    };
    dispatch(postConvertProspectData({ Data, id }));
  };

  useEffect(() => {
    setFormData({
      address: getAllprospect?.address,
      billing_details: getAllprospect?.billing_details || "",
      company_address: getAllprospect?.company_address || "",
      company_name: getAllprospect?.company_name || "",
      email: getAllprospect?.email || "",
      first_name: getAllprospect?.first_name,
      last_name: getAllprospect?.last_name || "",
      mobile_no_primary: getAllprospect?.mobile_no_primary || "",
      mobile_no_secondary: getAllprospect?.mobile_no_secondary || "",
      state_id: getAllprospect?.statename || "",
      city_id: getAllprospect?.ProspectCity_id?.name || "",
      state_id: getAllprospect?.statename || "",

      status: getAllprospect?.status || "",
      billing_address: getAllprospect?.billing_address || "",
      zipcode: getAllprospect?.zipcode,
      updatedAt: getAllprospect?.updatedAt || "",
    });
  }, [getAllprospect]);
  useEffect(() => {
    let id = countryid;
    dispatch(fetchgetAllCityByCountry({ countryid, name }));
    dispatch(fetchgetCustomerState({ id }));
  }, [dispatch, countryid]);

  const onFinishFailed = (errorInfo) => {
    console.log("Please fill all required fields!", errorInfo);
  };
  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearData());
      navigate(`/prospect/service-location/${id}`);
    }
    if (error) {
      toast.error(error);
      dispatch(clearData());
    }
  }, [error, success]);
  const handleChangeStatus = (e) => {
    setactivestatus(e);
  };

  useEffect(() => {
    form.setFieldsValue({
      address: formData?.address,
      billing_details: formData?.billing_details || "",
      city_id: {
        label: getAllprospect?.ProspectCity_id?.name,
        value: getAllprospect?.ProspectCity_id?._id,
      },
      company_address: formData?.company_address || "",
      company_name: formData?.company_name || "",
      customer_type_id: {
        label: getAllprospect?.ProspectCustomer_type?.name,
        value: getAllprospect?.ProspectCustomer_type?._id,
      },

      email: formData?.email || "",
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
  }, [formData]);
  return (
    <Fragment>
      <div className="row fomik customer editCustomer editedit">
        <Form
          name="ConvertPrsopect"
          onValuesChange={handleFormValuesChange}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          disabled={isFieldsDisabled}
          initialValues={formData}
        >
          <div className="row cslocation">
            <div className="col-sm-2 forFifty customertype">
              <Form.Item name="customer_type_id" label="Customer Type">
                <Select
                  placeholder="Customer Type"
                  onChange={handleCustomerTypeChange}
                  disabled
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
            <div className="col-sm-2 forFifty">
              <Form.Item name="status" valuePropName="checked" label="Status">
                <Input defaultValue="Active" readOnly />
              </Form.Item>
            </div>

            {/* <div className="col-sm-2 forFifty customertype">
              <Form.Item name="customer_type_id" label="Customer Type">
                <Select
                  placeholder="Customer Type"
                  defaultValue={customertype?.data[0]?._id}
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
                className="prospectusss"
              >
                <Switch onChange={handleChangeStatus} />
              </Form.Item>
            </div> */}

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
                rules={[
                  { required: true, message: "Please input your Lastname!" },
                ]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </div>

            {/* <div className="col-sm-6">
                            <Form.Item
                                label="Country"
                                name="country_id"
                                rules={[
                                    { required: true, message: "Please select your Country!" },
                                ]}
                            >
                            <Select
                                placeholder="Country"
                                showSearch
                                defaultValue={"United States"}
                            >
                                <Option key='1' value='us'>United States</Option>
                                <Option key='2' value='pk'>Pakistan</Option>
                                <Option key='3' value='uk'>United Kingdom</Option>
                                <Option key='4' value='in'>India</Option>
                                <Option key='5' value='uK'>Umer Kott</Option>
                                <Option key='6' value='qt'>Qatar</Option>
                            </Select>
                            </Form.Item>
                        </div> */}

            <div className="col-sm-3 forFifty">
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
                  onChange={(address) => setFormData({ ...formData, address })}
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
            <div className="col-sm-3 forFifty">
              <Form.Item
                label="State"
                name={"state_id"}
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
                name="zipcode"
                label="Zip Code"
                rules={[
                  {
                    required: true,
                    message: "Please input your zipcode!",
                  },
                ]}
              >
                <Input placeholder="Zip-Code" type="number" />
              </Form.Item>
            </div>
            <div className="col-sm-6">
              <Form.Item
                label="Email Title "
                name="customer_email_title"
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
                label="Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Email is required",
                  },
                ]}
              >
                <Input placeholder="E-mail" />
              </Form.Item>
            </div>

            {/* <div className="col-sm-12">
                            {EmailData?.map((item, key) => {
                                return (
                                    <span className="row display-flex-1" key={key}>
                                        <div className="col-sm-5">
                                            <Form.Item
                                                name={`Title ${key + 1}`}
                                                label={`Title ${key + 1}`}
                                                initialValue={item?.title}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Missing title",
                                                    },
                                                ]}
                                            >
                                                <Input type="text" placeholder={`title`} />
                                            </Form.Item>
                                        </div>
                                        <div className="col-sm-6">
                                            <Form.Item
                                                name={`Email ${key + 1}`}
                                                label={`Email ${key + 1}`}
                                                initialValue={item?.Email}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Missing Email",
                                                    },
                                                ]}
                                            >
                                                <Input type="email" placeholder={`Email`} />
                                            </Form.Item>
                                        </div>
                                        <div className="col-sm-1">
                                            <MinusCircleOutlined onClick={() => HandleEmail(key)} />
                                        </div>
                                    </span>
                                );
                            })}
                            <Form.List name="EmailData1">
                            {(fields, { add, remove }) => (
                                <>
                                {fields.map(({ key, name, ...restField }) => (
                                <span className="row display-flex-1" key={key}>
                                    <div className="col-sm-5">
                                    <Form.Item
                                        {...restField}
                                        name={[name, "title"]}
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
                                    <div className="col-sm-6">
                                    <Form.Item
                                        {...restField}
                                        name={[name, "Email"]}
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
                                    <div className="col-sm-1">
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                    </div>
                                </span>
                                ))}
                                <Form.Item>
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
                        </div> */}

            <div className="col-sm-6">
              <Form.Item
                label="Phone Title "
                name="customer_phone_title"
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
                label="Mobile No"
                rules={[
                  {
                    required: true,
                    message: "Please input your mobile!",
                  },
                ]}
              >
                <Input placeholder="Mobile # (primary)" type="number" />
              </Form.Item>
            </div>

            {/* <div className="col-sm-12">
                            {PhoneData?.map((item, key1) => {
                                return (
                                    <span className="row display-flex-1" key={key1}>
                                        <div className="col-sm-5">
                                            <Form.Item
                                                name={`title ${key1 + 1}`}
                                                label={`Title ${key1 + 1}`}
                                                initialValue={item?.title}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Missing title",
                                                    },
                                                ]}
                                            >
                                                <Input type="text" placeholder={`title`} />
                                            </Form.Item>
                                        </div>
                                        <div className="col-sm-6">
                                            <Form.Item
                                                name={`Phone ${key1 + 1}`}
                                                label={`Title ${key1 + 1}`}
                                                initialValue={item?.Phone}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Missing Emails",
                                                    },
                                                ]}
                                            >
                                                <Input type="phone" placeholder={`Phone`} />
                                            </Form.Item>
                                        </div>
                                        <div className="col-sm-1">
                                            {" "}
                                            <MinusCircleOutlined onClick={() => HandlePhone(key1)} />
                                        </div>
                                    </span>
                                );
                            })}
                            <Form.List name="PhoneData">
                            {(fields, { add, remove }) => (
                                <>
                                {fields.map(({ key, name,fieldKey, ...restField }) => (
                                <span className="row display-flex-1" key={key}>
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
                                    <Input type="text" placeholder={`Title`} />
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
                                    <Input placeholder="Mobile #" type="number" />
                                    </Form.Item>
                                </div>
                                <div className="col-sm-1">
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </div>
                                </span>
                                ))}
                                <Form.Item>
                                    <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                    icon={<PlusOutlined />}
                                    >
                                    Add Multiple Mobile No
                                    </Button>
                                </Form.Item>
                                </>
                            )}
                            </Form.List>
                        </div> */}

            {customer_type === "commerical" ? (
              <>
                <div className="col-sm-6">
                  <Form.Item
                    name="company_name"
                    label="Company Name"
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

                <div className="col-sm-6">
                  <Form.Item
                    label="Company Code"
                    name="company_address"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Company Code!",
                      },
                    ]}
                    initialValue="B-356"
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

            <div className="col-sm-6">
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
            </div>

            <div className="col-sm-6">
              <Form.Item name="tags" label="Tags">
                <Select
                  mode="tags"
                  style={{
                    width: "100%",
                  }}
                  placeholder="Tags Mode"
                  // onChange={handleChangeTags}
                  value={options}
                >
                  {customertags?.data?.map((item) => {
                    return <Option value={item._id}>{item?.name}</Option>;
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className="col-sm-6 forFifty  addCustomTags">
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

            <div className="col-sm-12 savebtn">
              <Form.Item>
                {/* <Link to={`/prospect/service-location/${id}`}>
                  <Button
                    className="bluebtn viewServiceLocation sendProspect"
                    type="secondary"
                    // onClick={() => UpdateServiceLocationNavigation()}
                    disabled={false}
                  >
                    {" "}
                    Add Service Location
                  </Button>
                </Link> */}
                <Button
                  className="yellowbtn updateCustomer"
                  type="primary"
                  htmlType="submit"
                  // loading={loading}
                >
                  {" "}
                  Convert Customer
                </Button>
              </Form.Item>
              <Form.Item></Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </Fragment>
  );
}
