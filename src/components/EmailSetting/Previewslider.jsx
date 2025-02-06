import React, { Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { Previewslides } from "../../Data/Data";

export default function Previewslider() {
  return (
    <Fragment>
      <div className="container-fluid wordkorder preview">
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {Previewslides.map((data) => {
            return (
              <SwiperSlide key={data.key}>
                <img src={data.image} alt="Preview" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </Fragment>
  );
}
