import React from "react";
import styles from "./GameCard.module.scss";

import ProgressBar from "./ProgressBar";
import ProgressBarVertical from "./ProgressBarVertical";
import GameClock from "./GameClock";

import ViewResult from "./ViewResult";
import Circles from "./Circles";

export default function GameCard({
  state,
  handleClickCircle,
  handleClickViewResult,
  handleClickPlayAgain,
}) {
  const isGameEnd = state.gameState.isEnd;
  const isGameStart = state.gameState.isStart;
  const { gameSettings, runData } = state;

  return (
    <div className={styles.wrapper}>
      {isGameStart && !isGameEnd && (
        <>
          <ProgressBar
            quesTimeElapsed={runData.quesTimeElapsed}
            maxTimePerQues={gameSettings.maxTimePerQues}
          />
          <ProgressBarVertical
            quesTimeElapsed={runData.quesTimeElapsed}
            maxTimePerQues={gameSettings.maxTimePerQues}
          />
        </>
      )}

      <GameClock totalGameTime={runData.totTimeElapsed} />

      {!isGameEnd ? (
        <Circles state={state} handleClickCircle={handleClickCircle} />
      ) : (
        <ViewResult
          handleClickViewResult={handleClickViewResult}
          handleClickPlayAgain={handleClickPlayAgain}
        />
      )}
    </div>
  );
}
