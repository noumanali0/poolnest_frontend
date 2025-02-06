import React, { useRef, useState, Fragment } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { LoadScript } from "@react-google-maps/api";
import { Form, Select, Input, Button, Checkbox, Tooltip } from "antd";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  postTechnicianData,
  resetData,
} from "../../redux/postReducer/postTechnician";
import { toast } from "react-toastify";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Switch, Space } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Item } = Form;

function AddTechnicianForm() {
  const form = Form.useForm()[0];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isAdmin, setIsadmin] = useState(false);
  const [is_active, setis_active] = useState(true);
  const { data, loading, success, error } = useSelector(
    (state) => state.postTechnician
  );

  const colorJson = [
    { name: "Red", hex: "#FF0000" },
    { name: "Green", hex: "#008000" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Orange", hex: "#FFA500" },
    { name: "Purple", hex: "#800080" },
    { name: "Cyan", hex: "#00FFFF" },
    { name: "Magenta", hex: "#FF00FF" },
    { name: "Lime", hex: "#00FF00" },
    { name: "Pink", hex: "#FFC0CB" },
    { name: "Teal", hex: "#008080" },
    { name: "Indigo", hex: "#4B0082" },
    { name: "Maroon", hex: "#800000" },
    { name: "Navy", hex: "#000080" },
    { name: "Olive", hex: "#808000" },
    { name: "Silver", hex: "#C0C0C0" },
    { name: "Sky Blue", hex: "#87CEEB" },
    { name: "Gold", hex: "#FFD700" },
    { name: "Violet", hex: "#EE82EE" },
    { name: "Turquoise", hex: "#40E0D0" },
  ];
  const [colorCode, setColorCode] = useState("black"); // Initial color
  const [formData, setFormData] = useState({
    is_active: true,
    see_other_tech: false,
    manage_admin_panel: false,
    manage_general_settings: false,
    manage_route_stops: false,
    rearrange_routes: false,
    notify_email: false,
    notify_sms: false,
  });

  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

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

  const handleColorChange = (color) => {
    const metaColor = color.metaColor;
    const hexColor = `#${metaColor.toHex()}`;
    setColorCode(hexColor);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleToggleChange = (e) => {
    console.log(e);
    setis_active(e);
  };

  const handleSelectChange = (value) => {
    if (value === "Admin") {
      const updatedFormData = {};
      for (const key in formData) {
        updatedFormData[key] = true;
      }
      setIsadmin(true);
      setFormData(updatedFormData);
    } else {
      setFormData({
        is_active: false,
        see_other_tech: false,
        manage_admin_panel: false,
        manage_general_settings: false,
        manage_route_stops: false,
        rearrange_routes: false,
        notify_email: false,
        notify_sms: false,
      });
      setIsadmin(false);
    }
  };

  const onFinish = async (values) => {
    const Data = {
      color_code: colorCode == "black" ? "#000" : colorCode,
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      phone_no: values.phone_no,
      longitude: coordinates?.lng.toString(),
      latitude: coordinates?.lat.toString(),
      user_type:
        values.user_type == undefined ? "Technician" : values.user_type,
      password: values.password,
      Address: address,
      is_active: is_active,
      see_other_tech: formData.see_other_tech,
      manage_admin_panel: formData.manage_admin_panel,
      manage_general_settings: formData.manage_general_settings,
      manage_route_stops: formData.manage_route_stops,
      notify_email: formData.notify_email,
      notify_sms: formData.notify_sms,
      rearrange_routes: true,
    };
    await dispatch(postTechnicianData({ Data }));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetData());
      navigate("/user");
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const newErr = "This Email is already in used";
      toast.error(error);
      dispatch(resetData());
    }
  }, [error]);
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
    <Fragment>
      <div className="container-fluid modals addTechnicianFormmmss">
        <Form
          name="nest-messages"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className="row">
            <div className="col-sm-12">
              <div className="row editTechnicianFormAdd">
                <div className="col-sm-6">
                  <Form.Item
                    label="First Name"
                    name="first_name"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                </div>

                <div className="col-sm-6">
                  <Form.Item
                    label="Last Name"
                    name="last_name"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                </div>

                <div className="col-sm-6">
                  <div>
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
                          <Item label="Address" name="location">
                            <Input
                              {...getInputProps({
                                placeholder: "Enter Address",
                              })}
                            />
                            <div>
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
                  </div>
                </div>
                <div className="col-sm-6 colorPicker">
                  <Form.Item
                    label="Color Code"
                    name="color_code"
                    initialValue={colorCode}
                    rules={[
                      { required: true, message: "Color Code is required" },
                    ]}
                  >
                    <Select
                      placeholder="Color Code"
                      defaultValue={colorCode}
                      onChange={(e) => setColorCode(e)}
                    >
                      {colorJson?.map((item, i) => {
                        return <Option value={item?.hex}>{item.name}</Option>;
                      })}
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-sm-6">
                  <Form.Item
                    label="User Type"
                    name="user_type"
                    // rules={[{ required: true }]}
                  >
                    <Select
                      placeholder="Role"
                      defaultValue="Technician"
                      onChange={handleSelectChange}
                    >
                      <Select.Option value="Technician">
                        Technician
                      </Select.Option>
                      <Select.Option value="Admin">Admin</Select.Option>
                    </Select>
                  </Form.Item>
                </div>

                <div className="col-sm-6">
                  <Form.Item
                    label="Phone Number"
                    name="phone_no"
                    rules={[{ required: true }]}
                  >
                    <Input type="number" placeholder="Phone Number" />
                  </Form.Item>
                </div>

                <div className="col-sm-6">
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true }]}
                  >
                    <Input type="email" placeholder="Email" />
                  </Form.Item>
                </div>
                <div className="col-sm-6 password">
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

                <div className="col-sm-12 checkBoxxx">
                  {isAdmin ? (
                    <>
                      <Checkbox
                        name="notify_email"
                        checked={formData.notify_email}
                        onChange={handleCheckboxChange}
                      >
                        Notify Email
                      </Checkbox>

                      <Checkbox
                        name="notify_sms"
                        checked={formData.notify_sms}
                        onChange={handleCheckboxChange}
                      >
                        Notify SMS
                      </Checkbox>
                    </>
                  ) : (
                    <Form.Item>
                      {/* <Checkbox
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleCheckboxChange}
                    >
                      is active
                    </Checkbox> */}
                      <Switch
                        name="is_active"
                        onChange={handleToggleChange}
                        className="isactive_tech"
                        checkedChildren="isActive"
                        unCheckedChildren="inActive"
                        defaultChecked
                      />

                      <Checkbox
                        name="see_other_tech"
                        checked={formData.see_other_tech}
                        onChange={handleCheckboxChange}
                      >
                        see other tech
                      </Checkbox>
                      <Checkbox
                        name="manage_admin_panel"
                        checked={formData.manage_admin_panel}
                        onChange={handleCheckboxChange}
                      >
                        manage admin panel in the App
                      </Checkbox>
                      <Checkbox
                        name="manage_general_settings"
                        checked={formData.manage_general_settings}
                        onChange={handleCheckboxChange}
                      >
                        manage general settings
                      </Checkbox>
                      <Checkbox
                        name="manage_route_stops"
                        checked={formData.manage_route_stops}
                        onChange={handleCheckboxChange}
                      >
                        manage route stops
                      </Checkbox>
                      <Checkbox
                        name="notify_email"
                        checked={formData.notify_email}
                        onChange={handleCheckboxChange}
                      >
                        Notify Individual of new account
                      </Checkbox>

                      <Checkbox
                        name="notify_sms"
                        checked={formData.notify_sms}
                        onChange={handleCheckboxChange}
                      >
                        Notify SMS
                      </Checkbox>
                      {/* <Checkbox
                      name="rearrange_routes"
                      checked={formData.rearrange_routes}
                      onChange={handleCheckboxChange}
                    >
                      rearrange routes
                    </Checkbox> */}
                    </Form.Item>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-12 submitbtn workBtn techlnglat">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={loading}
                loading={loading}
              >
                Save
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Fragment>
  );
}

export default AddTechnicianForm;
