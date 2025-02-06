import React, { useState, useEffect, Fragment } from "react";
import { Button, Form, Space, Modal } from "antd";
// import { FaLock } from "react-icons/fa";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  postPaymentData,
  resetData,
} from "../redux/postReducer/PostPaymentData";
import { useDispatch, useSelector } from "react-redux";
import img3 from "../assets/img/bannerImage.png";
import Headerr from "../components/FormHeaderAndFooter/Headerr";
import Footerr from "../components/FormHeaderAndFooter/Footerr";
import { Helmet } from "react-helmet";

const PaymentInfo = () => {
  const [client_secret_id, setstateData] = useState("");
  const [token, settoken] = useState("");
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { error, data, success } = useSelector(
    (state) => state.postPaymentData
  );
  const storeTheme = localStorage.getItem("primary");
  document.documentElement.style.setProperty(
    "--primary-color",
    storeTheme || "#1a4a5b"
  );

  document.documentElement.style.setProperty("--font-color", "#fff");

  const location = window.location.origin;
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("state", state);

    if (state) {
      const { client_secret } = state;
      setstateData(client_secret?.client_secret);
      settoken(client_secret?.data);
    } else {
      window.location.href = location;
    }
  }, [state]);

  const stripe = useStripe();
  console.log("stripe", stripe);
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      client_secret_id,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );

    setLoading(false);

    if (paymentIntent) {
      if (paymentIntent?.status === "succeeded") {
        const Data = paymentIntent?.id;
        await dispatch(postPaymentData({ Data, token }));

        //  if(success){
        //   toast(success)
        //  }
        //  if(error){
        //   toast(error)
        //  }

        dispatch(resetData());
      }
    } else if (error) {
      toast(error?.message);
    }
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      setIsModalVisible(true);
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, success]);

  const handleOk = () => {
    setIsModalVisible(false);
    navigate("/");
    dispatch(resetData());
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    navigate("/");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Payment Information</title>
      </Helmet>
      <div className="container-fluid stepsform stepsform1">
        <div className="row padding-row registerForm paymentForm loginnx padding-row1 cslocation forgetFPage loginPage">
          <div className="col-sm-12 loginlogo">
            <Headerr />
          </div>
          <div className="col-sm-6 loginInputs forgetForm">
            <div className="row fomik addRoute cslocation">
              <form onSubmit={handleSubmit} className="formpayement login-form">
                <h3>
                  Step 2: Payment Information <BsFillCreditCard2FrontFill />
                </h3>
                <div className="toTab">
                  <div className="col-sm-6 froImageBaner">
                    <img src={img3} alt="" className="bnrimgone" />
                  </div>
                </div>
                <div className="card-element">
                  <h2 className="carddetails paymentScreen">
                    Please Enter Card Details
                  </h2>
                  <div className="col-sm-12">
                    <Form.Item name="cardDetails" required>
                      <CardElement
                        options={{
                          style: {
                            base: {
                              fontSize: "16px",
                              color: "#424770",
                              "::placeholder": {
                                color: "#aab7c4",
                              },
                            },
                          },
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>
                <Space className="paymentSpace">
                  <div className="col-sm-12 paymentBtn inLinnenee">
                    <Button
                      type="primary"
                      className="nextbtn"
                      htmlType="submit"
                      disabled={!stripe || loading}
                    >
                      Pay Now
                    </Button>
                  </div>
                </Space>
              </form>
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

      <Modal
        title="Action Required"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Proceed"
        cancelText="Cancel"
      >
        <p>
          Please check your email and complete your Stripe configuration before
          continuing.
        </p>
      </Modal>
    </Fragment>
  );
};

export default PaymentInfo;
