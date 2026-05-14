import { updateObjectWithMatch, updateMultipleWithMatch } from "utils/helper";

export const _InitialState = {
  gameSettings: {
    gameName: "",
    gameId: "",
  },
  gameState: {
    isStart: false,
    isEnd: false,
  },
  runData: {
    questionsAll: [],
    questionsAsked: [],
    questionsRem: [],
    currResponses: [],
    allResponses: [],
    totTimeElapsed: 0,
    result: null,
  },
  screenState: {
    isOpenResultModal: true,
    lottie: {
      isActive: false,
      isCorrect: false,
      data: null,
    },
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
    case "UPDATE_CURR_RESPONSE":
      let toUpdateState = JSON.parse(JSON.stringify(state));
      const foundIndex = toUpdateState.runData.currResponses.findIndex(
        (f) => f.value === payload.resp.value
      );
      if (foundIndex !== -1) toUpdateState.runData.currResponses.splice(foundIndex, 1);
      else toUpdateState.runData.currResponses.push(payload.resp);

      return toUpdateState;
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
      return _InitialState;
    default:
      return state;
  }
}
