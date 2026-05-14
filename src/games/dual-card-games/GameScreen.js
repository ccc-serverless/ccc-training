import React, { useEffect } from "react";
import style from "./GameScreen.module.scss";

import Header from "./Header";
import GameCard from "./GameCard";
import Button from "./Button";

import { useGameEngine } from "./engine/GameEngineProvider";
import clsx from "clsx";
import Result from "./Result";

export default function GameScreen({ name }) {
  const {
    state,
    dispatch,
    handleSubmitAnswer,
    moveToNextQuestion,
    handleOpenModalResult,
  } = useGameEngine();
  const { isStart, isEnd } = state.gameState;
  const { showSubmitButton, showNextButton } = state.screenState;

  useEffect(() => {
    if (!name) return;

    dispatch({
      type: "SET_GAME_NAME",
      payload: {
        name: name,
      },
    });
  }, [name]);

  return (
    <div className={clsx(style.wrapper, state.screenState.screenBackground)}>
      <div className={style.innerWrapper}>
        <Header />
        <GameCard />
        {!isEnd && isStart && (
          <>
            <div className={style.buttonContainer}>
              {showSubmitButton && name !== "Word Problems" && (
                <Button onClick={handleSubmitAnswer} text="Submit" />
              )}
              {showNextButton && <Button onClick={moveToNextQuestion} text="Next" />}
            </div>
          </>
        )}
      </div>
      {state.gameState.isEnd && (
        <Result state={state} handleOpenModalResult={handleOpenModalResult} />
      )}
    </div>
  );
}
