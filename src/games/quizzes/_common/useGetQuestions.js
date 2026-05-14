import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import { postRequest } from "utils/api";
import { useUser } from "contexts/AllContexts";
import { arrayRandomShuffle, getRandomNumber } from "utils/helper";

let NUMBER_OF_QUESTIONS = 5;

export function useGetQuestions(game) {
  const User = useUser();
  const params = useParams();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState({
    all: [],
    asked: [],
    poolRem: [],
  });

  function getQuestions(filter) {
    setIsLoading(true);
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
      setQuestions((prev) => {
        return {
          ...prev,
          all: trialQues,
          asked: [],
          poolRem: generateQuestionPool(trialQues),
        };
      });
      setIsLoading(false);
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

        ...filter,
      };

      postRequest(`/course/game/questions/filter`, filter)
        .then((resp) => {
          if (resp.data.length >= 10) NUMBER_OF_QUESTIONS = 10;
          let shuffled = arrayRandomShuffle(resp.data);
          let shuffledTrunc = shuffled.slice(0, NUMBER_OF_QUESTIONS);

          setQuestions((prev) => {
            return {
              ...prev,
              all: shuffledTrunc,
              asked: [],
              poolRem: generateQuestionPool(shuffledTrunc),
            };
          });
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  function setNextQuestion() {
    let quesPoolRem = [...questions.poolRem];
    let randIndex = getRandomNumber(0, quesPoolRem.length);

    let ques = quesPoolRem[randIndex];
    ques.resp = [];
    ques.isHintTaken = false;
    if (game === "Sequence" || game === "sequence" || game === "Flowchart Sequencing")
      ques.randomSteps = generateSequence(ques.steps);

    quesPoolRem.splice(randIndex, 1);

    setQuestions((prev) => {
      return { ...prev, asked: [...prev.asked, ques], poolRem: quesPoolRem };
    });
  }

  function generateSequence(sequence) {
    let randomSequence = shuffleSequenceArray(sequence);
    return randomSequence;
  }
  function reset() {
    setQuestions({ all: [], asked: [], poolRem: [] });
  }

  //Set next question as soon as the questions have been fetched.
  // This is for the first question when user clicks on the start quiz button
  useEffect(() => {
    if (questions.all.length && !questions.asked.length) setNextQuestion();
  }, [questions]);

  return {
    questions,
    getQuestions,
    setQuestions,
    setNextQuestion,
    reset,
    isLoading,
  };
}

/******************************************************************************************** */

function generateQuestionPool(allQues) {
  const allQuesPerTopic = getQuestionsPerTopic(allQues);
  let numberOfQuestionsPerTopicToUse = generateNumberOfQuestions(allQues);
  let newQuesPool = [];

  Object.entries(numberOfQuestionsPerTopicToUse).forEach((item) => {
    let currTopic = item[0];
    let quesnCountLeft = item[1];

    while (quesnCountLeft--) {
      let randIndex = getRandomNumber(0, allQuesPerTopic[currTopic].length);
      if (allQuesPerTopic[currTopic][randIndex] !== undefined)
        newQuesPool.push(allQuesPerTopic[currTopic][randIndex]);

      allQuesPerTopic[currTopic].splice(randIndex, 1);
    }
  });

  return newQuesPool;
}

function generateNumberOfQuestions(allQues) {
  let topicsFoundSet = new Set();
  allQues.forEach((quesn) => {
    topicsFoundSet.add(quesn.topic);
  });
  let topicsFound = Array.from(topicsFoundSet);

  let quesnsPerTopicFinal = {};
  let quesnsPerTopicFound = {};

  topicsFound.forEach((topic) => {
    quesnsPerTopicFound[topic] = 0;
    quesnsPerTopicFinal[topic] = 0;
  });

  allQues.forEach((quesn) => {
    quesnsPerTopicFound[quesn.topic]++;
  });

  let arrayQuesnPerTopics = Object.entries(quesnsPerTopicFound).map((item) => item[1]);
  arrayQuesnPerTopics.sort();

  let quesLeftCount = NUMBER_OF_QUESTIONS;
  let topicsLeftCount = topicsFound.length;

  /* eslint-disable */
  for (let i = 0; i < arrayQuesnPerTopics.length; i++) {
    Object.entries(quesnsPerTopicFound).map((item) => {
      if (item[1] === arrayQuesnPerTopics[i]) {
        const currTopic = item[0];

        if (i === arrayQuesnPerTopics.length - 1) {
          let countQuesSoFar = 0;
          Object.entries(quesnsPerTopicFinal).forEach((item) => {
            countQuesSoFar += item[1];
          });
          quesnsPerTopicFinal[currTopic] = NUMBER_OF_QUESTIONS - countQuesSoFar;
        } else {
          let optimalCount = parseInt(quesLeftCount / topicsLeftCount);
          if (optimalCount <= quesnsPerTopicFound[currTopic]) {
            quesnsPerTopicFinal[currTopic] = optimalCount;
          } else {
            quesnsPerTopicFinal[currTopic] = quesnsPerTopicFound[currTopic];
          }
          quesLeftCount--;
          topicsLeftCount--;
        }
      }
    });
  }

  return quesnsPerTopicFinal;
}

function getQuestionsPerTopic(arrQuesns) {
  let data = {};
  arrQuesns.forEach((quesn) => (data[quesn.topic] = []));
  arrQuesns.forEach((quesn) => data[quesn.topic].push(quesn));
  return data;
}

function shuffleSequenceArray(sequenceArray) {
  let array = [...sequenceArray];
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
