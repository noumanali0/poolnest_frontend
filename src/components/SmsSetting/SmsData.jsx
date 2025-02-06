import React, { Fragment, useState, useEffect } from "react";
import { Button, Form, Input, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { fetchgetAllCityByCountry, fetchgetCustomerCity } from "../../redux/Slices/getCustomerCity";
import { fetchgetCustomerState } from "../../redux/Slices/getCustomerState";
import { fetchgetCustomerCountry } from "../../redux/Slices/getCustomerCountry";
import { postServiceEmailSettingsData, resetData } from "../../redux/postReducer/postServiceEmailSettings";
import { fetchServiceEmailSettings } from "../../redux/Slices/getServiceEmailSettingsData";
import { toast } from "react-toastify";

const SmsData = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { data: ServiceEmailSettings, status } = useSelector(state => state.ServiceEmailSettings);
  const customercity = useSelector(state => state.getCustomerCity);
  const customercountry = useSelector(state => state.getCustomerCountry);
  const customerstate = useSelector(state => state.getCustomerState);
  const { error, success } = useSelector(state => state.postServiceEmailSettings);
  const [formData, setFormData] = useState();
  const [countryid, setCountryId] = useState(""); 
  const [cityid, setCityId] = useState(""); 

  useEffect(() => {
    dispatch(fetchgetCustomerCountry());
  }, [dispatch]);

  useEffect(() => {
    setFormData({
      FromName: ServiceEmailSettings?.FromName,
      Email: ServiceEmailSettings?.Email || "",
      Company: ServiceEmailSettings?.Company || "",
      Phone: ServiceEmailSettings?.Phone,
      Zip: ServiceEmailSettings?.Zip,
      CityId: ServiceEmailSettings?.cityname,
      StateId: ServiceEmailSettings?.statename,
      CountryId: ServiceEmailSettings?.countryname,
      Address: ServiceEmailSettings?.Address,
      Logo: ServiceEmailSettings?.Logo,
      Website: ServiceEmailSettings?.Website,
      Bcc: ServiceEmailSettings?.Bcc,
    });
  }, [ServiceEmailSettings]);

  useEffect(() => {
    form.setFieldsValue({
      FromName: formData?.FromName,
      Email: formData?.Email || "",
      Company: formData?.Company || "",
      Phone: formData?.Phone || "",
      Zip: formData?.Zip || "",
      CityId: formData?.CityId || "",
      StateId: formData?.StateId || "",
      CountryId: formData?.CountryId || "",
      Address: formData?.Address || "",
      Logo: formData?.Logo || "",
      Website: formData?.Website || "",
      Bcc: formData?.Bcc || "",
    });
  }, [formData, form]);

  const normFile = ({ fileList }) => fileList.map(file => file.originFileObj);

  const handleChange = id => {
    dispatch(fetchgetCustomerCity({ id }));
  };

  const handleChangeCity = id => {
    setCityId(id)
  };

  const handleChangeCountry = id => {
    dispatch(fetchgetCustomerState({ id }));
  };

  const filterOption = (input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  const onSearch = name => {
    dispatch(fetchgetAllCityByCountry({ countryid, name }));
  };

  const onFinish = async data => {
    const values = new FormData();
    values.append("FromName", data?.FromName);
    values.append("Cc", data?.Email);
    values.append("Bcc", data?.Bcc);
    values.append("Phone", data?.Phone);
    values.append("Zip", data?.Zip);
    values.append("Address", data?.Address);
    values.append("Website", data?.Website);
    values.append("image", data?.CompanyLogo[0]);
    values.append("CityId", cityid ? cityid : ServiceEmailSettings?.CityId);
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
        <Form
          name="Customer"
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          initialValues={formData}
        >
          <div className="col-sm-6">
            <Form.Item
              name="FromName"
              label="From Name"
              rules={[{ required: true, message: "Please input from name!" }]}
            >
              <Input placeholder="From Name" />
            </Form.Item>
          </div>

          <div className="col-sm-6">
            <Form.Item
              name="Email"
              label="From Email(CC)"
              rules={[
                { required: true, message: "Please input from email!" },
                { type: "email", message: "Email not valid" },
              ]}
            >
              <Input placeholder="From Email" />
            </Form.Item>
          </div>

          <div className="col-sm-6">
            <Form.Item
              name="Company"
              label="Company Name"
              rules={[
                { required: true, message: "Please input company name!" },
              ]}
            >
              <Input placeholder="Company Name" />
            </Form.Item>
          </div>

          <div className="col-sm-6">
            <Form.Item
              name="Bcc"
              label="BCC"
              rules={[
                { required: true, message: "Please input bcc!" },
                { type: "email", message: "Email not valid" },
              ]}
            >
              <Input placeholder="BCC" />
            </Form.Item>
          </div>

          <div className="col-sm-12">
            <Form.Item
              name="Address"
              label="Address"
              rules={[{ required: true, message: "Please input address!" }]}
            >
              <Input placeholder="Address" />
            </Form.Item>
          </div>

          <div className="col-sm-6">
            <Form.Item
              label="Country"
              name="CountryId"
              rules={[
                { required: true, message: "Please input your Country!" },
              ]}
            >
              <Select
                placeholder="Country"
                onChange={handleChangeCountry}
                showSearch
                filterOption={filterOption}
              >
                {customercountry &&
                  customercountry?.data?.map(item => (
                    <Select.Option key={item._id} value={item._id}>
                      {item.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </div>

          <div className="col-sm-6">
            <Form.Item
              label="State"
              name="StateId"
              rules={[{ required: true, message: "Please input your State!" }]}
            >
              <Select
                placeholder="State"
                onChange={handleChange}
                showSearch
                filterOption={filterOption}
              >
                {customerstate &&
                  customerstate?.data?.items?.map(item => (
                    <Select.Option key={item._id} value={item._id}>
                      {item.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </div>

          <div className="col-sm-6">
            <Form.Item
              name="CityId"
              label="City"
              rules={[
                {
                  required: true,
                  message: "Please input your city!",
                },
              ]}
            >
              <Select
                placeholder="City"
                showSearch
                filterOption={filterOption}
                onSearch={onSearch}
                onChange={handleChangeCity}
              >
                {customercity?.data?.map((item, i) => {
                  return <Option value={item?._id}>{item?.name}</Option>;
                })}
              </Select>
            </Form.Item>
          </div>

          <div className="col-sm-6">
            <Form.Item
              name="Zip"
              label="Zip"
              rules={[{ required: true, message: "Please input Zip!" }]}
            >
              <Input placeholder="Zip Code" />
            </Form.Item>
          </div>

          <div className="col-sm-6">
            <Form.Item
              name="Phone"
              label="Phone"
              rules={[{ required: true, message: "Please input Phone!" }]}
            >
              <Input placeholder="From Email" />
            </Form.Item>
          </div>
          {/* <div className="col-sm-6">
            <Form.Item
              name='email'
              label='Email'
              rules={[
                { required: true, message: "Please input Email!" },
                { type: "email", message: 'Email is not valid!'}
              ]}
            >
              <Input placeholder='Email' />
            </Form.Item>
          </div> */}
          <div className="col-sm-6">
            <Form.Item
              name="Website"
              label="Website"
              rules={[{ required: true, message: "Please input Website!" }]}
            >
              <Input placeholder="Website" />
            </Form.Item>
          </div>

          <div className="col-sm-12" style={{ display: "flex", gap: "50px" }}>
            <Form.Item
              name="CompanyLogo"
              label="Profile Picture"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[
                {
                  required: true,
                  message: "Please Enter Profile Picture!",
                },
              ]}
            >
              <Upload
                name="CompanyLogo"
                beforeUpload={() => false}
                action="/upload.do"
                listType="picture"
                accept="image/*, audio/*"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>
                  Click to Select Media File
                </Button>
              </Upload>
            </Form.Item>
          </div>
          <div className="col-sm-12 prospectButton savebtn">
            <Form.Item>
              <Button
                className="yellowbtn"
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

export default SmsData;
