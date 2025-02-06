import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Form, Input, Radio, Space, notification } from "antd";
import TextArea from "antd/es/input/TextArea";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Editor from "./QuillEditor";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  postBoardEmail,
  clearData,
} from ".././../redux/postReducer/postBoardCastEmail";
import { toast } from "react-toastify";

const BroadCastEmailForm = () => {
  const [value, setValue] = useState(1);
  const [subject, setSubject] = useState("");
  const [quillData, setQuillData] = useState(""); // State to hold Quill editor data
  const dispatch = useDispatch();
  const { success, loading, error } = useSelector(
    (state) => state.postBoardEmail
  );
  const { state } = useLocation();
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const emailID = state?.emailData?.data?.map((item) => item?.CustomerEmail);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleQuillChange = (html) => {
    setQuillData(html);
  };

  const prompt = () => {
    notification.open({
      message: "We got value:",
      description: <span dangerouslySetInnerHTML={{ __html: state }}></span>,
    });
  };

  const handleSubmit = () => {
    const values = {
      subject: subject,
      body: quillData,
      emails: emailID,
      templateType: "Standard",
    };
    dispatch(postBoardEmail({ values }));
  };

  useEffect(() => {
    if (success) {
      form.resetFields();
      toast.success(success);
      dispatch(clearData());
      navigate("/email");
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearData());
    }
  }, [error]);

  return (
    <Fragment>
      {/* <div dangerouslySetInnerHTML={{ __html: quillData }}></div> */}
      <div className="container-fluid wordkorder broadCastEmail">
        <div className="row">
          <div className="row fomik emailForm">
            <Space
              style={{ display: "flex", marginBottom: 8 }}
              align="baseline"
            >
              <div className="row slignc readingBox cslocation">
                <div className="col-sm-12">
                  <Form.Item>
                    <Input
                      placeholder="Subject"
                      value={subject}
                      onChange={handleSubjectChange}
                    />
                  </Form.Item>
                </div>{" "}
                <div className="col-sm-12 radioSection">
                  {/* <Radio.Group onChange={onChange} value={value}>
                    <div className="col-sm-2">
                      <Radio value={"Standard"}>Standard</Radio>
                    </div>
                    <div className="col-sm-2">
                      <Radio value={"Plain"}>Plain</Radio>
                    </div>
                    <div className="col-sm-2">
                      <Radio value={"Schedule Change"}>Schedule Change</Radio>
                    </div>
                    <div className="col-sm-2">
                      <Radio value={"Service Repair need Work Order"}>
                        Service Repair need Work Order
                      </Radio>
                    </div>
                    <div className="col-sm-2">
                      <Radio value={"Holiday"}>Holiday</Radio>
                    </div>
                  </Radio.Group> */}
                </div>
                <div className="col-sm-12">
                  <Form.Item>
                    <Editor onChange={handleQuillChange} />
                  </Form.Item>
                </div>
                <div className="col-sm-12 emailButton">
                  <h2>Total Email: {state?.emailData?.data?.length}</h2>
                  <Button type="primary" onClick={handleSubmit}>
                    SEND EMAIL
                  </Button>
                </div>
              </div>
            </Space>
          </div>
        </div>
      </div>
      {/* <Button style={{ marginTop: 16 }} onClick={prompt}>
        Prompt
      </Button> */}
    </Fragment>
  );
};

export default BroadCastEmailForm;
