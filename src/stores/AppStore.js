import create from "zustand";
import { devtools } from "zustand/middleware";

function store(set) {
  return {
    isLearninSidebarOpen: false,

    toggleLearningSidebar: (payload) => {
      if (payload && payload.hasOwnProperty("isOpen")) {
        return set((state) => ({
          ...state,
          isLearninSidebarOpen: payload.isOpen,
        }));
      } else {
        return set((state) => ({
          ...state,
          isLearninSidebarOpen: !state.isLearninSidebarOpen,
        }));
      }
    },
  };
}

const useStore = create(devtools(store));

export default useStore;
