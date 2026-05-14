import React, { useReducer, useContext, useEffect } from "react";

import { _InitialState, reducer } from "./reducer";

import useGameTimer from "./useGameTimer";
import useGameController from "./useGameController";
import useResultController from "./useResultController";

const GameEngineContext = React.createContext({});

export function GameEngineProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, _InitialState);

  const { pauseGameTimer, resumeGameTimer } = useGameTimer({ dispatch });

  const { calculateResult, handleCloseResultModal, handleOpenResultModal } =
    useResultController({ state, dispatch });

  const { handleGameStart, handleClickOption, handleClickSubmit, handleGameReset } =
    useGameController({
      state,
      dispatch,
      calculateResult,
      pauseGameTimer,
      resumeGameTimer,
    });

  return (
    <GameEngineContext.Provider
      value={{
        state,
        dispatch,

        handleGameStart,
        handleClickOption,
        handleClickSubmit,

        handleCloseResultModal,
        handleOpenResultModal,
        handleGameReset,
      }}
    >
      {children}
    </GameEngineContext.Provider>
  );
}

export function useGameEngine() {
  return useContext(GameEngineContext);
}
