import React, { useEffect, useState } from "react";
import { Button, Form, Input, Checkbox, Space, Select } from "antd";
import { toast } from "react-toastify";
import { DeleteFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  postdosagesData,
  resetData,
} from "../../redux/postReducer/postDosages";
import { fetchgetAlldosage } from "../../redux/Slices/getAllDosages";

const { Option } = Select;

const AddDosageForm = () => {
  const navigate = useNavigate();
  const { success, error, loading } = useSelector((state) => state.postdosages);
  const [dossageValue, setDossageValue] = useState("");
  const [mapValue, setMapValue] = useState([]);
  const [includeServicePrice, setIncludeServicePrice] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleValues = () => {
    const numericValue = parseFloat(dossageValue);
    if (!isNaN(numericValue)) {
      setMapValue([...mapValue, { values: numericValue, checkStatus: false }]);
    }
    setDossageValue("");
  };

  const handleCheckboxChange = (e) => {
    setIncludeServicePrice(e.target.checked);
  };

  const handleDeleteItem = (index) => {
    setMapValue(mapValue.filter((_, i) => i !== index));
  };

  const onFinish = async (values) => {
    const Data = {
      ...values,
      include_service_price: includeServicePrice,
      values: mapValue,
    };
    await dispatch(postdosagesData({ Data }));
    dispatch(resetData());
    dispatch(fetchgetAlldosage({}));
  };

  const onFinishFailed = () => {
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

  useEffect(() => {
    if (success) {
      form.resetFields();
      toast.success(success);
      dispatch(resetData());
      navigate("/dosages");
    }
  }, [success, form, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, dispatch]);

  return (
    <Form
      name="Customer"
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
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
                label="UOM"
                rules={[{ required: true, message: "Please input your UOM!" }]}
              >
                <Input placeholder="UOM" />
              </Form.Item>
            </div>

            <div className="col-sm-12">
              <Form.Item
                name="cost_per_unit"
                label="Cost/UOM"
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
                label="Price/UOM"
                rules={[
                  { required: true, message: "Please input your Price UOM!" },
                ]}
              >
                <Input placeholder="Price/UOM" type="number" />
              </Form.Item>
            </div>

            <div
              className="col-sm-12"
              //  style={{ marginTop: "30px" }}
            >
              <Form.Item
                name=""
                label="Specialty treatment"
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
              <Form.Item name="include_service_price">
                <span>
                  <Checkbox
                    checked={includeServicePrice}
                    onChange={handleCheckboxChange}
                  />
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
                  value={dossageValue}
                  onChange={(e) => setDossageValue(e.target.value)}
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
                disabled={loading}
              >
                Add
              </Button>
            </div>

            {mapValue.length > 0 && (
              <div className="container-fluid wordkorder valuesListing">
                {mapValue.map((item, i) => (
                  <div className="row" key={i}>
                    <div className="col-sm-10">
                      <p>{item.values}</p>
                    </div>
                    <div className="col-sm-2">
                      <DeleteFilled onClick={() => handleDeleteItem(i)} />
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
              Save Dosages
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default AddDosageForm;
