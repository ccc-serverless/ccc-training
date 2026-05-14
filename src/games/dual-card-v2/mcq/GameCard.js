import React from "react";
import style from "./GameCard.module.scss";

import Question from "./Question";
import Answer from "./Answer";
import ViewResult from "../../shared/ViewResult";

import { useGameEngine } from "./engine/GameEngineProvider";

export default function GameCard() {
  const { state, handleOpenResultModal, handleResetGame } = useGameEngine();
  const { gameState } = state;

  return (
    <div className={style.wrapper}>
      {gameState.isStart && !gameState.isEnd && (
        <>
          <Question />
          <Answer />
        </>
      )}

      {gameState.isStart && gameState.isEnd && (
        <div className={style.viewResultContainer}>
          <ViewResult onClick={handleOpenResultModal} playAgain={handleResetGame} />
        </div>
      )}
    </div>
  );
}
