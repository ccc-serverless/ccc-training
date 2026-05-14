/* Generate the numbers depending on which game is being played*/
export function genAllNumbers(state) {
  const { lastNumber, name } = state.gameSettings;

  if (name === "Increasing Numbers") {
    return Array.from({ length: state.gameSettings.lastNumber }, (_, i) => i + 1);
  } else if (name === "Decreasing Numbers") {
    let start = lastNumber + 1;
    let numberPool = [];
    while (start-- > 1) {
      numberPool.push(start);
    }
    return numberPool;
  } else if (name === "Odd Numbers") {
    let start = lastNumber;
    let numberPool = [];
    let k = 1;
    while (k <= start) {
      numberPool.push(k);
      k += 2;
    }
    return numberPool;
  } else if (name === "Even Numbers") {
    let start = lastNumber;
    let numberPool = [];
    let k = 0;
    while (k <= start) {
      numberPool.push(k);
      k += 2;
    }

    return numberPool;
  }
}

/* Circle data before the game */
export function genCircleData(count) {
  let arrCircle = [];
  for (let i = 0; i < count; i++) {
    arrCircle.push({
      value: "?",
      count: 0,
      showNudge: false,
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

/* The minium value of 'lastNumber' playable depending on level */
export function getSliderCountMin(level) {
  switch (level) {
    case 1:
      return 10;
    case 2:
      return 20;
    default:
      return 10;
  }
}

/* Get range of numbers from which to select 'lastNumber' depending on level*/
export function getRange(level) {
  switch (level) {
    case 1:
      return { min: 10, max: 50 };
    case 2:
      return { min: 20, max: 50 };
    default:
      return { min: 10, max: 50 };
  }
}

/* Calculate resultStats from given result state */
export function calculateResult(state) {
  let totalSeconds = state.runData.totTimeElapsed / 1000;
  let finalAvgTime = totalSeconds / state.runData.allNumbers.length;

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
