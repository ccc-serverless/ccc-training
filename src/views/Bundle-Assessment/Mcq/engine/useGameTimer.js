let _GameTimeInterval = null;

export default function useGameTimer({ dispatch }) {
  function resumeGameTimer() {
    const int = 10;
    _GameTimeInterval = window.setInterval(() => {
      dispatch({ type: "INC_GAME_TIMER", payload: { inc: int } });
    }, int);
  }

  function pauseGameTimer() {
    window.clearInterval(_GameTimeInterval);
    _GameTimeInterval = null;
  }

  return { pauseGameTimer, resumeGameTimer };
}
