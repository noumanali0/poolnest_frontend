import React, { useState, useEffect } from "react";
import { Button, Form, Space } from "antd";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import visa from '../../assets/img/visa.jpg'
import mastercard from '../../assets/img/mastercard.jpg'
import americanex from '../../assets/img/american.png'
import paypals from '../../assets/img/paypal.png'
import { useDispatch } from "react-redux";
import {postChangePayment , resetData} from "../../redux/postReducer/PostChangePayment";
import { fetchgetPaymentData } from "../../redux/Slices/getPaymentInfoData";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";


const PaymentMethodForm = () => {
  
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {error, success} = useSelector((state) => state.postChangePayment)
    const stripe = useStripe();
    const elements = useElements();
  
  console.log(error, success)
  

   

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error, token } = await stripe.createToken(
        elements.getElement(CardElement)
      );
      if (error) {
        console.log(error);
      } else {
        console.log(token);
      }
   

    if (token) {
        const Data = {
            token : token?.id
        }
        await dispatch(postChangePayment({ Data }));
        dispatch(fetchgetPaymentData())

        setLoading(false);

    } else if (error) {
        console.log(error)
      toast(error?.message);
      setLoading(false);

    }
    setLoading(false);

  };
useEffect(() => {
    if(success){
        toast.success(success)
        dispatch(resetData())
    }
    if(error){
        toast.error(error)
        dispatch(resetData())

    }
},[error, success])
    return (
        <div className="container-fluid stepsform stepsform1">
            <div className="row padding-row registerForm paymentForm">
                <div className="col-sm-12 stepforms step steps">
                    <div className="row fomik addRoute">
                        <h3>Enter New Payment Method</h3>
                        <form onSubmit={handleSubmit} className="formpayement">
                            <div className="card-element">
                                <div className="imagesform">
                                    <img src={visa}/>
                                    <img src={mastercard}/>
                                    <img src={americanex}/>
                                    <img src={paypals}/>
                                </div>
                                <h2 className="carddetails">Enter Card Details</h2>
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
                                <div className="col-sm-12 paymentBtn">
                                    <Button
                                        type="primary"
                                        className="nextbtn"
                                        htmlType="submit"
                                        disabled={!stripe || loading}
                                    >
                                        Save Payment Method
                                    </Button>
                                </div>
                            </Space>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethodForm;