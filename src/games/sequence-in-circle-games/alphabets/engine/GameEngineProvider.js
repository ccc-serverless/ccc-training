import React, { useEffect } from "react";

import { reducer, _InitialValue } from "./reducer";

import useGameSettings from "./useGameSettings";
import useGameController from "./useGameController";
import useScreenController from "./useScreenController";
import useGameActions from "./useGameActions";
import useCalcAndUploadResult from "./useUploadResult";

const GameEngineContext = React.createContext({});

export function GameEngineProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, _InitialValue);

  /* Before starting the game, setttings controllers */
  const { handleClickLevel, handleClickOrder, handleClickSplitType } = useGameSettings({
    state,
    dispatch,
  });

  /* Controlling start,end,reset */
  const { handleGameStart, handleGameReset } = useGameController({ state, dispatch });

  /* In-Game action controller*/
  const { handleClickCircle } = useGameActions({ state, dispatch });

  /* Screen UI controllers */
  const { handleOpenResultModal, handleCloseResultModal } = useScreenController({
    state,
    dispatch,
  });

  /* Upload result */
  useCalcAndUploadResult({ state, dispatch });

  return (
    <GameEngineContext.Provider
      value={{
        state,
        dispatch,

        handleClickLevel,
        handleClickOrder,
        handleClickSplitType,

        handleGameStart,
        handleGameReset,

        handleClickCircle,

        handleCloseResultModal,
        handleOpenResultModal,
      }}
    >
      {children}
    </GameEngineContext.Provider>
  );
}

export function useGameEngine() {
  return React.useContext(GameEngineContext);
}
