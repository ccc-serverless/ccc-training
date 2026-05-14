import React from "react";
import style from "./PreGame.module.scss";

import { useGameEngine } from "./engine/GameEngineProvider";

import PrevResults from "./PrevResults";
import Welcome from "./Welcome";

export default function PreGame() {
  const { state } = useGameEngine();
  const lvl = parseInt(state.gameSettings.level);

  const attempts = state.gameSettings.attempts.filter(
    (attempt) => attempt.itemSlNo === lvl
  );

  const currLevelStatus = state.gameSettings.attemptsStatus[state.gameSettings.level - 1];

  return (
    <div className={style.wrapper}>
      <PrevResults />
    </div>
  );
}
