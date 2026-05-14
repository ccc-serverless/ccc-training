import React, { createContext, useContext, useReducer, useEffect } from "react";
import { getRequest } from "utils/api";

export const ActiveCoursesContext = createContext();

const initialState = { isLoading: true };

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "SET_ACTIVE_COURSE":
      return { ...state, [payload._id]: payload };
    case "SET_ALL_ACTIVE_COURSES":
      return { ...state, ...payload };
    case "SET_LOADING":
      return { ...state, isLoading: payload.isLoading };
    default:
      return state;
  }
}

export function ActiveCoursesContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function getActiveCourse(_id) {
    if (state[_id]) {
      return new Promise((res, rej) => {
        res({ data: state[_id] });
      });
    }
  }

  function getActiveCourseFromCourseId(courseId) {
    for (const key in state) {
      if (state[key].courseId === courseId) {
        return state[key];
      }
    }
  }

  function getAllActiveCourses() {
    dispatch({
      type: "SET_LOADING",
      payload: { isLoading: true },
    });
    getRequest(`/user/courses`)
      .then((resp) => {
        let toUpdateState = {};
        resp.data.forEach((actCourse) => {
          toUpdateState[actCourse._id] = actCourse;
        });

        dispatch({ type: "SET_ALL_ACTIVE_COURSES", payload: toUpdateState });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({
          type: "SET_LOADING",
          payload: { isLoading: false },
        });
      });
  }

  useEffect(() => {
    if ("authToken" in localStorage) getAllActiveCourses();
    else
      dispatch({
        type: "SET_LOADING",
        payload: { isLoading: false },
      });
  }, []);

  const value = { state, dispatch, getActiveCourse, getActiveCourseFromCourseId };
  return (
    <ActiveCoursesContext.Provider value={value}>
      {children}
    </ActiveCoursesContext.Provider>
  );
}

export function useActiveCourses() {
  return useContext(ActiveCoursesContext);
}
