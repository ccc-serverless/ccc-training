import { useEffect } from "react";
import { getNumberOfCircles, getRange } from "./helperFunctions";

export default function useGameSettings({ state, dispatch }) {
  function handleChangeLastNumber(value) {
    dispatch({
      type: "SET_GAME_SETTINGS",
      payload: {
        lastNumber: value,
      },
    });
  }

  function handleChangeMaxTimePerQues(value) {
    dispatch({
      type: "SET_GAME_SETTINGS",
      payload: {
        maxTimePerQues: value,
      },
    });
  }

  function genCircleData(count) {
    let arrCircle = [];
    for (let i = 0; i < count; i++) {
      arrCircle.push({
        value: "?",
        count: 0,
        style: {
          background: "#6a2c70",
          color: "white",
          border: "1px solid purple",
        },
      });
    }
    return arrCircle;
  }

  function handleClickLevel(level) {
    const noOfCircles = getNumberOfCircles(level);
    dispatch({
      type: "COMBINED",
      payload: {
        gameSettings: {
          level,
          noOfCircles,
          range: getRange(level),
          lastNumber: getRange(level).min,
        },
        runData: {
          circleData: genCircleData(noOfCircles),
        },
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

  useEffect(() => {
    dispatch({
      type: "SET_GAME_SETTINGS",
      payload: { sliderCaption: getSliderCaption(state.gameSettings.name) },
    });
  }, [state.gameSettings.name]);

  useEffect(() => {
    handleClickLevel(1);
  }, []);

  return { handleChangeLastNumber, handleChangeMaxTimePerQues, handleClickLevel };
}
