export default function useScreenController({ state, dispatch }) {
  function handleCloseResultModal() {
    dispatch({
      type: "UPDATE_SCREE_STATE",
      payload: {
        isOpenResultModal: false,
      },
    });
  }

  function handleOpenResultModal() {
    dispatch({
      type: "UPDATE_SCREE_STATE",
      payload: {
        isOpenResultModal: true,
      },
    });
  }

  return { handleCloseResultModal, handleOpenResultModal };
}
