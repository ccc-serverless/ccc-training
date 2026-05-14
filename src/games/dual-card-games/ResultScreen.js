import React from "react";
import style from "./ResultScreen.module.scss";

import Button from "./Button";
import Result from "./Result";

import { useGameEngine } from "./engine/GameEngineProvider";

export default function ResultScreen() {
  const { handleOpenModalResult, handleGameReset } = useGameEngine();
  return (
    <div className={style.wrapper}>
      <Button onClick={handleOpenModalResult} text="View Result" />
      <Button onClick={handleGameReset} text="Play Again" />
    </div>
  );
}
