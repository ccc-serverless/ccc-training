import { useEffect } from "react";
import { postRequest } from "utils/api";

export default function useResultController({ state, dispatch }) {
  const { assessmentId } = state.gameSettings;

  function calculateResult() {
    const questions = state.runData.questionsAsked;
    const totTime = state.runData.totTimeElapsed;

    let postData = {
      assessmentId,
      responses: questions.map((ques) => ({
        question: ques._id,
        allResponses: ques.responses,
      })),
      avgSpeed: parseFloat(parseFloat(totTime / 1000 / questions.length).toFixed(2)),
      avgSpeedUnit: "s",
      totTime: totTime,
      totTimeUnit: "ms",
    };

    postRequest("/assessment/bundle/attempt", postData)
      .then((resp) => {
        const accuracy = resp.data.accuracy;

        let finalResult = {
          speed: parseFloat(parseFloat(totTime / 1000 / questions.length).toFixed(2)),
          accuracy: accuracy,
        };

        dispatch({ type: "UPDATE_RUN_DATA", payload: { result: finalResult } });
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
