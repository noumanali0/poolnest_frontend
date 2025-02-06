import React from 'react';
import { SwiperSlide } from 'swiper/react';
import { Nav } from 'react-bootstrap';
import moment from 'moment';

const YourComponent = ({ item, handleDates, selectedDate }) => {

  return (
    <SwiperSlide>
      <Nav.Item className={selectedDate === item ? "aaa" : "bbb"}>
        <Nav.Link eventKey={item} onClick={() => handleDates(item)}>
          {moment(item).format("Do MMM")}
        </Nav.Link>
      </Nav.Item>
    </SwiperSlide>
  );
};

export default YourComponent;