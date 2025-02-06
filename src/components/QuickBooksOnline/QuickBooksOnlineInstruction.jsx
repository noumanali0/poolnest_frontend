import { Button } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { QuickBookCustomersToWeb, QuickBookItemsToWeb  } from "../../redux/Slices/getQuickBookToWeb";
import { toast } from "react-toastify";

const PaymentInfoMethod = () => {
  const {data : profileDetail} = useSelector((state) => state.profileDetail);
  const {data : QuickBookDataToWeb , Loading ,LoadingItem, statusdata} = useSelector((state) => state.QuickBookDataToWeb);

  const dispatch = useDispatch();

  console.log(profileDetail)

  const super_id = profileDetail?.data?._id
  console.log(super_id)

  const handleCustomerImport = async () => {
    await dispatch(QuickBookCustomersToWeb())
      toast.success(QuickBookDataToWeb?.message)
      
  }
  
  const handleItemImport = async () => {
    await dispatch(QuickBookItemsToWeb())
      toast.success(QuickBookDataToWeb?.message)
  }

  return (
    <div className="container-fluid stepsform stepsform1">
      <div className="row padding-row registerForm paymentForm dashboard">
        <div className="col-sm-12 stepforms step steps">
          <div className="row cslocation fomik addRoute QBBO">
            <div className="col-sm-8 fullWIdthhhh">
              <h3>PoolNest Billing to QBO</h3>
              <p>
                Never miss a payment by billing in PoolNest and automatically
                syncing items such as invoices, payments, and more to
                QuickBooks Online. Connect to QBO to get started.
              </p>
            </div>
            <div className="col-sm-4 fullWIdthhhh">
              {
                profileDetail?.QuickBookRecord 
                ? <Button type="primary" className="nextbtn" disabled>Connect to QBO</Button> 
                : 
                <Button className="CQBO">
                <a href={`${process.env.REACT_APP_API_URL}/SuperAdminQuickBook/auth?SuperAdmin=${super_id}`} className="nextbtn-redirect" target="_blank" >Connect to QBO</a>

                </Button>
              }
              
              {/* <Button type="primary" className="nextbtn" htmlType="submit">
                
              </Button> */}
            </div>
            {
              profileDetail?.QuickBookRecord ? <div className="row">
                <div className="col-sm-6 qbobtn"><Button type="primary" loading={Loading} className="nextbtn" onClick={handleCustomerImport}>Import Customer</Button></div>
                <div className="col-sm-6 qbobtn"><Button type="primary" loading={LoadingItem} className="nextbtn" onClick={handleItemImport}>Import Items</Button></div>
              
              
            </div> : <></>
            }
            
          </div>
          <div className="row ">
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfoMethod;
