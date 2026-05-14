import React from "react";
import style from "./Question.module.scss";

import ReactHtmlParser from "react-html-parser";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper/core";

import { useGameEngine } from "./engine/GameEngineProvider";

SwiperCore.use([Autoplay, Pagination]);

export default function Question() {
  const { state, handleQuesSwiper } = useGameEngine();
  const { runData, screenState } = state;

  function setSwiper(swiper) {
    handleQuesSwiper(swiper);
  }

  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        QUESTION {runData.questionIndex + 1} of {runData.questionsAsked.length}
      </div>
      <div className={style.questionSlide}>
        <Swiper
          className={style.swiperContainer}
          spaceBetween={0}
          slidesPerView={1}
          onSwiper={setSwiper}
          allowTouchMove={false}
          speed={state.screenState.swiperTransitionTime}
        >
          {runData.questionsAsked.map((ques, index) => (
            <SwiperSlide className={style.slide} key={ques._id}>
              <div className={style.questionWrapper}>
                <div className={style.question}>{ReactHtmlParser(ques.question)}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
