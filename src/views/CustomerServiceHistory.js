import React from 'react'
import { Fragment } from 'react'
import Poolheader from '../components/Pool/Poolheader'
import Poolaccordian from '../components/Pool/Poolaccordian'

import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar"
import CustomerServiceHeader from '../components/CustomerServiceHistory/CustomerServiceHeader';
import CustomerServicePage from '../components/CustomerServiceHistory/CustomerServicePage';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCustomerServiceHistory } from '../redux/Slices/getCustomerServiceHistory';
import LoadderData from "../components/NoDataComponent/Loader"

export default function ServiceLogDetail() {

    const { id } = useParams();

    const { data: CustomerServiceHistory , statusdata } = useSelector(
    (state) => state.CustomerServiceHistory
  );
  const dispatch = useDispatch();
  
      useEffect(() => {
    dispatch(fetchCustomerServiceHistory({id}))
  },[dispatch])

    return (
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel" >
                <AdminNav />
                <div className="content">
                    <div className='addcustomers'>
                        <CustomerServiceHeader />
                        {
                            statusdata == "idle" ? <CustomerServicePage data={CustomerServiceHistory}/>  : <LoadderData />
                        }
                          
                    </div>

                </div>
            </div>
        </Fragment>
    )
}
