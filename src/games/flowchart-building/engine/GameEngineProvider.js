import React, { useRef, createContext, useReducer, useContext, useEffect } from "react";
import { reducer, _InitialState } from "./reducer";

import useGameTimer from "./useGameTimer";
import useGameController from "./useGameController";
import useResultController from "./useResultController";
import useUserActions from "./useUserActions";
import useScreenController from "./useScreenController";

const EngineContext = createContext({});

export function GameEngineProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, _InitialState);
  const reactFlowRef = useRef();

  const { pauseGameTimer, resumeGameTimer } = useGameTimer({ state, dispatch });

  const { onLoad, onConnect, onDragOver, onDrop, onElementsRemove, removeEdge } =
    useUserActions({
      state,
      dispatch,
      reactFlowRef,
    });

  const { handleGameStart, handleGameReset, getQuestions, setNextQuestion } =
    useGameController({ state, dispatch, pauseGameTimer, resumeGameTimer });

  const { handleSubmitAnswer } = useResultController({
    state,
    dispatch,
    setNextQuestion,
    pauseGameTimer,
    resumeGameTimer,
  });

  const { handleOpenResultModal, handleCloseResultModal, toggleFullScreen } =
    useScreenController({
      state,
      dispatch,
    });

  return (
    <EngineContext.Provider
      value={{
        state,
        dispatch,
        reactFlowRef,

        handleGameStart,
        getQuestions,
        setNextQuestion,
        handleGameReset,

        onLoad,
        onDrop,
        onElementsRemove,
        removeEdge,
        onConnect,
        onDragOver,

        handleSubmitAnswer,

        handleOpenResultModal,
        handleCloseResultModal,
        toggleFullScreen,
      }}
    >
      {children}
    </EngineContext.Provider>
  );
}

export function useGameEngine() {
  return useContext(EngineContext);
}
