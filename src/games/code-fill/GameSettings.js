import React from "react";
import style from "./GameSettings.module.scss";

import Button from "./Button";
import { useGameEngine } from "./engine/GameEngineProvider";

export default function GameSettings() {
  const { handleGameStart } = useGameEngine();
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <p>Fill in the blanks to complete the code and arrive at the desired output</p>
        <Button onClick={handleGameStart} text="Start Game" />
      </div>
    </div>
  );
}
