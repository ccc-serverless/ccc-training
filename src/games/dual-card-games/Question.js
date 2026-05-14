import React from "react";
import style from "./Question.module.scss";

import ReactHtmlParser from "react-html-parser";
import { useGameEngine } from "./engine/GameEngineProvider";

export default function Question() {
  const { state } = useGameEngine();
  const questionsAsked = [...state.runData.questionsAsked];
  const currQues = questionsAsked[questionsAsked.length - 1];

  return (
    <div className={style.wrapper}>
      <div className={style.questionWrapper}>
        <div className={style.question}>{ReactHtmlParser(currQues.question)}</div>
      </div>
    </div>
  );
}
