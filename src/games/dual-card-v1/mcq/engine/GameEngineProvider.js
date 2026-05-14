import React, { useReducer, useContext, useEffect } from "react";
import { _InitialState, reducer } from "./reducer";

import useGameController from "./useGameController";
import useGameTimer from "./useGameTimer";
import useResultController from "./useResultController";

const GameContext = React.createContext();

export function GameEngineProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, _InitialState);

  const { pauseGameTimer, resumeGameTimer } = useGameTimer({ state, dispatch });

  const {
    handleQuesSwiper,
    handleChangeInput,
    handleShowSolution,
    handleGameStart,
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

        handleQuesSwiper,
        handleChangeInput,
        handleShowSolution,
        handleGameStart,

        handleOpenResultModal,
        handleCloseResultModal,

        handleResetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameEngine() {
  return useContext(GameContext);
}
