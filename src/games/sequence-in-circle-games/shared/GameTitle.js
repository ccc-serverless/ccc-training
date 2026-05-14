import React from "react";
import style from "./GameTitle.module.scss";

export default function GameTitle({ title }) {
  return (
    <div className={style.wrapper}>
      <div className={style.gameTitle}>
        <h1>{title}</h1>
      </div>
    </div>
  );
}
