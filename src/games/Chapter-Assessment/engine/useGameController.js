import { useEffect } from "react";

export default function useGameController(props) {
  const { state, dispatch, pauseGameTimer, resumeGameTimer, getQuestions } = props;

  async function setQuestions() {
    dispatch({ type: "UPDATE_SCREEN_STATE", payload: { isLoading: true } });

    let questions;
    try {
      questions = await getQuestions();

      dispatch({
        type: "COMBINED",
        payload: {
          screenState: { isLoading: false },
          runData: {
            questionsAll: questions,
            questionsAsked: questions.map((ques) => ({
              ...ques,
              responses: [],
              keepsOptionOrder: false,
            })),
          },
        },
      });
    } catch (err) {
      console.log(err);
    }

    dispatch({ type: "UPDATE_SCREEN_STATE", payload: { isLoading: false } });
  }

  function handleGameStart() {
    dispatch({ type: "UPDATE_GAME_STATE", payload: { isStart: true } });
    setQuestions();
    resumeGameTimer();
  }

  function handleActiveQuesChange(direction) {
    dispatch({ type: "SET_CURR_RESP", payload: { resp: null } });
    if (direction === "next") {
      dispatch({ type: "NAV_QUES_NEXT" });
    } else {
      dispatch({ type: "NAV_QUES_PREV" });
    }
  }

  function handleChangeInput(e) {
    dispatch({ type: "UPDATE_CURR_INPUT", payload: { resp: e.target.value } });
  }

  function handleClickSubmit(e) {
    dispatch({
      type: "UPDATE_SCREEN_STATE",
      payload: { isOpenSubmitConfirmation: true },
    });
  }

  function handleEndGame() {
    pauseGameTimer();
    dispatch({ type: "UPDATE_GAME_STATE", payload: { isEnd: true } });
    handleCloseConfirmation();
  }

  function handleCloseConfirmation() {
    dispatch({
      type: "UPDATE_SCREEN_STATE",
      payload: { isOpenSubmitConfirmation: false },
    });
  }

  function handleGameReset() {
    pauseGameTimer();
    dispatch({ type: "RESET_GAME" });
  }

  useEffect(() => {
    if (!state.gameSettings.level) return;

    handleGameReset();
  }, [state.gameSettings.level]);

  return {
    handleGameStart,
    handleGameReset,
    handleChangeInput,
    handleClickSubmit,
    handleActiveQuesChange,
    handleEndGame,
    handleCloseConfirmation,
  };
}
