import React, { useReducer, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { TagsContextProvider } from "./_common/TagsContext";
import SelectionScreen from "./SelectionScreen";
import PlayScreen from "./PlayScreen";

import { useGetQuestions } from "./_common/useGetQuestions";
import { updateObjectWithMatch } from "utils/helper";
import { useCalcAndUploadResult } from "./_common/useUploadResult";

const _GradientCorrect = "linear-gradient(45deg, #3d6d31, #1ed472)";
const _GradientNeutral = "linear-gradient(to right, #6a2c70, #d093d4)";
const _GradientIncorrect = "linear-gradient(45deg, #f35325, #f3ad25)";

const _MaxQuestions = 2;

const _InitialState = {
  totTimeElapsed: 0,
  gameState: {
    isStart: false,
    isEnd: false,
  },
  screenState: {
    showNextButton: false,
    showSubmitButton: true,
    showSolutionButton: true,
    showCorrect: false,
    showIncorrect: false,
    showHint: false,
    isOpenModalResult: false,
  },
  style: {
    cardBackground: _GradientNeutral,
  },
  result: {
    chartData: { topics: [], tags: [] },
    arrData: [],
  },
};

let gameTimer = null;

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "INC_GAME_TIMER":
      return { ...state, totTimeElapsed: state.totTimeElapsed + 10 };
    case "SET_GAME_STATE":
      return {
        ...state,
        gameState: updateObjectWithMatch(state.gameState, payload),
      };
    case "SET_SCREEN_STATE":
      return {
        ...state,
        screenState: updateObjectWithMatch(state.screenState, payload),
      };
    case "SET_STYLE_CARD_BG":
      return {
        ...state,
        style: {
          ...state.style,
          cardBackground: getStyleForState(payload.currState),
        },
      };
    case "SET_RESULT":
      return { ...state, result: updateObjectWithMatch(state.result, payload) };
    case "SET_TIME_ELAPSED":
      return { ...state, totTimeElapsed: 0 };
    default:
      return state;
  }
}

export default function Container(props) {
  const location = useLocation();
  const [state, dispatch] = useReducer(reducer, _InitialState);
  const {
    reset,
    questions,
    getQuestions,
    setQuestions,
    setNextQuestion,
    isLoading: isLoadingQuestions,
  } = useGetQuestions(props.name);

  const { calculateResult } = useCalcAndUploadResult(
    questions,
    state,
    dispatch,
    props.id
  );

  function startTimer() {
    gameTimer = window.setInterval(() => {
      dispatch({ type: "INC_GAME_TIMER" });
    }, 10);
  }

  function stopTimer() {
    window.clearInterval(gameTimer);
    gameTimer = null;
  }

  function resetGame() {
    stopTimer();
    dispatch({ type: "SET_TIME_ELAPSED" });
    reset();
    dispatch({
      type: "SET_RESULT",
      payload: {
        chartData: { topics: [], tags: [] },
        arrData: [],
      },
    });
    dispatch({
      type: "SET_STYLE_CARD_BG",
      payload: {
        currState: "Neutral",
      },
    });
    dispatch({
      type: "SET_GAME_STATE",
      payload: {
        isStart: false,
        isEnd: false,
      },
    });
    dispatch({
      type: "SET_SCREEN_STATE",
      payload: {
        isOpenModalResult: false,
        showNextButton: false,
        showIncorrect: false,
        showCorrect: false,
        showHint: false,
        showSubmitButton: true,
        showSolutionButton: true,
      },
    });
  }

  function handleClickNext() {
    if (questions.poolRem.length) {
      setNextQuestion();
      dispatch({
        type: "SET_SCREEN_STATE",
        payload: {
          showNextButton: false,
          showIncorrect: false,
          showCorrect: false,
          showHint: false,
          showSubmitButton: true,
          showSolutionButton: true,
        },
      });
      dispatch({
        type: "SET_STYLE_CARD_BG",
        payload: {
          currState: "Neutral",
        },
      });
    } else {
      dispatch({
        type: "SET_SCREEN_STATE",
        payload: {
          isOpenModalResult: true,
        },
      });
    }
  }

  useEffect(() => {
    resetGame();
  }, [location]);

  return (
    <TagsContextProvider>
      <>
        {!state.gameState.isStart ? (
          <SelectionScreen
            state={state}
            dispatch={dispatch}
            maxQuestions={_MaxQuestions}
            getQuestions={getQuestions}
            startTimer={startTimer}
            {...props}
          />
        ) : (
          <PlayScreen
            reset={resetGame}
            state={state}
            dispatch={dispatch}
            questions={questions}
            calculateResult={calculateResult}
            maxQuestions={_MaxQuestions}
            isLoading={isLoadingQuestions}
            getQuestions={getQuestions}
            setQuestions={setQuestions}
            setNextQuestion={setNextQuestion}
            handleClickNext={handleClickNext}
            totTimeElapsed={state.totTimeElapsed}
            stopTimer={stopTimer}
            {...props}
          />
        )}
      </>
    </TagsContextProvider>
  );
}

//HELPER FUNCTIONS --------------------------------------------------------------------------
function getStyleForState(currState) {
  switch (currState) {
    case "Neutral":
    case "neutral":
      return _GradientNeutral;
    case "Correct":
    case "correct":
      return _GradientCorrect;
    case "Incorrect":
    case "incorrect":
      return _GradientIncorrect;
    default:
      return null;
  }
}
