import { updateMultipleWithMatch, updateObjectWithMatch } from "utils/helper";
const cloneDeep = require("lodash.clonedeep");

export const _InitialState = {
  gameSettings: {
    gameName: "",
    gameId: "",
    fetchTopics: null,
    fetchQuestions: null,
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
    showSolutionButton: true,
    showSolution: false,
    showCorrect: false,
    showIncorrect: false,
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
      return { ...state, gameSettings: updateObjectWithMatch(state.gameState, payload) };
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
        runData: updateObjectWithMatch({ ...state.runData }, payload),
      };

    case "INC_GAME_TIMER":
      return {
        ...state,
        runData: {
          ...state.runData,
          totTimeElapsed: state.runData.totTimeElapsed + payload.inc,
        },
      };

    case "UPDATE_CURR_RESPONSE":
      currQuestion.response = payload.resp;
      return toUpdate;

    case "SET_HINT_TAKEN":
      currQuestion.hintTaken = true;
      return toUpdate;

    case "SET_RESULT":
      return { ...state, result: updateObjectWithMatch(state.result, payload) };

    case "ADD_TAGS":
      payload.forEach((tag) => {
        toUpdate.tags[tag._id] = tag.name;
      });
      return toUpdate;

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
