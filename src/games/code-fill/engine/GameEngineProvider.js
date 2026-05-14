import React, { useReducer } from "react";

import { _InitialState, reducer } from "./reducer";

import useGameActions from "./useGameActions";
import useGameController from "./useGameController";
import useGameTimer from "./useGameTimer";
import useScreenController from "./useScreenController";

const GameEngineContext = React.createContext({});

export function GameEngineProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, _InitialState);

  const { pauseGameTimer, resumeGameTimer } = useGameTimer({ state, dispatch });

  const { handleChangeInput, handleSubmitAnswer } = useGameActions({
    state,
    dispatch,
    pauseGameTimer,
    resumeGameTimer,
  });

  const { handleGameStart } = useGameController({
    state,
    dispatch,
    resumeGameTimer,
  });

  const { setQuestionsSwiper } = useScreenController({ state, dispatch });

  return (
    <GameEngineContext.Provider
      value={{
        state,
        dispatch,

        setQuestionsSwiper,

        handleGameStart,

        handleChangeInput,
        handleSubmitAnswer,
      }}
    >
      {children}
    </GameEngineContext.Provider>
  );
}

export function useGameEngine() {
  return React.useContext(GameEngineContext);
}
