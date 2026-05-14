import React from "react";
import style from "./GameHeader.module.scss";

const GameHeader = (props) => {
  return (
    <div className={style.rootGameHeader}>
      <div className={style.gameTitle}>
        <h1>{props.name}</h1>
      </div>
    </div>
  );
};

export default GameHeader;
