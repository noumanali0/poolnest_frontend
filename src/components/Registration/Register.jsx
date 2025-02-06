import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Space,
  Select,
  Radio,
  Tooltip,
  Checkbox,
} from "antd";
import { FaLock } from "react-icons/fa";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
// import { LoadScript } from "@react-google-maps/api";
import { ConsoleSqlOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchpackagesData } from "../../redux/Slices/getPackages";
import {
  postRegistrationData,
  resetData,
} from "../../redux/postReducer/PostRegistration";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchgetAllCityByRespectedCountry,
  fetchgetCustomerCity,
} from "../../redux/Slices/getCustomerCity";
import img3 from "../../assets/img/bannerImage.png";
import { fetchgetCustomerState } from "../../redux/Slices/getCustomerState";

const { Option } = Select;
const { Item } = Form;
const Registration = ({ data }) => {
  const [address, setAddress] = useState("");
  const [countryid, setcountryid] = useState("");
  const [stateid, setstateid] = useState("");
  const [isChecked, setIsChecked] = useState(true); // Initialize state

  const { data: packagesData, statusdata } = useSelector(
    (state) => state.packagesData
  );
  const customerstate = useSelector((state) => state.getCustomerState);

  const { error, success, loading } = useSelector(
    (state) => state.postRegistration
  );
  const postDataResult = useSelector((state) => state.postRegistration);

  const { data: getCustomerCity } = useSelector(
    (state) => state.getCustomerCity
  );

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSearch = (name) => {
    dispatch(fetchgetCustomerCity({ name: name ? name : "", id: stateid }));
  };
  const onChange = (e) => {
    setIsChecked(e.target.checked); // Update state based on checkbox value
  };
  useEffect(() => {
    dispatch(fetchpackagesData());
    // dispatch(fetchgetCustomerCity({ id: stateid }));
    dispatch(
      fetchgetCustomerState({ id: "9055cb17-c6e4-4223-8d08-77b9d9702c33" })
    );
  }, [dispatch, stateid]);

  const CustomerRange = [
    {
      id: "1",
      value: "0-49",
    },
    {
      id: "1",
      value: "50-99",
    },
    {
      id: "1",
      value: "100-249",
    },
    {
      id: "1",
      value: "250-499",
    },
    {
      id: "1",
      value: "500-10000",
    },
  ];

  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const handleSelect = async (selectedAddress) => {
    try {
      setAddress(selectedAddress); // Update address state with the selected address

      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      console.log("latLng", latLng);
      setCoordinates(latLng);
    } catch (error) {
      console.error("Error fetching coordinates", error);
    }
  };

  const handleChangeCity = (countryid) => {
    setcountryid(countryid);
    const value = "";
    dispatch(fetchgetAllCityByRespectedCountry({ countryid, value }));
  };

  const onFinish = async (values, key) => {
    try {
      const storeValue = values;
      const valuesArray = storeValue?.Range
        ? storeValue?.Range?.split("-")
        : ["0", "49"];
      const customerRange1 = valuesArray[0];
      const customerRange2 = valuesArray[1];
      const data = new FormData();
      data.append("FirstName", storeValue?.FirstName);
      data.append("LastName", storeValue?.LastName);
      data.append("Company", storeValue?.Company);
      data.append("Address", address);
      data.append("longitude", coordinates?.lng?.toString());
      data.append("latitude", coordinates?.lat?.toString());
      data.append("Email", storeValue?.Email);
      data.append("Mobile", storeValue?.Mobile);
      data.append("city_id", storeValue?.city_id);
      data.append("Zip", storeValue?.Zip);
      data.append("Name", storeValue?.FirstName + " " + storeValue?.LastName);
      data.append("password", storeValue?.password);
      data.append("CustomerRange1", customerRange1);
      data.append("CustomerRange2", customerRange2);
      data.append("image", storeValue?.image[0]);
      data.append("packageId", packagesData?._id);
      data.append("Consent", isChecked);
      await dispatch(postRegistrationData({ data }));
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  useEffect(() => {
    if (success) {
      toast.success("User Created successfully!");
      console.log("postDataResult", postDataResult);
      dispatch(resetData());
      navigate("/account/payment", {
        state: {
          client_secret: postDataResult?.data,
        },
      });
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, success]);

  const handleNavigate = () => {
    navigate("/");
  };

  const onFinishFailed = (errorInfo) => {};
  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const normFile = ({ fileList }) => {
    return fileList.map((file) => file.originFileObj);
  };

  const handleAddress = async (data) => {
    setAddress(data);
    const results = await geocodeByAddress(data);
    const latLng = await getLatLng(results[0]);
    setCoordinates(latLng);
  };
  const handleChange = (id) => {
    setstateid(id);
    dispatch(fetchgetCustomerCity({ id, name: "" }));
  };

  const passwordValidator = (_, value) => {
    if (value.length < 8) {
      return Promise.reject(
        new Error("Password must be at least 8 characters")
      );
    }
    if (!/[A-Z]/.test(value)) {
      return Promise.reject(
        new Error("Password must contain at least one uppercase letter")
      );
    }
    if (!/[a-z]/.test(value)) {
      return Promise.reject(
        new Error("Password must contain at least one lowercase letter")
      );
    }
    if (!/[0-9]/.test(value)) {
      return Promise.reject(
        new Error("Password must contain at least one number")
      );
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return Promise.reject(
        new Error("Password must contain at least one special character")
      );
    }
    if (/\s/.test(value)) {
      return Promise.reject(new Error("Password cannot contain spaces"));
    }

    return Promise.resolve();
  };
  return (
    <div className="row fomik addRoute registerForm">
      <h3 className="main-h1">
        Step 1: Account Information <FaLock />
      </h3>

      <div className="toTab">
        <div className="col-sm-6 froImageBaner">
          <img src={img3} alt="" className="bnrimgone" />
        </div>
      </div>

      <Form
        className="login-form"
        name="Customer"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="row cslocation registerFOrrmmm">
          <div className="col-sm-6">
            <Form.Item
              name="FirstName"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: "Please input First Name!",
                },
              ]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
          </div>

          <div className="col-sm-6">
            <Form.Item
              name="LastName"
              label="Last Name"
              rules={[{ required: true, message: "Please input Last Name!" }]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </div>

          <div className="col-sm-6">
            <Form.Item
              name="Email"
              label="Email"
              rules={[
                { required: true, message: "Please input Email!" },
                { type: "email" },
              ]}
            >
              <Input placeholder="Email" type="email" />
            </Form.Item>
          </div>

          <div className="col-sm-6">
            <Form.Item
              name="Mobile"
              label="Mobile Phone"
              rules={[
                { required: true, message: "Please input Mobile Phone!" },
              ]}
            >
              <Input type="number" placeholder="Mobile Phone" />
            </Form.Item>
          </div>

          <div className="col-sm-6">
            <Form.Item name="Company" label="Company Name">
              <Input placeholder="Company" />
            </Form.Item>
          </div>
          <div className="col-sm-6">
            <div>
              {/* <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
              > */}
              <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
              >
                {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                  <div>
                    <Item label="Address" name="location">
                      <Input
                        {...getInputProps({
                          placeholder: "Enter Address",
                        })}
                      />
                      <div className="suggestion_class">
                        {/* {loading && <div>Loading...</div>} */}
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
                    </Item>
                  </div>
                )}
              </PlacesAutocomplete>
              {/* </LoadScript> */}
            </div>
          </div>

          <div className="col-sm-6 forFifty">
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

          <div className="col-sm-6">
            <Form.Item
              name="city_id"
              label="City"
              rules={[
                {
                  required: true,
                  message: "Please input City!",
                },
              ]}
            >
              <Select
                placeholder="City"
                showSearch
                filterOption={filterOption}
                onSearch={onSearch}
              >
                {getCustomerCity?.map((item, i) => {
                  return <Option value={item?._id}>{item?.name}</Option>;
                })}
              </Select>
            </Form.Item>
          </div>

          <div className="col-sm-6">
            <Form.Item
              name="Zip"
              label="Zip Code"
              rules={[
                {
                  required: true,
                  message: "Please input Zip Code!",
                },
              ]}
            >
              <Input placeholder="Zip Code" />
            </Form.Item>
          </div>

          <div className="col-sm-6">
            <Form.Item
              name="Range"
              label="Average monthly customer count?"
              rules={[
                {
                  required: true,
                  message: "What is the Average monthly customer count?",
                },
              ]}
            >
              <Select placeholder="Customer Range">
                {CustomerRange?.map((item, i) => {
                  return <Option value={item?.value}>{item?.value}</Option>;
                })}
              </Select>
            </Form.Item>
          </div>

          <div className="col-sm-6 inputPassword">
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
                { validator: passwordValidator },
              ]}
              label={
                <span>
                  Password&nbsp;
                  <Tooltip
                    title={
                      <span>
                        Password must meet the following requirements:
                        <ul>
                          <li>At least 8 characters</li>
                          <li>At least one uppercase letter</li>
                          <li>At least one lowercase letter</li>
                          <li>At least one number</li>
                          <li>At least one special character</li>
                          <li>No spaces allowed</li>
                        </ul>
                      </span>
                    }
                  >
                    <InfoCircleOutlined />
                  </Tooltip>
                </span>
              }
            >
              <Input.Password type="password" placeholder="Password" />
            </Form.Item>
          </div>

          <div className="col-sm-6 imageUploader">
            <Form.Item
              name="image"
              label="Company Logo"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[
                {
                  required: true,
                  message: "Please Enter Company Logo!",
                },
              ]}
            >
              <Upload
                name="logo"
                beforeUpload={() => false}
                action="/upload.do"
                listType="picture"
                accept="image/*, audio/*"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>
                  Click to Select Media File
                </Button>
              </Upload>
            </Form.Item>
          </div>
          <div className="col-sm-6 d-flex justify-content-center align-items-center">
            <Form.Item>
              <Checkbox defaultChecked={isChecked} onChange={onChange} />
            </Form.Item>
            <Form.Item className="mx-2">
              <span>
                I agree to receive messages / notifications on my phone number
              </span>
            </Form.Item>
          </div>

          <div className="col-sm-12 loginBtn regNextButton">
            <Form.Item>
              <Button
                disabled={loading}
                className="nextbtn"
                type="primary"
                htmlType="submit"
              >
                Next
              </Button>
            </Form.Item>
            <div className="top-account-css class-login-new tetxright">
              <p>
                Already have an account?{" "}
                <span className="signup-btn" onClick={handleNavigate}>
                  Login
                </span>
              </p>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Registration;
