import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useUser } from "contexts/UserContext";
import { getRandomNumber } from "utils/helper";
import { postRequest } from "utils/api";

export function useGetQuestions() {
  const params = useParams();
  const User = useUser();

  const [questions, setQuestions] = useState({ all: [], asked: [], poolRem: [] });
  const [isLoading, setIsLoading] = useState(false);

  function getQuestions(filter) {
    setIsLoading(true);

    let activeModule = User.state.activeModule;
    let items = activeModule.items;
    let activeItem = items.find((f) => f.slNo == params.itemNumber);

    filter = {
      course: {
        _id: User.getCourseFromActiveCourses(params.activeCourseId)._id,
        itemUid: activeItem.uid,
        moduleUid: activeModule.uid,
      },

      ...filter,
    };

    postRequest(`/course/game/questions/filter`, filter)
      .then((resp) => {
        resp.data = resp.data.map((item) => {
          return { ...item };
        });
        setQuestions((prev) => {
          return {
            ...prev,
            all: resp.data,
            poolRem: resp.data,
            asked: [],
          };
        });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function resetQuestions() {
    setQuestions((prev) => {
      return { ...prev, asked: [], poolRem: prev.all };
    });
  }

  function setNextQuestion() {
    let quesPoolRem = [...questions.poolRem];
    let randIndex = getRandomNumber(0, quesPoolRem.length);

    let ques = quesPoolRem[randIndex];
    ques.resp = [];
    ques.isHintTaken = false;

    quesPoolRem.splice(randIndex, 1);

    setQuestions((prev) => {
      return { ...prev, asked: [...prev.asked, ques], poolRem: quesPoolRem };
    });
  }

  function isPoolRem() {
    return questions.poolRem.length !== 0;
  }

  //Set next question as soon as the questions have been fetched.
  // This is for the first question when game begins
  useEffect(() => {
    if (questions.all.length && !questions.asked.length) setNextQuestion();
  }, [questions]);

  return {
    questions: questions.asked,
    getQuestions,
    setNextQuestion,
    setQuestions,
    isPoolRem,
    isLoading,
    resetQuestions,
  };
}
