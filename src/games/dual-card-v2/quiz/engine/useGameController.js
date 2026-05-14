import { useEffect } from "react";
import { useParams } from "react-router-dom";

import lottieCorrect from "assets/lottie/right_arithmetic.json";
import lottieIncorrect from "assets/lottie/wrong_arithmetic.json";

export default function useGameController(props) {
  const { state, dispatch, pauseGameTimer, resumeGameTimer } = props;
  const { runData, screenState, gameSettings } = state;

  const params = useParams();

  /* API Calls  - --------------------------------------------------- */
  async function getTopics() {
    dispatch({ type: "UPDATE_SCREEN_STATE", payload: { isLoading: true } });

    if (typeof gameSettings.fetchTags !== "function") return;

    try {
      const resp = await gameSettings.fetchTags();

      let tags = resp.data.map((tag) => ({ ...tag, isChecked: false }));
      dispatch({ type: "ADD_TAGS", payload: resp.data });

      let arr = [];
      tags.forEach((tag) => {
        let foundIndex = -1;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i]._id === tag.topicId) {
            foundIndex = i;
            break;
          }
        }
        if (foundIndex === -1) {
          arr.push({
            _id: tag.topicId,
            name: tag.topicName,
            tags: [tag],
          });
        } else {
          arr[foundIndex].tags.push(tag);
        }
        dispatch({ type: "UPDATE_RUN_DATA", payload: { topics: arr } });
      });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: "UPDATE_SCREEN_STATE", payload: { isLoading: false } });
    }
  }

  async function getQuestions(filter) {
    dispatch({ type: "UPDATE_SCREEN_STATE", payload: { isLoading: true } });
    const tagIds = filter.arrTags;
    try {
      const resp = await gameSettings.fetchQuestions({ tagIds });
      dispatch({
        type: "COMBINED",
        payload: {
          runData: {
            questionsAll: resp.data,
            questionsAsked: resp.data.map((ques) => ({
              ...ques,
              hintTaken: false,
            })),
          },
          gameState: {
            isStart: true,
          },
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: "UPDATE_SCREEN_STATE", payload: { isLoading: false } });
    }
  }

  /* Game Start , End, Reset * - ------------------------------------------------------------- */
  function handleGameStart(filter) {
    getQuestions(filter);
    resumeGameTimer();
  }

  function handleEndGame() {
    dispatch({ type: "UPDATE_GAME_STATE", payload: { isEnd: true } });
  }

  function handleResetGame() {
    dispatch({ type: "RESET_GAME" });
    pauseGameTimer();
    getTopics();
  }

  /* Answer Check Stuff - -------------------------------------------------------------------------*/

  function handleChangeAnswer(e) {
    dispatch({
      type: "UPDATE_RUN_DATA",
      payload: {
        currAnswer: e.target.value,
      },
    });
  }

  function handleSubmitAnswer(e) {
    e.preventDefault();
    dispatch({ type: "UPDATE_CURR_RESPONSE" });

    if (verifyAnswer()) {
      playLottie(true);
    } else playLottie(false);
  }

  function verifyAnswer() {
    const currAnswer = runData.currAnswer;
    const quesArr = runData.questionsAsked;
    const currQuesIndex = runData.questionIndex;

    if (quesArr[currQuesIndex].answer.toLowerCase() === currAnswer.toLowerCase())
      return true;
    else return false;
  }

  function playLottie(isCorrect) {
    pauseGameTimer();
    if (isCorrect) {
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
      dispatch({
        type: "UPDATE_SCREEN_STATE",
        payload: {
          lottie: {
            isActive: false,
            isCorrect: false,
            data: null,
          },
        },
      });
    }, screenState.lottieTransitionTime);
  }

  function moveToNextQues() {
    if (state.runData.questionIndex === state.runData.questionsAsked.length - 1)
      return handleEndGame();

    runData.quesSwiper.slideNext();

    dispatch({
      type: "COMBINED",
      payload: {
        screenState: {
          showSolutionButton: false,
          showSolution: false,
        },
      },
    });

    window.setTimeout(() => {
      resumeGameTimer();
      dispatch({
        type: "COMBINED",
        payload: {
          screenState: {
            showSolutionButton: true,
            showSolution: false,
          },
          runData: {
            questionIndex: runData.questionIndex + 1,
          },
        },
      });
    }, screenState.swiperTransitionTime);
  }

  /* Screen UI things -------------------------------------------------------------------------- */
  function handleQuesSwiper(swiper) {
    dispatch({
      type: "UPDATE_RUN_DATA",
      payload: {
        quesSwiper: swiper,
      },
    });
  }

  function handleShowSolution() {
    dispatch({ type: "SET_HINT_TAKEN" });
    dispatch({
      type: "UPDATE_SCREEN_STATE",
      payload: {
        showSolutionButton: false,
        showSolution: true,
      },
    });
  }

  useEffect(() => {
    if (gameSettings.fetchTags !== null) {
      getTopics();
    }
  }, [gameSettings.fetchTags]);

  useEffect(() => {
    if (!state.gameState.isStart) return;
    if (!state.screenState.lottie.isActive) moveToNextQues();
  }, [state.screenState.lottie.isActive]);

  useEffect(() => {
    handleResetGame();
  }, [params]);

  return {
    handleGameStart,

    handleSubmitAnswer,
    handleChangeAnswer,
    handleResetGame,

    handleQuesSwiper,
    handleShowSolution,
  };
}
