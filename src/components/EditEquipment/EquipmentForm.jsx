import React, { useState } from "react";
import { Button, Form, Input } from "antd";

import { toast } from "react-toastify";
import { UpdateEquiptmentData } from "../../redux/postReducer/postEquipment";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchgetAllEquipmemnt } from "../../redux/Slices/getAllEquipment";


const EquipmentForm = ({data1}) => {

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState();

  useEffect(() => {
    setFormData({
      name: data1?.Data?.name,
      description: data1?.Data?.description,
    });
  }, [data1]);
  const onFinish = async (values, key) => {
    const id = data1?.Data?._id;
    await dispatch(UpdateEquiptmentData({ id, values }));
    dispatch(fetchgetAllEquipmemnt({}));
    data1.handleClose();
  };

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  const onFinishFailed = (errorInfo) => {
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


  form.setFieldsValue({
    id: formData?.id,
    name: formData?.name,
    description: formData?.description,
  });


  return (
    <div className="row fomik addRoute taxratee equipped">
      <Form
        name="Customer"
        onValuesChange={handleFormValuesChange}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={formData}
      >
        <div className="row cslocation">
          <div className="col-sm-6 forFullWidth">
            <Form.Item
              name="name"
              value={formData?.name}
              label='Equipment Name'
              rules={[
                { required: true, message: "Please input Equipment Name!" },
              ]}
            >
              <Input placeholder="Equipment Name" />
            </Form.Item>
          </div>


            <Form.Item
              name="id"
              type="hidden"
              style={{
                display:"none"
              }}
              value={formData?.id}
              
              >
              <Input placeholder="Equipment Name" />
            </Form.Item>

          <div className="col-sm-6 forFullWidth">
            <Form.Item
              label='Description'
              name="description"
              value={formData?.description}
              rules={[{ required: true, message: "Please input description!" }]}
            >
              <Input placeholder="description" />
            </Form.Item>
          </div>

          <div className="col-sm-12 savebtn addProductType taxRate">
            <Form.Item>
              <Button className="yellowbtn" type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EquipmentForm;
