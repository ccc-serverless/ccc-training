import React from "react";
import style from "./GameCard.module.scss";

import Lottie from "react-lottie-player";
import { Swiper, SwiperSlide } from "swiper/react";

import { useGameEngine } from "./engine/GameEngineProvider";

import Button from "./Button";
import Question from "./Question";
import TextBox from "./TextBox";
import CodeLines from "./CodeLines";
import TimerBar from "./TimerBar";

export default function GameCard() {
  const { state, handleChangeInput, handleSubmitAnswer, setQuestionsSwiper } =
    useGameEngine();

  const currQuestion = state.runData.questions[state.runData.activeQuestion];

  return (
    <div className={style.wrapper}>
      {!state.screen.inTransition && (
        <div className={style.textBoxes}>
          <TextBox className={style.hint} text="Hint ?" />
          <TextBox text="1 of 3" />
        </div>
      )}

      {state.screen.lottie.isActive ? (
        <div className={style.lottie}>
          <div className={style.lottieContainer}>
            <Lottie loop={false} play animationData={state.screen.lottie.data} />
          </div>
        </div>
      ) : null}

      <Swiper
        className={style.swiperContainer}
        spaceBetween={0}
        slidesPerView={1}
        onSwiper={(swiper) => {
          setQuestionsSwiper(swiper);
        }}
        allowTouchMove={false}
        speed={state.screen.transitionSpeed}
      >
        {state.runData.questions.map((ques, index) => (
          <SwiperSlide className={style.slide} key={`_key_ques_${index}`}>
            <Question className={style.quesContainer} ques={currQuestion} />
            <CodeLines ques={currQuestion} handleChangeInput={handleChangeInput} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Button onClick={handleSubmitAnswer} className={style.buttonSubmit} text="Submit" />

      <div className={style.timerContainer}>
        <TimerBar state={state} />
      </div>
    </div>
  );
}
