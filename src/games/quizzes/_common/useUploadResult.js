import { useEffect } from "react";

import useUploadResult from "views/CourseLearning/active-content/engine/useUploadResult";

export function useCalcAndUploadResult(questions, state, dispatch, gameId) {
  const { uploadResult } = useUploadResult();

  function calculateResult(Tags) {
    questions = questions.asked;

    const accuracy =
      (questions.length / questions.reduce((a, c) => a + c.resp.length, 0)) * 100;

    const result = {
      arrData: questions,
      accuracy: parseFloat(accuracy.toFixed(2)),
      speed: parseFloat(parseFloat(state.totTimeElapsed / 1000 / questions.length)),
    };

    dispatch({
      type: "SET_RESULT",
      payload: result,
    });
  }

  useEffect(() => {
    if (state.result.arrData.length) {
      dispatch({
        type: "SET_SCREEN_STATE",
        payload: {
          isOpenModalResult: true,
        },
      });
      uploadResult({
        gameId,
        arrData: state.result.arrData,
        result: state.result,
      });
    }
  }, [state.result]);

  return { calculateResult };
}
