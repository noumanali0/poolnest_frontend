import React, { Fragment, useEffect, useState } from "react";
import { Form, Select, Input, DatePicker, InputNumber, Button } from "antd";
import { postItemNeedePostData } from "../../redux/postReducer/postItemNeeded";
import { useSelector, useDispatch } from "react-redux";
import { fetchitemNeededWaterBody } from "../../redux/Slices/getItemNeededWaterBody";
import { fetchgetProductData  } from "../../redux/Slices/getProduct";

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
  const [form] = Form.useForm();

  const { data: getProductData , statusdata } = useSelector((state) => state.getProductData);

  const [selectedWorkOrderType, setSelectedWorkOrderType] = useState(null);
  const [price, setPrice] = useState('');

  const handleChange = (value) => {
    const selectedOption = getProductData?.items?.find((item) => item._id === value);
    setSelectedWorkOrderType(selectedOption);
    form.setFieldsValue({ 
      name: selectedOption?.name,
      description: selectedOption?.description,
      price:selectedOption?.price

    });

  };


  const waterbody_id = data.waterbody_id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchgetProductData({}));
   
  },[dispatch])

  const onFinish = async (values) => {
    await dispatch(postItemNeedePostData({ values }));
    dispatch(fetchitemNeededWaterBody({waterbody_id}));
    data.handleClose();

  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Fragment>
      <div className="container-fluid modals">
        <Form
          name="nest-messages"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          validateMessages={validateMessages}
          disabled={false}
          form={form}


        >
          <div className="row">
            <div className="col-sm-12">
              <h4>Item Detail</h4>
              <div className="row myselect">
              <div className="col-sm-12 myselect">
                  <Form.Item
                    name="work_order_type_id"
                    label="Select Any Item"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Work Order Type is required",
                    //   },
                    // ]}
                  >
                    <Select onChange={handleChange} placeholder="Select Item">
                      {getProductData?.items?.map((item) => (
                        <Option value={item._id}>{item?.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-sm-12">
                  <Form.Item name="name" rules={[{ required: true }]} label='Item Name'>
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
                  <Form.Item name="description" rules={[{ required: true }]} label='Description'>
                    <Input.TextArea
                      placeholder="Description"
                      showCount
                      maxLength={500}
                    />
                  </Form.Item>
                </div>

                <div className="col-sm-6">
                  <Form.Item name="quantity" rules={[{ required: true }]} label='Quantity'>
                    <Input type="number" placeholder="Quantity" />
                  </Form.Item>
                </div>
                <div className="col-sm-6">
                  <Form.Item name="price" rules={[{ required: true }]} label='Price'>
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
