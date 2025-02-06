import React, { Fragment , useEffect, useState } from "react";
import {
  Form,
  Select,
  Input,
  DatePicker,
  InputNumber,
  Button,
  Card,
} from "antd";
import { Link } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";


const { Option } = Select;
function Workorderform({data}) {

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { data: Technician } = useSelector((state) => state.Technician);
  const { data: getWorkOrderType, status } = useSelector((state) => state.getWorkOrderType);
  const { data: singlewaterbody, statusdata } = useSelector(
    (state) => state.singlewaterbody
  );

  const waterbody_id = singlewaterbody?.waterbody_id;

  const [formData, setFormData] = useState();

  useEffect(() => {
    setFormData({
      customer_id: singlewaterbody?.Customer.first_name ,
      service_location_id: singlewaterbody?.Service_location.name || "",
      waterbody_type_id: singlewaterbody?.Waterbody_type?.name || "",
    });
  }, [singlewaterbody]);

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

  /* eslint-enable no-template-curly-in-string */
  const onFinish = async (values) => {
    const Data = {
      "estimated_time_minutes": values.estimated_time_minutes,
      "work_needed": values.work_needed,
      // "work_performed": values.notes,
      "notes": values.notes,
      "service_time": values.service_time,
      "service_date": "05-10-2023",
      "price": values.price,
      "technician_id": values.technician_id,
      "work_order_type_id": values.work_order_type_id,
      "waterbody_id": singlewaterbody?.waterbody_id,
      "customer_id": singlewaterbody?.Customer?.customer_id,
      "service_location_id":singlewaterbody?.Service_location?.service_location_id,
      "labor_cost": values.labor_cost,
      "status": "active"
  }

    await  dispatch(postworkorderData({Data}))
    dispatch(fetchgetWorkOrderByWaterBody({waterbody_id}))
    data();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  form.setFieldsValue({
    customer_id: formData?.customer_id,
    service_location_id: formData?.service_location_id || "",
    waterbody_type_id: formData?.waterbody_type_id || "",
  });

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };


  return (
    <Fragment>
      <div className="container-fluid modals">
        <Form
          name="nest-messages"
          onValuesChange={handleFormValuesChange}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          validateMessages={validateMessages}
          initialValues={formData}
        >
          <div className="row">
            <div className="col-sm-8">
              <h4>Customer Detail</h4>
              <div className="row ">
                <div className="col-sm-6 myselect">
                  <Form.Item
                    name="work_order_type_id"
                    label="Workorder Type"
                    rules={[
                      {
                        required: true,
                        message: "Work Order Type is required",
                      },
                    ]}
                  >
                    <Select placeholder="Workorder Type">
                      {
                        getWorkOrderType && getWorkOrderType.map((item , i) => {
                          return(
                            <Option value={item.work_order_type_id}>{item.name}</Option>
                          )
                        })
                      }
                    </Select>
                  </Form.Item>
                </div>

                <div className="col-sm-6">
                  
                  <Form.Item label="Customer"
                    name="customer_id" >
                <Input placeholder="Customer" readOnly />
              </Form.Item>
                </div>

                <div className="col-sm-6">
                  

                  <Form.Item   name="service_location_id"
                    label="Service Location" >
                <Input placeholder="Service Location" readOnly />
              </Form.Item>
                </div>

                <div className="col-sm-6">
                

                  <Form.Item  name="waterbody_type_id"
                    label="Pool/Spa" >
                <Input placeholder="Pool/Spa" readOnly />
              </Form.Item>
                </div>

                <div className="col-sm-12">
                  <Form.Item
                    label="Work Needed"
                    name="work_needed"
                    rules={[{ required: true }]}
                  >
                    <Input.TextArea
                      showCount
                      maxLength={500}
                      placeholder="work needed"
                    />
                  </Form.Item>
                </div>

                <div className="col-sm-12">
                  <Form.Item
                    label="Notes"
                    name="notes"
                    rules={[{ required: true }]}
                  >
                    <Input.TextArea
                      showCount
                      maxLength={500}
                      placeholder="notes"
                    />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
             
              <h4>Route Assignment Info</h4>
             
                {
                  singlewaterbody && singlewaterbody?.Service?.map((item,i) => {
                    return(
                      <>
                       <Card title={item.Technician.first_name}>
                       <p>{item?.assigned_day}|{item?.Frequency?.name} </p>
                       <p>2/2/23 No End</p> 
                       </Card>
                      </>
                    )
                  })
                }
               
             
            </div>
          </div>

          <div className="row midsec">
            <div className="col-sm-3">
              <Form.Item rules={[{ required: true }]} name="technician_id" label="Tech Name">
                <Select placeholder="Tech Name">
                  {
                    Technician && Technician?.items?.map((item, i) => {
                      return(
                        <Option value={item.id}>{item.first_name}</Option>
                      )
                    })
                  }
                </Select>
              </Form.Item>
            </div>
            <div className="col-sm-3">
              <Form.Item
                name="service_date"
                rules={[{ required: true }]}
                label="Service Date"
              >
                <DatePicker placeholder="Service Date" />
              </Form.Item>
            </div>
            <div className="col-sm-3">
              <Form.Item
                name="estimated_time_minutes"
                rules={[{ required: true }]}
                label="Est Minutes"
              >
                <Input placeholder="Est Minutes" />
              </Form.Item>
            </div>
            <div className="col-sm-3">
              <Form.Item name="service_time" label="Service Time">
                <Input placeholder="Scheduled Time (optional)" />
              </Form.Item>
            </div>
            <div className="col-sm-4">
              <Form.Item
                name="labor_cost"
                label="Labor Cost"
                rules={[{ required: true }]}
              >
                <Input placeholder="Labor Cost" type="number" />
              </Form.Item>
            </div>
            <div className="col-sm-4">
              <Form.Item
                name="price"
                rules={[{ required: true }]}
                label="Price"
              >
                <Input placeholder="Price" type="number" />
              </Form.Item>
            </div>
            <div className="col-sm-12 submitbtn">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {" "}
                  Save{" "}
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </Fragment>
  );
}

export default Workorderform;
