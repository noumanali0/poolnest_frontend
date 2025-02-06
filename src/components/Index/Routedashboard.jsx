import React, { Fragment, useEffect } from 'react'
import { Card} from "react-bootstrap";
import { Link } from 'react-router-dom';
import Noti from "../../assets/img/more.png"
import { Nav, Dropdown } from "react-bootstrap";
import { routedashboard } from '../../Data/Data'
import Avatar from "../../assets/img/avatar.png"
import { Tooltip } from 'antd';
import { fetchDashboardTodaySchedule } from '../../redux/Slices/getDashboardTodaySchedule';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function Routedashboard({data}) {

  const dispatch = useDispatch();

  const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0'); 

const date = `${year}-${month}-${day}`;

  const { data: DashboardTodaySchedule } = useSelector(
    (state) => state.DashboardTodaySchedule
  );
  useEffect(() => {
    dispatch(fetchDashboardTodaySchedule({date}))
  },[])

  return (
    <Fragment>
        <Card className='routedashboard'>
              <Card.Header>
                <Card.Title as="h4">Today's Schedule 
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  <table>
                    <thead>
                    <tr>
                      <th>Technician</th>
                      <th>Customer</th>
                      <th>Pool</th>
                      <th>Assigned Day</th>
                      <th>Address</th>
                      <th> </th>
                    </tr>
                    </thead>

                    <tbody>
                    {DashboardTodaySchedule?.data?.map((item , key) => {
                     return (

                    <tr key={item.key}>
                      <td><b>{item?.RouteAssignmentTechnician?.first_name +" " + item?.RouteAssignmentTechnician?.last_name}</b></td>
                      <td>{item?.RouteAssignmentWaterBody?.CustomerWaterBodyData?.first_name + " " + item?.RouteAssignmentWaterBody?.CustomerWaterBodyData?.last_name}</td>
                      <td>{item?.RouteAssignmentWaterBody?.name}</td>
                      <td>{item.assigned_date}</td>
                      <Tooltip placement='top' title={item?.RouteAssignmentWaterBody?.CustomerWaterBodyData?.address}>
                        <td className='notoverflow'><b>{item?.RouteAssignmentWaterBody?.CustomerWaterBodyData?.address}</b></td>
                      </Tooltip>
                  
                    </tr>
                    )
                  })}

                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
    </Fragment>
  )
}
