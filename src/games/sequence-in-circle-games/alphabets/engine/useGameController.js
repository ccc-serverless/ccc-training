import { useEffect } from "react";

import { _InitialValue } from "./reducer";
import { STYLE_CIRCLE_WHITE } from "./constants";
import { getRandomNumber } from "utils/helper";
import {
  getAllLetters,
  genCircleData,
  calculateResult,
  getNumberOfCircles,
  isLanguageSplit,
} from "./helperFunctions";

let gameTimeInterval = null;
let quesTimeInterval = null;

export default function useGameController({ state, dispatch }) {
  function startTimers() {
    gameTimeInterval = window.setInterval(() => {
      const int = 10;
      dispatch({ type: "INC_GAME_TIMER", payload: { inc: int } });
    }, 10);

    quesTimeInterval = window.setInterval(() => {
      const int = 10;
      dispatch({ type: "INC_QUES_TIMER", payload: { inc: int } });
    }, 10);
  }

  function stopTimerIntervals() {
    window.clearInterval(gameTimeInterval);
    window.clearInterval(quesTimeInterval);
  }

  function initialiseCircleData(currLetterPool) {
    const { circleData } = { ...state.runData };

    return circleData.map((item) => {
      let circleDatum = { ...item };
      let randomIndex = getRandomNumber(0, currLetterPool.length);
      circleDatum.value = currLetterPool[randomIndex];
      circleDatum.style = STYLE_CIRCLE_WHITE;

      currLetterPool.splice(randomIndex, 1);

      return circleDatum;
    });
  }

  function handleGameStart() {
    let allLetters = getAllLetters(state);

    /* Check whether there is consonants/vowels split*/
    let currLetterPool = allLetters.slice(0, state.gameSettings.noOfCircles);

    /* Divide the entire number pool in groups of %{number of circles} */
    let letterPools = [];
    let arr = [];
    allLetters.forEach((item, index) => {
      arr.push(item);
      if ((index + 1) % state.gameSettings.noOfCircles === 0 || index === allLetters.length - 1) {
        letterPools.push(arr);
        arr = [];
      }
    });

    startTimers();
    dispatch({
      type: "COMBINED",
      payload: {
        runData: {
          allLetters,
          letterPools,
          circleData: initialiseCircleData(currLetterPool),
          currAns: allLetters[0],
        },
        gameState: {
          isStart: true,
        },
      },
    });
  }

  function handleGameEnd() {
    stopTimerIntervals();
    let resultStats = calculateResult(state);

    dispatch({
      type: "COMBINED",
      payload: {
        gameState: { isEnd: true },
        screenState: { isOpenResultModal: true },
        runData: { resultStats },
      },
    });
  }

  function handleGameReset() {
    const level = state.gameSettings.level;
    const noOfCircles = getNumberOfCircles(level);

    stopTimerIntervals();

    dispatch({
      type: "COMBINED",
      payload: {
        gameSettings: {
          ..._InitialValue.gameSettings,
          level,
          noOfCircles,
          name: state.gameSettings.name,
          isSplit: isLanguageSplit(state.gameSettings.name),
          splitType: isLanguageSplit(state.gameSettings.name) ? "vowels" : "all",
        },
        runData: {
          ..._InitialValue.runData,
          circleData: genCircleData(noOfCircles),
          result: [],
          resultStats: null,
        },
        gameState: { ..._InitialValue.gameState },
        screenState: { ..._InitialValue.screenState },
      },
    });
  }

  function checkGameEnd() {
    if (state.runData.currTurn > state.runData.allLetters.length) {
      handleGameEnd();
    }
  }

  useEffect(() => {
    if (state.runData.currTurn > 1) checkGameEnd();
  }, [state.runData.currTurn]);

  useEffect(() => {
    if (state.gameSettings.name) handleGameReset();
  }, [state.gameSettings.name]);

  return { handleGameStart, handleGameReset };
}
