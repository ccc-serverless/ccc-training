import React from "react";
import style from "./CodeLines.module.scss";

import ReactHtmlParser from "react-html-parser";

export default function CodeLines({ ques, handleChangeInput }) {
  return (
    <form onChange={handleChangeInput} className={style.wrapper}>
      {ques.code.map((line) => (
        <div className={style.codeLine}>{ReactHtmlParser(line)}</div>
      ))}
    </form>
  );
}
