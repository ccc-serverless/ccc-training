import React from "react";
import style from "./GameCard.module.scss";

import Lottie from "react-lottie-player";

import Circles from "./Circles";
import Question from "./Question";
import Button from "./Button";
import GameClock from "./GameClock";

export default function GameCard({
  runData,
  screenState,
  gameState,
  handleClickOption,
  handleClickSubmit,
}) {
  const questionsAsked = runData.questionsAsked;
  const currQues = questionsAsked[questionsAsked.length - 1];
  const quesNumber = questionsAsked.length;

  return (
    <div className={style.wrapper}>
      <div className={style.clockContainer}>
        <GameClock totTimeElapsed={runData.totTimeElapsed} />
      </div>
      <Question quesStatement={currQues.question} quesNumber={quesNumber} />
      <Circles
        runData={runData}
        question={currQues}
        handleClickOption={handleClickOption}
      />

      {screenState.lottie.isActive && (
        <div className={style.lottieContainer}>
          <Lottie
            loop={false}
            play
            animationData={screenState.lottie.data}
            style={{ width: 180, height: 160 }}
          />
        </div>
      )}

      {gameState && (
        <div className={style.btnContainer}>
          <Button onClick={handleClickSubmit}>Submit</Button>
        </div>
      )}
    </div>
  );
}
