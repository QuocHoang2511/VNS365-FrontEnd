/* eslint-disable @next/next/no-img-element */

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import classes from "./Style.module.css";
import { Autoplay } from "swiper/modules";

import Banner1 from "@assets/images/banner/banner_1.jpg";
import Banner2 from "@assets/images/banner/banner_2.png";
import Banner3 from "@assets/images/banner/banner_3.jpg";
import Banner4 from "@assets/images/banner/banner_4.jpg";
import Banner5 from "@assets/images/banner/banner_5.jpg";
import Banner6 from "@assets/images/banner/banner_6.jpg";

const BANNERS = [
  Banner1.src,
  Banner2.src,
  Banner3.src,
  Banner4.src,
  Banner5.src,
  Banner6.src,
];

export const SliderBanner = () => {
  return (
    <Swiper
      className={classes.mySwiper}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
    >
      {BANNERS.map((src) => (
        <SwiperSlide key={src} className={classes.swiperSlide}>
          <img
            src={src}
            alt="banner"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 8,
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
