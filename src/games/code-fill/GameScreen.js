import React from "react";
import style from "./GameScreen.module.scss";

import clsx from "clsx";

import GameCard from "./GameCard";
import GameSettings from "./GameSettings";

import { useGameEngine } from "./engine/GameEngineProvider";

export default function GameScreen() {
  const { state } = useGameEngine();

  function getCardBackground() {
    const lottie = state.screen.lottie;
    if (lottie.isActive) {
      if (lottie.isCorrect) return style.backgroundCorrect;
      else return style.backgroundIncorrect;
    } else {
      return style.backgroundNeutral;
    }
  }

  return (
    <div className={clsx(style.wrapper, getCardBackground())}>
      <div className={style.header}>Python Variable Exercises</div>

      {!state.gameState.isStart && <GameSettings />}
      {state.gameState.isStart && !state.gameState.isEnd && <GameCard />}
    </div>
  );
}
