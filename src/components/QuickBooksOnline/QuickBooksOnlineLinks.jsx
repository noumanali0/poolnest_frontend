import React, { useState, useEffect } from "react";
import { Button, Form, Input, Radio , Divider} from "antd";
import { toast } from "react-toastify";
import { useSelector , useDispatch  } from "react-redux";
import { postCancelPayment , clearData } from "../../redux/postReducer/postPaymentCancelation";
import { PiVideoFill } from "react-icons/pi";


const CancelSubscriptionForm = ({ data1 }) => {
  const [form] = Form.useForm();

  const {error, success ,loading} = useSelector((state) => state.postCancelPayment)
  const dispatch = useDispatch();

  console.log(error, success ,loading)

  const [formData, setFormData] = useState();
  const onFinish = async (values) => {
    console.log(values)
    dispatch(postCancelPayment(values))
   
  };

  useEffect(() => {
    if(success){
        dispatch(clearData())
        toast.success(success);
        data1.handleClose();
    }
    if(error){
        dispatch(clearData())
        toast.error(error);

    }
  },[error, success])
  const onFinishFailed = (errorInfo) => {
    toast.error(errorInfo, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  };


  return (
    <div className="row fomik addRoute taxratee paymenttt">
        <p className="cancelSubTitle">Videos & Instructions</p>
        <Divider />
         <div className="row cslocation Instructions">
         <div className="col-sm-4 svg"><PiVideoFill /></div>
          <div className="col-sm-8"><p className="cancelSubTitle subtitle"><a href="">Videos & Instructions</a></p></div>
         </div>
         <Divider />
         <div className="row cslocation Instructions">
          <div className="col-sm-4 svg"><PiVideoFill /></div>
          <div className="col-sm-8"><p className="cancelSubTitle subtitle"><a href="">Instructions for Set Up</a></p></div>
         </div>
         <Divider />
         <div className="row cslocation Instructions">
         <div className="col-sm-4 svg"><PiVideoFill /></div>
          <div className="col-sm-8"><p className="cancelSubTitle subtitle"><a href="">PoolNest Billing Tutorials</a></p></div>
         </div>
    </div>
  );
};

export default CancelSubscriptionForm;
