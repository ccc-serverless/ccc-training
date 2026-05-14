let gameTimeInterval = null;

export default function useGameTimer({ state, dispatch }) {
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

  return { pauseGameTimer, resumeGameTimer };
}
