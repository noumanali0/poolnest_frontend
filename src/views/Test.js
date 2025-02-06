import {React} from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Select } from 'antd';
import { useEffect } from 'react';
import Switch from "antd/lib/switch";
import { Fragment } from 'react';

import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar"



export default function Test() {

    const onFinish = (values) => {
        console.log('Success:', values);
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

  return (
    <Fragment>
    <Sidebar routes={routes}/>
            <div className="main-panel" >
        <AdminNav />
     <div className="content">



    <div className='row fomik'>
        <Form name="Customer" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
            <div className='row'>
            <div className='col-sm-2'>
                    <Form.Item name='customertype'  rules={[{ required: true, message: 'Customer Type is required',},]} >
                        <Select placeholder="Customer Form">
                            <Option value="Zhejiang">Zhejiang</Option>
                            <Option value="Jiangsu">Jiangsu</Option>
                        </Select>
                    </Form.Item>
            </div>

            <div className='col-sm-5'>
            <Form.Item name="firstname" rules={[ { required: true, message: 'Please input your firstname!', }, ]} >
                <Input placeholder="First name"/>
            </Form.Item>
            </div>

            <div className='col-sm-5'>
            <Form.Item name="lastname" rules={[ { required: true, message: 'Please input your Lastname!', }, ]} >
                <Input placeholder="Last Name"/>
            </Form.Item>
            </div>

            <div className='col-sm-4'>
            <Form.Item name="city" rules={[ { required: true, message: 'Please input your city!', }, ]} >
                <Input placeholder="City"/>
            </Form.Item>
            </div>

            <div className='col-sm-4'>
            <Form.Item name="state" rules={[ { required: true, message: 'Please input your state!', }, ]} >
                <Input placeholder="State"/>
            </Form.Item>
            </div>

            <div className='col-sm-4'>
            <Form.Item name="zipcode" rules={[ { required: true, message: 'Please input your zipcode!', }, ]} >
                <Input placeholder="Zip-Code" type="number"/>
            </Form.Item>
            </div>
           
            <div className='col-sm-4'>
                <Form.Item name='email' rules={[{ type: 'email', message: 'The input is not valid E-mail!', },  {required: true, message: 'Email is Invalid', },  ]} >
                    <Input placeholder="E-mail" />
                </Form.Item>
            </div>

            <div className='col-sm-4'>
            <Form.Item name="mobile(primary)" rules={[ { required: true, message: 'Please input your mobile!', }, ]} >
                <Input placeholder="Mobile # (primary)" type="number"/>
            </Form.Item>
            </div>

            <div className='col-sm-4'>
            <Form.Item name="mobile(secondary)" rules={[ { required: true, message: 'Please input your mobile!', }, ]} >
                <Input placeholder="Mobile # (secondary)" type="number"/>
            </Form.Item>
            </div>

            <div className='col-sm-4'>
            <Form.Item name="companyname" rules={[ { required: true, message: 'Please input your Company Name!', }, ]} >
                <Input placeholder="Company Name"/>
            </Form.Item>
            </div>

            <div className='col-sm-4'>
            <Form.Item name="companycode" rules={[ { required: true, message: 'Please input your Company Code!', }, ]} >
                <Input placeholder="Company Code"/>
            </Form.Item>
            </div>

            <div className='col-sm-4'>
            <Form.Item name="billingnotes" rules={[ { required: true, message: 'Please input your Billing Notes!', }, ]} >
                <Input placeholder="City"/>
            </Form.Item>
            </div>

            <div className='col-sm-12'>
            <Form.Item name="billingaddress" rules={[ { required: true, message: 'Please input your Billing Address!', }, ]} >
                <Input placeholder="Billing Address"/>
            </Form.Item>
            </div>
            

            <div className='col-sm-12'>
            <Form.Item >
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
            </Form.Item>
            </div>
            </div>



    
  </Form>
    </div>



    </div>
    </div>

    </Fragment>
  )
}
