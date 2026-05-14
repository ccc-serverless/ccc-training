import React, { useReducer, useContext, createContext } from "react";
export const SidebarContext = createContext();

const initialState = { isOpen: false, sidebarStatus: {}, progressStatus: [[]] };
function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "OPEN_SIDEBAR":
      return { ...state, isOpen: true };
    case "CLOSE_SIDEBAR":
      return { ...state, isOpen: false };
    case "TOGGLE_SIDEBAR":
      return { ...state, isOpen: !state.isOpen };
    case "SET_STATUS_SIDEBAR":
      return { ...state, sidebarStatus: payload };
    case "SET_STATUS_PROGRESS":
      return { ...state, progressStatus: payload };
    default:
      return state;
  }
}
export function SidebarContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function toggleSidebarStatus(mod) {
    let toUpdate = { ...state.sidebarStatus };
    let currStatus = toUpdate[mod.order].isOpen;
    Object.entries(toUpdate).forEach((item) => {
      item[1].isOpen = false;
    });
    toUpdate[mod.order].isOpen = !currStatus;
    dispatch({ type: "SET_STATUS_SIDEBAR", payload: toUpdate });
  }

  function updateSidebarStatus(mod, status) {
    let toUpdate = { ...state.sidebarStatus };
    Object.entries(toUpdate).forEach((item) => {
      item[1].isOpen = false;
    });
    toUpdate[mod.order].isOpen = status;
    dispatch({ type: "SET_STATUS_SIDEBAR", payload: toUpdate });
  }

  const value = {
    state,
    dispatch,
    toggleSidebarStatus,
    updateSidebarStatus,
  };

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebar() {
  return useContext(SidebarContext);
}
