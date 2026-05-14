import { useEffect } from "react";

import { getRequest } from "utils/api";
import { arrayRandomShuffle, getRandomNumber } from "utils/helper";
import useGetAllocatedCourse from "hooks/useGetAllocatedCourse";

const _TotalNumberOfQuestions = 5;

export default function useGetQuestions({ state, dispatch }) {
  const { allocatedCourse } = useGetAllocatedCourse();
  const course = allocatedCourse.courseDetails;

  function getQuestions() {
    return new Promise((resolve, reject) => {
      getRequest(`/assessment/questions/${course._id}/${state.gameSettings.level}`)
        .then((resp) => {
          resolve(arrayRandomShuffle(resp.data));
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });

      // let postData = {
      //   course: {
      //     _id: course._id,
      //   },
      //   level: 1,
      //   arrTopics: [],
      //   arrTags: [],
      // };

      // postRequest(`/course/questions/filter/assessment`, postData)
      //   .then((resp) => {
      //     const questions = resp.data;

      //     /* Array of all the unique tags present */
      //     const { arrTags } = getAllTags(questions);

      //     /* quesCountPerTopic is number of questions equally distributed for each tag &&
      //  quesCountLeft is number of questions left after equal distribution that cant be equally distributed
      //  among all tags and therefore will be randomly selected */

      //     const { quesCountLeft, quesCountPerTopic } = findQuesSplitCount(arrTags);

      //     /* Questions split by tag */
      //     const { questionSplit } = findQuestionsSplit(
      //       questions,
      //       arrTags,
      //       quesCountPerTopic,
      //       quesCountLeft
      //     );

      //     /* Convert the questions object (split by tag) into array and return randomised */
      //     let arrQuestions = [];
      //     for (const key in questionSplit) {
      //       questionSplit[key].forEach((ques) => {
      //         arrQuestions.push(ques);
      //       });
      //     }

      //     resolve(arrayRandomShuffle(arrQuestions));
      //   })
      //   .catch((err) => {
      //     reject(err);
      //   });
    });
  }

  function getAllTags(questions) {
    let tagsNoDupes = new Set();

    questions.forEach((ques) => {
      ques.tagIds.forEach((tagId) => {
        tagsNoDupes.add(tagId);
      });
    });

    /* Set() to Array() w/o dupes */
    const arrTags = Array.from(tagsNoDupes);

    return { arrTags };
  }

  function findQuesSplitCount(arrTags) {
    const questionCount = _TotalNumberOfQuestions;
    const tagsCount = arrTags.length;

    const quesCountPerTopic = parseInt(questionCount / tagsCount);
    const quesCountLeft = questionCount % tagsCount;

    return { quesCountPerTopic, quesCountLeft };
  }

  function findQuestionsSplit(questions, arrTags, quesCountPerTopic, quesCountLeft) {
    let questionSplit = {};

    /* Populate each tag as empty array in questionSplit */
    arrTags.forEach((tag) => {
      questionSplit[tag] = [];
    });

    /* Add ques for each tag */

    let updateQues = [...questions];
    arrTags.forEach((tag) => {
      let count = quesCountPerTopic;

      while (count--) {
        let { foundIndex, foundQues } = getQuesForGivenTag(updateQues, tag);
        updateQues.splice(foundIndex, 1);
        questionSplit[tag].push(foundQues);
      }
    });

    let remQuestions = [];
    if (quesCountLeft) {
      remQuestions = getRemainingQuestions(updateQues, quesCountLeft);
    }

    remQuestions.forEach((ques) => {
      /* If there are multiple tags for the question , pick one at random */
      let randomTagIndex = getRandomNumber(0, ques.tagIds.length - 1);
      questionSplit[ques.tagIds[randomTagIndex]].push(ques);
    });

    return { questionSplit };
  }

  function getQuesForGivenTag(questions, tag) {
    let arrQues = [...questions];
    let foundIndex = -1;

    for (let i = 0; i < arrQues.length; i++) {
      const ind = arrQues[i].tagIds.findIndex((f) => f === tag);

      if (ind !== -1) {
        foundIndex = i;
        break;
      } else foundIndex = -1;
    }

    if (foundIndex === -1) return null;

    const foundQues = arrQues[foundIndex];
    return { foundQues, foundIndex };
  }

  function getRemainingQuestions(questions, quesCountLeft) {
    let shuffled = arrayRandomShuffle([...questions]);

    return shuffled.slice(0, quesCountLeft);
  }

  useEffect(() => {
    if (course) getQuestions();
  }, [course]);

  return { getQuestions };
}
