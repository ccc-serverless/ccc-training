import React from "react";
import style from "./GameCard.module.scss";

import Header from "./Header";
import Question from "./Question";
import Answer from "./Answer";

import GameClockV2 from "../../shared/GameClockV2";
import ViewResult from "../../shared/ViewResult";

import { useGameEngine } from "./engine/GameEngineProvider";

export default function GameCard() {
  const { state, handleOpenResultModal, handleResetGame } = useGameEngine();
  const { gameState } = state;

  return (
    <div className={style.wrapper}>
      <div className={style.gameClockContainer}>
        <GameClockV2 totTimeElapsed={state.runData.totTimeElapsed} />
      </div>

      {gameState.isEnd && (
        <div className={style.viewResultContainer}>
          <ViewResult onClick={handleOpenResultModal} playAgain={handleResetGame} />
        </div>
      )}

      {gameState.isStart && !gameState.isEnd && (
        <>
          <Header />
          <Question />
          <Answer />
        </>
      )}
    </div>
  );
}
