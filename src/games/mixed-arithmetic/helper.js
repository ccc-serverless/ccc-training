import { getRandomNumber } from "utils/helper";

import plus from "assets/images/games/arithmetic/add.png";
import minus from "assets/images/games/arithmetic/minus.png";
import divide from "assets/images/games/arithmetic/divide.png";
import multiply from "assets/images/games/arithmetic/multiply.png";

export const _MinMaxByLevel = {
  Addition: [
    [1, 10],
    [11, 99],
    [100, 999],
  ],
  Subtraction: [
    [1, 10],
    [11, 99],
    [100, 999],
  ],
  Multiplication: [
    [1, 10],
    [11, 20],
    [21, 100],
  ],
  Division: [
    [1, 10],
    [11, 20],
    [21, 100],
  ],
};

export const _Default = {
  maxQuestions: 10,
  timePerQues: 10,
  level: 1,
};

// Functions -----------------------------------------------------------------------------

function genereateRandomNumberByLevel(operator, level, optional) {
  let minimum, maximum;
  minimum = _MinMaxByLevel[operator][level - 1][0];
  maximum = _MinMaxByLevel[operator][level - 1][1];

  if (optional) {
    if (optional.min) minimum = optional.min;
    if (optional.max) maximum = optional.max;
  }

  return getRandomNumber(minimum, maximum);
}

export function generateQuestion({ operator, level }) {
  let num1, num2, ans;
  switch (operator) {
    case "Addition":
      num1 = genereateRandomNumberByLevel(operator, level);
      num2 = genereateRandomNumberByLevel(operator, level);
      ans = num1 + num2;
      return { num1, num2, ans, resp: null };

    case "Subtraction":
      num1 = genereateRandomNumberByLevel(operator, level);
      num2 = genereateRandomNumberByLevel(operator, level, { max: num1 });
      ans = num1 - num2;
      return { num1, num2, ans, resp: null };

    case "Multiplication":
      num1 = genereateRandomNumberByLevel(operator, level);
      num2 = genereateRandomNumberByLevel(operator, level);
      ans = num1 * num2;
      return { num1, num2, ans, resp: null };

    case "Division":
      num1 = genereateRandomNumberByLevel(operator, level);

      let k = 1;
      let multiple = k * num1;
      let multiples = [multiple];

      while (multiple <= num1 * 10) {
        k++;
        multiple = k * num1;
        multiples.push(multiple);
      }

      let randomIndex = getRandomNumber(1, multiples.length - 1);
      num2 = multiples[randomIndex];

      ans = num2 / num1;
      return { num1: num2, num2: num1, ans, resp: null };

    default:
      return {};
  }
}

export function getImageForOperator(operator) {
  switch (operator) {
    case "Addition":
      return plus;
    case "Subtraction":
      return minus;
    case "Division":
      return divide;
    case "Multiplication":
      return multiply;
    default:
      return null;
  }
}

export function getOperatorToDisplay(operator) {
  switch (operator) {
    case "Addition":
      return "+";
    case "Subtraction":
      return "-";
    case "Division":
      return "÷";
    case "Multiplication":
      return "x";
    default:
      return null;
  }
}

export function calculateResult(questions, time) {
  let totalCorrect = questions.reduce((accum, curr) => {
    return parseInt(curr.ans) === parseInt(curr.resp) ? accum + 1 : accum;
  }, 0);

  let accuracy = totalCorrect / questions.length;
  accuracy = parseFloat(100 * accuracy);
  accuracy = parseFloat(accuracy.toFixed(2));

  let totalSeconds = time / 1000;
  let speed = totalSeconds / questions.length;
  speed = parseFloat(speed.toFixed(2));

  return { accuracy, speed };
}
