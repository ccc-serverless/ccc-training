import { getRequest, postRequest } from "./requests";

export function getAllBundles() {
  return getRequest("/course/bundles");
}

export function getAllCourses() {
  return getRequest("/course/courses");
}

export function getCoursesByBundle(bundleId) {
  return getRequest(`/course/courses/bundle/${bundleId}`);
}

export function getCourse(courseId) {
  return getRequest(`/course/${courseId}`);
}

export function updateCourseProgress({ activeCourse, module, item }) {
  return postRequest("/course/progress", { activeCourse, module, item });
}
