import React, { useState, Fragment } from "react";
import { Button, Form, Input, Space, Select, Radio } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTechnician } from "../../redux/Slices/GetTechnician";
import {
  UpdatewaterbodyData,
  resetData,
} from "../../redux/postReducer/postWaterbody";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { fetchgetwaterbodyType } from "../../redux/Slices/getWaterbodyType";
import { fetchgetfrequency } from "../../redux/Slices/getfrequency";
import { fetchgetRateType } from "../../redux/Slices/getRateType";
import { fetchgetLaborCost } from "../../redux/Slices/getLaborCost";

const { Option } = Select;

export default function Routefilters({ data }) {
  const [selectedValue, setSelectedValue] = useState(
    data?.singlewaterbody?.WaterBodyType?._id
  );
  const onChange = (event) => {
    const {
      value,
      dataset: { name },
    } = event.target;
    data?.setPoolTypeName({
      name,
      data,
    });
    setSelectedValue(value);
  };
  const { pathname } = useLocation();
  const waterbody_id = data?.singlewaterbody?._id;

  const [formData, setFormData] = useState();
  const [NewData, setNewData] = useState();

  const [Ratetypeid, setRatetypeid] = useState("");
  const [laborcosttypeid, setlaborcosttypeid] = useState("");

  const [form] = Form.useForm();

  useEffect(() => {
    setFormData({
      name: data?.singlewaterbody?.name,
      waterbody_type_id: data?.singlewaterbody?.WaterBodyType?.name,
      rate: data?.singlewaterbody?.rate,
      rate_type_id: data?.singlewaterbody?.RateTypeDetail?.label,
      labor_cost: data?.singlewaterbody?.labor_cost,
      labor_cost_type_id: data?.singlewaterbody?.LaborCostDetail?.label,
      minutes_per_stop: data?.singlewaterbody?.minutes_per_stop,
      size: data?.singlewaterbody?.size,
      pressure: data?.singlewaterbody?.pressure,
      notes: data?.singlewaterbody?.notes,
      technician_id: data?.singlewaterbody?.Service,
      assigned_day: data?.singlewaterbody?.Service,
      frequency_id: data?.singlewaterbody?.Service,
      start_date: data?.singlewaterbody?.Service,
      stop_date: data?.singlewaterbody?.Service,
      waterbody_id: data?.singlewaterbody?.waterbody_id,
    });
  }, []);

  useEffect(() => {
    if (data && data) {
      form.setFieldsValue({
        RouteAssignment: data?.singlewaterbody?.Service?.map(
          (location, index) => ({
            ...location,
            key: index.toString(),
          })
        ),
      });
    }
  }, [data, form]);

  const navigate = useNavigate(); // Initialize useory
  const url = pathname;
  const parts = url.split("/");
  const customerID = parts[parts.length - 2];
  const ServiceLocationID = parts[parts.length - 1];

  const dispatch = useDispatch();
  const { data: Technician } = useSelector((state) => state.Technician);
  const postwaterType = useSelector((state) => state.getwaterbodyType);
  const postfrequency = useSelector((state) => state.getfrequency);
  const laborcosttype = useSelector((state) => state.getLaborCost);
  const racetype = useSelector((state) => state.getRateType);

  useEffect(() => {
    if (!Technician.items) {
      dispatch(fetchTechnician());
    }

    if (!postfrequency) {
      dispatch(fetchgetfrequency());
    }

    if (racetype?.data !== 0) {
      dispatch(fetchgetRateType());
    }
    if (laborcosttype?.data !== 0) {
      dispatch(fetchgetLaborCost());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchgetwaterbodyType());
  }, [dispatch]);

  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!");
  };

  form.setFieldsValue({
    rate: formData?.rate,
    name: formData?.name,
    waterbody_type_id: formData?.waterbody_type_id,
    rate: formData?.rate,
    rate_type_id: formData?.rate_type_id,
    labor_cost: formData?.labor_cost,
    labor_cost_type_id: formData?.labor_cost_type_id,
    minutes_per_stop: formData?.minutes_per_stop,
    size: formData?.size,
    pressure: formData?.pressure,
    notes: formData?.notes,
    waterbody_id: formData?.waterbody_id,
  });
  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
    setNewData(allValues);
  };

  const handleupdate = async (values) => {
    const data1 = {
      name: values?.name,
      waterbody_type_id:
        selectedValue === "" ? data?.WaterBodyType?._id : selectedValue,
      rate: values.rate,
      rate_type_id: Ratetypeid === "" ? data?.RateTypeDetail?._id : Ratetypeid,
      labor_cost: values.labor_cost,
      labor_cost_type_id:
        laborcosttypeid === "" ? data?.LaborCostDetail?._id : laborcosttypeid,
      minutes_per_stop: values.minutes_per_stop,
      size: values.size,
      pressure: values.pressure,
      notes: values.notes,
      technician_id: values?.Service,
      assigned_day: values?.Service,
      frequency_id: values?.Service,
      start_date: values?.Service,
      stop_date: values?.Service,
    };
    dispatch(UpdatewaterbodyData({ data1, waterbody_id }));
    dispatch(resetData());
    toast.success(" Updated Successfully");
  };

  const handleChangeRateType = (id) => {
    setRatetypeid(id);
  };

  const handleChangeLaborCost = (id) => {
    setlaborcosttypeid(id);
  };

  const handlePoolName = (e) => {
    const name = e.target.value;
    data?.setPoolName({ name, data });
  };

  return (
    <Fragment>
      <div className="row fomik ">
        <div className="row routefilters routefilterssomebody">
          <Form
            name="Pool"
            form={form}
            disabled={data.isFieldsDisabled}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={formData}
            onValuesChange={handleFormValuesChange}
          >
            <Space
              style={{ display: "flex", marginBottom: 8 }}
              align="baseline"
            >
              <div className="row cslocation">
                <div className="col-sm-12 heads poolAccodrion">
                  <h3>Water Body</h3>
                </div>

                <div className="col-sm-12">
                  <Form.Item
                    label="Pool Name"
                    name="name"
                    onChange={handlePoolName}
                    rules={[
                      {
                        required: true,
                        message: "Pool Name is Invalid",
                      },
                    ]}
                    value={formData?.name}
                  >
                    <Input placeholder="Pool Name" type="text" />
                  </Form.Item>

                  <Form.Item
                    type="hidden"
                    name="customer_id"
                    style={{ display: "none" }}
                    initialValue={customerID}
                  >
                    <Input placeholder="Customer id " />
                  </Form.Item>

                  <Form.Item
                    type="hidden"
                    name="service_location_id"
                    style={{ display: "none" }}
                    initialValue={ServiceLocationID}
                  >
                    <Input placeholder="Customer id " />
                  </Form.Item>
                </div>
                <div className="col-sm-12 swicthbtn addpollCustmore">
                  {data?.isFieldsDisabled ? (
                    <Radio.Group value="sad">
                      <div className="row">
                        <div className="col-sm-2 switchbtn radioBtnAddPoolCustomer">
                          <label>
                            <input
                              disabled={data?.isFieldsDisabled}
                              type="radio"
                              checked={true}
                              className="radio-spa"
                            />
                            {formData?.waterbody_type_id}
                          </label>
                        </div>
                      </div>
                    </Radio.Group>
                  ) : (
                    <Form.Item name="waterbody_type_id">
                      <Radio.Group onChange={onChange} value={selectedValue}>
                        <div className="row">
                          {postwaterType?.data?.map((item) => (
                            <div
                              className="col-sm-2 switchbtn radioBtnAddPoolCustomer"
                              key={item._id}
                            >
                              <label>
                                <input
                                  disabled={data?.isFieldsDisabled}
                                  type="radio"
                                  value={item._id}
                                  data-name={item.name} // Save name in data-name attribute
                                  checked={selectedValue === item._id}
                                  onChange={onChange}
                                  className="radio-spa"
                                />
                                {item.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Radio.Group>
                    </Form.Item>
                  )}
                </div>

                <div className="col-sm-3">
                  <Form.Item
                    label="Rate"
                    name="rate"
                    rules={[{ required: true, message: "Invalid Rate" }]}
                  >
                    <Input placeholder="Rate" type="number" />
                  </Form.Item>
                </div>

                <div className="col-sm-3 routeFilterr">
                  <Form.Item
                    name="rate_type_id"
                    label="Rate Type"
                    rules={[
                      {
                        required: true,
                        message: "Rate Type is required",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Rate Type"
                      onChange={handleChangeRateType}
                    >
                      {racetype?.data?.map((item) => {
                        return <Option value={item._id}>{item.label}</Option>;
                      })}
                    </Select>
                  </Form.Item>
                </div>

                <div className="col-sm-3">
                  <Form.Item
                    name="labor_cost"
                    label="Labor Cost"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Invalid Labor Cost",
                    //   },
                    // ]}
                  >
                    <Input placeholder="Labor Cost" type="number" />
                  </Form.Item>
                </div>

                <div className="col-sm-3 routeFilterr">
                  <Form.Item
                    name="labor_cost_type_id"
                    label="Labor Cost Type"
                    rules={[
                      {
                        required: true,
                        message: "Labor Cost Type is required",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Labor Cost Type"
                      onChange={handleChangeLaborCost}
                    >
                      {laborcosttype?.data?.map((item) => {
                        return <Option value={item._id}>{item.label}</Option>;
                      })}
                    </Select>
                  </Form.Item>
                </div>

                <div className="col-sm-4">
                  <Form.Item
                    name="minutes_per_stop"
                    label="Minutes at Stop"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Invalid Minutes at Stop",
                    //   },
                    // ]}
                  >
                    <Input placeholder="Minutes at Stop" type="number" />
                  </Form.Item>
                </div>

                <div className="col-sm-4">
                  <Form.Item
                    name="size"
                    label="Number of Gallons"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Invalid Size",
                    //   },
                    // ]}
                  >
                    <Input placeholder="Size" type="number" />
                  </Form.Item>
                </div>

                <div className="col-sm-4">
                  <Form.Item
                    label="Base Filter Pressure"
                    name="pressure"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Invalid pressure",
                    //   },
                    // ]}
                  >
                    <Input placeholder="Pressure" type="text" />
                  </Form.Item>
                </div>

                <div className="col-sm-12">
                  <Form.Item
                    name="notes"
                    label="Notes"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Invalid notes",
                    //   },
                    // ]}
                  >
                    <Input placeholder="Notes" type="text" />
                  </Form.Item>
                </div>
              </div>
            </Space>

            <div className="col-sm-12 buttonsservice savepoolbtn">
              <Form.Item>
                <Button
                  className="yellowbtn"
                  type="primary"
                  onClick={() => handleupdate(formData)}
                >
                  Save Pools
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </Fragment>
  );
}
