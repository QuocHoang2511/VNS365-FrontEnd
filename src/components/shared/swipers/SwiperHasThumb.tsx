import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Image } from "@mantine/core";

interface Image {
  small: string;
  large: string;
  original: string;
}

interface Props {
  images: Image[];
}

export const SwiperHasThumb = ({ images }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        style={{
          position: "relative",
        }}
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                width: "100%",
                paddingTop: "100%",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                src={item.large}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                alt="product images"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        // @ts-ignore
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        style={{
          marginTop: "12px",
        }}
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                width: "100%",
                paddingTop: "100%",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                src={item.large}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                alt="product images"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
