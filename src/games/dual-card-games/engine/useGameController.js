import { useEffect } from "react";
import { getRandomNumber } from "utils/helper";

import questions from "./questions.json";
import questionsOutputGuess from "./questionsOutputGuess.json";

import { _GradientBg, background } from "./constants";

let gameTimerInterval = null;

export default function useGameController({ state, dispatch }) {
  const { runData, gameSettings, screenState } = state;

  /* Timers */
  function resumeGameTimer() {
    const interval = 10;
    gameTimerInterval = window.setInterval(() => {
      dispatch({ type: "INC_GAME_TIMER", payload: { inc: interval } });
    }, interval);
  }

  function pauseGameTimer() {
    window.clearInterval(gameTimerInterval);
  }

  /* --------------------------------------- */

  /* Game start and end */
  function handleGameStart() {
    let ques = [];
    if (state.gameSettings.name === "Mcq") {
      ques = [...questions];
    } else {
      ques = [...questionsOutputGuess];
    }

    dispatch({
      type: "COMBINED",
      payload: {
        gameState: {
          isStart: true,
        },
        screenState: {
          isLoading: true,
        },
        runData: {
          questionsAll: ques.map((ques) => ({ ...ques, responses: [] })),
          questionsRem: ques.map((ques) => ({ ...ques, responses: [] })),
          questionsAsked: [],
        },
      },
    });
  }

  function handleEndGame() {
    calculateResult();
    window.setTimeout(() => {
      dispatch({
        type: "UPDATE_GAME_STATE",
        payload: {
          isEnd: true,
        },
      });
    }, 400);
  }

  function handleGameReset() {
    dispatch({ type: "RESET_GAME" });
  }

  function handleGamePlayAgain() {
    handleGameReset();
    handleGameStart();
  }

  /* ------------------------------------------ */

  function getRandomQuestionFromRem() {
    const randomIndex = getRandomNumber(0, runData.questionsRem.length);
    const randomQues = runData.questionsRem[randomIndex];

    let toUpdateQuesRem = [...runData.questionsRem];
    toUpdateQuesRem.splice(randomIndex, 1);

    let toUpdateQuesAsked = [...runData.questionsAsked];
    toUpdateQuesAsked.push(randomQues);

    return { questionsAsked: toUpdateQuesAsked, questionsRem: toUpdateQuesRem };
  }

  function moveToNextQuestion() {
    const { questionsAsked, questionsRem } = getRandomQuestionFromRem();
    clearRef();
    resumeGameTimer();

    dispatch({
      type: "COMBINED",
      payload: {
        runData: {
          questionsAsked: questionsAsked,
          questionsRem: questionsRem,
          currAnswer: {
            radioInput: null,
            textInput: null,
          },
        },
        screenState: {
          cardBackground: _GradientBg.python.neutral,
          screenBackground: background.quiz,
          showNextButton: false,
          showSubmitButton: true,
          showSolutionButton: true,
          showHint: false,
        },
      },
    });
  }

  function clearRef() {
    if (screenState.ref) {
      // screenState.ref.current.value = "";
    }
  }

  function verifyLastReponse() {
    const { name } = gameSettings;
    const currQues = runData.questionsAsked[runData.questionsAsked.length - 1];

    if (!currQues.responses.length) return null;
    if (!currQues.answer) return null;

    if (name === "Mcq") {
      let currResp = currQues.responses[currQues.responses.length - 1];
      if (!currResp) return null;
      if (!currQues.options) return null;

      if (currQues.options[currQues.answer] === currResp) return true;
      else return false;
    } else if (name === "Word Problems") {
      let currResp = currQues.responses[currQues.responses.length - 1];
      if (!currResp) return null;

      if (currQues.answer.toLowerCase() === currResp.toLowerCase()) return true;
      else return false;
    }
  }

  function handleLastResponse() {
    /* No questions yet*/
    if (runData.questionsAsked.length < 1) return;

    /* No responses to current ques yet */
    const currQues = runData.questionsAsked[runData.questionsAsked.length - 1];
    if (!currQues.responses.length) return;

    /*Check if last response was correct */
    let isCorrect = verifyLastReponse();
    if (isCorrect == null) return;

    if (isCorrect) {
      /*End of game iteration */
      if (!runData.questionsRem.length) handleEndGame();

      dispatch({
        type: "UPDATE_SCREEN_STATE",
        payload: {
          showNextButton: true,
          showIncorrect: false,
          showCorrect: true,
          showSolutionButton: false,
          showSubmitButton: false,
          screenBackground: background.correct,
        },
      });
      pauseGameTimer();
    } else {
      dispatch({
        type: "UPDATE_SCREEN_STATE",
        payload: {
          showNextButton: false,
          showIncorrect: true,
          showCorrect: false,
          cardBackground: _GradientBg.python.incorrect,
          screenBackground: background.incorrect,
        },
      });
    }
  }

  function calculateResult() {
    let questionsAsked = runData.questionsAsked;
    let totalTime = runData.totTimeElapsed / 1000;

    let totNoOfAttempts = questionsAsked.reduce((accum, curr) => {
      return accum + curr.responses.length;
    }, 0);

    let calcResult = {
      speed: totalTime / questionsAsked.length,
      accuracy: (questionsAsked.length / totNoOfAttempts) * 100,
    };

    calcResult.speed = parseFloat(calcResult.speed.toFixed(2));
    calcResult.accuracy = parseFloat(calcResult.accuracy.toFixed(2));

    dispatch({
      type: "UPDATE_RESULT",
      payload: calcResult,
    });
    handleOpenModalResult();
  }

  function handleOpenModalResult() {
    dispatch({
      type: "UPDATE_SCREEN_STATE",
      payload: { isOpenResultModal: !state.screenState.isOpenResultModal },
    });
  }

  useEffect(() => {
    handleGameReset();

    /* Hacky Hack , Ugly AF */
    window.setTimeout(() => {
      dispatch({
        type: "UPDATE_SCREEN_STATE",
        payload: {
          screenBackground: background.quiz,
        },
      });
    }, 500);
  }, [state.gameSettings.name]);

  useEffect(() => {
    if (state.gameState.isStart) handleLastResponse();
  }, [state.runData.questionsAsked]);

  useEffect(() => {
    if (state.gameState.isStart && state.runData.questionsAll.length)
      moveToNextQuestion();
  }, [state.gameState.isStart]);

  return {
    handleGameStart,
    handleGameReset,
    moveToNextQuestion,
    handleOpenModalResult,
    handleGamePlayAgain,
  };
}
