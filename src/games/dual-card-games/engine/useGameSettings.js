import questions from "./questions.json";

export default function useGameSettings({ state, dispatch }) {
  function handleGetQuestions() {
    dispatch({
      type: "UPDATE_RUN_DATA",
      questionsAll: questions,
      questionsRem: questions,
      questionsAsked: [],
    });
  }

  return { handleGetQuestions };
}
