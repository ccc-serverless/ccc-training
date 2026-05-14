import React, { useReducer, useContext, useEffect } from "react";

import { _InitialState, reducer } from "./reducer";

import useGameTimer from "./useGameTimer";
import useGameController from "./useGameController";
import useResultController from "./useResultController";
import useGetQuestions from "./useGetQuestions";

const GameEngineContext = React.createContext({});

export function GameEngineProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, _InitialState);

  const { pauseGameTimer, resumeGameTimer } = useGameTimer({ dispatch });

  const { getQuestions } = useGetQuestions({ state, dispatch });

  const { calculateResult, handleCloseResultModal, handleOpenResultModal } =
    useResultController({ state, dispatch });

  const {
    handleGameStart,
    handleChangeInput,
    handleClickSubmit,
    handleGameReset,
    handleActiveQuesChange,
    handleEndGame,
    handleCloseConfirmation,
  } = useGameController({
    state,
    dispatch,
    getQuestions,
    pauseGameTimer,
    resumeGameTimer,
    calculateResult,
  });

  return (
    <GameEngineContext.Provider
      value={{
        state,
        dispatch,

        handleGameStart,
        handleChangeInput,
        handleClickSubmit,
        handleActiveQuesChange,
        handleEndGame,

        handleCloseResultModal,
        handleOpenResultModal,
        handleGameReset,
        handleCloseConfirmation,
      }}
    >
      {children}
    </GameEngineContext.Provider>
  );
}

export function useGameEngine() {
  return useContext(GameEngineContext);
}
