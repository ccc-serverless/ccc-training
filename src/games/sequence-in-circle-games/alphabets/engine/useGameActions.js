import { getRandomNumber } from "utils/helper";

export default function useGameActions({ state, dispatch }) {
  function handleClickCircle(circle) {
    const { index, value } = circle;
    const { gameState, runData, gameSettings } = state;

    let uRunData = { ...runData };

    const { currTurn, letterPools } = uRunData;
    const { noOfCircles, maxTimePerQues } = state.gameSettings;

    if (!gameState.isStart) return; // Game Not started yet

    /* Incorrect Click */
    if (value !== runData.currAns) {
      uRunData.result.push({
        turn: currTurn,
        letter: uRunData.currAns,
        time: uRunData.quesTimeElapsed,
        timeUnit: "ms",
        isCorrect: false,
      });
      return;
    }

    /* Correct Click */
    if (uRunData.quesTimeElapsed > maxTimePerQues * 1000) {
      uRunData.result.push({
        turn: currTurn,
        letter: uRunData.currAns,
        isCorrect: false,
        time: uRunData.quesTimeElapsed,
        timeUnit: "ms",
      });
    } else {
      uRunData.result.push({
        turn: currTurn,
        letter: uRunData.currAns,
        isCorrect: true,
        time: uRunData.quesTimeElapsed,
        timeUnit: "ms",
      });
    }

    /* Find group from which to get next random number */
    let rem = currTurn % noOfCircles;
    const poolIndex = rem ? parseInt(currTurn / noOfCircles) + 1 : currTurn / noOfCircles;
    let style = { color: "white" };

    /* Get random number ,update circle data and remove that number from the pool */
    if (letterPools[poolIndex]) {
      let randIndex = getRandomNumber(0, letterPools[poolIndex].length);
      uRunData.circleData[index].value = letterPools[poolIndex][randIndex];
      uRunData.letterPools[poolIndex].splice(randIndex, 1);
    } else {
      style.visibility = "hidden";
    }

    /* Update the next current answer*/
    uRunData.currAns = uRunData.allLetters[uRunData.currTurn];

    /* Set showNudge to decide which circle to show the nudge pulse animation */
    uRunData.circleData = uRunData.circleData.map((item) => ({
      ...item,
      showNudge: false,
    }));
    if (uRunData.currTurn % gameSettings.noOfCircles === 0) {
      uRunData.circleData.forEach((item) => {
        if (item.value === uRunData.currAns) item.showNudge = true;
      });
    }

    /* Increase current turn by 1*/
    uRunData.currTurn = uRunData.currTurn + 1;

    /* Update circle style */
    let newCount = uRunData.circleData[index].count + 1;
    uRunData.circleData[index].count = newCount;

    if (newCount % 2 === 0) {
      style.background = "#f08a5d";
    } else {
      style.background = "#b83b5e";
    }

    if (!uRunData.circleData[index].value) style.visibility = "hidden";
    uRunData.circleData[index].style = style;

    /* Reset quesTimer */
    uRunData.quesTimeElapsed = 0;

    dispatch({
      type: "UPDATE_RUN_DATA",
      payload: uRunData,
    });
  }

  return { handleClickCircle };
}
