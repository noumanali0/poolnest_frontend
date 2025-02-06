import React, { Fragment , useEffect , useState } from "react";
import { Form, Select, Input, DatePicker, InputNumber, Button } from "antd";
import { UpdateserviceCheckListData, UpdateserviceCheckListwaterbodyData } from "../../redux/postReducer/postServiceCheckList";
import { useDispatch } from "react-redux";
import { fetchgetserviceCheckList, fetchgetserviceCheckListSpecificToWaterBody } from "../../redux/Slices/getserviceCheckList";



function ServiceListModal({data1}) {
    const dispatch = useDispatch()

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

  const checklist_id = data1?.Edit?._id;
  const waterbody_id = data1?.waterbody_id;
  const [form] = Form.useForm();

  const [formData, setFormData] = useState();

  
  useEffect(() => {
    setFormData({
      Description: data1?.Edit?.Description,
      DescriptionOnComplete: data1?.Edit?.DescriptionOnComplete || "",
      waterbody_id: data1?.waterbody_id || "",
    })
  },[data1])




  /* eslint-enable no-template-curly-in-string */
  const onFinish = async (values) => {
    await dispatch(UpdateserviceCheckListwaterbodyData({values,checklist_id}))
    dispatch(fetchgetserviceCheckListSpecificToWaterBody({waterbody_id}));

    data1.handleCloseEdit();
  };



  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  form.setFieldsValue({
    Description: formData?.Description,
    DescriptionOnComplete: formData?.DescriptionOnComplete || "",
    waterbody_id: formData?.waterbody_id || "",

});

console.log(formData,"formData")
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
              <h4>Service Check list</h4>
              <div className="row myselect">
               

                


                <div className="col-sm-12">
                  <Form.Item
                    name="waterbody_id"
                    type="hidden"
                    style={{ display: "none" }}
                    // initialValue={waterbody1}
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="List Type" />
                  </Form.Item>
                </div>

                

                <div className="col-sm-6">
                  <Form.Item name="Description" rules={[{ required: true }]} label='Description'>
                    <Input.TextArea placeholder="Description" showCount maxLength={500} rows={4} />
                  </Form.Item>
                </div>
              
                <div className="col-sm-6">
                  <Form.Item name="DescriptionOnComplete" rules={[{ required: true }]} label='Description On Complete'>
                    <Input.TextArea placeholder="Description on Complete" showCount maxLength={500} rows={4}/>
                  </Form.Item>
                </div>
                </div>
            </div>

           
          </div>

          <Form.Item>
          <div className="col-sm-12 savebtn addProductType taxRate">
              
              <Button type="primary" htmlType="submit">
                {" "}
                Save{" "}
              </Button>
          </div>
              </Form.Item>
        </Form>
      </div>
    </Fragment>
  );
}

export default ServiceListModal;
