import React, { useState, useEffect } from "react";

import { getImageForOperator } from "./helper";
import { useWindowResize } from "beautiful-react-hooks";

import OperatorSelectionMobile from "./OperatorSelectionMobile";
import OperatorSelectionDesktop from "./OperatorSelectionDesktop";

const _ArrLevels = [1, 2, 3];
const _ArrMaxQuestions = [10, 15, 25];
const _ArrOperators = [
  ["Addition", "Subtraction"],
  ["Multiplication", "Division"],
];

export default function OperatorSelection({ state, dispatch, startGame }) {
  const [screen, setScreen] = useState({ operator: true, difficulty: false });
  const [screenWidth, setScreenWidth] = useState(null);

  function handleSelectOperator(operator) {
    setScreen({
      operator: false,
      difficulty: true,
    });
    dispatch({ type: "SET_GAME_SETTINGS", payload: { operator: operator } });
  }

  function handleDeselectOperator(e) {
    e.stopPropagation();
    setScreen({
      operator: true,
      difficulty: false,
    });
  }

  function handleClickDiffBox(type, value) {
    let payload = {};
    switch (type) {
      case "level":
        payload = { level: value };
        break;
      case "questions":
        payload = { maxQuestions: value };
        break;
      default:
        payload = {};
        break;
    }
    dispatch({ type: "SET_GAME_SETTINGS", payload });
  }
  function checkForMaxWidth() {
    const width = window.innerWidth;
    setScreenWidth(width);
  }

  useWindowResize(() => {
    checkForMaxWidth();
  });

  useEffect(() => {
    checkForMaxWidth();
  }, []);

  return (
    <>
      {screenWidth <= 1000 ? (
        <OperatorSelectionMobile
          operatorsArr={_ArrOperators}
          maxQuesArr={_ArrMaxQuestions}
          levelsArr={_ArrLevels}
          screen={screen}
          state={state}
          startGame={startGame}
          handleSelectOperator={handleSelectOperator}
          handleDeselectOperator={handleDeselectOperator}
          handleClickDiffBox={handleClickDiffBox}
          getImageForOperator={getImageForOperator}
        />
      ) : (
        <OperatorSelectionDesktop
          operatorsArr={_ArrOperators}
          maxQuesArr={_ArrMaxQuestions}
          levelsArr={_ArrLevels}
          screen={screen}
          state={state}
          startGame={startGame}
          handleSelectOperator={handleSelectOperator}
          handleDeselectOperator={handleDeselectOperator}
          handleClickDiffBox={handleClickDiffBox}
          getImageForOperator={getImageForOperator}
        />
      )}
    </>
  );
}
