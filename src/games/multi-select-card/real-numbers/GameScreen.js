import React, { useEffect } from "react";
import style from "./GameScreen.module.scss";

import clsx from "clsx";
import { useGameEngine } from "./engine/GameEngineProvider";
import GameCard from "../shared/GameCard";
import Result from "games/shared/Result";
import ViewResult from "games/shared/ViewResult";
import Button from "../shared/Button";

export default function GameScreen({ gameName, gameId }) {
  const {
    state,
    dispatch,
    handleClickOption,
    handleClickSubmit,
    handleCloseResultModal,
    handleOpenResultModal,
    handleGameReset,
    handleGameStart,
  } = useGameEngine();

  const questionsAsked = state.runData.questionsAsked;
  const currQues = questionsAsked[questionsAsked.length - 1];

  function getCardBackground() {
    const lottie = state.screenState.lottie;
    if (lottie.isActive) {
      if (lottie.isCorrect) return style.backgroundCorrect;
      else return style.backgroundIncorrect;
    } else {
      return style.backgroundNeutral;
    }
  }

  useEffect(() => {
    if (!gameName) return;

    dispatch({
      type: "UPDATE_GAME_SETTINGS",
      payload: {
        gameName,
        gameId,
      },
    });
  }, [gameName, gameId]);

  return (
    <div className={clsx(style.wrapper, getCardBackground())}>
      {!state.gameState.isStart && (
        <div className={style.welcomeScreenContainer}>
          <div className={style.header}>Practice Numbers</div>
          <div className={style.subHeader}>
            These are multiple choice questions, select all correct options.
          </div>
          <Button onClick={handleGameStart}>Start</Button>
        </div>
      )}

      {currQues && !state.gameState.isEnd && (
        <GameCard
          runData={state.runData}
          screenState={state.screenState}
          gameState={state.gameState}
          handleClickOption={handleClickOption}
          handleClickSubmit={handleClickSubmit}
        />
      )}

      {state.gameState.isEnd && (
        <div className={style.viewResultContainer}>
          <ViewResult onClick={handleOpenResultModal} playAgain={handleGameReset} />
        </div>
      )}

      {state.gameState.isEnd && state.runData.result && (
        <Result
          isOpen={state.screenState.isOpenResultModal}
          result={state.runData.result}
          handleClose={handleCloseResultModal}
        />
      )}
    </div>
  );
}
