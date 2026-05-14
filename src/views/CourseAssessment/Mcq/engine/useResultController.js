import { useEffect } from "react";
import { postRequest, getRequest } from "utils/api";
import { useParams } from "react-router-dom";

import { useUser } from "contexts/AllContexts";
import { sortArrOfObjects } from "utils/helper";

export default function useResultController({ state, dispatch }) {
  const User = useUser();
  const params = useParams();

  function getPrevAttemptResults() {
    getRequest(`/user/course/${params.activeCourseId}`)
      .then((resp) => {
        setAssessmentStatus(resp.data);

        dispatch({
          type: "SET_ASSESSMENT_ATTEMPTS",
          payload: {
            attempts: sortArrOfObjects(
              resp.data.assessmentAttempts,
              "createTime",
              "desc"
            ),
          },
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }

  function setAssessmentStatus(activeCourse) {
    const assessmentModule = activeCourse.courseDetails.modules.find(
      (f) => f.name === "Assessment"
    );

    const status = assessmentModule.items.map(() => "LOCKED");
    status[0] = "INCOMPLETE";

    activeCourse.assessmentAttempts.forEach((attempt) => {
      const index = attempt.itemSlNo - 1;

      if (attempt.result.accuracy >= attempt.result.threshold) {
        status[index] = "COMPLETED";
        status[index + 1] = "INCOMPLETE";
      }
    });

    dispatch({ type: "SET_ATTEMPTS_STATUS", payload: { attemptsStatus: status } });
  }

  function calculateResult() {
    const questions = state.runData.questionsAsked;
    const totTime = state.runData.totTimeElapsed;

    let module = User.state.activeModule;
    let item = module.items.find((item) => item.slNo == params.itemNumber);

    let postData = {
      activeCourseId: params.activeCourseId,
      module: {
        uid: module.uid,
        order: module.order,
        item: item.slNo,
        itemUid: item.uid,
      },
      questions: questions,
      avgSpeed: parseFloat(parseFloat(totTime / 1000 / questions.length).toFixed(2)),
      avgSpeedUnit: "s",
      totTime: totTime,
      totTimeUnit: "ms",
    };

    postRequest("/course/assessment/result", postData)
      .then((resp) => {
        getPrevAttemptResults();

        const accuracy = resp.data.accuracy;
        const threshold = resp.data.threshold;

        let finalResult = {
          speed: parseFloat(parseFloat(totTime / 1000 / questions.length).toFixed(2)),
          accuracy: accuracy,
          threshold: threshold,
        };

        dispatch({ type: "UPDATE_RUN_DATA", payload: { result: finalResult } });
        if (accuracy > threshold) {
          User.refreshUserData();
          dispatch({ type: "UPDATE_SCREEN_STATE", payload: { isPassedTest: true } });
        } else {
          dispatch({ type: "UPDATE_SCREEN_STATE", payload: { isPassedTest: true } });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCloseResultModal() {
    dispatch({ type: "UPDATE_SCREEN_STATE", payload: { isOpenResultModal: false } });
  }
  function handleOpenResultModal() {
    dispatch({ type: "UPDATE_SCREEN_STATE", payload: { isOpenResultModal: true } });
  }

  useEffect(getPrevAttemptResults, []);

  useEffect(() => {
    if (state.runData.result)
      dispatch({ type: "UPDATE_SCREEN_STATE", payload: { isOpenResultModal: true } });
  }, [state.runData.result]);

  useEffect(() => {
    if (state.gameState.isEnd) calculateResult();
  }, [state.gameState]);

  return {
    calculateResult,
    handleCloseResultModal,
    handleOpenResultModal,
  };
}
