import { updateObjectWithMatch, updateMultipleWithMatch } from "utils/helper";

export const _InitialValue = {
  gameSettings: {
    name: "",
    order: "inc",
    isSplit: false,
    splitType: "all",
    level: 1,
    noOfCircles: 4,
    maxTimePerQues: 6,
  },
  gameState: {
    isStart: false,
    isEnd: false,
    isPause: false,
  },
  runData: {
    letterPools: [],
    allLetters: [],
    circleData: [],
    result: [],
    resultStats: null,
    currTurn: 1,
    currAns: 1,
    totTimeElapsed: 0,
    quesTimeElapsed: 0,
  },
  screenState: {
    isOpenResultModal: false,
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
    case "INC_GAME_TIMER":
      return {
        ...state,
        runData: {
          ...state.runData,
          totTimeElapsed: state.runData.totTimeElapsed + payload.inc,
        },
      };
    case "INC_QUES_TIMER":
      return {
        ...state,
        runData: {
          ...state.runData,
          quesTimeElapsed: state.runData.quesTimeElapsed + payload.inc,
        },
      };
    case "UPDATE_RUN_DATA":
      return { ...state, runData: updateObjectWithMatch(state.runData, payload) };
    case "UPDATE_SCREE_STATE":
      return { ...state, screenState: updateObjectWithMatch(state.screenState, payload) };
    case "COMBINED":
      return { ...state, ...updateMultipleWithMatch({ ...state }, payload) };
    default:
      return state;
  }
}
