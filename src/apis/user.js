import { getRequest, postRequest, putRequest } from "./requests";

export function getUserProfile() {
  return getRequest(`/user/profile`);
}

export function editUserProfile(body) {
  return putRequest("/user/profile", body);
}

export function uploadProfileImage(body) {
  return postRequest("/user/image", body);
}

export function getUserPerformance() {
  return getRequest("/user/profile/performance/summary");
}

export function startCourse(allocatedCourseId) {
  return postRequest("/user/course/start", { allocatedCourseId });
}

export function getAllUserCourses() {
  return getRequest("/user/courses");
}

// export function getActiveCourseById(activeCourseId) {
//   console.log("Getting active course id somehere");
//   return getRequest(`/user/course/${activeCourseId}`);
// }

export function getAllocatedCourseById(activeCourseId) {
  return getRequest(`/user/course/${activeCourseId}`);
}
