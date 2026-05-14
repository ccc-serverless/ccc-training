import { updateObjectWithMatch, updateMultipleWithMatch } from "utils/helper";
import { _GradientBg, background } from "./constants";

export const _InitialState = {
  gameSettings: {
    name: "",
    startingQuesCount: 5,
  },
  gameState: {
    isStart: false,
    isEnd: false,
  },
  runData: {
    questionsAll: [],
    questionsAsked: [],
    questionsRem: [],
    resultPerTurn: [],
    totTimeElapsed: 0,
  },
  screenState: {
    // cardBackground: _GradientBg.python.neutral,
    // screenBackground: background.quiz,
    isOpenResultModal: false,
    isLoading: false,
  },
  dustbinState: {
    hasDropped: false,
    hasDroppedOnChild: false,
  },
  result: {},
};

export function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "SET_DUSTBIN_STATE":
      return {
        ...state,
        dustbinState: updateObjectWithMatch(state.dustbinState, payload),
      };
    case "SET_GAME_NAME":
      return {
        ...state,
        gameSettings: {
          name: payload.name,
        },
      };
    case "UPDATE_SCREEN_STATE":
      return {
        ...state,
        screenState: updateObjectWithMatch(state.screenState, payload),
      };
    case "UPDATE_GAME_STATE":
      return {
        ...state,
        gameState: updateObjectWithMatch(state.gameState, payload),
      };
    case "UPDATE_RUN_DATA":

      return {
        ...state,
        runData: updateObjectWithMatch(state.runData, payload),
      };
    case "INC_GAME_TIMER":
      return {
        ...state,
        runData: {
          ...state.runData,
          totTimeElapsed: state.runData.totTimeElapsed + payload.inc,
        },
      };
    case "UPDATE_CURRENT_INPUT":
      return {
        ...state,
        runData: {
          ...state.runData,
          currAnswer: updateObjectWithMatch(state.runData.currAnswer, payload),
        },
      };
    case "UPDATE_RESPONSES":
      /* To deep copy the state so that state does not mutate and responses are not added twice*/
      let toUpdateState = JSON.parse(JSON.stringify(state));

      toUpdateState.runData.questionsAsked[
        toUpdateState.runData.questionsAsked.length - 1
      ].responses.push(payload.response);

      return {
        ...toUpdateState,
      };
    case "UPDATE_RESULT":
      return { ...state, result: updateObjectWithMatch(state.result, payload) };
    case "COMBINED":
      return { ...state, ...updateMultipleWithMatch({ ...state }, payload) };
    default:
      return state;
  }
}
