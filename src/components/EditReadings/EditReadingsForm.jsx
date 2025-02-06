import React, { useState } from "react";
import { Button, Form, Input, Space, Select, Radio } from "antd";

import Checkbox from "antd/es/checkbox/Checkbox";
import { DeleteFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  DeleteSingleReadingDataData,
  updateReadings,
  resetData,
} from "../../redux/postReducer/postReadingData";

const EditReadingsForm = ({ state }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [readingSingleValue, setReadingSingleValue] = useState([]);
  const [readingValues, setReadingValues] = useState([]);
  const [readingValuesNew, setReadingValuesNew] = useState([]);

  const { success, error, loading } = useSelector((state) => state.postReading);

  const [formData1, setFormData1] = useState({});

  useEffect(() => {
    setFormData1({
      name: state?.id?.name || "",
      price_per_unit: state?.id?.price_per_unit || "",
      unit_of_measurement: state?.id?.unit_of_measurement || "",
    });
  }, [state]);
  const handleCheckboxChange1 = (clickedItem) => {
    const updatedMapValue = readingValues.map((item) => {
      if (item._id === clickedItem._id) {
        return {
          ...item,
          CheckStatus: !item.CheckStatus,
        };
      }
      return item;
    });
    setReadingValues(updatedMapValue);
  };

  const handleValues = () => {
    if (!readingSingleValue) {
    } else {
      const numericValue = parseFloat(readingSingleValue);

      if (!isNaN(numericValue)) {
        const newObject = { values: numericValue, CheckStatus: false };

        const newReading = numericValue;
        setReadingValues([...readingValues, newObject]);
        // setReadingValuesNew([...readingValuesNew, newReading]);
      }

      // Clear readingSingleValue
      setReadingSingleValue(""); // Reset the value to an empty string
    }
  };

  const deleteItems = async (id) => {
    await dispatch(DeleteSingleReadingDataData({ id }));
    const updateItems = readingValues.filter((elem, ind) => {
      return elem._id !== id;
    });
    setReadingValues(updateItems);
  };

  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!");
  };
  const id = state?.id?._id;

  const onFinish = async (values, key) => {
    const Data = {
      name: values.name,
      unit_of_measurement: values.unit_of_measurement,
      values: readingValues,
    };
    await dispatch(updateReadings({ id, Data }));
    navigate("/readings");
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetData());
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [success, error]);
  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData1(allValues);
  };
  form.setFieldsValue({
    cost_per_unit: formData1?.cost_per_unit,
    name: formData1?.name || "",
    price_per_unit: formData1?.price_per_unit || "",
    unit_of_measurement: formData1?.unit_of_measurement || "",
    include_service_price: formData1?.include_service_price || "",
    include_with_service: formData1?.include_with_service,
  });

  useEffect(() => {
    setReadingValues(state?.id?.ReadingValuesData);
  }, [state]);

  return (
    <Form
      name="Customer"
      onValuesChange={handleFormValuesChange}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      initialValues={formData1}
    >
      <div className="row fomik addRoute accccc">
        <div className="col-sm-6 edddittDosaaaggeess">
          <div className="row">
            <div className="col-sm-12">
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please input your Name!" }]}
              >
                <Input placeholder="Name" />
              </Form.Item>
            </div>

            <div className="col-sm-12">
              <Form.Item
                name="unit_of_measurement"
                label="Unit of Measure(UOM)"
                rules={[{ required: true, message: "Please input your Uom!" }]}
              >
                <Input placeholder="UOM" />
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="col-sm-6 adddDosagesss edddittDosaaaggeess">
          <div className="row">
            <div className="col-sm-10">
              <Form.Item label="Values">
                <Input
                  type="number"
                  value={readingSingleValue}
                  onChange={(e) => setReadingSingleValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleValues();
                      e.preventDefault();
                    }
                  }}
                />
              </Form.Item>
            </div>
            <div className="col-sm-1 valuesBtnnnn">
              <Button
                onClick={handleValues}
                className="yellowbtn valuesBtnnnnYellow"
                // type="primary"
                // htmlType="submit"
              >
                Add
              </Button>
            </div>

            {readingValues?.length > 0 && (
              <div className="container-fluid wordkorder valuesListing">
                {readingValues
                  ?.slice()
                  ?.sort((a, b) => {
                    if (a?.values < b?.values) return -1;
                    if (a?.values > b?.values) return 1;
                    return 0;
                  })
                  ?.map((item, i) => (
                    <div className="row cslocation">
                      <div className="col-sm-10">
                        <Form.Item>
                          <p
                            onChange={() => handleCheckboxChange1(item)}
                            checked={item?.CheckStatus}
                          >
                            {item.values}
                          </p>
                        </Form.Item>
                      </div>
                      <div className="col-sm-2">
                        <p>
                          {" "}
                          <DeleteFilled onClick={() => deleteItems(item._id)} />
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
        <div className="col-sm-12 savebtn addDosageBtn">
          <Form.Item>
            <Button
              className="yellowbtn"
              type="primary"
              htmlType="submit"
              disabled={loading}
              loading={loading}
            >
              Save Readings
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default EditReadingsForm;
