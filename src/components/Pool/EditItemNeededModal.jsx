import React, { Fragment, useEffect, useState } from "react";
import { Form, Select, Input, DatePicker, InputNumber, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { UpdateItemNeedePostData } from "../../redux/postReducer/postItemNeeded";
import { fetchitemNeededWaterBody } from "../../redux/Slices/getItemNeededWaterBody";

const { Option } = Select;
function ItemNeedModal({ data }) {
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  const item_needed_id = data?.Edit?._id;

  const waterbody_id = data?.Edit?.waterbody_id;
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [formData, setFormData] = useState();

  
  useEffect(() => {
    setFormData({
      name: data?.Edit?.name,
      quantity: data?.Edit?.quantity || "",
      price: data?.Edit?.price || "",
      description: data?.Edit?.description || "",
      waterbody_id: data?.Edit?.waterbody_id || "",
    })
  },[data])

  /* eslint-enable no-template-curly-in-string */
  const onFinish = async (values) => {
    await dispatch(UpdateItemNeedePostData({ values , item_needed_id }));
    dispatch(fetchitemNeededWaterBody({waterbody_id}));
    data.handleCloseEdit();

  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  form.setFieldsValue({
    name: formData?.name,
    quantity: formData?.quantity || "",
    price: formData?.price || "",
    description: formData?.description || "",
    waterbody_id: formData?.waterbody_id || "",

});


  return (
    <Fragment>
      <div className="container-fluid modals">
        <Form
          name="nest-messages"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          validateMessages={validateMessages}
          // onValuesChange={handleFormValuesChange}
          form={form}
          autoComplete="off"
          initialValues={formData}
          disabled={false}

        >
          <div className="row">
            <div className="col-sm-12">
              <h4>Item Detail</h4>
              <div className="row myselect">
                <div className="col-sm-12">
                  <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input placeholder="Item Name" />
                  </Form.Item>

                  <Form.Item
                    type="hidden"
                    name="waterbody_id"
                    style={{ display: "none" }}
                    initialValue={waterbody_id}
                  >
                    <Input placeholder="waterbody_id " />
                  </Form.Item>
                </div>

                <div className="col-sm-12">
                  <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                    <Input.TextArea
                      placeholder="Description"
                      showCount
                      maxLength={500}
                    />
                  </Form.Item>
                </div>
                <div className="col-sm-6">
                  <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
                    <Input type="number" placeholder="Quantity" />
                  </Form.Item>
                </div>
                <div className="col-sm-6">
                  <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                    <Input type="number" placeholder="Price" />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>


          <div className="col-sm-12 savebtn addProductType taxRate">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save{" "}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Fragment>
  );
}

export default ItemNeedModal;
