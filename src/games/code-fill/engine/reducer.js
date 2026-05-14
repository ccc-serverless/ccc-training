import { updateObjectWithMatch, updateMultipleWithMatch } from "utils/helper";
import { _Default } from "./constants.js";
import questions from "./_questions.json";

export const _InitialState = {
  gameState: {
    isStart: false,
    isEnd: false,
  },
  runData: {
    totalTimeElapsed: 0,
    timeUptoLastQuestion: 0,
    activeQuestion: 0,
    currInput: "",
    questions,
  },
  screen: {
    questionsSwiper: null,
    isOpenModalResult: false,
    lottie: {
      isActive: false,
      isCorrect: false,
      data: null,
    },
    inTransition: false,
    transitionSpeed: 1000,
  },
  gameSettings: {
    operator: null,
    maxQuestions: _Default.maxQuestions,
    level: _Default.level,
    timePerQues: _Default.timePerQues,
    maxTimePerQuestion: _Default.timePerQues,
  },
};

export function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "UPDATE_GAME_STATE":
      return { ...state, gameState: updateObjectWithMatch(state.gameState, payload) };
    case "UPDATE_RUN_DATA":
      return { ...state, runData: updateObjectWithMatch(state.runData, payload) };
    case "INC_GAME_TIMER":
      return {
        ...state,
        runData: {
          ...state.runData,
          totalTimeElapsed: state.runData.totalTimeElapsed + payload.inc,
        },
      };
    case "INC_QUES_COUNTER":
      return {
        ...state,
        runData: {
          ...state.runData,
          activeQuestion: state.runData.activeQuestion + 1,
        },
      };
    case "UPDATE_SCREEN_STATE":
      return { ...state, screen: updateObjectWithMatch(state.screen, payload) };
    case "UPDATE_CURRENT_INPUT":
      return {
        ...state,
        runData: {
          ...state.runData,
          currInput: updateObjectWithMatch(state.runData.currInput, payload),
        },
      };
    case "COMBINED":
      return { ...state, ...updateMultipleWithMatch({ ...state }, payload) };
    default:
      return state;
  }
}
