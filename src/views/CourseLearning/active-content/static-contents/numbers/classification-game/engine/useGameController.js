import { useEffect } from "react";

import { useMarkItemCompleted } from "views/CourseLearning/active-content/engine/useMarkItemCompleted";
import questions from "./questions.json";

let gameTimerInterval = null;

export default function useGameController({ state, dispatch }) {
  const { runData } = state;
  const { upload } = useMarkItemCompleted();

  function getQuestions() {
    dispatch({ type: "UPDATE_SCREEN_STATE", payload: { isLoading: true } });

    function generateStartingQuestions() {
      let arrQuestions = [];
      questions.forEach((item, index) => {
        if (index < state.gameSettings.startingQuesCount)
          arrQuestions.push(questions[index]);
      });

      return arrQuestions;
    }

    /* Api Call goes here for fetching and setting questions */
    const questionsAsked = generateStartingQuestions();
    const sliced = questions.slice(
      state.gameSettings.startingQuesCount,
      questions.length
    );

    dispatch({
      type: "UPDATE_RUN_DATA",
      payload: {
        questionsAll: questions,
        questionsAsked: questionsAsked,
        questionsRem: sliced,
      },
    });

    dispatch({ type: "UPDATE_SCREEN_STATE", payload: { isLoading: false } });
  }

  function resumeGameTimer() {
    const interval = 10;
    gameTimerInterval = window.setInterval(() => {
      dispatch({ type: "INC_GAME_TIMER", payload: { inc: interval } });
    }, interval);
  }

  function pauseGameTimer() {
    window.clearInterval(gameTimerInterval);
  }

  function startGame() {
    dispatch({ type: "UPDATE_GAME_STATE", payload: { isStart: true } });
    getQuestions();
    resumeGameTimer();
  }

  function loadNextQuestion() {
    if (runData.questionsRem.length) {
      const currQuesAskedState = [...runData.questionsAsked];
      const currQuesRemState = [...runData.questionsRem];

      currQuesAskedState.shift();
      currQuesAskedState.push(currQuesRemState[0]);
      currQuesRemState.shift();

      dispatch({
        type: "UPDATE_RUN_DATA",
        payload: {
          questionsAsked: currQuesAskedState,
          questionsRem: currQuesRemState,
        },
      });
    } else {
      if (runData.questionsAsked.length) {
        const currQuesAskedState = [...runData.questionsAsked];
        if (currQuesAskedState.length === 1) {
          handleEndGame();
        }
        currQuesAskedState.shift();
        dispatch({
          type: "UPDATE_RUN_DATA",
          payload: {
            questionsAsked: currQuesAskedState,
          },
        });
      }
    }
  }

  function handleEndGame() {
    pauseGameTimer();
    upload();
    dispatch({ type: "UPDATE_GAME_STATE", payload: { isEnd: true } });
  }

  function resetGame() {
    dispatch({
      type: "COMBINED",
      payload: {
        gameState: {
          isEnd: false,
        },
        runData: {
          totTimeElapsed: 0,
        },
      },
    });
    startGame();
  }

  function calculateResult() {
    let elapsedTime = runData.totTimeElapsed / 1000;
    let totalQues = runData.questionsAll.length;
    let avgSpeed = totalQues / elapsedTime;
  }

  function handleCorrectAnswer() {
    loadNextQuestion();
  }

  useEffect(() => {
    startGame();
  }, []);

  return { handleCorrectAnswer, resetGame };
}
