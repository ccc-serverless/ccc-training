import React from "react";
import style from "./Header.module.scss";

import { useGameEngine } from "./engine/GameEngineProvider";

export default function Header() {
  const { state } = useGameEngine();
  const { isStart, isEnd } = state.gameState;
  const currQuesNumber = state.runData.questionsAsked.length;
  const questionsCount = state.runData.questionsAll.length;

  return (
    <div className={style.wrapper}>
      {isStart && <div className={style.title}>Python Quiz</div>}
      {isStart && !isEnd && (
        <div className={style.quesCounter}>
          <span>
            Question {currQuesNumber} of {questionsCount}
          </span>
        </div>
      )}
    </div>
  );
}
