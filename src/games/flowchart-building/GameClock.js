import React from "react";
import style from "./GameClock.module.scss";

import { useGameEngine } from "./engine/GameEngineProvider";

export default function GameClock() {
  const { state } = useGameEngine();

  let ms = state.runState.totTimeElapsed;

  var hours = Math.floor(ms / 3600000);
  var minutes = Math.floor((ms - hours * 3600000) / 60000);
  var seconds = Math.floor((ms - hours * 3600000 - minutes * 60000) / 1000);

  function appendZero(time) {
    if (time < 10) return `0${time}`;
    else return time.toString();
  }

  return (
    <div className={style.wrapper}>
      <div className={style.timer}>
        <div className={style.time}>
          <p>{appendZero(minutes)}</p>
          <p>MIN</p>
        </div>
        <p className={style.seperator}>:</p>
        <div className={style.time}>
          <p>{appendZero(seconds)}</p>
          <p>SEC</p>
        </div>
      </div>
      <p>Time Elapsed</p>
    </div>
  );
}
