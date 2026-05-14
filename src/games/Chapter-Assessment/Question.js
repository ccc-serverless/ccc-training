import React from "react";
import style from "./Question.module.scss";

import ReactHTMLParser from "react-html-parser";

export default function Question({ question, activeQuesNumber }) {
  return (
    <div className={style.wrapper}>
      <span className={style.quesCount}>Q{activeQuesNumber + 1}.</span>
      <span className={style.quesText}>{ReactHTMLParser(question.question)}</span>
    </div>
  );
}
