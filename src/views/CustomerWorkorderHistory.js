import React from 'react'
import { Fragment } from 'react'
import Poolheader from '../components/Pool/Poolheader'
import Poolaccordian from '../components/Pool/Poolaccordian'

import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar"
import CustomerWorkOrderHeader from '../components/CustomerWorkOrderHistory/CustomerWorkOrderHeader';
import CustomerWorkOrderPage from '../components/CustomerWorkOrderHistory/CustomerWorkOrderPage';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCustomerWorkOrderHistory } from '../redux/Slices/getCustomerWorkOrderHistory';
import LoadderData from "../components/NoDataComponent/Loader"

export default function ServiceLogDetail() {

    const { id } = useParams();

    const { data: CustomerWorkOrderHistory , statusdata } = useSelector(
    (state) => state.CustomerWorkOrderHistory
  );
  const dispatch = useDispatch();
  
      useEffect(() => {
    dispatch(fetchCustomerWorkOrderHistory({id}))
  },[dispatch])

    return (
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel" >
                <AdminNav />
                <div className="content">
                    <div className='addcustomers'>
                        <CustomerWorkOrderHeader />
                        {
                            statusdata == "idle" ?  <CustomerWorkOrderPage data={CustomerWorkOrderHistory}/>     : <LoadderData />
                        }
                       
                    </div>

                </div>
            </div>
        </Fragment>
    )
}
