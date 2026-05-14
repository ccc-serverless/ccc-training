import React, { createContext, useContext, useReducer, useEffect } from "react";

import { getRequest } from "utils/api";
import { updateObjectWithMatch, sortArrOfObjects } from "utils/helper";

export const BundleCoursesContext = createContext();

function updateCoursesToBundle(bundles, courses, index) {
  let toUpdate = [...bundles];
  toUpdate[index] = {
    ...toUpdate[index],
    isLoaded: true,
    courses: sortArrOfObjects(courses, "order", "asc"),
  };
  return toUpdate;
}

const initialState = {
  bundles: [],
  isLoading: { bundle: false, courses: false },
  courses: {},
};
function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "SET_LOADING":
      return { ...state, isLoading: updateObjectWithMatch(state.isLoading, payload) };

    case "SET_BUNDLES":
      return { ...state, bundles: payload };

    case "SET_COURSES_IN_BUNDLE":
      let toUpdate = { ...state };
      toUpdate.bundles = updateCoursesToBundle(
        state.bundles,
        payload.courses,
        payload.index
      );
      payload.courses.forEach((course) => (toUpdate.courses[course._id] = course));
      if (toUpdate.isLoading.courses) toUpdate.isLoading.courses = false;
      return toUpdate;

    case "SET_COURSE":
      return { ...state, courses: { ...state.courses, [payload._id]: payload } };
    default:
      return state;
  }
}

export function BundleCoursesContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function getCourseDetails(courseId) {
    const found = state.courses[courseId];
    if (found) {
      return new Promise((res, rej) => {
        res({ data: found });
      });
    } else {
      return getRequest(`/course/${courseId}`);
    }
  }

  function getBundleAndCourses() {
    if (state.bundles.length > 0) return;

    dispatch({ type: "SET_LOADING", payload: { bundle: true, courses: true } });
    getRequest("/course/bundles")
      .then((resp) => {
        let bundleCourses = resp.data.map((bundle) => {
          return { ...bundle, isLoaded: false };
        });
        // set bundles data so that main loader can be switched off
        dispatch({ type: "SET_BUNDLES", payload: bundleCourses });

        //One by one fetch (and display) courses for each bundle
        bundleCourses.forEach((bundle, index) => {
          getRequest(`/course/courses/bundle/${bundle._id}`)
            .then((res) => {
              const activeCourses = res.data.filter((course) => course.isActive);

              dispatch({
                type: "SET_COURSES_IN_BUNDLE",
                payload: { index, courses: activeCourses },
              });
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              // As soon as the first set of courses has been fetched, show the UI and
              // the rest of the courses will be shown as loaded from their seperate API calls
              // This is being done in the above dispatch, refer SET_COURSES_IN_BUNDLE
            });
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // Main page loader is off, bundles got, but courses loader is till on
        dispatch({ type: "SET_LOADING", payload: { bundle: false } });
      });
  }

  function getBundleName(bundleId) {
    return state.bundles.find((bundle) => bundle._id === bundleId);
  }

  function getBundleOrder(bundleId) {
    const found = state.bundles.find((bundle) => bundle._id === bundleId);
    if (found) return found.order;
    else return null;
  }

  const value = {
    state,
    dispatch,
    getBundleAndCourses,
    getBundleName,
    getBundleOrder,
    getCourseDetails,
  };

  useEffect(() => {
    getBundleAndCourses();
  }, []);
  return (
    <BundleCoursesContext.Provider value={value}>
      {children}
    </BundleCoursesContext.Provider>
  );
}

export function useBundleCourses() {
  return useContext(BundleCoursesContext);
}
