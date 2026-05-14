import { getRequest } from "utils/api";
import { arrayRandomShuffle } from "utils/helper";

export default function useGetQuestions({ state }) {
  const { allocatedCourse } = state.gameSettings;
  function getQuestions() {
    return new Promise((resolve, reject) => {
      getRequest(`/assessment/pre-course/questions/${allocatedCourse.courseId}`)
        .then((resp) => {
          resolve([...arrayRandomShuffle(resp.data)]);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  return { getQuestions };
}
