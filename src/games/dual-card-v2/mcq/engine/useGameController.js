import { useEffect } from "react";
import { useParams } from "react-router-dom";

import lottieCorrect from "assets/lottie/right_arithmetic.json";
import lottieIncorrect from "assets/lottie/wrong_arithmetic.json";

export default function useGameController(props) {
  const { state, dispatch, pauseGameTimer, resumeGameTimer } = props;
  const { runData, screenState, gameSettings } = state;

  const params = useParams();

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

  function handleQuesSwiper(swiper) {
    dispatch({
      type: "UPDATE_RUN_DATA",
      payload: {
        quesSwiper: swiper,
      },
    });
  }

  function handleGameStart(filter) {
    getQuestions(filter);
    resumeGameTimer();
  }

  function handleChangeInput(e) {
    dispatch({
      type: "UPDATE_CURR_RESPONSE",
      payload: {
        resp: e.target.value,
      },
    });

    verifyResponse(e.target.value);
  }

  function verifyResponse(userResponse) {
    const currQues = runData.questionsAll[runData.questionIndex];
    const correctAns = currQues.answer;

    if (userResponse === correctAns) {
      playLottie(true);
    } else {
      playLottie(false);
    }
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
          showSolutionButton: false,
          showSolution: false,
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
          showSolutionButton: false,
          showSolution: false,
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

  function moveToNextQuestion() {
    if (runData.questionsAll.length - 1 === runData.questionIndex) {
      return handleGameEnd();
    }

    runData.quesSwiper.slideNext();
    dispatch({
      type: "UPDATE_RUN_DATA",
      payload: {
        questionIndex: runData.questionIndex + 1,
        currAnswer: "",
      },
    });

    window.setTimeout(() => {
      resumeGameTimer();
      dispatch({
        type: "UPDATE_SCREEN_STATE",
        payload: {
          showSolutionButton: true,
        },
      });
    }, screenState.swiperTransitionTime);
  }

  function handleGameEnd() {
    dispatch({ type: "UPDATE_GAME_STATE", payload: { isEnd: true } });
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

  function handleResetGame() {
    dispatch({ type: "RESET_GAME" });
    pauseGameTimer();
    getTopics();
  }

  useEffect(() => {
    if (gameSettings.fetchTopics !== null) {
      getTopics();
    }
  }, [gameSettings.fetchTopics]);

  useEffect(() => {
    if (!state.gameState.isStart) return;
    if (!state.screenState.lottie.isActive) moveToNextQuestion();
  }, [state.screenState.lottie.isActive]);

  useEffect(() => {
    handleResetGame();
  }, [params]);

  return {
    handleQuesSwiper,
    handleChangeInput,
    handleShowSolution,
    handleGameStart,
    handleResetGame,
  };
}
