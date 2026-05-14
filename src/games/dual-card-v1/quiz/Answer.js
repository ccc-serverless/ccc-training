import React, { useRef, useEffect } from "react";
import style from "./Answer.module.scss";

import Lottie from "react-lottie-player";
import useWindowFocus from "use-window-focus";

import { ChevronRight } from "react-feather";
import { useGameEngine } from "./engine/GameEngineProvider";

export default function Answer() {
  const formRef = useRef();
  const inputRef = useRef();

  const { state, handleSubmitAnswer, handleChangeAnswer, handleShowSolution } =
    useGameEngine();
  const { screenState, runData } = state;

  function getCardBackground() {
    if (screenState.lottie.isActive) {
      if (screenState.lottie.isCorrect)
        return "linear-gradient(120deg, #20622a, #48b566)";
      else return "linear-gradient(120deg, #f35325, #f3ad25)";
    } else {
      return "linear-gradient(120deg, #9860f7 11%, #2f607d 59%)";
    }
  }

  const windowFocused = useWindowFocus();

  useEffect(() => {
    if (windowFocused) inputRef.current.focus();
  }, [windowFocused]);

  useEffect(() => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
    formRef.current.reset();
  }, [runData.questionIndex]);

  return (
    <div className={style.wrapper} style={{ backgroundImage: getCardBackground() }}>
      {screenState.lottie.isActive ? (
        <div className={style.lottieContainer}>
          <Lottie
            loop={false}
            play
            animationData={screenState.lottie.data}
            style={{ width: 160, height: 160 }}
          />
        </div>
      ) : (
        <>
          <div className={style.inputForm}>
            <form
              ref={formRef}
              onChange={handleChangeAnswer}
              onSubmit={handleSubmitAnswer}
            >
              <label>TYPE ANSWER</label>
              <div className={style.row}>
                <input disabled ref={inputRef} type="text" placeholder="Type here..." />
                <button>
                  <ChevronRight />
                </button>
              </div>
            </form>
          </div>
          <div className={style.hintController}>
            {screenState.showSolutionButton && (
              <div className={style.hintTrigger}>
                <p>stuck?</p>
                <button onClick={handleShowSolution}>see solution</button>
              </div>
            )}
            {screenState.showSolution && (
              <div className={style.hint}>
                {runData.questionsAll[runData.questionIndex].answer}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
