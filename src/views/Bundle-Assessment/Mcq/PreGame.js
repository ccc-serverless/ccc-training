import React from "react";
import style from "./PreGame.module.scss";

import { useGameEngine } from "./engine/GameEngineProvider";

import PrevResults from "./PrevResults";
import { Lock } from "react-feather";
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
      {currLevelStatus === "LOCKED" && (
        <div className={style.locked}>
          <Lock />
          <p>Please complete previous level(s) to unlock</p>
        </div>
      )}

      {currLevelStatus === "COMPLETED" && <PrevResults />}

      {currLevelStatus === "INCOMPLETE" && (
        <>{attempts.length === 0 ? <Welcome /> : <PrevResults />}</>
      )}
    </div>
  );
}
