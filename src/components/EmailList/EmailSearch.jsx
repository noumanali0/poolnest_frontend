import React from "react";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Tag,
} from "antd";
import Switch from "antd/lib/switch";
import { Link, useNavigate } from "react-router-dom"; // Import useHistory
import { useDispatch, useSelector } from "react-redux";
import { postCustomerData } from "../../redux/postReducer/postCustomer";
import {
  postEmailboardcastData,
  postEmailboardcastDatabyDate,
  postEmailboardcastDatabyDay,
  resetData,
} from "../../redux/postReducer/postEmailBoardCast";
import { fetchtag } from "../../redux/Slices/getTags";
import { fetchTechnician } from "../../redux/Slices/GetTechnician";
import { useEffect } from "react";

export default function AddCustomerForm({ emailData }) {
  const [form] = Form.useForm();

  const [tags, settags] = useState([]);
  const [tech, settech] = useState([]);
  const [date, setdate] = useState("");
  const [InputValue, setInputValue] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: tag, status } = useSelector((state) => state.tag);
  const { data: Technician } = useSelector((state) => state.Technician);

  const [dayData, setSelectedDays] = useState([""]); // "All Days" preselected by default

  const handleSelectChange = (day) => {
    dispatch(postEmailboardcastDatabyDay({ dayData, tech }));
    setSelectedDays(day.filter((day) => day !== ""));
  };
  const [selectedRadio, setSelectedRadio] = useState(""); // Initialize with an empty string
  const [isSelectEnabled, setIsSelectEnabled] = useState(true); // Initialize as disabled
  const [isSheduleEnabled, setIsSheduleEnabled] = useState(true); // Initialize as disabled
  const [isRouteEnabled, setIsRouteEnabled] = useState(true); // Initialize as disabled

  const options = [];
  for (let i = 0; i < tag?.length; i++) {
    options.push({
      label: tag[i].name,
      value: tag[i]._id,
    });
  }
  const TechnicianOption = [];

  for (let i = 0; i < Technician?.items?.length; i++) {
    TechnicianOption.push({
      label: Technician?.items[i].first_name,
      value: Technician?.items[i]._id,
    });
  }

  useEffect(() => {
    dispatch(fetchtag());
    dispatch(fetchTechnician());
  }, [dispatch]);

  const onChangeRadio = (e) => {
    setSelectedRadio(e.target.value); // Update the selected radio state
    if (e.target.value == "withDateSelects") {
      setIsSelectEnabled(false);
      setIsSheduleEnabled(true);
      setIsRouteEnabled(true);
    } else if (e.target.value == "scheduled") {
      setIsSheduleEnabled(false);
      setIsSelectEnabled(true);
      setIsRouteEnabled(true);
    } else if (e.target.value == "routeAss") {
      setIsRouteEnabled(false);
      setIsSheduleEnabled(true);
      setIsSelectEnabled(true);
    } else {
      setIsSelectEnabled(true);
      setIsSheduleEnabled(true);
      setIsRouteEnabled(true);
    }
  };
  const { Option } = Select;
  const postDataResult = useSelector((state) => state.postsCustomer);

  const onFinish = (values) => {
    console.log(values);
    if (values.status == undefined) {
      values.status = "inactive";
    }
    // values.DateSelect = ["abcd"];
  };

  // Handle form submission error
  useEffect(() => {
    if (postDataResult.error) {
      const err = postDataResult.error;
      // form.resetFields();
      toast.error(err);
    }
  }, [postDataResult.error, form]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    toast.error("Please fill all required fields!");
  };
  const [DateSelects, setDateSelects] = useState([]);

  const handleInputChange = (date, newdate) => {
    setdate(newdate);
    dispatch(postEmailboardcastDatabyDate({ newdate, tech }));

    // setInputValue(newdate);
    // if (newdate && !DateSelects.includes(newdate)) {
    //   setDateSelects([...DateSelects, newdate]);
    //   form.setFieldsValue({ NoOfPartners: "" });
    // }
  };

  const handleChangeTags = (value) => {
    console.log(value);
    const sendData = {
      Tags: value,
    };

    // const Tags = value.map((tagValue) => ({ Tags: tagValue }));

    dispatch(postEmailboardcastData({ Tags: sendData }));
    settags(value);
  };

  const handleChangeTech = (tech) => {
    let newdate = date;
    dispatch(postEmailboardcastDatabyDate({ newdate, tech }));
  };
  const handleAllCustomer = () => {
    dispatch(resetData());
  };

  const handleChangeTechwithDay = (tech) => {
    const day = "";
    dispatch(postEmailboardcastDatabyDay({ dayData, tech }));
  };

  const navigateToNext = () => {
    navigate("/broadcast-email", {
      state: {
        emailData: emailData,
      },
    });
  };

  const toastAlert = () => {
    toast("No Email Include Yet");
  };
  return (
    <Fragment>
      <div className="row fomik customer customerInfo emailFilters">
        <Form
          name="Customer"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Radio.Group onChange={(e) => onChangeRadio(e)}>
            <div className="col-sm-12 customertypes">
              <Radio value="allcustomer" onClick={handleAllCustomer}>
                All Customer
              </Radio>
            </div>
            <div className="col-sm-12">
              <Radio value="withDateSelects">Customers with These Tags</Radio>
            </div>
            <div className="col-sm-12">
              <Form.Item name="Tags">
                <Select
                  mode="tags"
                  disabled={isSelectEnabled}
                  style={{
                    width: "100%",
                  }}
                  placeholder="Tags"
                  onChange={handleChangeTags}
                  value={options}
                >
                  {tag?.map((item) => {
                    return <Option value={item._id}>{item.name}</Option>;
                  })}
                </Select>
              </Form.Item>
            </div>

            <div className="col-sm-12">
              <Form.Item name="active">
                <Select
                  mode="multiple"
                  allowClear
                  disabled={isSelectEnabled}
                  style={{ width: "100%" }}
                  placeholder="Active Customers"
                  options={[
                    { value: "", label: "All" },
                    { value: "true", label: "Active" },
                    { value: "false", label: "Inactive" },
                  ]}
                />
              </Form.Item>
            </div>

            <div className="col-sm-12 ">
              <Radio value="scheduled">
                Customers Scheduled to be Serviced
              </Radio>
            </div>

            <div className="col-sm-12">
              <Form.Item name="NoOfPartners">
                <DatePicker
                  disabled={isSheduleEnabled}
                  value={date}
                  onChange={handleInputChange}
                />
              </Form.Item>
            </div>
            <div className="col-sm-12">
              <Form.Item name="citys">
                <Select
                  // mode="tags"
                  style={{
                    width: "100%",
                  }}
                  disabled={isSheduleEnabled}
                  placeholder="Technician"
                  onChange={handleChangeTech}
                  value={options}
                >
                  {Technician?.items?.map((item) => {
                    return (
                      <Option value={item._id}>
                        {item.first_name + " " + item.last_name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>

            <div className="col-sm-12 ">
              <Radio value="routeAss">
                Customers with Route Assignments (current or future)
              </Radio>
            </div>
            <div className="col-sm-12">
              <Form.Item name="days">
                <Select
                  placeholder="Day Of Week"
                  mode="multiple"
                  disabled={isRouteEnabled}
                  allowClear
                  onChange={handleSelectChange}
                  // defaultValue={["Days"]}
                >
                  {/* <Option value="">All Days</Option> */}
                  <Option value="monday">Monday</Option>
                  <Option value="tuesday">Tuesday</Option>
                  <Option value="wednesday">Wednesday</Option>
                  <Option value="thursday">Thursday</Option>
                  <Option value="friday">Friday</Option>
                  <Option value="saturday">Saturday</Option>
                  <Option value="sunday">Sunday</Option>
                </Select>
              </Form.Item>
            </div>
            <div className="col-sm-12">
              <Form.Item name="Technician">
                <Select
                  // mode="tags"
                  style={{
                    width: "100%",
                  }}
                  disabled={isRouteEnabled}
                  placeholder="Technician"
                  onChange={handleChangeTechwithDay}
                  value={options}
                >
                  {Technician?.items?.map((item) => {
                    return <Option value={item._id}>{item.first_name}</Option>;
                  })}
                </Select>
              </Form.Item>
            </div>
          </Radio.Group>

          <div className="col-sm-12 savebtn emailList">
            <Form.Item>
              {emailData?.data?.length === 0 ? (
                <Button
                  onClick={toastAlert}
                  className="yellowbtn button"
                  type="primary"
                >
                  {" "}
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={navigateToNext}
                  className="yellowbtn button"
                  type="primary"
                >
                  {" "}
                  Continue
                </Button>
              )}
            </Form.Item>
          </div>
        </Form>
      </div>
    </Fragment>
  );
}
