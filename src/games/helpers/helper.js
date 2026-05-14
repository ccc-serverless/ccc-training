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
