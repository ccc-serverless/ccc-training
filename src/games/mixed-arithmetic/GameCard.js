import React, { useEffect } from "react";
import styles from "./GameCard.module.scss";

import clsx from "clsx";
import Lottie from "react-lottie-player";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper/core";

import { FiXCircle } from "react-icons/fi";

import GameClock from "./GameClock";
import TimerBar from "./TimerBar";
import Result from "./Result";

import { getImageForOperator, getOperatorToDisplay } from "./helper";
SwiperCore.use([Pagination, Autoplay]);

export default function GameCard({
  setQuestionsSwiper,
  state,
  dispatch,
  playLottie,
  inputRef,
  resetGame,
  currInput,
  setCurrInput,
}) {
  const { operator } = state.gameSettings;

  function handleInputSubmit(e) {
    e.preventDefault();
    verifyAnswer(true);
  }

  function handleInputChange(e) {
    const { value } = e.target;

    if (value.length <= 5) setCurrInput(value);
    dispatch({
      type: "SET_RESPONSE",
      payload: { resp: parseInt(value) },
    });
  }

  function verifyAnswer(checkWrong) {
    const currQuestion = state.questions[state.runState.activeQuestion - 1];
    const ansDefined = parseInt(currQuestion.ans);
    const resp = parseInt(currInput);

    if (ansDefined === resp) {
      dispatch({ type: "SET_SCREEN_STATE", payload: { background: styles.rightbg } });
      dispatch({ type: "SET_SCREEN_STATE", payload: { gameCard: styles.rightGameCard } });
      playLottie(true);
    }

    if (checkWrong) {
      if (ansDefined !== resp) {
        dispatch({ type: "SET_SCREEN_STATE", payload: { background: styles.wrongbg } });
        dispatch({
          type: "SET_SCREEN_STATE",
          payload: { gameCard: styles.wrongGameCard },
        });
        playLottie(false);
      }
    }
  }

  function handleClickViewResult() {
    dispatch({
      type: "SET_SCREEN_STATE",
      payload: { isOpenModalResult: !state.screen.isOpenModalResult },
    });
  }
  function handleClickReset() {
    resetGame();
  }

  useEffect(() => {
    if (currInput.length) verifyAnswer(false);
  }, [currInput]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
    setCurrInput("");
  }, [state.questions.length]);

  return state.questions.length > 1 ? (
    <div className={clsx(styles.wrapper, state.screen.background)}>
      <div className={styles.gameHeader}>
        {!state.runState.isEnd && (
          <button onClick={handleClickReset}>
            <FiXCircle /> Reset
          </button>
        )}

        <div className={styles.operatorIndicator}>
          <img src={getImageForOperator(operator)} alt="" />
          <p>{operator}</p>
        </div>
      </div>
      <div className={clsx(styles.gamecard, state.screen.gameCard)}>
        {!state.runState.isEnd ? (
          <>
            {state.screen.lottie.isActive && (
              <div className={styles.lottie}>
                <div className={styles.lottieContainer}>
                  <Lottie loop={false} play animationData={state.screen.lottie.data} />
                </div>
              </div>
            )}
            <div className={styles.header}>
              <p className={styles.headerTitle}>Type the right answer</p>
              <GameClock totalTimeElapsed={state.runState.totalTimeElapsed} />
            </div>
            <div className={styles.quesAnsWrapper}>
              <Swiper
                className={styles.swiperContainer}
                spaceBetween={0}
                slidesPerView={1}
                onSwiper={(swiper) => {
                  setQuestionsSwiper(swiper);
                }}
                allowTouchMove={false}
                speed={1000}
              >
                {state.questions.map((ques, index) => (
                  <SwiperSlide className={styles.slide} key={`_key_ques_${index}`}>
                    <div className={styles.quesWrapper}>
                      <div className={styles.operatorSymbol}>
                        <p
                          className={
                            operator === "Division" && styles.changeStyleForDivison
                          }
                        >
                          {getOperatorToDisplay(operator)}
                        </p>
                      </div>
                      <div className={styles.ques}>
                        <p>{ques.num1 > ques.num2 ? ques.num1 : ques.num2}</p>
                        <p>{ques.num1 < ques.num2 ? ques.num1 : ques.num2}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className={styles.ansWrapper}>
                <form onChange={handleInputChange} onSubmit={handleInputSubmit}>
                  <input value={currInput} ref={inputRef} type="number" name="answer" />
                </form>
              </div>
            </div>
            <div className={styles.questionCounter}>
              <p>
                {state.runState.activeQuestion} of {state.gameSettings.maxQuestions}
              </p>
            </div>
            <TimerBar state={state} />
          </>
        ) : (
          <div className={styles.viewResultWrapper}>
            <div className={styles.text}>Game Ended!</div>
            <div className={styles.buttons}>
              <button onClick={handleClickViewResult}>View Result</button>
              <button onClick={handleClickReset}>Play Again</button>
            </div>
          </div>
        )}
      </div>
      <Result state={state} dispatch={dispatch} />
    </div>
  ) : null;
}
