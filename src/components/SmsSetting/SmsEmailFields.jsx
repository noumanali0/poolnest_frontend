import { Button, Checkbox, Form, Input, Switch } from "antd";
import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postServiceEmailSettingsData , resetData } from "../../redux/postReducer/postServiceEmailSettings";
import { toast } from "react-toastify";
import { fetchServiceEmailSettings } from "../../redux/Slices/getServiceEmailSettingsData";
import { useDispatch } from "react-redux";

const SmsEmailFields = () => {
  const [serviceEmail, setServiceEmail] = useState(true);
  const {error , loading , success} = useSelector((state) => state.postServiceEmailSettings)
  const dispatch = useDispatch();

  const { data: ServiceEmailSettings, status } = useSelector(
    (state) => state.ServiceEmailSettings
  );

  const [form] = Form.useForm();
  const [formData, setFormData] = useState();

  console.log("ServiceEmailSettings --->", ServiceEmailSettings);
  useEffect(() => {
    setFormData({
      EmailCustomerWhenRouteStoped:
        ServiceEmailSettings?.EmailCustomerWhenRouteStoped,
      SMSCustomerWhenRouteStoped:
        ServiceEmailSettings?.SMSCustomerWhenRouteStoped,
      Subject: ServiceEmailSettings?.Subject || "",
      skippedSubject: ServiceEmailSettings?.skippedSubject || "",
      Header: ServiceEmailSettings?.Header || "",
      skippedHeader: ServiceEmailSettings?.skippedHeader || "",
      IncludeReasonInCustomerEmail:
        ServiceEmailSettings?.IncludeReasonInCustomerEmail || false,
      IncludeReasonInCustomerSms:
        ServiceEmailSettings?.IncludeReasonInCustomerSms || false,
      skippedDefaultMessage: ServiceEmailSettings?.skippedDefaultMessage || "",
      skippedSmsDefaultMessage:
        ServiceEmailSettings?.skippedSmsDefaultMessage || "",
      DefaultMessage: ServiceEmailSettings?.DefaultMessage,
      SMSDefaultMessage: ServiceEmailSettings?.SMSDefaultMessage,
      Footer: ServiceEmailSettings?.Footer,
      skippedFooter: ServiceEmailSettings?.skippedFooter,
      CityId: ServiceEmailSettings?.cityname,
      StateId: ServiceEmailSettings?.statename,
      CountryId: ServiceEmailSettings?.countryname,
      Address: ServiceEmailSettings?.Address,
      EmailCustomerWhenRouteSkip:
        ServiceEmailSettings?.EmailCustomerWhenRouteSkip,
      SMSCustomerWhenRouteSkip: ServiceEmailSettings?.SMSCustomerWhenRouteSkip,
      IncludeChemicalDosages: ServiceEmailSettings?.IncludeChemicalDosages,
      IncludeChemicalReadings: ServiceEmailSettings?.IncludeChemicalReadings,
      IncludeCompletedChecklistItems:
        ServiceEmailSettings?.IncludeCompletedChecklistItems,
      IncludeNameofTech: ServiceEmailSettings?.IncludeNameofTech,
      RequireAPhotoWithEachStop:
        ServiceEmailSettings?.RequireAPhotoWithEachStop,
      TechToChooseReasonWhenRouteSkip:
        ServiceEmailSettings?.TechToChooseReasonWhenRouteSkip,
      EmailOfficeWhenRouteSkip: ServiceEmailSettings?.EmailOfficeWhenRouteSkip,
      SMSOfficeWhenRouteSkip: ServiceEmailSettings?.SMSOfficeWhenRouteSkip,
      Address: ServiceEmailSettings?.Address,
    });
  }, [ServiceEmailSettings]);

  form.setFieldsValue({
    EmailCustomerWhenRouteStoped: formData?.EmailCustomerWhenRouteStoped,
    SMSCustomerWhenRouteStoped: formData?.SMSCustomerWhenRouteStoped,
    Subject: formData?.Subject || "",
    skippedSubject: formData?.skippedSubject || "",
    Header: formData?.Header || "",
    skippedHeader: formData?.skippedHeader || "",
    IncludeReasonInCustomerEmail:
      formData?.IncludeReasonInCustomerEmail || false,
    IncludeReasonInCustomerSms: formData?.IncludeReasonInCustomerSms || false,
    skippedDefaultMessage: formData?.skippedDefaultMessage || "",
    skippedSmsDefaultMessage: formData?.skippedSmsDefaultMessage || "",
    DefaultMessage: formData?.DefaultMessage || "",
    SMSDefaultMessage: formData?.SMSDefaultMessage || "",
    Footer: formData?.Footer || "",
    skippedFooter: formData?.skippedFooter || "",
    CityId: formData?.CityId || "",
    StateId: formData?.StateId || "",
    CountryId: formData?.CountryId || "",
    Address: formData?.Address || "",
    EmailCustomerWhenRouteSkip: formData?.EmailCustomerWhenRouteSkip,
    SMSCustomerWhenRouteSkip: formData?.SMSCustomerWhenRouteSkip,
    IncludeChemicalDosages: formData?.IncludeChemicalDosages,
    IncludeChemicalReadings: formData?.IncludeChemicalReadings,
    IncludeCompletedChecklistItems: formData?.IncludeCompletedChecklistItems,
    IncludeNameofTech: formData?.IncludeNameofTech,
    RequireAPhotoWithEachStop: formData?.RequireAPhotoWithEachStop,
    TechToChooseReasonWhenRouteSkip: formData?.TechToChooseReasonWhenRouteSkip,
    EmailOfficeWhenRouteSkip: formData?.EmailOfficeWhenRouteSkip,
    SMSOfficeWhenRouteSkip: formData?.SMSOfficeWhenRouteSkip,
  });
  const handleServiceEmail = () => {
    setServiceEmail(true);
  };
  const navigate = useNavigate();
  const handleSkippedStop = () => {
    setServiceEmail(false);
  };

  const onFinish = async (values, key) => {
    console.log(values, "<======valuess");
    dispatch(postServiceEmailSettingsData({ values }));
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(fetchServiceEmailSettings());
      dispatch(resetData());
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, success]);

  return (
    <Fragment>
      <div className="row fomik customer customerInfo emailFilters">
        <div className="col-sm-12 buttonGap">
          <Button
            type="primary"
            className={`yellowbtn ${serviceEmail ? "extraClass" : ""}`}
            onClick={() => handleServiceEmail()}
          >
            Service Emails / SMS
          </Button>
          <Button
            type="primary"
            className={`yellowbtn ${!serviceEmail ? "extraClass" : ""}`}
            onClick={() => handleSkippedStop()}
          >
            Skipped Stops Emails / SMS
          </Button>
        </div>
        <Form
          name="Customer"
          autoComplete="off"
          form={form}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          initialValues={formData}
        >
          {serviceEmail ? (
            <>
              <div className="col-sm-12 inForHead">
                <p>Service Emails / SMS</p>
              </div>
              <div className="col-sm-12 switchBtn">
                <Form.Item
                  name="EmailCustomerWhenRouteStoped"
                  label="Email the customer automatically when route stop is finished"
                >
                  <Switch
                    checkedChildren="ON"
                    unCheckedChildren="OFF"
                    defaultChecked
                  />
                </Form.Item>
              </div>
              <div className="col-sm-12 switchBtn">
                <Form.Item
                  name="SMSCustomerWhenRouteStoped"
                  label="SMS to the customer automatically when route stop is finished"
                >
                  <Switch
                    checkedChildren="ON"
                    unCheckedChildren="OFF"
                    defaultChecked
                  />
                </Form.Item>
              </div>

              <div className="col-sm-12">
                <Form.Item name="SMSDefaultMessage" label="SMS Default Message">
                  <Input.TextArea rows={5} placeholder="Default Message" />
                </Form.Item>
              </div>

              <div className="col-sm-12">
                <Form.Item
                  name="Subject"
                  label="Subject (service date will appear where {DATE} is written)"
                >
                  <Input placeholder="Subject" />
                </Form.Item>
              </div>

              <div className="col-sm-12">
                <Form.Item name="Header" label="Header">
                  <Input placeholder="Header" />
                </Form.Item>
              </div>

              <div className="col-sm-12">
                <Form.Item name="DefaultMessage" label="Default Message">
                  <Input.TextArea rows={5} placeholder="Default Message" />
                </Form.Item>
              </div>

              <div className="col-sm-12 fornoMargin">
                <Form.Item
                  name="IncludeChemicalReadings"
                  valuePropName="checked"
                >
                  <Checkbox>Include Chemical Readings</Checkbox>
                </Form.Item>
              </div>
              <div className="col-sm-12 fornoMargin">
                <Form.Item
                  name="IncludeChemicalDosages"
                  valuePropName="checked"
                >
                  <Checkbox>Include Chemical Dosages</Checkbox>
                </Form.Item>
              </div>
              <div className="col-sm-12 fornoMargin">
                <Form.Item
                  name="IncludeCompletedChecklistItems"
                  valuePropName="checked"
                >
                  <Checkbox>Include Completed Checklist Items</Checkbox>
                </Form.Item>
              </div>
              <div className="col-sm-12 fornoMargin">
                <Form.Item
                  name="IncludeNameofTech"
                  valuePropName="checked"
                >
                  <Checkbox>Include Name of Tech</Checkbox>
                </Form.Item>
              </div>
              <div className="col-sm-12 fornoMargin">
                <Form.Item
                  name="RequireAPhotoWithEachStop"
                  valuePropName="checked"
                >
                  <Checkbox>Require a Photo with Each Stop</Checkbox>
                </Form.Item>
              </div>

              <div className="col-sm-12 forTopMArgin">
                <Form.Item
                  name="Footer"
                  label="Footer"
                  // rules={[{ required: true, message: "Please input Footer!" }]}
                >
                  <Input placeholder="Footer" />
                </Form.Item>
              </div>
              {/* <div className="col-sm-12 savebtn">
                <Form.Item name="tryEmail" label="Try It Out">
                  <Button
                    type="primary"
                    className="bluebtn"
                    style={{ marginTop: "0" }}
                  >
                    Email Preview
                  </Button>
                </Form.Item>
              </div> */}
            </>
          ) : (
            <>
              <div className="col-sm-12 inForHead">
                <p>Skipped Stops Emails / SMS</p>
                <Button
                  type="primary"
                  className='yellowbtn'
                  onClick={() => navigate("/sms-setting/skipped-stop-reason")}
                  style={{ marginBottom: "20px" }}
                >
                  Add & Edit Reason
                </Button>
              </div>
              <div className="col-sm-12 switchBtn">
                <Form.Item
                  name="TechToChooseReasonWhenRouteSkip"
                  label="Require tech to choose reason when route stop is skipped"
                >
                  <Switch
                    checkedChildren="ON"
                    unCheckedChildren="OFF"
                    defaultChecked
                  />
                </Form.Item>
              </div>
              <div className="col-sm-12 switchBtn">
                <Form.Item
                  name="EmailOfficeWhenRouteSkip"
                  label="Email office when route stop is skipped"
                >
                  <Switch
                    checkedChildren="ON"
                    unCheckedChildren="OFF"
                    defaultChecked
                  />
                </Form.Item>
              </div>
              <div className="col-sm-12 switchBtn">
                <Form.Item
                  name="SMSOfficeWhenRouteSkip"
                  label="Sms office when route stop is skipped"
                >
                  <Switch
                    checkedChildren="ON"
                    unCheckedChildren="OFF"
                    defaultChecked
                  />
                </Form.Item>
              </div>

              <div className="col-sm-12 switchBtn">
                <Form.Item
                  name="EmailCustomerWhenRouteSkip"
                  label="Email customer when route stop is skipped"
                >
                  <Switch
                    checkedChildren="ON"
                    unCheckedChildren="OFF"
                    defaultChecked
                  />
                </Form.Item>
              </div>
              <div className="col-sm-12 switchBtn">
                <Form.Item
                  name="SMSCustomerWhenRouteSkip"
                  label="Sms customer when route stop is skipped"
                >
                  <Switch
                    checkedChildren="ON"
                    unCheckedChildren="OFF"
                    defaultChecked
                  />
                </Form.Item>
              </div>
              <div className="col-sm-12">
                <Form.Item
                  name="skippedSubject"
                  label="Subject (service date will appear where {DATE} is written)"
                >
                  <Input placeholder="Subject" />
                </Form.Item>
              </div>

              <div className="col-sm-12">
                <Form.Item name="skippedHeader" label="Header">
                  <Input placeholder="Header" />
                </Form.Item>
              </div>

              <div className="col-sm-12 fornoMargin">
                <Form.Item
                  name="IncludeReasonInCustomerEmail"
                  valuePropName="checked"
                >
                  <Checkbox name="reason">
                    Include reason in customer email
                  </Checkbox>
                </Form.Item>
              </div>

              <div className="col-sm-12 fornoMargin">
                <Form.Item
                  name="IncludeReasonInCustomerSms"
                  valuePropName="checked"
                >
                  <Checkbox name="reason">
                    Include reason in customer Sms
                  </Checkbox>
                </Form.Item>
              </div>
              <div className="col-sm-12 forTopMArgin">
                <Form.Item
                  name="skippedDefaultMessage"
                  label="Message (customer name will appear where {CUSTOMER} is written)"
                  // rules={[{ required: true, message: "Please input message!" }]}
                >
                  <Input.TextArea rows={5} placeholder="Message" />
                </Form.Item>
              </div>
              <div className="col-sm-12">
                <Form.Item
                  name="skippedSmsDefaultMessage"
                  label="Sms Message (customer name will appear where {CUSTOMER} is written)"
                  // rules={[{ required: true, message: "Please input message!" }]}
                >
                  <Input.TextArea rows={3} placeholder="SMS Message" />
                </Form.Item>
              </div>
              <div className="col-sm-12">
                <Form.Item
                  name="skippedFooter"
                  label="Footer"
                  // rules={[{ required: true, message: "Please input Footer!" }]}
                >
                  <Input placeholder="Footer" />
                </Form.Item>
              </div>
              {/* <div className="col-sm-12 savebtn">
                <Form.Item name="tryEmail" label="Try It Out">
                  <Button
                    type="primary"
                    className="bluebtn"
                    style={{ marginTop: "0" }}
                  >
                    Email Preview
                  </Button>
                </Form.Item>
              </div> */}
            </>
          )}
          <div className="col-sm-12 prospectButton savebtn">
            <Form.Item>
              <Button
                className="yellowbtn button"
                // style={{ marginTop: "30px" }}
                type="primary"
                htmlType="submit"
              >
                Update
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Fragment>
  );
};

export default SmsEmailFields;
