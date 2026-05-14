import { useEffect } from "react";

import useUploadResult from "views/CourseLearning/active-content/engine/useUploadResult";

export default function useResultController({ state, dispatch }) {
  const { uploadResult } = useUploadResult();

  function calculateResult() {
    const questions = state.runData.questionsAsked;

    const totTime = state.runData.totTimeElapsed;
    const totAttemptCount = questions.reduce((accum, curr) => {
      return curr.responses.length + accum;
    }, 0);

    let finalResult = {
      speed: parseFloat(parseFloat(totTime / 1000 / questions.length).toFixed(2)),
      accuracy: parseFloat(
        (parseFloat(questions.length / totAttemptCount) * 100).toFixed(2)
      ),
    };

    dispatch({ type: "UPDATE_RUN_DATA", payload: { result: finalResult } });
  }

  function handleCloseResultModal() {
    dispatch({ type: "UPDATE_SCREEN_STATE", payload: { isOpenResultModal: false } });
  }
  function handleOpenResultModal() {
    dispatch({ type: "UPDATE_SCREEN_STATE", payload: { isOpenResultModal: true } });
  }

  useEffect(() => {
    if (state.runData.result !== null && state.runData.result !== undefined) {
      dispatch({ type: "UPDATE_SCREEN_STATE", payload: { isOpenResultModal: true } });
      uploadResult({
        gameId: state.gameSettings.gameId,
        arrData: state.runData.questionsAsked,
        result: state.runData.result,
      });
    }
  }, [state.runData.result]);

  useEffect(() => {
    if (state.gameState.isEnd) calculateResult();
  }, [state.gameState]);

  return { calculateResult, handleCloseResultModal, handleOpenResultModal };
}
