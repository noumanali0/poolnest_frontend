import React, { Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { Previewslides } from "../../Data/Data";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchgetAllServiceImages } from '../../redux/Slices/getServiceImages';

export default function ServiceImageSlider({data}) {
  return (
    <Fragment>
      <div className="container-fluid wordkorder preview">
        <Swiper
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            // when window width is >= 575px
            575: {
              slidesPerView: 2,
            },
            // when window width is >= 991px
            991: {
              slidesPerView: 3,
            },
            1440: {
              slidesPerView: 5,
            },
          }}
          // slidesPerView={5}
          spaceBetween={30}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {data?.map((data , i) => {
            return (
              <SwiperSlide key={i}>
                <img src={data?.Image}   
                  className="serviceImgecss"
                  alt="Preview" 
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </Fragment>
  );
}
