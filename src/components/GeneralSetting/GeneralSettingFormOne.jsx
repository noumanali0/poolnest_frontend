import React, { Fragment, useEffect, useState } from "react";
import { Button, Checkbox, DatePicker, Form, Input, Radio, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchgetGeneralSettingApi } from "../../redux/Slices/geGeneralSettingData";
import { toast } from "react-toastify";
import {
  postgeneralSettingData,
  resetData,
} from "../../redux/postReducer/postGeneralSetting";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import moment from "moment-timezone";

export default function GeneralSettingFormOne() {
  const { data: getGeneralSettingApi, statusdata } = useSelector(
    (state) => state.getGeneralSettingApi
  );

  const { error, loading, success } = useSelector(
    (state) => state.postgeneralSetting
  );
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState();
  const { Item } = Form;

  const [ShowTechNumber, setShowTechNumber] = useState();
  const [ShowTechEmail, setShowTechEmail] = useState();
  const [value, setValue] = useState(false);
  const [address, setAddress] = useState(getGeneralSettingApi?.CompanyAddress);

  const [friday, setfriday] = useState(false);
  const [monday, setmonday] = useState(false);
  const [saturday, setsaturday] = useState(false);
  const [sunday, setsunday] = useState(false);
  const [thursday, setthursday] = useState(false);
  const [tuesday, settuesday] = useState(false);
  const [wednesday, setwednesday] = useState(false);
  const [alldays, setalldays] = useState(false);

  const [CustomerSortByFirstName, setCustomerSortByFirstName] = useState(false);
  const [TimeZoneValue, setTimeZoneValue] = useState(
    getGeneralSettingApi?.TimeZone
  );

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
  useEffect(() => {
    dispatch(fetchgetGeneralSettingApi());
  }, [dispatch]);

  useEffect(() => {
    setCustomerSortByFirstName(getGeneralSettingApi.CustomerSortByFirstName);
    setTimeZoneValue(getGeneralSettingApi.TimeZone);
  }, [getGeneralSettingApi]);

  useEffect(() => {
    if (
      monday &&
      tuesday &&
      wednesday &&
      thursday &&
      friday &&
      saturday &&
      sunday
    ) {
      setalldays(true);
    } else {
      setalldays(false);
    }
  }, [monday, tuesday, wednesday, thursday, friday, saturday, sunday]);

  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  };

  const onFinish = async (data, key) => {
    const values = {
      CustomerSortByFirstName: CustomerSortByFirstName,
      TimeZoneName: data?.TimeZoneName,
      TimeZone: TimeZoneValue,
      DefaultMinutesStop: data?.DefaultMinutesStop,
      CompanyAddress: data?.CompanyAddress,
      ShowTechEmail: ShowTechEmail,
      ShowTechNumber: ShowTechNumber,
      monday: monday,
      tuesday: tuesday,
      wednesday: wednesday,
      thursday: thursday,
      friday: friday,
      saturday: saturday,
      sunday: sunday,
      longitude: coordinates?.lng
        ? coordinates?.lng.toString()
        : coordinates?.lng,
      latitude: coordinates?.lat
        ? coordinates?.lat.toString()
        : coordinates?.lat,
    };
    dispatch(postgeneralSettingData({ values }));
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(fetchgetGeneralSettingApi());
      dispatch(resetData());
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, success]);

  useEffect(() => {
    setFormData({
      CompanyAddress: getGeneralSettingApi?.CompanyAddress,
      CustomerSortByFirstName:
        getGeneralSettingApi?.CustomerSortByFirstName || "",
      DefaultMinutesStop: getGeneralSettingApi?.DefaultMinutesStop || "",
      ShowTechEmail: getGeneralSettingApi?.ShowTechEmail || "",
      ShowTechNumber: getGeneralSettingApi?.ShowTechNumber,
      TimeZone: getGeneralSettingApi?.TimeZone,
      TimeZoneName: getGeneralSettingApi?.TimeZoneName || "",
    });
    // setTimeZoneValue(getGeneralSettingApi?.TimeZone);
    setShowTechEmail(getGeneralSettingApi?.ShowTechEmail);
    setShowTechNumber(getGeneralSettingApi?.ShowTechNumber);
    // setAddress(getGeneralSettingApi?.CompanyAddress);
  }, [getGeneralSettingApi]);
  const [timeZoneOptions, setTimeZoneOptions] = useState([]);

  useEffect(() => {
    const requiredTimeZones = {
      "America/New_York": "Eastern Standard Time",
      "America/Chicago": "Central Standard Time",
      "America/Denver": "Mountain Standard Time",
      "America/Los_Angeles": "Pacific Standard Time",
      "America/Anchorage": "Alaska Standard Time",
      "Pacific/Honolulu": "Hawaii-Aleutian Standard Time",
    };

    const timezones = Object.entries(requiredTimeZones).map(
      ([zone, label]) => ({
        value: moment.tz(zone).format("Z"), // Offset in ±HH:mm format
        label: `${label} (UTC${moment.tz(zone).format("Z")})`, // Label with standardized name and offset
      })
    );

    setTimeZoneOptions(timezones);
  }, []);

  form.setFieldsValue({
    CompanyAddress: formData?.CompanyAddress,
    CustomerSortByFirstName: formData?.CustomerSortByFirstName || "",
    DefaultMinutesStop: formData?.DefaultMinutesStop || "",
    ShowTechEmail: ShowTechEmail || "",
    ShowTechNumber: ShowTechNumber || "",
    TimeZone: TimeZoneValue || "",
    TimeZoneName: formData?.TimeZoneName,
  });
  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const handleChangeTimeZone = (e) => {
    setTimeZoneValue(e);
  };

  const onChange = (e) => {
    setCustomerSortByFirstName(e.target.value === "true");
  };

  const handleDays = (e) => {
    const isChecked = e.target.checked;
    setalldays(isChecked);
    setmonday(isChecked);
    settuesday(isChecked);
    setwednesday(isChecked);
    setthursday(isChecked);
    setfriday(isChecked);
    setsaturday(isChecked);
    setsunday(isChecked);
  };
  return (
    <Fragment>
      <div className="row fomik customer cslocation generalFilters customerInfo">
        <div className="col-sm-12">
          <h4 className="sortCustHead">Sort Customers By</h4>
        </div>
        <Form
          name="General"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Radio.Group
            name="CustomerSortByFirstName"
            onChange={onChange}
            value={CustomerSortByFirstName?.toString()}
          >
            <div className="col-sm-12">
              <Radio value={true?.toString()}>First Name</Radio>
            </div>
            <div className="col-sm-12">
              <Radio value={false?.toString()}>Last Name</Radio>
            </div>
          </Radio.Group>

          <div className="col-sm-6">
            <Form.Item name="TimeZoneName" label="Current User Time Zone Name">
              <Select
                allowClear
                showSearch
                filterOption={filterOption}
                placeholder="Please Select Time Zone"
                onChange={handleChangeTimeZone}
                value={TimeZoneValue}
              >
                {timeZoneOptions?.map((option, i) => (
                  <Option key={i} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="col-sm-6">
            <Form.Item name="TimeZone" label="Current User Time Zone Value">
              <Input placeholder="Current User Time Zone Value" />
            </Form.Item>
          </div>
          <div className="col-sm-12">
            <Form.Item
              name="DefaultMinutesStop"
              label="Default Minutes Of Route Stop"
            >
              <Input placeholder="Default Minutes Of Route Stop" />
            </Form.Item>
          </div>

          <div className="col-sm-12">
            <Form.Item label="Default Time">
              <Input placeholder="Default Time 9:00 AM" value={"9:00 AM"} />
            </Form.Item>
          </div>

          <div className="col-sm-12 checkBoxGeneral">
            <div className="row cslocation">
              <Form.Item label="Days">
                <div className="col-sm-3">
                  <Checkbox checked={alldays} onChange={handleDays}>
                    All Days
                  </Checkbox>
                </div>
                <div className="col-sm-3">
                  <Checkbox
                    checked={monday}
                    onChange={(e) => setmonday(e.target.checked)}
                  >
                    Monday
                  </Checkbox>
                </div>
                <div className="col-sm-3">
                  <Checkbox
                    checked={tuesday}
                    onChange={(e) => settuesday(e.target.checked)}
                  >
                    Tuesday
                  </Checkbox>
                </div>
                <div className="col-sm-3">
                  <Checkbox
                    checked={wednesday}
                    onChange={(e) => setwednesday(e.target.checked)}
                  >
                    Wednesday
                  </Checkbox>
                </div>
                <div className="col-sm-3">
                  <Checkbox
                    checked={thursday}
                    onChange={(e) => setthursday(e.target.checked)}
                  >
                    Thursday
                  </Checkbox>
                </div>
                <div className="col-sm-3">
                  <Checkbox
                    checked={friday}
                    onChange={(e) => setfriday(e.target.checked)}
                  >
                    Friday
                  </Checkbox>
                </div>
                <div className="col-sm-3">
                  <Checkbox
                    checked={saturday}
                    onChange={(e) => setsaturday(e.target.checked)}
                  >
                    Saturday
                  </Checkbox>
                </div>
                <div className="col-sm-3">
                  <Checkbox
                    checked={sunday}
                    onChange={(e) => setsunday(e.target.checked)}
                  >
                    Sunday
                  </Checkbox>
                </div>
              </Form.Item>
            </div>
          </div>

          <div className="col-sm-12 npGap">
            <PlacesAutocomplete
              value={formData?.CompanyAddress}
              onChange={(CompanyAddress) =>
                setFormData({ ...formData, CompanyAddress })
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
                  <Item label="Company Address" name="address">
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

          <div className="col-sm-12 npGap">
            <Form.Item name="ShowTechEmail">
              <Checkbox
                checked={ShowTechEmail}
                onChange={(e) => setShowTechEmail(e.target.checked)}
              >
                Show Techs customer email address on the route stop screen
              </Checkbox>
            </Form.Item>
          </div>
          <div className="col-sm-12 ">
            <Form.Item name="ShowTechNumber">
              <Checkbox
                checked={ShowTechNumber}
                onChange={(e) => setShowTechNumber(e.target.checked)}
              >
                Show Techs customer phone number on the route stop screen
              </Checkbox>
            </Form.Item>
          </div>
          <div className="col-sm-12 submitbtn workBtn">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                // className="saaavvveeeBtnnn"
                disabled={loading}
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
