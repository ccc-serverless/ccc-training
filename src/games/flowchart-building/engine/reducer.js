import { updateObjectWithMatch, updateMultipleWithMatch } from "utils/helper";

export const _InitialState = {
  gameSettings: { gameName: "", gameId: "" },
  screenState: {
    reactFlowInstance: null,
    isTouchDevice: false,
    toast: { isActive: false, isCorrect: false },
    isLoading: false,
    isOpenResultModal: false,
    isFullScreen: false,
  },
  runState: {
    sidebarNodes: [],
    currFlowchart: [],
    totTimeElapsed: 0,
    questions: { all: [], asked: [] },
    result: null,
  },
  gameState: {
    isStart: false,
    isEnd: false,
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
    case "UPDATE_RUN_STATE":
      return {
        ...state,
        runState: updateObjectWithMatch(state.runState, payload),
      };
    case "UPDATE_CURR_FLOWCHART":
      return {
        ...state,
        runState: {
          ...state.runState,
          currFlowchart: payload.currFlowchart,
        },
      };
    case "UPDATE_CURR_RESPONSE":
      const toUpdateState = JSON.parse(JSON.stringify(state));
      const questionsAsked = [...toUpdateState.runState.questions.asked];
      const currQues = questionsAsked[questionsAsked.length - 1];
      currQues.responses.push(payload.resp);

      return {
        ...state,
        runState: {
          ...state.runState,
          questions: { ...state.runState.questions, asked: questionsAsked },
        },
      };
    case "INC_GAME_TIMER":
      return {
        ...state,
        runState: {
          ...state.runState,
          totTimeElapsed: state.runState.totTimeElapsed + payload.inc,
        },
      };
    case "SET_IS_FULLSCREEN":
      return {
        ...state,
        screenState: { ...state.screenState, isFullscreen: payload.isFullscreen },
      };
    case "COMBINED":
      return { ...state, ...updateMultipleWithMatch({ ...state }, payload) };
    case "RESET_GAME":
      return _InitialState;
    default:
      return state;
  }
}
