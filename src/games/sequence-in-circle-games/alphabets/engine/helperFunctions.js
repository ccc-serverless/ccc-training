/* Generate the numbers depending on which game is being played*/
import { ALPHABETS } from "./alphabets";

export function isLanguageSplit(name) {
  let alphaObject = { ...ALPHABETS[extractLanguageFromName(name)] };
  return alphaObject.hasOwnProperty("vowels");
}

export function getAllLetters(state) {
  let alphaObject = { ...ALPHABETS[extractLanguageFromName(state.gameSettings.name)] };
  let selectedLetters = [];

  const { order, splitType } = state.gameSettings;

  // console.log(alphaObject);
  selectedLetters = [...alphaObject[splitType]];
  if (order === "dec") selectedLetters.reverse();

  return selectedLetters;
}

/* Circle data before the game */
export function genCircleData(count) {
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

/* Number of circles to be played for given level */
export function getNumberOfCircles(level) {
  switch (level) {
    case 1:
      return 4;
    case 2:
      return 10;
    default:
      return 4;
  }
}

/* Calculate resultStats from given result state */
export function calculateResult(state) {
  let totalSeconds = state.runData.totTimeElapsed / 1000;
  let finalAvgTime = totalSeconds / state.runData.allLetters.length;

  let totalRight = state.runData.result.reduce(
    (accum, curr) => (curr.isCorrect ? accum + 1 : accum),
    0
  );

  let finalAccuracy = 100 * (totalRight / state.runData.result.length);

  return {
    speed: parseFloat(finalAvgTime.toFixed(2)),
    accuracy: parseFloat(Math.round(finalAccuracy)),
  };
}

export function extractLanguageFromName(name) {
  return name.split(" ")[0].toLowerCase();
}
