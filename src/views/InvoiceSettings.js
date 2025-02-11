import React, { Fragment, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AutopayDefaults from "../components/InvoiceSettings/AutoPayDefaults";

import {
  DatePicker,
  Select,
  Input,
  Typography,
  Card,
  Button,
  Form,
  Radio,
  Checkbox,
  Row,
  Col,
} from "antd";
import dayjs from "dayjs";
import { Tabs } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import EstimateStatusHeader from "../components/Estimate/EstimateStatusHeader";
import { EditOutlined } from "@ant-design/icons";
import InvoiceEmail from "../components/InvoiceSettings/InvoiceEmail";
import InvoiceSettingBilling from "../components/InvoiceSettings/DefaultDiscountFees";
import InvoiceDefaults from "../components/InvoiceSettings/InvoiceDefaults";
const { TextArea } = Input;
const { Title, Text } = Typography;

export default function InvoiceSettings() {
  const [tab, setTab] = useState("0");
  const [data, setData] = useState([
    {
      key: 1,
      type: "Work Order",
      description: "Acid Wash",
      qty: 1,
      rate: 1200,
      tax: 0,
      total: 1200,
    },
    {
      key: 2,
      type: "Chemicals",
      description: "Chlorine additive",
      qty: 1,
      rate: 100,
      tax: 50,
      total: 150,
    },
    {
      key: 3,
      type: "Installed Item",
      description: "Motor Rebuild",
      qty: 2,
      rate: 500,
      tax: 0,
      total: 1000,
    },
  ]);

  const [isEditingNotes, setIsEditingNotes] = useState(true);
  const tabs = [
    {
      key: "0",
      label: "Invoice Defaults",
      children: <InvoiceDefaults data={data} />,
    },
    {
      key: "1",
      label: "Autopay Defaults",
      children: <AutopayDefaults />,
    },
    {
      key: "2",
      label: "Invoice Email Defaults",
      children: <InvoiceEmail />,
    },
  ];
  const onChange = (key) => {
    setTab(key);
  };

  const handleEditNotes = () => {
    setIsEditingNotes((prev) => !prev);
  };
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <div className="pt-3">
          <EstimateStatusHeader />

          <Container fluid>
            <div className="col-sm-12 ">
              <Tabs defaultActiveKey="0" activeKey={tab} onChange={onChange}>
                {tabs.map((item) => (
                  <Tabs.TabPane key={item.key} tab={item.label}>
                    {item.children}
                  </Tabs.TabPane>
                ))}
              </Tabs>
            </div>
          </Container>
        </div>
      </div>
    </Fragment>
  );
}
