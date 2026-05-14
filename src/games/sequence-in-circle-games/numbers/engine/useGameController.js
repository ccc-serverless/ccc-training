import { useEffect } from "react";

import { _InitialValue } from "./reducer";
import { STYLE_CIRCLE_WHITE } from "./constants";
import { getRandomNumber } from "utils/helper";
import {
  genAllNumbers,
  genCircleData,
  calculateResult,
  getNumberOfCircles,
  getRange,
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

  function initialiseCircleData(currNumberPool) {
    const { circleData } = { ...state.runData };

    return circleData.map((item) => {
      let circleDatum = { ...item };
      let randomIndex = getRandomNumber(0, currNumberPool.length);
      circleDatum.value = currNumberPool[randomIndex];
      circleDatum.style = STYLE_CIRCLE_WHITE;
      currNumberPool.splice(randomIndex, 1);

      return circleDatum;
    });
  }

  function handleGameStart() {
    let allNumbers = genAllNumbers(state);
    let currNumberPool = allNumbers.slice(0, state.gameSettings.noOfCircles);

    /* Divide the entire number pool in groups of %{number of circles} */
    let numberPool = [];
    let arr = [];
    allNumbers.forEach((item, index) => {
      arr.push(item);
      if ((index + 1) % state.gameSettings.noOfCircles === 0 || index === allNumbers.length - 1) {
        numberPool.push(arr);
        arr = [];
      }
    });

    startTimers();
    dispatch({
      type: "COMBINED",
      payload: {
        runData: {
          allNumbers: allNumbers,
          numberPool: [...numberPool],
          circleData: initialiseCircleData(currNumberPool),
          currAns: allNumbers[0],
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

  function getSliderCaption(name) {
    switch (name) {
      case "Increasing Numbers":
        return "Play Until";
      case "Decreasing Numbers":
        return "Play From";
      default:
        return "";
    }
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
          name: state.gameSettings.name,
          sliderCaption: getSliderCaption(state.gameSettings.name),
          level,
          noOfCircles,
          range: getRange(level),
          lastNumber: getRange(level).min,
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
    if (state.runData.currTurn > state.runData.allNumbers.length) {
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
