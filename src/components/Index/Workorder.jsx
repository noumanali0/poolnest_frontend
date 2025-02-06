import React, { Fragment, useEffect, useState } from 'react'
import {Card} from "react-bootstrap";
import Noti from "../../assets/img/more.png"
import Noti1 from "../../assets/img/more1.png"
import { Nav, Dropdown } from "react-bootstrap";
import { workorder } from '../../Data/Data'
import { useDispatch } from 'react-redux';
import  { fetchDashboardWorkOrder } from '../../redux/Slices/getDashboardWorkOder';
import moment from 'moment';
import { useSelector } from 'react-redux';


export default function Workorder({data}) {
  const dispatch = useDispatch();

  const {data : DashboardWorkOrder , status} = useSelector((state) => state.DashboardWorkOrder)

  const [start_date, setStartDate] = useState(
    moment().startOf("year").format("YYYY-MM-DD")
  );
  const [end_date, setEndDate] = useState(
    moment().endOf("year").format("YYYY-MM-DD")
  );

  useEffect(() => {
    dispatch(fetchDashboardWorkOrder({start_date,end_date}))
  },[dispatch])

  console.log(DashboardWorkOrder)
  return (
    <Fragment>

        <Card className='workorder routedashboard'>
              <Card.Header>
                <Card.Title as="h4"> Work Orders</Card.Title>
                <div className='filters'>
                       
                </div>
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
                      <th> </th>
                    </tr>
                    </thead>

                    <tbody>
                    {DashboardWorkOrder?.data?.map((item , key) => {
                     return (
                    <tr key={item.key}>
                      <td><b>{item?.RouteAssignmentTechnician?.first_name +" " + item?.RouteAssignmentTechnician?.last_name}</b></td>
                      <td>{item?.RouteAssignmentWaterBody?.CustomerWaterBodyData?.first_name + " " + item?.RouteAssignmentWaterBody?.CustomerWaterBodyData?.last_name}</td>
                      <td>{item?.RouteAssignmentWaterBody?.name}</td>
                      <td>{item.assigned_date}</td>
                    
                  
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
