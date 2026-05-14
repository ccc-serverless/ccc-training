import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import useAppStore from "stores/AppStore";

export function useSidebar({ state, dispatch }) {
  const params = useParams();
  const navigate = useNavigate();

  const toggleLearningSidebar = useAppStore((state) => state.toggleLearningSidebar);

  const { allocatedCourse } = state;
  const { courseDetails } = allocatedCourse;

  function updateProgressStatus() {
    let status = {};
    courseDetails.modules.forEach((mod) => {
      status[mod.order] = { isOpen: false };
    });

    status[params.moduleNumber].isOpen = true;
    dispatch({ type: "SET_STATUS_SIDEBAR", payload: status });
    // toggleLearningSidebar({ isOpen: true });
  }

  function toggleSidebarOpenStatus(mod) {
    let toUpdate = { ...state.sidebar.sidebarStatus };
    let currStatus = toUpdate[mod.order].isOpen;
    Object.entries(toUpdate).forEach((item) => {
      item[1].isOpen = false;
    });
    toUpdate[mod.order].isOpen = !currStatus;
    dispatch({ type: "SET_STATUS_SIDEBAR", payload: toUpdate });
  }

  function updateSidebarOpenStatus(mod, status) {
    let toUpdate = { ...state.sidebar.sidebarStatus };
    Object.entries(toUpdate).forEach((item) => {
      item[1].isOpen = false;
    });
    toUpdate[mod.order].isOpen = status;
    dispatch({ type: "SET_STATUS_SIDEBAR", payload: toUpdate });
  }

  function handleChangeSidebarStatus(mod) {
    toggleSidebarOpenStatus(mod);
  }

  function handleClickSidebarModule(mod) {
    if (mod.name === "Course End Assessment") {
      if (mod.isLocked) return;
    }

    if (!mod.items[0].name) {
      navigate(`/course/learn/${params.activeCourseId}/${mod.order}/1`);
      dispatch({ type: "CLOSE_SIDEBAR" });
      toggleLearningSidebar({ isOpen: false });
    }
    handleChangeSidebarStatus(mod);
  }

  function handleClickItem(mod, item) {
    if (item.isLocked) return;

    toggleLearningSidebar();

    handleSidebarNavRoute(
      `/course/learn/${params.activeCourseId}/${mod.order}/${item.slNo}`
    );
  }

  function handleSidebarNavRoute(path) {
    dispatch({ type: "CLOSE_SIDEBAR" });
    toggleLearningSidebar({ isOpen: false });
    navigate(path);
  }

  useEffect(() => {
    if (courseDetails) updateProgressStatus();
  }, [params.moduleNumber, params.itemNumber, allocatedCourse]);

  return {
    state,
    dispatch,
    toggleSidebarOpenStatus,
    updateSidebarOpenStatus,
    handleClickSidebarModule,
    handleClickItem,
    handleSidebarNavRoute,
  };
}
