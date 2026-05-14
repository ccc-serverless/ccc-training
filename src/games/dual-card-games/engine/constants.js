import style from "../GameScreen.module.scss";

export const _GradientBg = {
  python: {
    neutral: "linear-gradient(45deg, #9860f7, #2f607d)",
    correct: "linear-gradient(45deg, #3d6d31, #1ed472)",
    incorrect: "linear-gradient(45deg, #f35325, #f3ad25)",
  },
};

export const background = {
  quiz: style.pythonQuizBackground,
  correct: style.backgroundCorrect,
  incorrect: style.backgroundIncorrect,
};
