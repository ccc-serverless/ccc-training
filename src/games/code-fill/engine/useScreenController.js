export default function useScreenController({ state, dispatch }) {
  function setQuestionsSwiper(swiper) {
    dispatch({
      type: "UPDATE_SCREEN_STATE",
      payload: {
        questionsSwiper: swiper,
      },
    });
  }

  return { setQuestionsSwiper };
}
