import React, { useReducer, useEffect, useState, useRef } from "react";
import styleGameCard from "./GameCard.module.scss";

import SelectionScreen from "./OperatorSelectionContainer";
import PlayScreen from "./GameCard";

import { _Default, generateQuestion, calculateResult } from "./helper";
import { updateObjectWithMatch } from "utils/helper";
import useUploadResult from "views/CourseLearning/active-content/engine/useUploadResult";

import lottieCorrect from "assets/lottie/right_arithmetic.json";
import lottieIncorrect from "assets/lottie/wrong_arithmetic.json";

let gameTimeInterval = null;
let lottieTimeout = null;
let quesTransitionTimeout = null;

const _InitialState = {
  runState: {
    isStart: false,
    isEnd: false,
    totalTimeElapsed: 0,
    timeUptoLastQuestion: 0,
    activeQuestion: 0,
  },
  screen: {
    isOpenModalResult: false,
    background: styleGameCard.default,
    gameCard: styleGameCard.defaultGameCard,
    lottie: {
      isActive: false,
      data: null,
    },
  },
  gameSettings: {
    name: "",
    gameId: "",
    operator: null,
    maxQuestions: _Default.maxQuestions,
    level: _Default.level,
    timePerQues: _Default.timePerQues,
    maxTimePerQuestion: _Default.timePerQues,
  },
  questions: [],
  result: { arrData: [], accuracy: 0, speed: 0 },
};

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "SET_RUN_STATE":
      return { ...state, runState: updateObjectWithMatch(state.runState, payload) };
    case "SET_GAME_SETTINGS":
      return {
        ...state,
        gameSettings: updateObjectWithMatch(state.gameSettings, payload),
      };
    case "SET_QUESTIONS":
      return { ...state, questions: payload };
    case "INCREMENT_QUESTION_COUNTER":
      return {
        ...state,
        runState: {
          ...state.runState,
          activeQuestion: state.runState.activeQuestion + 1,
        },
      };
    case "INCREMENT_GAME_TIMER":
      return {
        ...state,
        runState: {
          ...state.runState,
          totalTimeElapsed: state.runState.totalTimeElapsed + payload.inc,
        },
      };
    case "SET_RESPONSE":
      let toUpdate = { ...state };
      let currQues = toUpdate.questions[toUpdate.runState.activeQuestion - 1];
      currQues.resp = payload.resp;
      return toUpdate;

    case "SET_SCREEN_STATE":
      return { ...state, screen: updateObjectWithMatch(state.screen, payload) };
    case "SET_RESULT":
      return { ...state, result: updateObjectWithMatch(state.result, payload) };

    case "RESET_GAME":
      return {
        ..._InitialState,
        gameSettings: {
          ..._InitialState.gameSettings,
          name: state.gameSettings.name,
          gameId: state.gameSettings.gameId,
        },
      };

    default:
      return state;
  }
}

export default function Container({ id, name }) {
  const [state, dispatch] = useReducer(reducer, _InitialState);

  const inputRef = useRef();

  const { uploadResult } = useUploadResult();

  const [currInput, setCurrInput] = useState("");
  const [questionsSwiper, setQuestionsSwiper] = useState(null);

  function startGame() {
    dispatch({ type: "SET_RUN_STATE", payload: { isStart: true } });
    dispatch({ type: "INCREMENT_QUESTION_COUNTER" });
    generateAllQuestions();
    resumeGameTimer();
  }

  function generateAllQuestions() {
    let arrQuestions = [];
    for (let i = 0; i < state.gameSettings.maxQuestions; i++) {
      const ques = generateQuestion(state.gameSettings);
      arrQuestions.push(ques);
    }
    dispatch({ type: "SET_QUESTIONS", payload: arrQuestions });
  }

  function moveToNextQuestion() {
    dispatch({
      type: "SET_SCREEN_STATE",
      payload: {
        background: styleGameCard.default,
        gameCard: styleGameCard.gameCardDefault,
      },
    });
    dispatch({ type: "INCREMENT_QUESTION_COUNTER" });
    questionsSwiper.slideNext();

    quesTransitionTimeout = window.setTimeout(() => {
      resumeGameTimer();

      if (inputRef.current) {
        inputRef.current.disabled = false;
        inputRef.current.disabled = false;
        inputRef.current.focus();
      }
    }, [1000]);
  }

  function checkIfQuestionTimedOut() {
    if (!state.runState.isStart) return;
    const { totalTimeElapsed, timeUptoLastQuestion } = state.runState;
    const { maxTimePerQuestion } = state.gameSettings;

    if (parseInt(totalTimeElapsed - timeUptoLastQuestion) >= maxTimePerQuestion * 1000)
      playLottie(false);
  }

  function pauseGameTimer() {
    window.clearInterval(gameTimeInterval);
    gameTimeInterval = null;
  }
  function resumeGameTimer() {
    const interval = 10;
    gameTimeInterval = window.setInterval(() => {
      dispatch({ type: "INCREMENT_GAME_TIMER", payload: { inc: interval } });
    }, interval);
  }

  function playLottie(isTrue) {
    pauseGameTimer();
    dispatch({
      type: "SET_RUN_STATE",
      payload: {
        timeUptoLastQuestion: state.runState.totalTimeElapsed,
      },
    });

    if (inputRef.current) inputRef.current.disabled = true;
    if (isTrue) {
      dispatch({
        type: "SET_SCREEN_STATE",
        payload: { background: styleGameCard.rightbg },
      });
      dispatch({
        type: "SET_SCREEN_STATE",
        payload: {
          lottie: {
            isActive: true,
            data: lottieCorrect,
          },
        },
      });
    } else {
      dispatch({
        type: "SET_SCREEN_STATE",
        payload: { background: styleGameCard.wrongbg },
      });
      dispatch({
        type: "SET_SCREEN_STATE",
        payload: {
          lottie: {
            isActive: true,
            data: lottieIncorrect,
          },
        },
      });
    }

    lottieTimeout = window.setTimeout(() => {
      if (state.runState.activeQuestion === state.gameSettings.maxQuestions) {
        endGame();
        return;
      }

      inputRef.current.value = "";
      moveToNextQuestion();
      setCurrInput("");

      dispatch({
        type: "SET_SCREEN_STATE",
        payload: {
          lottie: {
            isActive: false,
            data: lottieIncorrect,
          },
        },
      });
    }, 1500);
  }

  function clearAllTimers() {
    window.clearInterval(gameTimeInterval);
    window.clearTimeout(lottieTimeout);
    window.clearTimeout(quesTransitionTimeout);
    gameTimeInterval = null;
    lottieTimeout = null;
    quesTransitionTimeout = null;
  }

  function resetGame() {
    dispatch({ type: "RESET_GAME" });
    clearAllTimers();
  }

  function endGame() {
    const { accuracy, speed } = calculateResult(
      state.questions,
      state.runState.totalTimeElapsed
    );
    dispatch({
      type: "SET_RESULT",
      payload: { arrData: state.questions, accuracy, speed },
    });
    dispatch({ type: "SET_RUN_STATE", payload: { isEnd: true } });
    dispatch({
      type: "SET_SCREEN_STATE",
      payload: {
        isOpenModalResult: !state.screen.isOpenModalResult,
        background: styleGameCard.default,
        gameCard: styleGameCard.defaultGameCard,
      },
    });
  }

  useEffect(() => {
    checkIfQuestionTimedOut();
  }, [state.runState.totalTimeElapsed]);

  useEffect(() => {
    if (state.result.arrData) {
      if (state.result.arrData.length) {
        const { operator, maxQuestions, level, timePerQues, maxTimePerQuestion } =
          state.gameSettings;
        uploadResult({
          gameId: state.gameSettings.gameId,
          arrData: state.result.arrData,
          result: state.result,
          gameSettings: {
            operator,
            maxQuestions,
            level,
            timePerQues,
            maxTimePerQuestion,
          },
        });
      }
    }
  }, [state.result]);

  useEffect(() => {
    if (!name) return;

    dispatch({
      type: "SET_GAME_SETTINGS",
      payload: {
        gameId: id,
        name: name,
      },
    });
  }, [id, name]);

  useEffect(() => {
    return () => {
      window.clearTimeout(lottieTimeout);
      window.clearInterval(gameTimeInterval);
      window.clearTimeout(quesTransitionTimeout);
    };
  }, []);

  return !state.runState.isStart ? (
    <SelectionScreen state={state} dispatch={dispatch} startGame={startGame} />
  ) : (
    <PlayScreen
      moveToNextQuestion={moveToNextQuestion}
      setQuestionsSwiper={setQuestionsSwiper}
      resetGame={resetGame}
      state={state}
      dispatch={dispatch}
      playLottie={playLottie}
      inputRef={inputRef}
      currInput={currInput}
      setCurrInput={setCurrInput}
    />
  );
}
