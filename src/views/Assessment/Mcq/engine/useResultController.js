import { useEffect } from "react";

import { useUser } from "contexts/AllContexts";

export default function useResultController({ state, dispatch }) {
  const User = useUser();

  async function calculateResult() {
    const questions = state.runData.questionsAsked;
    const totTime = state.runData.totTimeElapsed;

    const finalResult = await state.gameSettings.postResult({ questions, totTime });
    dispatch({ type: "UPDATE_RUN_DATA", payload: { result: finalResult } });
    User.refreshUserData();

    // let postData = {
    //   activeCourseId: params.activeCourseId,
    //   responses: questions.map((ques) => ({
    //     questionId: ques._id,
    //     allResponses: ques.responses,
    //   })),
    //   avgSpeed: parseFloat(parseFloat(totTime / 1000 / questions.length).toFixed(2)),
    //   avgSpeedUnit: "s",
    //   totTime: totTime,
    //   totTimeUnit: "ms",
    // };

    // postRequest("/assessment/pre-course/result", postData)
    //   .then((resp) => {
    //     const accuracy = resp.data.accuracy;

    //     let finalResult = {
    //       speed: parseFloat(parseFloat(totTime / 1000 / questions.length).toFixed(2)),
    //       accuracy: accuracy,
    //     };

    //     dispatch({ type: "UPDATE_RUN_DATA", payload: { result: finalResult } });
    //     User.refreshUserData();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
