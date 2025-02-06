import { Fragment, React, useEffect } from "react";
import Logo from "../../assets/img/new_logo.png";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";
import { userLogin } from "../../redux/postReducer/userPost";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../redux/Slices/userSlice";

import { FaUnlock } from "react-icons/fa";
import Headerr from "../FormHeaderAndFooter/Headerr";
import Footerr from "../FormHeaderAndFooter/Footerr";
function Login() {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  );

  const storeTheme = localStorage.getItem("primary");
  document.documentElement.style.setProperty(
    "--primary-color",
    storeTheme || "#1a4a5b"
  );

  document.documentElement.style.setProperty("--font-color", "#fff");

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useHistory
  const VerifyUser = async () => {
    const config = {
      headers: {
        Authorization: Cookies.get("userToken"),
      },
    };
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/me`,
        config
      );
      navigate("/customer");
      return true;
    } catch (err) {
      navigate("/");
      return false;
      // SetUserApproval(false);
    }
  };

  const token = Cookies.get("userToken");
  useEffect(() => {
    if (userInfo && token) {
      navigate("/customer", { replace: true });
    }
  }, [navigate, userInfo]);
  const onFinish = async (values) => {
    dispatch(userLogin({ values }));
  };

  useEffect(() => {
    if (error) {
      const err = error?.data?.message;
      toast.error(err);
      if (error?.status == 300) {
        navigate("/account/payment", {
          state: {
            client_secret: error.data,
          },
        });
      }
      dispatch(reset());
    }
  }, [error]);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    VerifyUser();
  }, []);

  const handleNavigate = () => {
    navigate("/account/register");
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
                  Sign into your account <FaUnlock />
                </h3>
                <div className="toTab">
                  <div className="col-sm-6 froImageBaner">
                    <img
                      src={
                        "https://poolnestassets.s3.eu-north-1.amazonaws.com/DefaultAssets/BannerImage.png"
                      }
                      alt=""
                      className="bnrimgone"
                    />
                  </div>
                </div>
                <div className="col-sm-12">
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        required: true,
                        message: "Please input Email!",
                      },
                    ]}
                  >
                    <Input placeholder="Email" className="main-input-css" />
                  </Form.Item>
                </div>

                <div className="col-sm-12">
                  <Form.Item
                    name="password"
                    label="Password"
                    className="inputPass"
                    rules={[
                      {
                        required: true,
                        message: "Please input password!",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Password"
                      type="password"
                      className="main-input-css"
                    />
                  </Form.Item>
                </div>

                <div className="col-sm-12 inLinnenee">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="gstrt logBtn"
                  >
                    Login
                  </Button>
                  <div className="tetxright">
                    <Link to="/forgetpassword">Forget Password</Link>
                    <div className="Signup-css">
                      <p>
                        Don't have an account?{" "}
                        <span className="signup-btn" onClick={handleNavigate}>
                          Sign up
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
          <div className="col-sm-6 froImageBaner notTab">
            <img
              src={
                "https://poolnestassets.s3.eu-north-1.amazonaws.com/DefaultAssets/BannerImage.png"
              }
              alt=""
              className="bnrimgone"
            />
          </div>
          <div className="col-sm-12 noPadd">
            <Footerr />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
