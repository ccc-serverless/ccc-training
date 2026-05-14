export default function useGameController({ state, dispatch, resumeGameTimer }) {
  function handleGameStart() {
    dispatch({ type: "UPDATE_GAME_STATE", payload: { isStart: true } });
    resumeGameTimer();
  }

  return { handleGameStart };
}
