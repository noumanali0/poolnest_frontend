import React, { Fragment, useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { DatePicker } from "antd";
import socket from "../../Socket";
import { useDispatch } from "react-redux";
import { fetchactiveServicedashboard } from "../../redux/Slices/getActiveServiceRoute";

function Routetabs({ data, id }) {
  const dispatch = useDispatch();
  const [Dates, setDates] = useState([]);
  const [baseDate, setBaseDate] = useState(new Date());

  const [technician_id, settechnician_id] = useState(null);

  // Generate dates starting from a specified start date
  const GetDates = (startDate) => {
    const datesArray = [];
    const loop = new Date(startDate);

    for (let i = 0; i < 10; i++) {
      datesArray.push(moment(loop).format("YYYY-MM-DD"));
      loop.setDate(loop.getDate() + 1);
    }

    setDates(datesArray);
  };

  const handleDateChange = (date) => {
    const momentDate = moment(date);
    const currentTimeUTC = moment.utc().format("HH:mm:ss");
    const utcDate = moment(
      momentDate.format("YYYY-MM-DD") + "T" + currentTimeUTC
    ).toISOString();
    return utcDate;
  };

  const handleDates = async (date2) => {
    const date = handleDateChange(date2);
    localStorage.setItem("date", date2);
    await setBaseDate(date2);
    dispatch(fetchactiveServicedashboard({ date, technician_id }));
  };

  const onChange = (date1, dateString) => {
    const selectedDate = new Date(dateString);
    setBaseDate(selectedDate);
    GetDates(selectedDate);

    const room = `${id}/${data?.SocketData?.givenDate}`;
    const leaveRoom = () => {
      socket.emit("LeaveRoute", room, (data) => {
        if (data.status === "error") {
          console.error("Error leaving room:", data.message);
        }
      });
    };
    leaveRoom();

    const formattedDate = handleDateChange(dateString);
    dispatch(
      fetchactiveServicedashboard({ date: formattedDate, technician_id })
    );
  };

  const handleSlideChange = (swiper) => {
    if (swiper.activeIndex > swiper.previousIndex) {
      const newBaseDate = moment(baseDate).add(5, "days").toDate();
      setBaseDate(newBaseDate);
      GetDates(newBaseDate);
    } else if (swiper.activeIndex < swiper.previousIndex) {
      const newBaseDate = moment(baseDate).subtract(5, "days").toDate();
      setBaseDate(newBaseDate);
      GetDates(newBaseDate);
    }
  };

  useEffect(() => {
    GetDates(baseDate);
  }, []);

  let savedate = localStorage.getItem("date");

  return (
    <Fragment>
      <Row className="cslocation">
        <Col sm={8}>
          <Nav variant="pills" className="flex-column">
            <Swiper
              spaceBetween={10}
              loop={false}
              pagination={{ clickable: true }}
              navigation={true}
              modules={[Navigation]}
              onSlideChange={handleSlideChange}
              breakpoints={{
                320: { slidesPerView: 2 },
                575: { slidesPerView: 3 },
                991: { slidesPerView: 4 },
                1440: { slidesPerView: 5 },
                1550: { slidesPerView: 5.9 },
              }}
              className="mySwiper dateSwiperr"
            >
              {Dates?.map((item) => (
                <SwiperSlide key={item}>
                  <Nav.Item className={item === savedate ? "aaa" : "bbb"}>
                    <Nav.Link eventKey={item} onClick={() => handleDates(item)}>
                      {moment(item).format("Do MMM")}
                    </Nav.Link>
                  </Nav.Item>
                </SwiperSlide>
              ))}
            </Swiper>
          </Nav>
        </Col>
        <div className="col-sm-4 DatePicker-1">
          <DatePicker onChange={onChange} format="MM/DD/YYYY" />
        </div>
      </Row>
    </Fragment>
  );
}

export default Routetabs;
