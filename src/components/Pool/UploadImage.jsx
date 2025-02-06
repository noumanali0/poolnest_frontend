import React, { Fragment, useState, useEffect } from "react";
import Trash from "../../assets/img/Trash.png";
import Create from "../../assets/img/Create.png";
import Previewslider from "./Previewslider";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Button, Upload, Form, Input } from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import {
  postwaterbodyImagesData,
  clearData,
} from "../../redux/postReducer/postPoolImages";
import { useDispatch } from "react-redux";
import { fetchwaterbodyImage } from "../../redux/Slices/getpoolImages";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function UploadImage({ data }) {
  const { successpost, error, loading } = useSelector(
    (state) => state.postwaterbodyImages
  );

  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const [Description, setDescription] = useState("");
  const [dataload, setdata] = useState(false);
  const [image, setimage] = useState(null);
  const [fileList, setFileList] = useState([]); // Add state for fileList

  const waterbody_id = data?._id;

  console.log(fileList);

  const handleUpload = async () => {
    if (fileList?.length == 0) {
      toast.error("Please upload Image");
      return;
    }

    const formData = new FormData();

    if (Description) {
      formData.append("Description", Description);
    }
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("image", file.originFileObj);
      }
    });
    await dispatch(postwaterbodyImagesData({ formData, waterbody_id }));
    setdata(true);
    // Reset state values
  };

  useEffect(() => {
    if (successpost && dataload) {
      toast.success("Data Submitted Successfully");
      dispatch(fetchwaterbodyImage({ waterbody_id }));
      setdata(false);
      dispatch(clearData());
      setimage(null); // Clear image state
      setDescription(""); // Clear Description state
      setFileList([]); // Clear fileList state
    }
    if (error) {
      toast.error(error);
      setdata(false);
      dispatch(clearData());
    }
  }, [dataload]);

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleChange1 = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handlePreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const imgWindow = window.open(src);
    imgWindow.document.write(`<img src="${src}" />`);
  };

  return (
    <Fragment>
      <div className="container-fluid wordkorder">
        <div className="row headwork">
          <div className="col-sm-6 heads">
            <h3>Images</h3>
          </div>
        </div>
        <div className="row uploadImagePoOOLll">
          <div className="col-sm-6">
            <Form.Item
              label="Image Description"
              rules={[
                {
                  required: true,
                  message: "Please input your Description!",
                },
              ]}
            >
              <Input
                value={Description}
                onChange={handleChange}
                placeholder="Image Description"
              />
            </Form.Item>
          </div>
          <div className="col-sm-6 uploadImageeePoolAccordion">
            <Upload
              listType="picture-card"
              fileList={fileList}
              beforeUpload={() => false}
              maxCount={1}
              onChange={handleChange1}
              onPreview={handlePreview}
              className="avatar-uploader"
            >
              {fileList.length === 0 && (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Select Image</div>
                </div>
              )}
            </Upload>
          </div>
        </div>
        <div className="col-sm-12 uploadImageeePoolAccordionBtn">
          <Button type="primary" disabled={loading} onClick={handleUpload}>
            Upload
          </Button>
        </div>
      </div>
    </Fragment>
  );
}
