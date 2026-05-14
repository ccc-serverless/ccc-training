import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { getRequest } from "utils/api";
import { arrayRandomShuffle } from "utils/helper";

export default function useGetQuestions({ state, dispatch }) {
  const params = useParams();

  function getQuestions() {
    return new Promise((resolve, reject) => {
      getRequest(`/assessment/bundle/${params.bundleId}`)
        .then((resp) => {
          resolve(arrayRandomShuffle(resp.data.questions));
          dispatch({
            type: "UPDATE_GAME_SETTINGS",
            payload: { assessmentId: resp.data._id },
          });
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  useEffect(() => {
    getQuestions();
  }, []);

  return { getQuestions };
}
