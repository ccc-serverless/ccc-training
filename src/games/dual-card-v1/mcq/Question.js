import React from "react";
import style from "./Question.module.scss";

import ReactHtmlParser from "react-html-parser";
import { Swiper, SwiperSlide } from "swiper/react";

import GameClockV2 from "../../shared/GameClockV2";

import { useGameEngine } from "./engine/GameEngineProvider";
import { titleCase } from "utils/helper";

export default function Question() {
  const { state, handleQuesSwiper } = useGameEngine();
  const { runData, screenState } = state;

  const currQues = runData.questionsAsked[state.runData.questionIndex];

  return (
    <div className={style.wrapper}>
      <div className={style.gameClockContainer}>
        <GameClockV2 totTimeElapsed={state.runData.totTimeElapsed} />
      </div>
      <div className={style.header}>
        <div className={style.title}>TOPIC</div>
        <div className={style.gameType}>Multiple Choice</div>

        <div className={style.tags}>
          {currQues.tagIds.map((tag) => (
            <div className={style.tag}>{titleCase(state.tags[tag])}</div>
          ))}
        </div>
      </div>

      <div className={style.quesWrapper}>
        <div className={style.title}>QUESTION</div>
        <div className={style.quesSlide}>
          <Swiper
            className={style.swiperContainer}
            spaceBetween={0}
            slidesPerView={1}
            onSwiper={(swiper) => {
              handleQuesSwiper(swiper);
            }}
            allowTouchMove={false}
            speed={screenState.swiperTransitionTime}
          >
            {runData.questionsAll.map((ques, index) => (
              <SwiperSlide className={style.slide} key={`_key_ques_${index}`}>
                <div className={style.questionSlideWrapper}>
                  <div className={style.question}>{ReactHtmlParser(ques.question)}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className={style.quesCounter}>
        QUESTION {runData.questionIndex + 1} 0F {runData.questionsAsked.length}
      </div>
    </div>
  );
}
