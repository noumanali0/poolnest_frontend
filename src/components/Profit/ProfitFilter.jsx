import { DatePicker, Form, Select } from "antd";
import { Fragment, useEffect, useState } from "react";
import { fetchgetProfitData } from "../../redux/Slices/getProfileData";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";

export default function ProfitFilter() {
  const { RangePicker } = DatePicker;

  const [StartDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [EndDate, setEndDate] = useState(
    moment().endOf("month").format("YYYY-MM-DD")
  );

  const dispatch = useDispatch();

  const getLastThreeMonths = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const lastTwelveMonths = [];

    // Loop through each month from January to December of the current year
    for (let i = 0; i < 12; i++) {
      const date = moment().month(i); // Set the month to January (0) through December (11)
      const firstDayOfMonth = date.startOf("month").format("YYYY-MM-DD");
      const lastDayOfMonth = date.endOf("month").format("YYYY-MM-DD");

      lastTwelveMonths.push({
        key: `${i + 1}`, // Unique key from 1 to 12
        label: `${months[i]}`,
        value: firstDayOfMonth,
        endDate: lastDayOfMonth,
      });
    }

    return lastTwelveMonths;
  };

  const handleDateChange = (dates, i) => {
    setStartDate(i[0]);
    setEndDate(i[1]);
  };
  useEffect(() => {
    dispatch(fetchgetProfitData({ StartDate, EndDate }));
  }, [StartDate, EndDate, dispatch]);

  const onChange = (key) => {
    const selected = getLastThreeMonths().find((item) => item.value === key);

    let startDate = selected?.value;
    let endDate = selected?.endDate;

    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <Fragment>
      <div className="row cslocation">
        <div className="col-sm-6 monthFilter">
          <Form.Item name="month">
            <Select
              allowClear
              className="monthFilterSelect"
              // style={{ width: "50%" }}
              placeholder="Month"
              options={getLastThreeMonths()}
              onChange={onChange}
            />{" "}
          </Form.Item>
        </div>
        <div className="col-sm-6 monthDatePicker">
          <DatePicker.RangePicker
            allowClear={true}
            onChange={handleDateChange}
            format="MM/DD/YYYY"
          />
        </div>
      </div>
    </Fragment>
  );
}
