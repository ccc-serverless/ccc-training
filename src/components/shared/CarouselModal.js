import React, { useState } from "react";
import style from "./CarouselModal.module.scss";

import { X } from "react-feather";
import ReactPlayer from "react-player";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Keyboard, Pagination, Navigation } from "swiper/core";

SwiperCore.use([Keyboard, Pagination, Navigation]);

export default function CarouselModal(props) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(props.initialSlide);
  function detectSlideChange(data) {
    setActiveSlideIndex(data.activeIndex);
  }

  return (
    <>
      {props.isOpen && (
        <div className={style.backdrop}>
          <div className={style.content}>
            <div className={style.modalController}>
              <p>{props.title}</p>
              {!props.displayCross ? null : (
                <button onClick={props.onClose}>
                  <X />
                </button>
              )}
            </div>
            <div className={style.child}>
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                keyboard={{
                  enabled: true,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                id="carouselModal"
                initialSlide={props.initialSlide}
                onSlideChange={detectSlideChange}
              >
                {props.arrFiles.map((file, index) => (
                  <>
                    {file.type === "image" ? (
                      <SwiperSlide key={index}>
                        <div className={style.slideWrapper}>
                          <img src={file.url} alt="" />
                        </div>
                      </SwiperSlide>
                    ) : (
                      <SwiperSlide>
                        <div className={style.slideWrapper}>
                          <ReactPlayer
                            width="100%"
                            height="100%"
                            controls
                            playing={activeSlideIndex === index ? true : false}
                            url={file.url}
                          />
                        </div>
                      </SwiperSlide>
                    )}
                  </>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
