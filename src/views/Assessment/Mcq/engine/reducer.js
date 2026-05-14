import { updateObjectWithMatch, updateMultipleWithMatch } from "utils/helper";
import cloneDeep from "lodash.clonedeep";

export const _InitialState = {
  gameSettings: {
    allocatedCourse: {},
    getQuestions: null,
    postResult: null,
    type: null,
  },
  gameState: {
    isStart: false,
    isEnd: false,
  },
  runData: {
    questionsAll: [],
    questionsAsked: [],
    activeQuestionNumber: 0,
    questionsRem: [],
    totTimeElapsed: 0,
    result: null,
    currResponse: "",
    unansweredQuestions: [],
  },
  screenState: {
    isOpenResultModal: false,
    isOpenSubmitConfirmation: false,
    isPassedTest: false,
  },
};

export function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "UPDATE_GAME_SETTINGS":
      return {
        ...state,
        gameSettings: updateObjectWithMatch(state.gameSettings, payload),
      };
    case "UPDATE_GAME_STATE":
      return {
        ...state,
        gameState: updateObjectWithMatch(state.gameState, payload),
      };
    case "SET_UNANSWERED_QUESTIONS":
      return {
        ...state,
        runData: { ...state.runData, unansweredQuestions: payload.unansweredQuestions },
      };
    case "UPDATE_SCREEN_STATE":
      return {
        ...state,
        screenState: updateObjectWithMatch(state.screenState, payload),
      };
    case "UPDATE_RUN_DATA":
      return {
        ...state,
        runData: updateObjectWithMatch(state.runData, payload),
      };
    case "UPDATE_CURR_INPUT":
      let toUpdate = cloneDeep(state);
      const quesAsked = toUpdate.runData.questionsAsked;
      const currQues = quesAsked[toUpdate.runData.activeQuestionNumber];
      currQues.responses.push(payload.resp);
      toUpdate.runData.currResponse = payload.resp;
      return toUpdate;
    case "SET_CURR_RESP":
      return { ...state, runData: { ...state.runData, currResponse: payload.resp } };

    case "NAV_QUES_NUMBER":
      return {
        ...state,
        runData: {
          ...state.runData,
          activeQuestionNumber: payload.quesNumber,
        },
      };
    case "NAV_QUES_NEXT":
      return {
        ...state,
        runData: {
          ...state.runData,
          activeQuestionNumber: state.runData.activeQuestionNumber + 1,
        },
      };
    case "NAV_QUES_PREV":
      return {
        ...state,
        runData: {
          ...state.runData,
          activeQuestionNumber: state.runData.activeQuestionNumber - 1,
        },
      };
    case "INC_GAME_TIMER":
      return {
        ...state,
        runData: {
          ...state.runData,
          totTimeElapsed: state.runData.totTimeElapsed + payload.inc,
        },
      };
    case "COMBINED":
      return { ...state, ...updateMultipleWithMatch({ ...state }, payload) };

    case "RESET_GAME":
      return {
        ...state,
        gameState: _InitialState.gameState,
        runData: _InitialState.runData,
        screenState: _InitialState.screenState,
      };
    default:
      return state;
  }
}
