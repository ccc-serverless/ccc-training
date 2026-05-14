import { useEffect } from "react";
import { useWindowResize } from "beautiful-react-hooks";
import { isMobile } from "react-device-detect";

export default function useScreenController({ state, dispatch }) {
  function setDeviceType(isTouch) {
    dispatch({
      type: "UPDATE_SCREEN_STATE",
      payload: {
        isTouchDevice: isTouch,
      },
    });
  }

  function toggleFullScreen() {
    dispatch({
      type: "SET_IS_FULLSCREEN",
      payload: { isFullscreen: !state.screenState.isFullscreen },
    });
  }

  function handleCloseResultModal() {
    dispatch({ type: "UPDATE_SCREEN_STATE", payload: { isOpenResultModal: false } });
  }

  function handleOpenResultModal() {
    dispatch({ type: "UPDATE_SCREEN_STATE", payload: { isOpenResultModal: true } });
  }

  /* Ask to reload if screen resized due to react flow limitations on responsiveness */
  useWindowResize(() => {
    let isTouchDevice = true;
    if (window.innerWidth < 850) isTouchDevice = true;
    else isTouchDevice = false;

    setDeviceType(isTouchDevice);
  });

  /* Not suitable on mobile */
  useEffect(() => {
    if (isMobile) setDeviceType(true);
    else setDeviceType(false);
  }, []);

  useEffect(() => {
    if (state.runState.result) handleOpenResultModal();
  }, [state.runState.result]);

  return { handleOpenResultModal, handleCloseResultModal, toggleFullScreen };
}
