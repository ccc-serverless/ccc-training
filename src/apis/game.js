import { getRequest, postRequest } from "./requests";

export function getAllGames() {
  return getRequest("/game/games");
}

export function getQuestions({ course, arrTopics, arrTags }) {
  /**
   *
   * List all questions for a game
   * @param {Object} course - course object
   * @param {String} course._id - course id
   * @param {Number} course.module - course -> module
   * @param {Number} course.item - course -> module -> item
   * @param {Array} arrTopics - array(string) of topics
   * @param {String} arrTags - array(string) of tags
   *
   */

  return postRequest("/course/game/questions/filter", { course, arrTopics, arrTags });
}

/**
 *
 * List random questions for a game of given size
 * @param {Object} course - course object
 * @param {String} course._id - course id
 * @param {Number} course.module - course -> module
 * @param {Number} course.item - course -> module -> item
 * @param {Array} arrTopics - array(string) of topics
 * @param {String} arrTags - array(string) of tags
 * @param {Number} randomSize - no of questions to fetch
 *
 */
export function getRandomQuestions({ course, arrTopics, arrTags, randomSize }) {
  return postRequest("/course/game/questions/filter/random", {
    course,
    arrTopics,
    arrTags,
    randomSize,
  });
}

/**
 *
 * List all tags for the given game. Format on frontend according to topic
 * @param {String} course_id - course id
 * @param {String} module - course -> module
 * @param {String} item - course -> module -> item
 *
 */
export function getTags({ course_id, module, item }) {
  return getRequest(`/course/game/tags/${course_id}/${module}/${item}`);
}

/**
 *
 * Insert a new game result record for the given game played by the current logged in user in given active (allocated) course. Also added to progress.
 * @param {String} game - game id
 * @param {String} activeCourse - active course id
 * @param {Object} module - module object containing order and item
 * @param {Number} module.order - module order
 * @param {Number} module.item - item inside the module
 * @param {Array} arrData - array of objects containg each user interaction data
 * @param {Number} accuracy - calulcated overall accuracy
 * @param {Number} speed - calulcated average speed
 *
 */
export function uploadResult({ game, activeCourse, module, arrData, accuracy, speed }) {
  return postRequest("/course/game/result", {
    game,
    activeCourse,
    module,
    arrData,
    accuracy,
    speed,
  });
}

/** same as uploadResult() but for quizzes game */
export function uploadQuizResult({
  game,
  activeCourse,
  module,
  arrData,
  accuracy,
  speed,
}) {
  return postRequest("/course/game/quiz/result", {
    game,
    activeCourse,
    module,
    arrData,
    accuracy,
    speed,
  });
}
