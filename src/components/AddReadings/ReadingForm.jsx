import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, Select, Radio } from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";
import { toast } from "react-toastify";
import { DeleteFilled } from "@ant-design/icons";
import { postReadingData } from "../../redux/postReducer/postReadingData";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { resetData } from "../../redux/postReducer/postReadingData";

const { Option } = Select;

const ReadingForm = () => {
  const { success, error, loading } = useSelector((state) => state.postReading);
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const [ReadingValue, setReadingValue] = useState([]);
  const [mapValue, setMapValue] = useState([]);
  const [formData, setFormData] = useState({
    Pools: [{ name: "" }],
  });
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleValues = () => {
    if (!ReadingValue) {
      setReadingValue("");
    } else {
      const numericValue = parseFloat(ReadingValue);
      if (!isNaN(numericValue)) {
        setMapValue([
          ...mapValue,
          { values: numericValue, checkStatus: false },
        ]);
      }

      setReadingValue("");
    }
  };
  const handleCheckboxChange1 = (index) => {
    const updatedMapValue = [...mapValue];
    updatedMapValue[index].checkStatus = !updatedMapValue[index].checkStatus;
    setMapValue(updatedMapValue);
  };
  const onFinish = async (values, key) => {
    const Data = {
      name: values.name,
      unit_of_measurement: values.unit_of_measurement,
      values: mapValue,
    };
    await dispatch(postReadingData({ Data }));

    navigate("/readings");
  };

  const deleteItems = (id) => {
    const updateItems = mapValue.filter((elem, ind) => {
      return ind !== id;
    });
    setMapValue(updateItems);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    toast.error("Please fill all required fields!");
  };
  console.log(success, "<=====success");
  useEffect(() => {
    if (success) {
      form.resetFields();
      toast.success(success);
      dispatch(resetData());
      navigate("/readings");
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, success]);

  return (
    <Form
      name="Customer"
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className="row fomik addRoute readinngForrrmmmsssMain">
        <div className="col-sm-6 readinngForrrmmmsss edddittDosaaaggeess">
          <div className="row">
            <div className="col-sm-12">
              <Form.Item
                name="name"
                label="Reading"
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
          {/* style={{ height: "340px" }} */}
          <div className="row">
            <div className="col-sm-10">
              <Form.Item label="Values" rules={[{ required: true }]}>
                <Input
                  type="number"
                  value={ReadingValue}
                  onChange={(e) => setReadingValue(e.target.value)}
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
                className="yellowbtn addReadingsssBtn"
                // type="primary"
                // htmlType="submit"
              >
                Add
              </Button>
            </div>

            {mapValue.length > 0 && (
              <div className="container-fluid wordkorder valuesListing">
                {mapValue?.map((e, i) => (
                  <div className="row">
                    <div className="col-sm-10">
                      <Form.Item>
                        <p onChange={() => handleCheckboxChange1(i)}>
                          {e.values}
                        </p>
                      </Form.Item>
                    </div>
                    <div className="col-sm-2">
                      <p>
                        {" "}
                        <DeleteFilled onClick={() => deleteItems(i)} />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="col-sm-12 savebtn ">
          <Form.Item>
            <Button
              className="yellowbtn addReadingsssSaveBtn"
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

export default ReadingForm;
