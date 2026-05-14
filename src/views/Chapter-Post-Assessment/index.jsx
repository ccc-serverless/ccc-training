import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import Assessment from "views/Assessment/Mcq/GameScreen";

import { useUser } from "contexts/AllContexts";
import { getRequest, postRequest } from "utils/api";
import { arrayRandomShuffle } from "utils/helper";

export default function PreAssessmentIndex() {
  const params = useParams();
  const User = useUser();

  async function getQuestions() {
    const resp = await getRequest(`/user/course/${params.activeCourseId}`);
    const allocatedCourse = resp.data;

    return new Promise((resolve, reject) => {
      getRequest(
        `/assessment/chapter/questions?courseId=${allocatedCourse.courseId}&moduleUid=${params.moduleUid}&assessmentType=post-chapter`
      )
        .then((resp) => {
          resolve([...arrayRandomShuffle(resp.data)]);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  async function postResult({ questions, totTime }) {
    return new Promise(async (resolve, reject) => {
      let postData = {
        assessmentType: "post-chapter",
        activeCourseId: params.activeCourseId,
        moduleUid: params.moduleUid,
        itemUid: params.itemUid,
        responses: questions.map((ques) => ({
          questionId: ques._id,
          allResponses: ques.responses,
        })),
        avgSpeed: parseFloat(parseFloat(totTime / 1000 / questions.length).toFixed(2)),
        avgSpeedUnit: "s",
        totTime: totTime,
        totTimeUnit: "ms",
      };

      try {
        const resp = await postRequest("/assessment/chapter/result", postData);
        const accuracy = resp.data.accuracy;
        let finalResult = {
          speed: parseFloat(parseFloat(totTime / 1000 / questions.length).toFixed(2)),
          accuracy: accuracy,
        };
        resolve(finalResult);

        const postProgressData = {
          activeCourseId: params.activeCourseId,
          moduleUid: params.moduleUid,
          itemUid: params.itemUid,
        };

        postRequest(`/course/progress`, postProgressData)
          .then(() => {
            User.refreshUserData();
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  return (
    <Assessment type="post-chapter" getQuestions={getQuestions} postResult={postResult} />
  );
}
