import { useEffect } from "react";
import useUploadResult from "views/CourseLearning/active-content/engine/useUploadResult";

export default function useResultController({ state, dispatch }) {
  const { uploadResult } = useUploadResult();

  function calculateResult() {
    const questions = state.runData.questionsAsked;
    const totalCorrect = questions.reduce(
      (accum, curr) =>
        curr.answer === curr.response && !curr.hintTaken ? accum + 1 : accum + 0,
      0
    );

    let result = {
      accuracy: parseFloat(
        parseFloat((totalCorrect / questions.length) * 100).toFixed(2)
      ),
      speed: parseFloat(
        parseFloat(
          state.runData.totTimeElapsed / 1000 / state.runData.questionsAsked.length
        ).toFixed(2)
      ),
    };

    dispatch({
      type: "UPDATE_RUN_DATA",
      payload: {
        result,
      },
    });
  }

  function handleOpenResultModal() {
    dispatch({
      type: "UPDATE_SCREEN_STATE",
      payload: {
        isOpenResultModal: true,
      },
    });
  }

  function handleCloseResultModal() {
    dispatch({
      type: "UPDATE_SCREEN_STATE",
      payload: {
        isOpenResultModal: false,
      },
    });
  }

  useEffect(() => {
    if (state.gameState.isEnd) calculateResult();
  }, [state.gameState.isEnd]);

  useEffect(() => {
    if (state.runData.result == null) return;

    uploadResult({
      gameId: state.gameSettings.gameId,
      arrData: state.runData.questionsAsked,
      result: state.runData.result,
    });

    handleOpenResultModal();
  }, [state.runData.result]);

  return { handleOpenResultModal, handleCloseResultModal };
}
