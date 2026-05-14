import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useUser } from "contexts/AllContexts";
import { postRequest } from "utils/api";
import { getRandomNumber, sortArrOfObjects, arrayRandomShuffle } from "utils/helper";

import questions from "./question.json";

function getOrder(item) {
  if (!item.text) return -1;
  switch (item.event) {
    case "START":
      return 1;
    case "INPUT":
      return 2;
    case "PROCESS":
      return 3;
    case "DECISION":
      return 4;
    case "BRANCH":
      return 5;
    case "END":
      return 6;
    default:
      return -1;
  }
}

export default function useGameController({
  state,
  dispatch,
  pauseGameTimer,
  resumeGameTimer,
}) {
  const User = useUser();
  const params = useParams();

  function handleGameStart() {
    dispatch({ type: "UPDATE_GAME_STATE", payload: { isStart: true } });
    resumeGameTimer();
    getQuestions();
  }

  function handleGameReset() {
    pauseGameTimer();
    dispatch({
      type: "RESET_GAME",
    });
  }

  function getQuestions() {
    dispatch({ type: "UPDATE_SCREEN_STATE", payload: { isLoading: true } });

    let activeModule = User.state.activeModule;
    let items = activeModule.items;
    let activeItem = items.find((f) => f.slNo == params.itemNumber);

    const filter = {
      course: {
        _id: User.getCourseFromActiveCourses(params.activeCourseId)._id,
        itemUid: activeItem.uid,
        moduleUid: activeModule.uid,
      },
    };

    postRequest(`/course/game/questions/filter`, filter)
      .then((resp) => {
        resp.data = resp.data.map((item) => {
          return { ...item, order: getOrder(item) };
        });
        let shuffledResp = arrayRandomShuffle(resp.data);
        let arrQuestions = shuffledResp.slice(0, 5);

        dispatch({
          type: "UPDATE_RUN_STATE",
          payload: {
            questions: {
              all: arrQuestions,
              poolRem: arrQuestions,
              asked: [],
            },
          },
        });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch({ type: "UPDATE_SCREEN_STATE", payload: { isLoading: false } });
      });
  }

  function setNextQuestion() {
    const questions = state.runState.questions;
    let quesPoolRem = [...questions.poolRem];
    let randIndex = getRandomNumber(0, quesPoolRem.length);

    let ques = quesPoolRem[randIndex];

    ques.responses = [];
    ques.isHintTaken = false;

    quesPoolRem.splice(randIndex, 1);

    dispatch({
      type: "UPDATE_RUN_STATE",
      payload: {
        questions: {
          all: [...questions.all],
          poolRem: [...quesPoolRem],
          asked: [...questions.asked, ques],
        },
      },
    });
  }

  function isNode(node) {
    return node.hasOwnProperty("text");
  }

  function seperateNodes() {
    const questions = state.runState.questions.asked;
    dispatch({
      type: "UPDATE_RUN_STATE",
      payload: {
        sidebarNodes: arrayRandomShuffle(
          sortArrOfObjects(
            questions[questions.length - 1].flowchart.filter(
              (item) => isNode(item) && item.type !== "BRANCH"
            ),
            "order",
            "asc"
          )
        ),
      },
    });
  }

  //Set next question as soon as the questions have been fetched.
  // This is for the first question when game begins
  useEffect(() => {
    const questions = state.runState.questions;
    if (questions.all.length && !questions.asked.length) setNextQuestion();
  }, [state.runState.questions]);

  useEffect(() => {
    if (state.runState.questions.asked.length) seperateNodes();
  }, [state.runState.questions.asked.length]);

  return { handleGameStart, handleGameReset, getQuestions, setNextQuestion };
}
