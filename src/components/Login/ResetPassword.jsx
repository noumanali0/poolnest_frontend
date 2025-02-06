import { Fragment, React, useEffect } from "react";
import Logo from "../../assets/img/new_logo.png";
import { Button, Checkbox, Form, Input, message, Tooltip } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";
import {
  forgetPassword,
  resetPassword,
  userLogin,
} from "../../redux/postReducer/userPost";
import { useDispatch, useSelector } from "react-redux";
import img1 from "../../assets/img/homePageImage1.png";
import img2 from "../../assets/img/homePageImage2.png";
import { FaUnlock } from "react-icons/fa";
import { reset } from "../../redux/Slices/userSlice";
import Logos from "../../assets/img/logo.png";
import img3 from "../../assets/img/bannerImage.png";
import Headerr from "../FormHeaderAndFooter/Headerr";
import Footerr from "../FormHeaderAndFooter/Footerr";
import { InfoCircleOutlined } from "@ant-design/icons";

function ResetPassword() {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();

  const validatePassword = (_, value) => {
    if (value && value.length < 6) {
      return Promise.reject("Password must be at least 4 characters long.");
    }
    return Promise.resolve();
  };

  const onFinish = async (values) => {
    const token = param.token;

    dispatch(resetPassword({ token, values }));
  };

  useEffect(() => {
    if (error) {
      const err = error?.data?.message;
      toast.error(err);
      dispatch(reset());
    }
    if (success) {
      toast.success(success);
      navigate("/");
      dispatch(reset());
    }
  }, [error, success]);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const passwordValidator = (_, value) => {
    if (value.length < 8) {
      return Promise.reject(
        new Error("Password must be at least 8 characters")
      );
    }
    if (!/[A-Z]/.test(value)) {
      return Promise.reject(
        new Error("Password must contain at least one uppercase letter")
      );
    }
    if (!/[a-z]/.test(value)) {
      return Promise.reject(
        new Error("Password must contain at least one lowercase letter")
      );
    }
    if (!/[0-9]/.test(value)) {
      return Promise.reject(
        new Error("Password must contain at least one number")
      );
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return Promise.reject(
        new Error("Password must contain at least one special character")
      );
    }
    if (/\s/.test(value)) {
      return Promise.reject(new Error("Password cannot contain spaces"));
    }

    return Promise.resolve();
  };
  return (
    <Fragment>
      <div className="container-fluid stepsform stepsform1">
        <div className="row padding-row1 cslocation forgetFPage loginPage">
          <div className="col-sm-12 loginlogo ">
            <Headerr />
          </div>
          <div className="col-sm-6 loginInputs forgetForm">
            <div className="row cslocation">
              <Form
                className="login-form"
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <h3 className="main-h1">
                  Enter New Password <FaUnlock />
                </h3>
                <div className="toTab">
                  <div className="col-sm-6 froImageBaner">
                    <img src={img3} alt="" className="bnrimgone" />
                  </div>
                </div>
                <div className="col-sm-12">
                  <Form.Item
                    name="firstpassword"
                    rules={[
                      { required: true, message: "Please enter your password" },
                      { validator: passwordValidator },
                    ]}
                    label={
                      <span>
                        Password&nbsp;
                        <Tooltip
                          title={
                            <span>
                              Password must meet the following requirements:
                              <ul>
                                <li>At least 8 characters</li>
                                <li>At least one uppercase letter</li>
                                <li>At least one lowercase letter</li>
                                <li>At least one number</li>
                                <li>At least one special character</li>
                                <li>No spaces allowed</li>
                              </ul>
                            </span>
                          }
                        >
                          <InfoCircleOutlined />
                        </Tooltip>
                      </span>
                    }
                  >
                    <Input.Password
                      placeholder="Password"
                      className="main-input-css"
                    />
                  </Form.Item>
                </div>
                <div className="col-sm-12">
                  <Form.Item
                    name="confirmPassword"
                    label="Confirm Password"
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your Password",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue("firstpassword") === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            "The two passwords do not match"
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      placeholder="Confirm Password"
                      className="main-input-css"
                    />
                  </Form.Item>
                </div>

                <div className="col-sm-12 inLinnenee">
                  <Button type="primary" htmlType="submit" className="gstrt">
                    Submit
                  </Button>
                </div>
              </Form>
            </div>
          </div>
          <div className="col-sm-6 froImageBaner notTab">
            <img src={img3} alt="" className="bnrimgone" />
          </div>
          <div className="col-sm-12 noPadd">
            <Footerr />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ResetPassword;
