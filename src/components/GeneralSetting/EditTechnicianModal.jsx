import React, { Fragment, useState } from "react";
import {
  Form,
  Select,
  Input,
  Button,
  Checkbox,
  ColorPicker,
  Switch,
} from "antd";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updatedTechnicianData,
  resetData,
} from "../../redux/postReducer/postTechnician";
import { toast } from "react-toastify";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { fetchTechnician } from "../../redux/Slices/GetTechnician";

const { Option } = Select;
function EditTechnicianModal({ state, handleEditClose }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState(state?.id?.company_address);
  const { Item } = Form;

  const [formData, setFormData] = useState();
  const [checkAdmin, setcheckAdmin] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lat: state?.id?.latitude,
    lng: state?.id?.longitude,
  });

  const [is_active, setis_active] = useState(false);
  const [manage_admin_panel, setmanage_admin_panel] = useState(false);
  const [manage_general_settings, setmanage_general_settings] = useState(false);
  const [manage_route_stops, setmanage_route_stops] = useState(false);
  const [rearrange_routes, setrearrange_routes] = useState(false);
  const [see_other_tech, setsee_other_tech] = useState(false);
  const [notify_sms, setnotify_sms] = useState(false);
  const [notify_email, setnotify_email] = useState(false);

  const handleToggleChange = (e) => {
    setis_active(e);
  };

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
    setFormData({
      color_code: state?.color_code,
      email: state?.email || "",
      first_name: state?.first_name || "",
      company_address: state?.company_address || "",
      is_active: is_active || "",
      last_name: state?.last_name,
      latitude: state?.latitude,
      longitude: state?.longitude,
      manage_admin_panel: manage_admin_panel,
      manage_general_settings: manage_general_settings,
      manage_route_stops: manage_route_stops,
      rearrange_routes: rearrange_routes,
      user_type: state?.user_type,
      address: state?.Address,
      phone_no: state?.phone_no,
    });
  }, [state]);

  const { data, loading, success, error } = useSelector(
    (state) => state.postTechnician
  );
  useEffect(() => {
    if (state.user_type == "Technician") {
      setcheckAdmin(false);
    } else {
      setcheckAdmin(true);
    }
  }, []);

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };
  const [colorCode, setColorCode] = useState(state?.color_code); // Initial color
  const handleColorChange = (color) => {
    const metaColor = color.metaColor;
    const hexColor = `#${metaColor.toHex()}`;
    setColorCode(hexColor);
  };

  const [formData1, setFormData1] = useState({
    is_active: false,
    see_other_tech: false,
    manage_admin_panel: false,
    manage_general_settings: false,
    manage_route_stops: false,
    rearrange_routes: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData1({ ...formData1, [name]: checked });
  };

  const handleSelectChange = (value) => {
    if (value === "Admin") {
      const updatedFormData = {};
      for (const key in formData1) {
        updatedFormData[key] = true;
      }
      setFormData1(updatedFormData);
      setcheckAdmin(true);
    } else {
      setFormData1({
        is_active: false,
        see_other_tech: false,
        manage_admin_panel: false,
        manage_general_settings: false,
        manage_route_stops: false,
        rearrange_routes: false,
      });
      setcheckAdmin(false);
    }
  };

  const id = state._id;

  const onFinish = async (values) => {
    const Data = {
      color_code: colorCode,
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      phone_no: values.phone_no,
      Address: address,
      user_type:
        values.user_type == undefined ? "Technician" : values.user_type,
      longitude: coordinates?.lng
        ? coordinates?.lng.toString()
        : coordinates?.lng,
      latitude: coordinates?.lat
        ? coordinates?.lat.toString()
        : coordinates?.lat,
      password: values.password,
      is_active: is_active,
      see_other_tech: see_other_tech,
      manage_admin_panel: manage_admin_panel,
      manage_general_settings: manage_general_settings,
      manage_route_stops: manage_route_stops,
      rearrange_routes: true,
      notify_email: notify_email,
      notify_sms: notify_sms,
    };

    await dispatch(updatedTechnicianData({ id, Data }));
  };

  // Handle successful form submission
  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetData());
      const status = "Technician";
      dispatch(fetchTechnician({ status }));
      handleEditClose();
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, success]);

  useEffect(() => {
    if (state) {
      form.setFieldsValue({
        color_code: state.color_code,
        email: state.email || "",
        first_name: state.first_name || "",
        company_address: state.company_address || "",
        last_name: state.last_name,
        manage_admin_panel: state.manage_admin_panel,
        manage_general_settings: state.manage_general_settings,
        manage_route_stops: state.manage_route_stops,
        rearrange_routes: state.rearrange_routes,
        is_active: state.is_active || "",
        user_type: state.user_type,
        address: state.Address,
        phone_no: state?.phone_no,
      });
    }
  }, [state]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Fragment>
      <div className="container-fluid modals addTechnicianFormmmss">
        <Form
          name="User"
          onValuesChange={handleFormValuesChange}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={formData}
        >
          <div className="row">
            <div className="col-sm-12">
              <div className="row editTechnicianFormAdd">
                <div className="col-sm-6">
                  <Form.Item
                    label="First Name"
                    name="first_name"
                    value={formData?.first_name}
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
                    value={formData?.last_name}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                </div>
                <div className="col-sm-6">
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
                    {/* <ColorPicker
                    showText
                    onChange={handleColorChange}
                    // Pass the current color to the ColorPicker
                  /> */}
                  </Form.Item>
                </div>
                <div className="col-sm-6">
                  <Form.Item
                    label="Technician"
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
                  <Form.Item name="password" label="Password">
                    <Input.Password type="password" placeholder="Password" />
                  </Form.Item>
                </div>
                {/* <div className="col-sm-6">
                <Form.Item name="password" label="Password">
                  <Input type="password" placeholder="Password" />
                </Form.Item>
              </div> */}

                {state?.user_type == "Technician" && !checkAdmin ? (
                  <div
                    className="col-sm-12 checkBoxxx"
                    style={{ display: "flex", flexWrap: "wrap" }}
                  >
                    <Form.Item name="is_active" valuePropName="checked">
                      <Switch
                        onChange={handleToggleChange}
                        className="isactive_tech"
                        checkedChildren="isActive"
                        unCheckedChildren="not Active"
                      />
                    </Form.Item>

                    <Form.Item
                      name="manage_admin_panel"
                      valuePropName="checked"
                    >
                      <Checkbox
                        checked={manage_admin_panel}
                        onChange={(e) =>
                          setmanage_admin_panel(e.target.checked)
                        }
                      >
                        manage admin panel in the App
                      </Checkbox>
                    </Form.Item>

                    <Form.Item name="see_other_tech" valuePropName="checked">
                      <Checkbox
                        checked={see_other_tech}
                        onChange={(e) => setsee_other_tech(e.target.checked)}
                      >
                        see other tech
                      </Checkbox>
                    </Form.Item>

                    <Form.Item
                      name="manage_general_settings"
                      valuePropName="checked"
                    >
                      <Checkbox
                        checked={manage_general_settings}
                        onChange={(e) =>
                          setmanage_general_settings(e.target.checked)
                        }
                      >
                        manage general settings
                      </Checkbox>
                    </Form.Item>

                    <Form.Item
                      name="manage_route_stops"
                      valuePropName="checked"
                    >
                      <Checkbox
                        checked={manage_route_stops}
                        onChange={(e) =>
                          setmanage_route_stops(e.target.checked)
                        }
                      >
                        manage route stops
                      </Checkbox>
                    </Form.Item>

                    <Form.Item name="notify_email" valuePropName="checked">
                      <Checkbox
                        checked={notify_email}
                        onChange={(e) => setnotify_email(e.target.checked)}
                      >
                        Notify Email
                      </Checkbox>
                    </Form.Item>
                    <Form.Item name="notify_sms" valuePropName="checked">
                      <Checkbox
                        checked={notify_sms}
                        onChange={(e) => setnotify_sms(e.target.checked)}
                      >
                        Notify SMS
                      </Checkbox>
                    </Form.Item>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          <div className="col-sm-12 submitbtn workBtn">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={loading}
                loading={loading}
              >
                {" "}
                Save{" "}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Fragment>
  );
}

export default EditTechnicianModal;
