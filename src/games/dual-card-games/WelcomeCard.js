import React from "react";
import style from "./WelcomeCard.module.scss";

import Button from "./Button";
import { useGameEngine } from "./engine/GameEngineProvider";

export default function WelcomeCard() {
  const { state, handleGameStart } = useGameEngine();
  const game = state.gameSettings.name;

  return (
    <div className={style.wrapper}>
      <div className={style.text}>
        <p>{game === "Mcq" ? "Python Quiz" : "Output Guesser"}</p>
        <p>
          {game === "Mcq"
            ? "This section contains 10 questions. Select the right option"
            : "This section contains 10 questions. Guess and enter the expected output of the python code."}
        </p>
      </div>
      <div className={style.start}>
        <Button onClick={handleGameStart} text="Start Game" />
      </div>
    </div>
  );
}
