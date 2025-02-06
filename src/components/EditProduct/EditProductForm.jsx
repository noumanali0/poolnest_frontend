import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, Select, Radio } from "antd";

import Checkbox from "antd/es/checkbox/Checkbox";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetProductType } from "../../redux/Slices/getProductType";
import {
  UpdateProductsData,
  clearData,
} from "../../redux/postReducer/postProducts";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const EditProductForm = ({ state }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { data: getProductType } = useSelector((state) => state.getProductType);
  const { data: postProducts } = useSelector((state) => state.postProducts);

  const { data, loading, success, error } = useSelector(
    (state) => state.postProducts
  );

  const [includeServicePrice, setIncludeServicePrice] = useState();

  const [formData, setFormData] = useState({});

  const handleCheckboxChange = (e) => {
    setIncludeServicePrice(e.target.checked);
  };
  const onFinish = async (values, key) => {
    const id = state?.id?._id;

    const Data = {
      name: values.name,
      description: values.description,
      price: values.price,
      isTaxable: includeServicePrice,
      item_type_id: values?.item_type_id,
    };

    await dispatch(UpdateProductsData({ id, Data }));
  };

  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!");
  };
  useEffect(() => {
    dispatch(fetchgetProductType({}));
  }, []);
  useEffect(() => {
    setFormData({
      price: state?.id?.price || "",
      name: state?.id?.name || "",
      description: state?.id?.description || "",
      isTaxable: state?.id?.isTaxable || "",
      item_type_id: state?.id?.item_type_id,
    });
    setIncludeServicePrice(state?.id?.isTaxable);
  }, [state]);

  form.setFieldsValue({
    name: formData.name,
    price: formData.price,
    description: formData.description,
    isTaxable: formData.isTaxable,
    item_type_id: formData.item_type_id,
  });

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearData());
      navigate("/product");
    }
    if (error) {
      toast.error(error);
      dispatch(clearData());
    }
  }, [error, success]);

  return (
    <div className="row fomik addRoute AddProductt">
      <Form
        name="Customer"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="row cslocation">
          <div className="col-sm-6">
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: "Please input Product Name!" },
              ]}
            >
              <Input placeholder="Product Name" />
            </Form.Item>
          </div>

          <div className="col-sm-6">
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Please input Product Description!",
                },
              ]}
            >
              <Input placeholder="Description" />
            </Form.Item>
          </div>

          <div className="col-sm-6">
            <Form.Item
              name="price"
              label="Price"
              rules={[
                { required: true, message: "Please input Product Price!" },
              ]}
            >
              <Input placeholder="Price" type="number" />
            </Form.Item>
          </div>
          <div className="col-sm-6">
            <Form.Item
              name="item_type_id"
              label="Type"
              rules={[{ required: true, message: "Please input Type !" }]}
            >
              <Select placeholder="Type">
                {getProductType &&
                  getProductType?.items?.map((item) => {
                    return (
                      <Option value={item._id}>{item.name}</Option>
                    );
                  })}
              </Select>
            </Form.Item>
          </div>
          <div className="col-sm-6">
            <Form.Item name="Values" label='Taxable Price'>
              <Input
                defaultValue={"Taxable Price"}
                placeholder="Values"
                readOnly
              />
            </Form.Item>
          </div>
          <div className="col-sm-2 valueForm1">
            <Form.Item name="isTaxable">
              <span>
                <Checkbox
                  checked={includeServicePrice}
                  onChange={handleCheckboxChange}
                />
              </span>
            </Form.Item>
          </div>

          <div className="col-sm-12 savebtn">
            <Form.Item>
              <Button className="yellowbtn" type="primary" htmlType="submit" loading={loading} disabled={loading}>
                Save Product
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EditProductForm;
