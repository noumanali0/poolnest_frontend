import React, { useState } from "react";
import { Button, Form, Input, Space, Select, Radio } from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";
import { fetchgetProductType } from "../../redux/Slices/getProductType";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postProductsData,
  clearData,
} from "../../redux/postReducer/postProducts";

const { Option } = Select;
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AddProductTypeForm from "../AddProductType/AddProductTypeForm";
import { Modal } from "react-bootstrap";

const AddProductForm = () => {
  const { data: getProductType, statusdata } = useSelector(
    (state) => state.getProductType
  );

  const { loading, success, error } = useSelector(
    (state) => state.postProducts
  );
  const [includeServicePrice, setIncludeServicePrice] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCheckboxChange = (e) => {
    setIncludeServicePrice(e.target.checked);
  };

  const [form] = Form.useForm();
  useEffect(() => {
    dispatch(fetchgetProductType({}));
  }, []);

  const onFinish = async (values, key) => {
    const Data = {
      name: values.name,
      description: values.description,
      price: values.price,
      isTaxable: includeServicePrice,
      item_type_id: values.item_type_id,
    };

    await dispatch(postProductsData({ Data }));
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearData());
      navigate("/product");
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, success]);
  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!");
  };

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
              <Input placeholder="Name" />
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
              label="Category"
              rules={[{ required: true, message: "Please input Type !" }]}
            >
              <Select placeholder="Type">
                {getProductType &&
                  getProductType?.items?.map((item) => {
                    return <Option value={item._id}>{item.name}</Option>;
                  })}
              </Select>
            </Form.Item>

            <Button
              disabled={false}
              className="AddWorkOrderTypeBtn"
              onClick={handleShow}
              block
            >
              + Add New Category
            </Button>
          </div>
          <div className="col-sm-6 valuesForm1Checkbox">
            <Form.Item name="Values" label="Taxable Price">
              <Input
                defaultValue={"Taxable Price"}
                placeholder="Values"
                readOnly
              />
            </Form.Item>
          </div>
          <div className="col-sm-2 valueForm1">
            <Form.Item name="Valuess">
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
              <Button
                className="yellowbtn addReadingsssSaveBtn adProfduct"
                type="primary"
                htmlType="submit"
                disabled={loading}
                loading={loading}
              >
                Save Product
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>

      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="taxratemodal taxGrpModal"
      >
        <Modal.Body>
          Add Product Category
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <AddProductTypeForm data={handleClose} />
      </Modal>
    </div>
  );
};

export default AddProductForm;
