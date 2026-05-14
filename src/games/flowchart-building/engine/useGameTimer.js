import { useEffect } from "react";

let gameTimeInterval = null;

export default function useGameTimer({ dispatch }) {
  function pauseGameTimer() {
    window.clearInterval(gameTimeInterval);
    gameTimeInterval = null;
  }
  function resumeGameTimer() {
    const interval = 10;

    gameTimeInterval = window.setInterval(() => {
      dispatch({ type: "INC_GAME_TIMER", payload: { inc: interval } });
    }, interval);
  }

  useEffect(() => {
    return () => window.clearInterval(gameTimeInterval);
  }, []);

  return { pauseGameTimer, resumeGameTimer };
}
