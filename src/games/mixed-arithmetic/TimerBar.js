import React from "react";
import style from "./TimerBar.module.scss";

export default function TimerBar({ state }) {
  const { timeUptoLastQuestion, totalTimeElapsed } = state.runState;
  const { maxTimePerQuestion } = state.gameSettings;

  const currTime = totalTimeElapsed - timeUptoLastQuestion;
  const currTimeLeft = maxTimePerQuestion * 1000 - currTime;

  let ms = currTimeLeft;
  var hours = Math.floor(ms / 3600000);
  var minutes = Math.floor((ms - hours * 3600000) / 60000);
  var seconds = Math.floor((ms - hours * 3600000 - minutes * 60000) / 1000);

  let wf = (ms - hours * 3600000 - minutes * 60000) / 1000;

  let width = (wf / state.gameSettings.maxTimePerQuestion) * 100;

  return (
    <div className={style.wrapper}>
      {/* <div style={{ color: "white" }}>{seconds} secs left</div> */}
      <div className={style.timerBar} style={{ width: `${width}%` }}></div>
    </div>
  );
}
