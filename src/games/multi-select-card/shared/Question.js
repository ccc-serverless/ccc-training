import React from "react";
import style from "./Question.module.scss";

import ReactHtmlParser from "react-html-parser";

export default function Question({ quesStatement, quesNumber }) {
  return (
    <div className={style.wrapper}>
      <span> Q{quesNumber}. </span>
      {ReactHtmlParser(quesStatement)}
    </div>
  );
}
