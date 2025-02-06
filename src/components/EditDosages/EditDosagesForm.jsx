import React, { useState } from "react";
import { Button, Form, Input } from "antd";

import Checkbox from "antd/es/checkbox/Checkbox";
import { DeleteFilled } from "@ant-design/icons";
import {
  DeleteSingleDosagesDataData,
  DeletedosagesDataData,
  resetData,
  updatedosagesData,
} from "../../redux/postReducer/postDosages";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

const AddDosageForm = ({ state }) => {
  const [dosagesValues, setDosagesValues] = useState([]);
  const [dosagesSingleValue, setDosagesSingleValue] = useState([]);
  const [readingValuesNew, setReadingValuesNew] = useState([]);

  const [includeServicePrice, setIncludeServicePrice] = useState(
    state?.id?.include_service_price
  );

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { success, error, deletedMessage, loading } = useSelector(
    (state) => state.postdosages
  );

  const [formData1, setFormData1] = useState();

  const handleCheckboxChange1 = (clickedItem) => {
    const updatedMapValue = dosagesValues.map((item) => {
      if (item._id === clickedItem._id) {
        return {
          ...item,
          CheckStatus: !item.CheckStatus,
        };
      }
      return item;
    });
    setDosagesValues(updatedMapValue);
  };

  const handleValues = () => {
    if (!dosagesSingleValue) {
      // If dosagesSingleValue is empty, clear it
      setDosagesSingleValue("");
    } else {
      // Convert dosagesSingleValue to a numeric value
      const numericValue = dosagesSingleValue;

      // Check if the conversion is successful and the result is not NaN

      // Create a new object with the current numeric value
      const newObject = { values: numericValue, checkStatus: false };
      const newReading = numericValue;

      // Set dosagesValues array by preserving existing values and adding the new object
      setDosagesValues([...dosagesValues, newObject]);
      setReadingValuesNew([...readingValuesNew, newReading]);

      // Clear dosagesSingleValue in any case
      setDosagesSingleValue("");
    }
  };

  useEffect(() => {
    setFormData1({
      cost_per_unit: state?.id?.cost_per_unit,
      name: state?.id?.name || "",
      price_per_unit: state?.id?.price_per_unit || "",
      unit_of_measurement: state?.id?.unit_of_measurement || "",
      include_service_price: state?.id?.include_service_price || "",
      include_with_service: state?.id?.include_with_service,
    });
  }, [state]);

  const handleCheckboxChange = (e) => {
    setIncludeServicePrice(e.target.checked);
  };

  const deleteItems = async (id) => {
    await dispatch(DeleteSingleDosagesDataData({ id }));
    const updateItems = dosagesValues.filter((elem, ind) => {
      return elem._id !== id;
    });
    setDosagesValues(updateItems);
  };

  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!");
  };
  const id = state?.id?._id;

  const onFinish = async (values, key) => {
    const Data = {
      name: values.name,
      unit_of_measurement: values.unit_of_measurement,
      cost_per_unit: values.cost_per_unit,
      include_service_price: includeServicePrice,
      price_per_unit: values.price_per_unit,
      values: dosagesValues,
    };
    await dispatch(updatedosagesData({ id, Data }));
    // navigate("/dosages");
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetData());
      navigate("/dosages");
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
    if (deletedMessage) {
      toast.success(deletedMessage);
      dispatch(resetData());
    }
  }, [error, deletedMessage]);

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
    setDosagesValues(state?.id?.DosageData);
  }, []);

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
          <div className="row cslocation">
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
                label="Uom"
                rules={[{ required: true, message: "Please input your Uom!" }]}
              >
                <Input placeholder="UOM" />
              </Form.Item>
            </div>

            <div className="col-sm-12">
              <Form.Item
                name="cost_per_unit"
                label="Cost/Uom"
                rules={[
                  { required: true, message: "Please input your Cost UOM!" },
                ]}
              >
                <Input placeholder="Cost/UOM" type="number" />
              </Form.Item>
            </div>

            <div className="col-sm-12">
              <Form.Item
                name="price_per_unit"
                label="Price/Uom"
                rules={[
                  { required: true, message: "Please input your Price UOM!" },
                ]}
              >
                <Input
                  placeholder="Price/UOM"
                  rules={[
                    { required: true, message: "Please Add  Price Uom!" },
                  ]}
                />
              </Form.Item>
            </div>

            <div
              className="col-sm-12"
              // style={{ marginTop: "30px" }}
            >
              <Form.Item
                label="Specialty treatment"
                // name="include_service_price"
                // rules={[{ required: true, message: "Include service Price?" }]}
              >
                <Input
                  readOnly
                  placeholder="Always Invoiced to Customer"
                  defaultValue={"Always Invoiced to Customer"}
                />
              </Form.Item>
            </div>
            <div className="col-sm-0 valueForm3">
              <Form.Item
                name="include_service_price"
                // rules={[{ required: true, message: "Include service Price?" }]}
              >
                <span>
                  <Checkbox
                    checked={includeServicePrice}
                    onChange={handleCheckboxChange}
                  ></Checkbox>
                </span>
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
                  value={dosagesSingleValue}
                  onChange={(e) => setDosagesSingleValue(e.target.value)}
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

            {dosagesValues?.length > 0 && (
              <div className="container-fluid wordkorder valuesListing">
                {dosagesValues
                  ?.slice()
                  ?.sort((a, b) => {
                    if (a?.values < b?.values) return -1;
                    if (a?.values > b?.values) return 1;
                    return 0;
                  })
                  .map((item, i) => (
                    <div className="row cslocation" key={item._id}>
                      <div className="col-sm-10">
                        <Form.Item>
                          <p
                            onChange={() => handleCheckboxChange1(item)}
                            checked={item?.CheckStatus}
                          >
                            {item?.values}
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
              disabled={loading}
              loading={loading}
              className="yellowbtn"
              type="primary"
              htmlType="submit"
            >
              Save Dosages
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default AddDosageForm;
