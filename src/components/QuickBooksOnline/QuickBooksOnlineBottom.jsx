import { Button, Divider } from "antd";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
// import CancelSubscriptionForm from "./CancelSubscriptionForm";
import { Space, Switch } from 'antd';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { QBOUpdateSyncingData , resetData } from "../../redux/postReducer/postQBOUpdateSyncing";
import { toast } from "react-toastify";
const CancelSubscription = () => {

    const {data : profileDetail} = useSelector((state) => state.profileDetail);
    const { success, error , loading } = useSelector((state) => state.QBOUpdateSyncing);

    const dispatch = useDispatch();

    const handleSwitch = (e) => {
        console.log(e)
        const values =  {
            "syncying": e
        }
        dispatch(QBOUpdateSyncingData({values}))
    };
    useEffect(() => {
        if (success) {
          toast.success(success);
          dispatch(resetData());
        }
        if (error) {
          toast.error(error);
          dispatch(resetData());
        }
      }, [error, success]);

    return (
        <div className="container-fluid stepsform stepsform1">
            <div className="row padding-row registerForm paymentForm">
                <div className="col-sm-12 stepforms step steps">
                    <div className="row fomik addRoute">
                    <div className="col-sm-12">
                        <p className="cancelSubTitle">Sync Items</p>
                        <p className="cancelSubtetx">Import QBO Customers and Products before syncing.</p>
                        <Divider />
                        <div className="row ">
                        <Switch disabled={!profileDetail?.QuickBookRecord} checkedChildren="On" unCheckedChildren="Off" onChange={handleSwitch} defaultChecked className="Switchcheckbox"/>
                        <p className="cancelSubTitle subtitle QuickBooks">Sync PoolNest items to QuickBooks Online</p>
                        </div>

                    </div> 
                        {/* <div className="col-sm-12">
                        <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked />

                        </div> */}
                    </div>
                </div>
            </div>
           
        </div>
    );
};

export default CancelSubscription;
