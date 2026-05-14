import { useEffect } from "react";
import { getNumberOfCircles } from "./helperFunctions";

export default function useGameSettings({ state, dispatch }) {
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
        },
        runData: {
          circleData: genCircleData(noOfCircles),
        },
      },
    });
  }

  function handleClickOrder(order) {
    dispatch({
      type: "UPDATE_GAME_SETTINGS",
      payload: {
        order: order,
      },
    });
  }

  function handleClickSplitType(splitType) {
    dispatch({
      type: "UPDATE_GAME_SETTINGS",
      payload: {
        splitType: splitType,
      },
    });
  }

  useEffect(() => {
    handleClickLevel(1);
  }, []);

  return { handleClickLevel, handleClickOrder, handleClickSplitType };
}
