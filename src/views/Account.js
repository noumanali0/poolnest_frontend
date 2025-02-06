import React, { Fragment, useEffect, useState } from "react";

import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import AccountHeader from "../components/Account/AccountHeader";
import { fetchaccountDetail } from "../redux/Slices/getAccoutDetails";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Button, Checkbox, Form, Modal, Upload } from "antd";
import { UpdateCompanyLogo } from "../redux/postReducer/postUpdateCompanyLogo";
import { toast } from "react-toastify";
import { HiOutlineUpload } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";

export default function Account() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [isChecked, setIsChecked] = useState(true); // Initialize state
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const { data: accountDetail } = useSelector((state) => state.accountDetail);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();

    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("image", file.originFileObj);
      }
    });

    try {
      const response = await dispatch(UpdateCompanyLogo(formData));
      console.log(response);

      if (response) {
        toast.success("Company Logo updated successfully");
      }
    } catch (error) {
      console.error("Error updating company logo:", error);
      toast.error("Failed to update company logo");
    }
  };
  const { loading, message } = useSelector(
    (state) => state.postUpdateCompanyLogo
  );
  useEffect(() => {
    dispatch(fetchaccountDetail());
  }, [dispatch]);
  const [formData, setFormData] = useState({
    Name: accountDetail?.Name || "",
    FirstName: accountDetail?.FirstName || "",
    LastName: accountDetail?.LastName || "",
    Company: accountDetail?.Company || "",
    Zip: accountDetail?.Zip || "",
    Address: accountDetail?.Address || "",
    Mobile: accountDetail?.Mobile || "",
    Consent: isChecked,
  });
  useEffect(() => {
    setFormData({
      Name: accountDetail?.Name || "",
      FirstName: accountDetail?.FirstName || "",
      LastName: accountDetail?.LastName || "",
      Company: accountDetail?.Company || "",
      Zip: accountDetail?.Zip || "",
      Address: accountDetail?.Address || "",
      Mobile: accountDetail?.Mobile || "",
      Consent: accountDetail?.Consent,
      CityName: accountDetail?.CityName,
      StateName: accountDetail?.StateName,
    });
    setIsChecked(accountDetail?.Consent);
  }, [accountDetail]);

  const onChange = (e) => {
    setIsChecked(e.target.checked);
  };
  console.log(isChecked);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (accountDetail?.image) {
      setFileList([
        {
          uid: "-1",
          name: "profileImage.png",
          status: "done",
          url: accountDetail?.image,
        },
      ]);
    }
  }, [accountDetail]);

  const onFinish = async () => {
    const formData = new FormData();
    fileList?.forEach((file) => {
      if (file?.originFileObj) {
        formData.append("image", file?.originFileObj);
      }
    });

    const response = await dispatch(UpdateCompanyLogo(formData));
    console.log(response);
    if (response) {
      toast.success("Company Logo updated successfully");
    }
  };

  const handleUpdate = async () => {
    const updatedFormData = { ...formData, Consent: isChecked }; // ensure you're using the latest isChecked
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/SuperAdmin/${accountDetail?._id}`,
        updatedFormData
      );
      console.log("Profile updated successfully", response.data);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  const onPreview = (file) => {
    setPreviewImage(file.url || accountDetail?.image); // Set preview image
    setIsModalOpen(true); // Open modal
  };

  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <div className="addcustomers smsHeader accheader">
            <div className="row cslocation">
              <AccountHeader />
            </div>
          </div>

          <div className="smsHeader">
            <div className="rounded bg-white mt-5 mb-5">
              <div className="row cslocation">
                <div className="col-md-3 border-right">
                  <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                    <div className="d-flex justify-content-between align-items-center mb-3 mmoobbillee">
                      <h4 className="text-right">Profile Settings</h4>
                    </div>
                    <Form form={form} name="profileImage" onFinish={onFinish}>
                      <div className="row">
                        <div className="col-sm-12 changePasswordP image">
                          {/* Wrap Upload in Form.Item */}
                          <Form.Item name="upload">
                            <Upload
                              listType="picture-card"
                              fileList={fileList}
                              onPreview={onPreview}
                              onChange={({ fileList }) => setFileList(fileList)}
                              beforeUpload={() => false}
                            >
                              {fileList.length < 1 && (
                                <div>
                                  <PlusOutlined />
                                  <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                              )}
                            </Upload>

                            <Button type="primary" onClick={handleUpload}>
                              Update Logo
                            </Button>
                          </Form.Item>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="p-3 py-5">
                    <div className="d-flex justify-content-between align-items-center mb-3 ddeskttop">
                      <h4 className="text-right">Profile Settings</h4>
                    </div>

                    <div className="row cslocation mt-3">
                      <div className="col-md-12">
                        <label className="labels">Company Name</label>
                        <input
                          type="text"
                          className="form-control form-css-data"
                          placeholder="enter address line 1"
                          name="Company"
                          value={formData.Company}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="row cslocation mt-2">
                      <div className="col-md-6">
                        <label className="labels">First Name</label>
                        <input
                          type="text"
                          className="form-control form-css-data"
                          placeholder="first name"
                          name="FirstName"
                          value={formData.FirstName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="labels">Last Name</label>
                        <input
                          type="text"
                          className="form-control form-css-data"
                          placeholder="surname"
                          name="LastName"
                          value={formData.LastName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="row cslocation mt-3">
                      <div className="col-md-12">
                        <label className="labels">Mobile Number</label>
                        <input
                          type="text"
                          className="form-control form-css-data"
                          placeholder="enter phone number"
                          name="Mobile"
                          value={formData.Mobile}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="labels">Email</label>
                        <input
                          type="text"
                          className="form-control form-css-data"
                          placeholder="enter email"
                          value={accountDetail?.Email} // Email is disabled
                          disabled
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="labels">Address</label>
                        <input
                          type="text"
                          className="form-control form-css-data"
                          placeholder="enter address line 1"
                          name="Address"
                          value={formData.Address}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-12 text-right">
                        <Button type="primary" onClick={handleUpdate}>
                          Update Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        visible={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)} // Close modal on cancel
      >
        <img
          alt="Profile Preview"
          style={{ width: "100%" }}
          src={previewImage}
        />
      </Modal>
    </Fragment>
  );
}
