import React, { Fragment, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import InvoicingHeader from "../components/Invoicing/InvoicingHeader";
import { DatePicker, Select, Input, Typography, Card, Button } from "antd";
import dayjs from "dayjs";
import { Tabs } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import EstimateStatusHeader from "../components/Estimate/EstimateStatusHeader";
import { EditOutlined } from "@ant-design/icons";

import InvoiceSettingBilling from "../components/InvoiceSettings/InvoiceSettingDiscountFee";
const { TextArea } = Input;
const { Title, Text } = Typography;
export default function InvoiceSettings() {
  const [tab, setTab] = useState("1");
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
      key: "1",
      label: "Autopay Defaults",
      children: <p>Content for Autopay Defaults</p>,
    },
    {
      key: "2",
      label: "Invoice Email Defaults",
      children: <p>Content for Invoice Email Defaults</p>,
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
        <div className="">
          <div className="col d-flex justify-content-end">
            <EstimateStatusHeader />
          </div>
          <Container fluid>
            <div className="col-sm-12 ">
              <Tabs defaultActiveKey="1" activeKey={tab} onChange={onChange}>
                {tabs.map((item) => (
                  <Tabs.TabPane key={item.key} tab={item.label}>
                    {/* {item.children} */}
                  </Tabs.TabPane>
                ))}
              </Tabs>
            </div>
          </Container>
        </div>
        <div className="col-sm-12">
          <div className="col-sm-8 estimate-builder-left">
            {" "}
            <div className="col-sm-7">hey</div>
          </div>
          <div className="col-sm-4 estimate-builder-right ">
            <InvoiceSettingBilling data={data} />
            <div className="pt-2">
              <Title level={5} className="pb-2">
                Default Customer Invoice Note:
              </Title>
              <Card
                style={{
                  backgroundColor: "#ddd",
                  minHeight: 120,
                  padding: "0px",
                }}
              >
                <>
                  <TextArea rows={4} />
                </>
              </Card>
            </div>
            <div className="pt-2">
              <Title level={5} className="pb-2">
                Default Additional Terms:
              </Title>
              <Card
                style={{
                  backgroundColor: "#ddd",
                  minHeight: 120,
                  padding: "0px",
                }}
              >
                <>
                  <TextArea rows={4} />
                </>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
