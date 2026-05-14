import React from "react";
import style from "./TimerBar.module.scss";

export default function TimerBar({ state }) {
  const { timeUptoLastQuestion, totalTimeElapsed } = state.runData;
  const { maxTimePerQuestion } = state.gameSettings;

  const currTime = totalTimeElapsed - timeUptoLastQuestion;
  const currTimeLeft = maxTimePerQuestion * 1000 - currTime;

  let width = (currTimeLeft / 1000 / state.gameSettings.maxTimePerQuestion) * 100;

  return <div className={style.wrapper} style={{ width: `${width}%` }}></div>;
}
