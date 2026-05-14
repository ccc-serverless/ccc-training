import React from "react";
import style from "./Toast.module.scss";

import Correct from "assets/lottie/flowchart_correct.gif";
import Incorrect from "assets/lottie/flowchart_incorrect.gif";

import { useGameEngine } from "./engine/GameEngineProvider";

export default function Toast() {
  const { state } = useGameEngine();
  const isCorrect = state.screenState.toast.isCorrect;

  return (
    <div className={style.wrapper}>
      {isCorrect ? (
        <div>
          <span>Correct Answer</span>
          <img src={Correct} alt="right" />
        </div>
      ) : (
        <div>
          <span>Incorrect Answer</span>
          <img src={Incorrect} alt="wrong" />
        </div>
      )}
    </div>
  );
}
