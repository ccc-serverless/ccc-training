import create from "zustand";
import { devtools } from "zustand/middleware";

function store(set) {
  return {
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
    setUserProfile: (payload) => set((state) => ({ profile: payload })),
    setActiveCourse: (payload) => set((state) => ({ activeCourses: payload })),
    setActiveModule: (payload) => set((state) => ({ activeModule: payload })),
    setLoading: (payload) => set((state) => ({ isLoading: payload.isLoading })),
    setLoginModal: (payload) => set((state) => ({ isOpenLoginModal: payload.isOpen })),
  };
}

const useStore = create(devtools(store));
export default useStore;
