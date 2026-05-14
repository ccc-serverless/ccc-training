import React, { useEffect, useReducer, useContext } from "react";
import { _InitialState, reducer } from "./reducer";

import useGameTimer from "./useGameTimer";
import useGameController from "./useGameController";
import useResultController from "./useResultController";

const GameContext = React.createContext();

export function GameEngineProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, _InitialState);

  const { pauseGameTimer, resumeGameTimer } = useGameTimer({ state, dispatch });

  const {
    handleGameStart,
    handleSubmitAnswer,
    handleChangeAnswer,
    handleQuesSwiper,
    handleShowSolution,
    handleResetGame,
  } = useGameController({
    state,
    dispatch,
    pauseGameTimer,
    resumeGameTimer,
  });

  const { handleOpenResultModal, handleCloseResultModal } = useResultController({
    state,
    dispatch,
  });

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch,

        handleGameStart,
        handleSubmitAnswer,
        handleChangeAnswer,
        handleResetGame,
        handleQuesSwiper,
        handleShowSolution,

        handleOpenResultModal,
        handleCloseResultModal,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameEngine() {
  return useContext(GameContext);
}
