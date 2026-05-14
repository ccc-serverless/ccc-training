import React from "react";
import style from "./GameClock.module.scss";

const GameClock = (props) => {
  function getMinutes(s) {
    let mins = parseInt(s / 60);
    if (mins < 10) return `0${mins}`;
    else return mins;
  }

  function getSeconds(s) {
    let seconds = parseInt(s % 60);
    if (seconds < 10) return `0${seconds}`;
    else return seconds;
  }

  return (
    <div className={style.timerWrapper}>
      <div className={style.mainTimer}>
        <div className={style.time}>
          <p className={style.timeText}>{getMinutes(props.totalGameTime)}</p>
          <p>MN</p>
        </div>
        <span>:</span>
        <div className={style.time}>
          <p className={style.timeText}>{getSeconds(props.totalGameTime)}</p>
          <p>SEC</p>
        </div>
      </div>
      <div className={style.timerText}>
        <p>Time Elapsed</p>
      </div>
    </div>
  );
};

export default GameClock;
