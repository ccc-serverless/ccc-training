import { useEffect, useReducer, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { getAllocatedCourseById } from "apis/user";
import { sortArrOfObjects } from "utils/helper";

const CourseLearningContext = createContext();

/* Reducer --------------------   */
const initialState = {
  isLoading: true,
  allocatedCourse: {},
  courseProgress: 0,
  sidebar: {
    isOpen: false,
    progressStatus: [[]],
    sidebarStatus: {},
  },
};

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "SET_IS_LOADING":
      return { ...state, isLoading: payload.isLoading };
    case "SET_ALLOCATED_COURSE":
      return { ...state, allocatedCourse: payload.allocatedCourse };
    case "OPEN_SIDEBAR":
      return { ...state, sidebar: { ...state.sidebar, isOpen: true } };
    case "CLOSE_SIDEBAR":
      return { ...state, sidebar: { ...state.sidebar, isOpen: false } };
    case "TOGGLE_SIDEBAR":
      return { ...state, sidebar: { ...state.sidebar, isOpen: !state.isOpen } };
    case "SET_STATUS_SIDEBAR":
      return { ...state, sidebar: { ...state.sidebar, sidebarStatus: payload } };
    case "SET_SIDEBAR_PROGRESS_STATUS":
      return {
        ...state,
        sidebar: { ...state.sidebar, progressStatus: payload.progressStatus },
      };
    case "SET_COURSE_PROGRESS":
      return {
        ...state,
        courseProgress: payload.courseProgress,
      };
    default:
      return state;
  }
}

export function EngineProvider({ children }) {
  const params = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);

  function getAllocatedCourse() {
    dispatch({ type: "SET_IS_LOADING", payload: true });

    function getModuleStatus(moduleUid, progressStatus, courseDetails) {
      const moduleInProgress = progressStatus.find((f) => f.moduleUid === moduleUid);
      const moduleInCourse = courseDetails.modules.find((f) => f.uid === moduleUid);

      const commonItemsInProgress = moduleInProgress.items.filter((item) =>
        moduleInCourse.items.find((f) => f.uid === item.itemUid)
      );

      return {
        isLocked: !!commonItemsInProgress.reduce(
          (accum, item) => accum & item.isLocked,
          true
        ),
        isCompleted: !!commonItemsInProgress.reduce(
          (accum, item) => accum & item.isCompleted,
          true
        ),
      };
    }

    function getItemStatus(moduleUid, itemUid, progressStatus) {
      const moduleInProgress = progressStatus.find((f) => f.moduleUid === moduleUid);
      const itemInModule = moduleInProgress.items.find((f) => f.itemUid === itemUid);
      return { isLocked: itemInModule.isLocked, isCompleted: itemInModule.isCompleted };
    }

    getAllocatedCourseById(params.activeCourseId)
      .then((resp) => {
        const allocatedCourse = {
          ...resp.data,
          modulesWithProgress: resp.data.courseDetails.modules.map((module) => ({
            ...module,
            ...getModuleStatus(
              module.uid,
              resp.data.progressStatus,
              resp.data.courseDetails
            ),
            items: module.items.map((item) => ({
              ...item,
              ...getItemStatus(module.uid, item.uid, resp.data.progressStatus),
            })),
          })),
        };

        allocatedCourse.modulesWithProgress = sortArrOfObjects(
          allocatedCourse.modulesWithProgress,
          "order",
          "asc"
        );

        dispatch({
          type: "SET_ALLOCATED_COURSE",
          payload: { allocatedCourse },
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({ type: "SET_IS_LOADING", payload: false });
      });
  }

  useEffect(() => {
    if (params.activeCourseId) getAllocatedCourse();
  }, [params.activeCourseId]);

  return (
    <CourseLearningContext.Provider
      value={{
        state,
        dispatch,
        getAllocatedCourse,
      }}
    >
      {children}
    </CourseLearningContext.Provider>
  );
}

export function useEngine() {
  return useContext(CourseLearningContext);
}
