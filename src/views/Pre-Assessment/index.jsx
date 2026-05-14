import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import Assessment from "views/Assessment/Mcq/GameScreen";

import { getRequest, postRequest } from "utils/api";
import { arrayRandomShuffle } from "utils/helper";

export default function PreAssessmentIndex() {
  const params = useParams();
  const navigate = useNavigate();

  function checkAssessmentStatus(allocatedCourse) {
    if (!allocatedCourse) return;
    if (allocatedCourse.isPreAssessmentDone) {
      navigate(`/course/learn/${allocatedCourse._id}/1/1`);
    }
  }

  async function getQuestions() {
    const resp = await getRequest(`/user/course/${params.activeCourseId}`);
    const allocatedCourse = resp.data;

    checkAssessmentStatus(allocatedCourse);

    return new Promise((resolve, reject) => {
      getRequest(`/assessment/pre-course/questions/${allocatedCourse.courseId}`)
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
        activeCourseId: params.activeCourseId,
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
        const resp = await postRequest("/assessment/pre-course/result", postData);
        const accuracy = resp.data.accuracy;
        let finalResult = {
          speed: parseFloat(parseFloat(totTime / 1000 / questions.length).toFixed(2)),
          accuracy: accuracy,
        };
        resolve(finalResult);
      } catch (err) {
        reject(err);
      }
    });
  }

  return <Assessment type="pre" getQuestions={getQuestions} postResult={postResult} />;
}
