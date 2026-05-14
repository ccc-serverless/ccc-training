import { useEffect } from "react";
import questions from "./questions.json";
import { getRandomNumber } from "utils/helper";

import lottieCorrect from "assets/lottie/right_arithmetic.json";
import lottieIncorrect from "assets/lottie/wrong_arithmetic.json";

let lottieTimeout = null;

export default function useGameController({
  state,
  dispatch,
  calculateResult,
  pauseGameTimer,
  resumeGameTimer,
}) {
  const { runData, screenState } = state;

  function getRandomQuestionFromRem() {
    const randomIndex = getRandomNumber(0, runData.questionsRem.length);
    const randomQues = runData.questionsRem[randomIndex];

    let toUpdateQuesRem = [...runData.questionsRem];
    toUpdateQuesRem.splice(randomIndex, 1);

    let toUpdateQuesAsked = [...runData.questionsAsked];

    if (runData.questionsAsked.length > 0)
      toUpdateQuesAsked[toUpdateQuesAsked.length - 1].responses.push(
        runData.currResponses
      );

    toUpdateQuesAsked.push({ ...randomQues, responses: [] });
    return { questionsAsked: toUpdateQuesAsked, questionsRem: toUpdateQuesRem };
  }

  function getQuestions() {
    dispatch({ type: "UPDATE_SCREEN_STATE", payload: { isLoading: true } });

    dispatch({
      type: "COMBINED",
      payload: {
        screenState: { isLoading: false },
        runData: {
          questionsAll: questions,
          questionsAsked: [],
          questionsRem: questions.map((ques) => ({ ...ques, responses: [] })),
        },
      },
    });

    dispatch({ type: "UPDATE_SCREEN_STATE", payload: { isLoading: false } });
  }

  function handleGameStart() {
    dispatch({ type: "UPDATE_GAME_STATE", payload: { isStart: true } });
    getQuestions();
    resumeGameTimer();
  }

  function handleEndGame() {
    pauseGameTimer();
    const toUpdateRunData = updateQuestionResponse();
    dispatch({
      type: "COMBINED",
      payload: {
        gameState: { isEnd: true },
        runData: toUpdateRunData,
      },
    });
  }

  function playLottie(isCorrect) {
    if (isCorrect) {
      pauseGameTimer();
      dispatch({
        type: "UPDATE_SCREEN_STATE",
        payload: { lottie: { isActive: true, data: lottieCorrect, isCorrect: true } },
      });
    } else {
      // updateQuestionResponse();
      const toUpdateRunData = updateQuestionResponse();
      dispatch({
        type: "COMBINED",
        payload: {
          runData: toUpdateRunData,
          screenState: {
            lottie: { isActive: true, data: lottieIncorrect, isCorrect: false },
          },
        },
      });
    }

    lottieTimeout = window.setTimeout(() => {
      dispatch({
        type: "UPDATE_SCREEN_STATE",
        payload: { lottie: { isActive: false, data: null, isCorrect: true } },
      });

      if (isCorrect) {
        resumeGameTimer();
        if (runData.questionsRem.length) moveToNextQuestion();
        else {
          handleEndGame();
        }
      } else {
      }
    }, 1500);
  }

  async function moveToNextQuestion() {
    const { questionsAsked, questionsRem } = getRandomQuestionFromRem();

    dispatch({
      type: "COMBINED",
      payload: {
        runData: {
          questionsAsked: questionsAsked,
          questionsRem: questionsRem,
          currResponses: [],
        },
      },
    });
  }

  /* Handle Responses ------------------------------------------------------ */

  function handleClickOption(option) {
    if (screenState.lottie.isActive) return;

    updateCurrentResponse(option);
  }

  function updateCurrentResponse(resp) {
    dispatch({ type: "UPDATE_CURR_RESPONSE", payload: { resp } });
  }

  function handleClickSubmit() {
    if (state.screenState.lottie.isActive) return;

    verifyLastResponse();
  }

  function verifyLastResponse() {
    const currQues = runData.questionsAsked[runData.questionsAsked.length - 1];

    const latestResp = runData.currResponses;
    const answers = currQues.answers;

    let isCorrect = true;
    if (answers.length !== latestResp.length) isCorrect = false;
    else {
      for (let i = 0; i < answers.length; i++) {
        let key = answers[i];
        let value = currQues.options[key];

        const foundInResp = latestResp.find((f) => f.value === value);
        if (!foundInResp) isCorrect = false;

        if (!isCorrect) break;
      }
    }

    if (isCorrect) playLottie(true);
    else playLottie(false);
  }

  function updateQuestionResponse() {
    const uRunData = JSON.parse(JSON.stringify(state.runData));
    const currQues = uRunData.questionsAsked[uRunData.questionsAsked.length - 1];

    currQues.responses.push(uRunData.currResponses);
    return uRunData;
    // dispatch({ type: "UPDATE_RUN_DATA", payload: { ...uRunData } });
  }

  function handleGameReset() {
    pauseGameTimer();
    dispatch({ type: "RESET_GAME" });
  }

  // function handleAnswerVerification() {
  //   const currQues = runData.questionsAsked[runData.questionsAsked.length - 1];
  //   const answers = currQues.answers;

  //   /* If multi correct answers, verification when submit button clicked */
  //   if (answers.length > 1) return;

  //   // const latestResp = runData.currResponses[runData.currResponses.length - 1];

  //   /* For single correct answer, auto submit when right answer clicked*/
  //   const answer = answers[0];
  //   if (latestResp.value === currQues.options[answer]) {
  //     alert("Correct Single");
  //   }
  // }

  // useEffect(() => {
  //   if (state.runData.currResponses.length) handleAnswerVerification();
  // }, [state.runData.currResponses.length]);

  // useEffect(() => {
  //   if (!state.runData.questionsAsked.length) return;
  //   verifyLastResponse();
  // }, [state.runData.questionsAsked]);

  useEffect(() => {
    /* To push first questions into state */
    if (state.gameState.isStart && !state.runData.questionsAsked.length)
      moveToNextQuestion(true);
  }, [state.gameState]);

  useEffect(() => {
    return () => {
      window.clearTimeout(lottieTimeout);
    };
  }, []);

  return { handleGameStart, handleClickOption, handleClickSubmit, handleGameReset };
}
