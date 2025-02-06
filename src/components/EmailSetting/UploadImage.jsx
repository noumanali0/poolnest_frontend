import React, { Fragment,useState } from 'react'
import Trash from '../../assets/img/Trash.png'
import Create from '../../assets/img/Create.png'
import Previewslider from './Previewslider';
import { PlusOutlined } from '@ant-design/icons';
import { Modal,Button, Upload,Form } from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';


  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
export default function UploadImage() {
  
  return (
    <Fragment>
        <div className='container-fluid wordkorder'>
            <div className='row headwork'>
            <div className='col-sm-12 heads'>
              <h3>Images</h3>
            </div>
            

<Form.Item
      name="upload"
      valuePropName="fileList"
      getValueFromEvent={normFile}
    >
      <Upload name="logo" action="/upload.do" listType="picture-circle">
        <Button icon={<UploadOutlined />}>Click to upload</Button>
      </Upload>
    </Form.Item>
            </div>
        </div>
    </Fragment>
  )
}
