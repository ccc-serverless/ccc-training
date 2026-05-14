import React from "react";
import { useParams } from "react-router-dom";

import DualCardQuiz from "games/dual-card-v2/quiz/Container";

import { useUser } from "contexts/AllContexts";
import { getRequest, postRequest } from "utils/api";

import { useEngine } from "views/CourseLearning/Engine";
import { useCallback } from "react";

export default function ChapterPracticeQuiz({ chapter }) {
  const params = useParams();
  const User = useUser();

  const { getAllocatedCourse } = useEngine();
  const { courseId, moduleUid, itemUid } = chapter;

  const fetchTags = useCallback(async () => {
    return new Promise((resolve, reject) => {
      getRequest(
        `/course/tags/chapter-practice?courseId=${courseId}&moduleUid=${moduleUid}&type=quiz`
      )
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }, [courseId, moduleUid]);

  const fetchQuestions = useCallback(
    async ({ tagIds }) => {
      let queryString = `courseId=${courseId}&moduleUid=${moduleUid}&type=quiz`;
      tagIds.map((tagId) => (queryString += `&tagIds=${tagId}`));

      return new Promise((resolve, reject) => {
        getRequest(`/course/questions/chapter-practice?${queryString}`)
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    [courseId, moduleUid]
  );

  const postResult = useCallback(
    async ({ arrData, result }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const postBody = {
            allocatedCourseId: params.activeCourseId,
            type: "quiz",
            moduleUid,
            itemUid,
            arrData,
            accuracy: result.accuracy,
            speed: result.speed,
          };
          const resp = await postRequest(`/course/result/chapter-practice`, postBody);
          resolve(resp);

          const postProgressData = {
            activeCourseId: params.activeCourseId,
            moduleUid: chapter.moduleUid,
            itemUid: chapter.itemUid,
          };

          postRequest(`/course/progress`, postProgressData)
            .then(() => {
              User.refreshUserData();
              getAllocatedCourse();
              resolve(resp);
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
        } catch (err) {
          reject(err);
        }
      });
    },
    [courseId, moduleUid, itemUid]
  );

  return (
    <DualCardQuiz
      fetchQuestions={fetchQuestions}
      fetchTags={fetchTags}
      postResult={postResult}
    />
  );
}
