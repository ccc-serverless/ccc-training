import React from "react";
import style from "./Footer.module.scss";

import Button from "./Button";

export default function Footer({ state, handleGameStart, handleGameReset }) {
  /* Button style is overriden in footer.module.scss */

  return (
    <div className={style.wrapper}>
      {state.gameState.isStart ? (
        <Button onClick={handleGameReset}>Reset</Button>
      ) : (
        <Button onClick={handleGameStart}>Start</Button>
      )}
    </div>
  );
}
