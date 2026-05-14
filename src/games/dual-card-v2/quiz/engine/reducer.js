import { updateMultipleWithMatch, updateObjectWithMatch } from "utils/helper";
const cloneDeep = require("lodash.clonedeep");

export const _InitialState = {
  gameSettings: {
    gameName: "",
    gameId: "",
    fetchTags: null,
    fetchQuestions: null,
    postResult: null,
  },
  gameState: {
    isStart: false,
    isEnd: false,
  },
  runData: {
    topics: [],
    questionsAll: [],
    questionsAsked: [],
    questionIndex: 0,
    currAnswer: "",
    quesSwiper: null,
    totTimeElapsed: 0,
    result: null,
  },
  screenState: {
    showSubmitButton: true,
    showSolutionButton: true,
    showCorrect: false,
    showIncorrect: false,
    showSolution: false,
    isOpenResultModal: false,
    swiperTransitionTime: 1200,
    lottieTransitionTime: 1500,
    lottie: {
      isActive: false,
      isCorrect: false,
      data: null,
    },
  },
  tags: {},
};

export function reducer(state, action) {
  const { type, payload } = action;

  let toUpdate = cloneDeep(state);
  let currQuestion = toUpdate.runData.questionsAsked[toUpdate.runData.questionIndex];

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
    case "INC_GAME_TIMER":
      return {
        ...state,
        runData: {
          ...state.runData,
          totTimeElapsed: state.runData.totTimeElapsed + payload.inc,
        },
      };
    case "SET_HINT_TAKEN":
      currQuestion.hintTaken = true;
      return toUpdate;
    case "UPDATE_CURR_RESPONSE":
      currQuestion.response = toUpdate.runData.currAnswer;
      return toUpdate;
    case "SET_RESULT":
      return { ...state, result: updateObjectWithMatch(state.result, payload) };
    case "ADD_TAGS":
      payload.forEach((tag) => {
        toUpdate.tags[tag._id] = tag.name;
      });
      return toUpdate;
    case "RESET_GAME":
      return { ..._InitialState, gameSettings: { ...state.gameSettings } };
    case "COMBINED":
      return { ...state, ...updateMultipleWithMatch({ ...state }, payload) };
    default:
      return state;
  }
}
