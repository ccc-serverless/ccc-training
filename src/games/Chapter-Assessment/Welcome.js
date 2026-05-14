import React from "react";
import style from "./Welcome.module.scss";

import Button from "./Button";
import { useGameEngine } from "./engine/GameEngineProvider";

export default function Welcome() {
  const { handleGameStart } = useGameEngine();
  return (
    <div className={style.wrapper}>
      <div className={style.header}>Assessment </div>
      <div className={style.subheader}>
        These are multiple choice questions. Select the one right option for each question
        and submit
      </div>

      <Button onClick={handleGameStart}>Start</Button>
    </div>
  );
}
