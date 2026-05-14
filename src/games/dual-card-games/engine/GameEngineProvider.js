import React, { useEffect, useReducer } from "react";

import { _InitialState, reducer } from "./reducer";

import useGameActions from "./useGameActions";
import useGameController from "./useGameController";

const GameEngineContext = React.createContext({});

export function GameEngineProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, _InitialState);

  const { handleChangeInput, handleSubmitAnswer, handleClickShowSolution } =
    useGameActions({ state, dispatch });

  const { handleGameStart, handleGameReset, moveToNextQuestion, handleOpenModalResult } =
    useGameController({
      state,
      dispatch,
    });

  return (
    <GameEngineContext.Provider
      value={{
        state,
        dispatch,

        handleGameStart,
        handleGameReset,
        moveToNextQuestion,
        handleOpenModalResult,

        handleChangeInput,
        handleSubmitAnswer,
        handleClickShowSolution,
      }}
    >
      {children}
    </GameEngineContext.Provider>
  );
}

export function useGameEngine() {
  return React.useContext(GameEngineContext);
}
