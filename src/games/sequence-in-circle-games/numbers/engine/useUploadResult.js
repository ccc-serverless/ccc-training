import { useEffect } from "react";

import useUploadResult from "views/CourseLearning/active-content/engine/useUploadResult";

export default function useCalcAndUploadResult({ state, dispatch }) {
  const { result, resultStats } = state.runData;

  const { uploadResult } = useUploadResult();

  useEffect(() => {
    if (state.runData.resultStats !== null) {
      uploadResult({
        gameId: state.gameSettings.gameId,
        arrData: result,
        result: resultStats,
      });
    }
  }, [state.runData.resultStats]);
}
