import React, { useReducer } from "react";

import { _InitialState, reducer } from "./reducer";

import useGameController from "./useGameController";

const GameEngineContext = React.createContext({});

export function GameEngineProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, _InitialState);

  const { handleCorrectAnswer, resetGame } = useGameController({
    state,
    dispatch,
  });

  return (
    <GameEngineContext.Provider
      value={{
        state,
        dispatch,
        handleCorrectAnswer,
        resetGame,
      }}
    >
      {children}
    </GameEngineContext.Provider>
  );
}

export function useGameEngine() {
  return React.useContext(GameEngineContext);
}
