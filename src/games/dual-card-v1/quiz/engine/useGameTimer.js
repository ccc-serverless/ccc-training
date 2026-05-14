import { useEffect } from "react";

let gameTimer = null;

export default function ({ state, dispatch }) {
  function resumeGameTimer() {
    const int = 10;
    gameTimer = window.setInterval(() => {
      dispatch({ type: "INC_GAME_TIMER", payload: { inc: int } });
    }, int);
  }

  function pauseGameTimer() {
    window.clearInterval(gameTimer);
    gameTimer = null;
  }

  useEffect(() => {
    pauseGameTimer();
  }, []);

  return { resumeGameTimer, pauseGameTimer };
}
