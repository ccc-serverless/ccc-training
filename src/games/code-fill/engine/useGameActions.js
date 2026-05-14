import { useEffect } from "react";
import lottieCorrect from "assets/lottie/right_arithmetic.json";
import lottieIncorrect from "assets/lottie/wrong_arithmetic.json";

export default function useGameActions({
  state,
  dispatch,
  pauseGameTimer,
  resumeGameTimer,
}) {
  const { currInput, questions } = state.runData;
  const { questionsSwiper } = state.screen;

  function handleChangeInput(e) {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_CURRENT_INPUT", payload: { [name]: value } });
  }

  function moveToNextQuestion() {
    dispatch({
      type: "UPDATE_RUN_STATE",
      payload: {
        timeUptoLastQuestion: state.runData.totalTimeElapsed,
      },
    });
    resumeGameTimer();

    if (state.runData.activeQuestion + 1 === questions.length) {
      alert("Game End");
      pauseGameTimer();
    } else {
      dispatch({ type: "INC_QUES_COUNTER" });
      questionsSwiper.slideNext();

      dispatch({
        type: "UPDATE_SCREEN_STATE",
        payload: {
          inTransition: true,
        },
      });
      window.setTimeout(() => {
        dispatch({
          type: "UPDATE_SCREEN_STATE",
          payload: {
            inTransition: false,
          },
        });
      }, state.screen.transitionSpeed);
    }
  }

  function playLottie(isTrue) {
    pauseGameTimer();
    dispatch({
      type: "UPDATE_RUN_STATE",
      payload: {
        timeUptoLastQuestion: state.runData.totalTimeElapsed,
      },
    });

    if (isTrue) {
      dispatch({
        type: "UPDATE_SCREEN_STATE",
        payload: {
          lottie: {
            isActive: true,
            isCorrect: true,
            data: lottieCorrect,
          },
        },
      });
    } else {
      dispatch({
        type: "UPDATE_SCREEN_STATE",
        payload: {
          lottie: {
            isActive: true,
            isCorrect: false,
            data: lottieIncorrect,
          },
        },
      });
    }

    window.setTimeout(() => {
      moveToNextQuestion();
      dispatch({
        type: "UPDATE_SCREEN_STATE",
        payload: {
          lottie: {
            isActive: false,
            data: lottieIncorrect,
          },
        },
      });
    }, 1500);
  }

  function handleSubmitAnswer(e) {
    e.preventDefault();
    let currQues = { ...state.runData.questions[state.runData.activeQuestion] };
    let isCorr = true;

    for (const key in currQues.ans) {
      if (!currQues.ans[key]) {
        isCorr = false;
        break;
      }
      if (currQues.ans[key] !== currInput[key]) {
        isCorr = false;
        break;
      }
    }

    if (isCorr) {
      playLottie(true);
    } else playLottie(false);
  }

  function checkIfQuestionTimedOut() {
    if (!state.runData.isStart) return;
    const { totalTimeElapsed, timeUptoLastQuestion } = state.runData;
    const { maxTimePerQuestion } = state.gameSettings;

    if (parseInt(totalTimeElapsed - timeUptoLastQuestion) >= maxTimePerQuestion * 1000) {
      moveToNextQuestion();
    }
  }

  useEffect(() => {
    checkIfQuestionTimedOut();
  }, [state.runData.totalTimeElapsed]);

  return { handleChangeInput, handleSubmitAnswer };
}
