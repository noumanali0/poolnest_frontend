import React from 'react'
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar"
import { Fragment } from 'react'
import Logsheader from '../components/ServiceLogs/Logsheader';
import Routetabs from '../components/ServiceLogs/Routetabs';
import Workheader from '../components/workorderlist/Workheader';
import Worktabs from '../components/workorderlist/Worktabs';
import Workmap from '../components/workorderlist/Workmap';
import WorkFilters from '../components/workorderlist/WorkFilters';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import RoutesMap from '../components/workorderlist/Workmap';
import { fetchgetWorkOrderRouteApi } from '../redux/Slices/getWorkOrderRoute';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import moment from 'moment';
import { Spin } from 'antd';
import Loader from "../components/NoDataComponent/Loader"

function WorkOrderList() {
  
  const { data: WorkOrderRouteApi , statusdata } = useSelector(
    (state) => state.WorkOrderRouteApi
  );
  

  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />

        <div className="content">
          <div className="addcustomers">
            <Workheader />

            <WorkFilters />
            {
              statusdata == "idle" ? 
              <div className="row grayshade workOrderListsss cslocation">
                <div className="col-sm-6 abc">
                  <div className='onTabletDisplay workOrderrMapppppS'>
                    <RoutesMap data={WorkOrderRouteApi} />
                  </div>
                  <Worktabs activeServicedashboard={WorkOrderRouteApi}/>
                </div>

                <div className="col-sm-6 abc notDisplay workorderr">
                  <RoutesMap data={WorkOrderRouteApi} />
                </div>
              </div> : <Loader />
            }
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default WorkOrderList