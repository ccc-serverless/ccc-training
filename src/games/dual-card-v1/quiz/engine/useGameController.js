import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import { useUser } from "contexts/AllContexts";
import { getRequest, postRequest } from "utils/api";

import lottieCorrect from "assets/lottie/right_arithmetic.json";
import lottieIncorrect from "assets/lottie/wrong_arithmetic.json";

export default function useGameController({
  state,
  dispatch,
  pauseGameTimer,
  resumeGameTimer,
}) {
  const { runData, screenState } = state;

  const location = useLocation();
  const params = useParams();
  const User = useUser();

  /* API Calls  - --------------------------------------------------- */
  function getTopics() {
    let path = location.pathname.split("/");
    if (path.indexOf("trial") !== -1) {
      dispatch({ type: "UPDATE_SCREEN_STATE", payload: { isLoading: true } });

      /* Delay 1s to emulate api call. So that these dispatches dont overlap with the RESET_PATCH dispatch */
      window.setTimeout(() => {
        let trialTopic = [
          {
            _id: "60aa43371b97c0e24cec5901",
            name: "Arithmetic",
            tags: [
              {
                isChecked: false,
                name: "addition",
                topicId: "60aa43371b97c0e24cec5901",
                topicName: "Arithmetic",
                _id: "60bf7bfbe403d0aee5800a18",
              },
            ],
          },
        ];

        dispatch({
          type: "ADD_TAGS",
          payload: [{ _id: "60bf7bfbe403d0aee5800a18", name: "Arithmetic" }],
        });
        dispatch({ type: "UPDATE_RUN_DATA", payload: { topics: trialTopic } });
        dispatch({ type: "UPDATE_SCREEN_STATE", payload: { isLoading: false } });
      }, 1000);
    } else {
      const course = User.getCourseFromActiveCourses(params.activeCourseId);
      const module = params.moduleNumber;
      const item = params.itemNumber;

      dispatch({ type: "UPDATE_SCREEN_STATE", payload: { isLoading: true } });
      getRequest(`/course/game/tags/${course._id}/${module}/${item}`)
        .then((resp) => {
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
          });

          dispatch({ type: "UPDATE_RUN_DATA", payload: { topics: arr } });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          dispatch({ type: "UPDATE_SCREEN_STATE", payload: { isLoading: false } });
        });
    }
  }

  function getQuestions(filter) {
    let path = location.pathname.split("/");
    if (path.indexOf("trial") !== -1) {
      let trialQues = [
        {
          answer: "90",
          answerDescription: "Total gum Sai has = 10 + 70 +10 = 90",
          course: {
            _id: "606ddfb8783dab59377d6e45",
            item: 1,
            module: 2,
          },
          question:
            "<p>Sai has 10 pieces of gum to share with her friends. There wasn’t enough gum for all her friends, so she went to the store and got 70 pieces of strawberry gum and 10 pieces of bubble gum. How many pieces of gum does Sai have now?</p>",
          tagIds: ["60bf7bfbe403d0aee5800a18"],
          topicId: "60aa43371b97c0e24cec5901",
          type: "quiz",
          _id: "60ef192c53e329b1be45c118",
        },
      ];

      dispatch({
        type: "COMBINED",
        payload: {
          runData: {
            questionsAll: trialQues,
            questionsAsked: trialQues.map((ques) => ({ ...ques, hintTaken: false })),
          },
          gameState: {
            isStart: true,
          },
          screenState: {
            isLoading: false,
          },
        },
      });
    } else {
      let activeModule = User.state.activeModule;
      let items = activeModule.items;
      let activeItem = items.find((f) => f.slNo == params.itemNumber);

      filter = {
        course: {
          _id: User.getCourseFromActiveCourses(params.activeCourseId)._id,
          itemUid: activeItem.uid,
          moduleUid: activeModule.uid,
        },
        randomSize: 10,
        ...filter,
      };

      postRequest(`/course/game/questions/filter/random`, filter)
        .then((resp) => {
          dispatch({
            type: "COMBINED",
            payload: {
              runData: {
                questionsAll: resp.data,
                questionsAsked: resp.data.map((ques) => ({ ...ques, hintTaken: false })),
              },
              gameState: {
                isStart: true,
              },
            },
          });
        })
        .catch((err) => console.log(err))
        .finally(() => {
          dispatch({ type: "UPDATE_SCREEN_STATE", payload: { isLoading: false } });
        });
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
    getTopics();
  }, []);

  useEffect(() => {
    if (!state.gameState.isStart) return;
    if (!state.screenState.lottie.isActive) moveToNextQues();
  }, [state.screenState.lottie.isActive]);

  return {
    handleGameStart,

    handleSubmitAnswer,
    handleChangeAnswer,
    handleResetGame,

    handleQuesSwiper,
    handleShowSolution,
  };
}
