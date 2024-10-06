"use client";

import React, { useRef, useState } from "react";
import SwiperCore from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper as ReactSwiper } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Box, Button } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

SwiperCore.use([Autoplay, Navigation]);

export interface SwiperProps extends React.ComponentProps<typeof ReactSwiper> {
  hideNavigation?: boolean;
  isOverflowHidden?: boolean;
  defaultActiveSlide?: number;
}

const Swiper: React.FC<SwiperProps> = ({
  children,
  defaultActiveSlide,
  hideNavigation = false,
  isOverflowHidden,
  ...props
}) => {
  const swiperRef = useRef<SwiperCore>();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <ReactSwiper
        style={{
          overflow: isOverflowHidden ? "hidden" : "visible",
          position: "relative",
        }}
        breakpoints={{
          900: {
            slidesPerView: 6,
            spaceBetween: 30,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          0: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        }}
        modules={[Navigation]}
        grabCursor
        onBeforeInit={(swiper) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== "boolean"
          ) {
            swiperRef.current = swiper;
            if (defaultActiveSlide) {
              swiper.slideTo(defaultActiveSlide);
            }
          }
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        {...props}
      >
        {children}
      </ReactSwiper>

      {!hideNavigation && (
        <Box>
          <Button
            onClick={() => swiperRef.current?.slidePrev()}
            style={{
              position: "absolute",
              width: 48,
              height: 48,
              left: -24,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 49,

              opacity: 0,
              transition: "opacity 0.2s ease-in-out",
              cursor: isBeginning ? "not-allowed !important" : "pointer",
            }}
          >
            <IconChevronLeft size={18} />
          </Button>
          <Button
            onClick={() => swiperRef.current?.slideNext()}
            style={{
              position: "absolute",
              width: 48,
              height: 48,
              left: -24,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 49,

              opacity: 0,
              transition: "opacity 0.2s ease-in-out",
              cursor: isEnd ? "not-allowed !important" : "pointer",
            }}
          >
            <IconChevronRight size={18} />
          </Button>
        </Box>
      )}
    </div>
  );
};

export default Swiper;
