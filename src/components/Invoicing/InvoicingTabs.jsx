import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import InvoicingTable from "./InvoicingTable";
import moment from "moment";
import { useDispatch } from "react-redux";
import { fetchgetInvoiceData } from "../../redux/Slices/getInvoiceData";

const InvoicingTabs = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);

  const dispatch = useDispatch();
  const getLastThreeMonths = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0-based index, where January is 0

    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const lastThreeMonths = [];
    for (let i = 0; i < 3; i++) {
      const monthIndex = (currentMonth - i + 12) % 12; // Ensure the index is in the valid range (0-11)
      const firstDayOfMonth = moment().subtract(i, 'months').startOf('month').format('YYYY-MM-DD');
      const lastDayOfMonth = moment().subtract(i, 'months').endOf('month').format('YYYY-MM-DD');

      lastThreeMonths.push({
        key: `${i + 1}`,
        label: `${months[monthIndex]}`,
        startDate: firstDayOfMonth,
        endDate: lastDayOfMonth,
        children: <InvoicingTable />,
      });
    }

    return lastThreeMonths;
  };




  const onChange = (key) => {
    const selected = getLastThreeMonths().find(item => item.key === key);
    let StartDate = selected?.startDate;
    let EndDate = selected?.endDate;
    let page = 1;
    dispatch(fetchgetInvoiceData({ StartDate, EndDate , page }));
    setSelectedMonth(selected);
  };

  return (
    <Tabs defaultActiveKey="1" onChange={onChange}>
      {getLastThreeMonths().map(item => (
        <Tabs.TabPane key={item.key} tab={item.label}>
          {item.children}
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
};

export default InvoicingTabs;