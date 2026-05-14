import { useEffect } from "react";

import { getRequest } from "utils/api";
import { arrayRandomShuffle } from "utils/helper";

export default function useGetQuestions({ state }) {
  const chapter = state.gameSettings.chapter;

  function getQuestions() {
    return new Promise((resolve, reject) => {
      getRequest(
        `/course/assessment/chapter/questions/?courseId=${chapter.courseId}&moduleId=${chapter.moduleUid}&itemId=${chapter.itemUid}`
      )
        .then((resp) => {
          resolve(arrayRandomShuffle(resp.data));
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  useEffect(() => {
    if (chapter && chapter.courseId && chapter.moduleUid && chapter.itemUid)
      getQuestions();
  }, [chapter]);

  return { getQuestions };
}
