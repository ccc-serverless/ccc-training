import { updateObjectWithMatch, updateMultipleWithMatch } from "utils/helper";
import { background } from "./constants";

export const _InitialState = {
  gameSettings: {
    name: "",
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
    currAnswer: {
      textInput: null,
      radioInput: null,
    },
    totTimeElapsed: 0,
  },
  screenState: {
    screenBackground: background.quiz,
    showNextButton: false,
    showSubmitButton: true,
    showSolutionButton: true,
    showCorrect: false,
    showIncorrect: false,
    showHint: false,
    isOpenResultModal: false,
    isLoading: false,
  },
  result: {},
};

export function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "SET_GAME_NAME":
      const toUpdate = JSON.parse(JSON.stringify(state));
      toUpdate.gameSettings.name = payload.name;
      return toUpdate;

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
    case "RESET_GAME":
      return {
        ..._InitialState,
        gameSettings: { ..._InitialState.gameSettings, name: state.gameSettings.name },
      };
    default:
      return state;
  }
}
