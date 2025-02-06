import React, { Fragment, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import ChartistGraph from "react-chartist";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardRevenue } from "../../redux/Slices/getDashboardRevenue";
import moment from "moment";
import { DatePicker, Select } from "antd";
import { fetchDashboardWeeklyPerformance } from "../../redux/Slices/getDashboardWeeklyPerformance";

export default function Graph() {
  const dispatch = useDispatch();
  const { data: DashboardRevenue } = useSelector(
    (state) => state.DashboardRevenue
  );
  const { data: DashboardWeeklyPerformance } = useSelector(
    (state) => state.DashboardWeeklyPerformance
  );

  const [income, setIncomeType] = useState("");
  const [labels, setLabelsType] = useState([]);
  const [toBeCollected, setToBeCollectedType] = useState([0]);
  const [collected, setCollectedType] = useState([0]);

  const [start_date, setStartDate] = useState(
    moment().startOf("year").format("YYYY-MM-DD")
  );
  const [end_date, setEndDate] = useState(
    moment().endOf("year").format("YYYY-MM-DD")
  );
  const [intervalType, setIntervalType] = useState("day"); // Default to "month" for yearly view

  useEffect(() => {
    dispatch(fetchDashboardWeeklyPerformance());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchDashboardRevenue({ start_date, end_date, income, intervalType })
    );
  }, [dispatch, income, end_date, start_date, intervalType]);

  const handleDateChange = (value) => {
    let startDate, endDate, interval;

    switch (value) {
      case "today":
        startDate = moment().startOf("day").format("YYYY-MM-DD");
        endDate = moment().endOf("day").format("YYYY-MM-DD");
        interval = "day";
        break;
      case "this week":
        startDate = moment().startOf("week").format("YYYY-MM-DD");
        endDate = moment().endOf("week").format("YYYY-MM-DD");
        interval = "day";
        break;
      case "last week":
        startDate = moment()
          .subtract(1, "weeks")
          .startOf("week")
          .format("YYYY-MM-DD");
        endDate = moment()
          .subtract(1, "weeks")
          .endOf("week")
          .format("YYYY-MM-DD");
        interval = "day";
        break;
      case "this month":
        startDate = moment().startOf("month").format("YYYY-MM-DD");
        endDate = moment().endOf("month").format("YYYY-MM-DD");
        interval = "week";
        break;
      case "last month":
        startDate = moment()
          .subtract(1, "months")
          .startOf("month")
          .format("YYYY-MM-DD");
        endDate = moment()
          .subtract(1, "months")
          .endOf("month")
          .format("YYYY-MM-DD");
        interval = "week";
        break;
      case "this year":
        startDate = moment().startOf("year").format("YYYY-MM-DD");
        endDate = moment().endOf("year").format("YYYY-MM-DD");
        interval = "month";
        break;
      case "last year":
        startDate = moment()
          .subtract(1, "years")
          .startOf("year")
          .format("YYYY-MM-DD");
        endDate = moment()
          .subtract(1, "years")
          .endOf("year")
          .format("YYYY-MM-DD");
        interval = "month";
        break;
      default:
        break;
    }

    setStartDate(startDate);
    setEndDate(endDate);
  };

  useEffect(() => {
    if (
      DashboardRevenue &&
      DashboardRevenue.data &&
      DashboardRevenue.data.length > 0
    ) {
      const labels = DashboardRevenue.data.map((item) => item.Interval);
      const toBeCollected = DashboardRevenue.data.map(
        (item) => item.ToBeCollected ?? 0
      );
      const collected = DashboardRevenue.data.map(
        (item) => item.collected ?? 0
      );

      setLabelsType(labels);
      setToBeCollectedType(toBeCollected);
      setCollectedType(collected);
    } else {
      setLabelsType(["Default"]);
      setToBeCollectedType([0]);
      setCollectedType([0]);
    }
  }, [DashboardRevenue]);

  const series = [collected, toBeCollected];
  const maxSeriesValue = Math.max(...series.flat(), 1000);
  const highValue = maxSeriesValue + 500;

  const totalToBeCollected = DashboardRevenue?.data?.reduce(
    (total, item) => total + item.collected,
    0
  );

  return (
    <Fragment>
      <Card className="graaphh">
        <Card.Header className="graph">
          <Card.Title as="h4">
            Revenue <span className="revenue">${totalToBeCollected}</span>
          </Card.Title>
        </Card.Header>
        <Card.Footer className="graphfilter row cslocation">
          <div className="legend col-sm-4">
            <div>
              <i className="fas fa-circle text-info"></i> Collected
            </div>
            <div>
              <i className="fas fa-circle text-danger"></i> To Be Collected
            </div>
          </div>
          <div className="filters col-sm-4">
            <Select
              className="form-select form-select-sm select2"
              onChange={(e) => setIncomeType(e)}
              defaultValue={"Income Type"}
            >
              <Option value="">Business Income</Option>
              <Option value="route">Route Income</Option>
              <Option value="workorder"> Work Order Income</Option>
            </Select>
          </div>
          <div className="filters col-sm-4">
            <Select
              className="form-select form-select-sm select2"
              onChange={(e) => handleDateChange(e)}
              defaultValue={"Date Filter"}
            >
              <Option value="">Date Filter</Option>
              <Option value="today">Today</Option>
              <Option value="this week">This Week</Option>
              <Option value="last week">Last Week</Option>
              <Option value="this month">This Month</Option>
              <Option value="last month">Last Month</Option>
              <Option value="this year">This Year</Option>
              <Option value="last year">Last Year</Option>
            </Select>
          </div>
        </Card.Footer>
        <Card.Body className="graphh">
          <div className="ct-chart" id="chartHours">
            <ChartistGraph
              data={{
                labels: labels && labels,
                series,
              }}
              type="Line"
              options={{
                low: 0,
                high: highValue,
                showArea: false,
                height: "245px",
                axisX: {
                  showGrid: false,
                },
                lineSmooth: true,
                showLine: true,
                showPoint: true,
                fullWidth: true,
                chartPadding: {
                  right: 50,
                },
              }}
              responsiveOptions={[
                [
                  "screen and (max-width: 640px)",
                  {
                    axisX: {
                      labelInterpolationFnc: function (value) {
                        return value[0];
                      },
                    },
                  },
                ],
              ]}
            />
          </div>
        </Card.Body>
        <div className="week_performance">
          <h4>This Week's performance</h4>
          <div className="row performance_row">
            <div className="col-sm-2 Completed">
              <h6>Stops Completed </h6>
              <span className="performance_values">
                {DashboardWeeklyPerformance?.data &&
                  DashboardWeeklyPerformance?.data[0].StopsCompleted}
              </span>
            </div>
            <div className="col-sm-2 Scheduled">
              <h6>Work Orders Completed</h6>
              <span className="performance_values">
                {DashboardWeeklyPerformance?.data &&
                  DashboardWeeklyPerformance?.data[0].WorkOrderCompleted}
              </span>
            </div>
            <div className="col-sm-2 Completed">
              <h6>Work Orders Scheduled</h6>
              <span className="performance_values">
                {DashboardWeeklyPerformance?.data &&
                  DashboardWeeklyPerformance?.data[0].WorkOrderSchedule}
              </span>
            </div>
            <div className="col-sm-2 Scheduled">
              <h6>Skipped Stops</h6>
              <span className="performance_values">
                {DashboardWeeklyPerformance?.data &&
                  DashboardWeeklyPerformance?.data[0].SkippedStops}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Fragment>
  );
}
