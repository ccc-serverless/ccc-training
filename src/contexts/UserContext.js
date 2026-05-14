import React, { useReducer, useEffect, createContext, useContext } from "react";
import { multiGetRequest } from "utils/api";
import { isLoggedIn, sortArrOfObjects } from "utils/helper";

export const UserContext = createContext();

const initialState = {
  profile: {
    courses: {
      active: [],
      completed: [],
      notStarted: [],
    },
  },
  isLoading: false,
  activeCourses: [],
  activeModule: null,
  isOpenLoginModal: false,
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "SET_USER_PROFILE":
      return { ...state, profile: payload };
    case "SET_ACTIVE_COURSES":
      return { ...state, activeCourses: payload };
    case "SET_ACTIVE_MODULE":
      return { ...state, activeModule: payload };
    case "SET_LOADING":
      return { ...state, isLoading: payload.isLoading };
    case "SET_LOGIN_MODAL":
      return { ...state, isOpenLoginModal: payload.isOpen };
    default:
      return state;
  }
}

export function UserContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function getCourseFromActiveCourses(activeCourseId) {
    const found = state.activeCourses.find((f) => f._id === activeCourseId);
    return found.courseDetails[0];
  }

  function getUserData() {
    dispatch({ type: "SET_LOADING", payload: { isLoading: true } });
    let arrUrls = ["/user/profile", "/user/courses"];
    multiGetRequest(arrUrls)
      .then((resp) => {
        let profile = resp[0].data;
        let courses = resp[1].data;

        courses.forEach((course) => {
          course.modules = sortArrOfObjects(
            course.courseDetails[0].modules,
            "order",
            "asc"
          );
        });

        dispatch({ type: "SET_USER_PROFILE", payload: profile });
        dispatch({ type: "SET_ACTIVE_COURSES", payload: courses });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: { isLoading: false } });
      });
  }

  function refreshUserData() {
    getUserData();
  }

  function openLoginModal() {
    dispatch({ type: "SET_LOGIN_MODAL", payload: { isOpen: true } });
  }

  useEffect(() => {
    if (isLoggedIn()) getUserData();
  }, []);

  const value = {
    state,
    dispatch,
    getCourseFromActiveCourses,
    refreshUserData,
    openLoginModal,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
