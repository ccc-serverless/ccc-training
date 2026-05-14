import { useEffect } from "react";
import { postRequest } from "utils/api";
import { useParams } from "react-router-dom";

import { useUser } from "contexts/AllContexts";

export default function useResultController({ state, dispatch }) {
  const User = useUser();
  const params = useParams();

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

    postRequest("/course/assessment/chapter/result", postData)
      .then((resp) => {
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

  useEffect(() => {
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
