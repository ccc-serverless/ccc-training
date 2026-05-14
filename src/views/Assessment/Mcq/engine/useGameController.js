import { useEffect } from "react";

export default function useGameController(props) {
  const { state, dispatch, pauseGameTimer, resumeGameTimer } = props;

  useEffect(() => {
    if (!state.gameSettings.getQuestions) return;
    if (state.runData.questionsAsked.length) return;

    async function setQuestions() {
      dispatch({ type: "UPDATE_SCREEN_STATE", payload: { isLoading: true } });

      let questions;
      try {
        questions = await state.gameSettings.getQuestions();

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
    setQuestions();
  }, [state.gameSettings.getQuestions]);

  function handleGameStart() {
    dispatch({ type: "UPDATE_GAME_STATE", payload: { isStart: true } });
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
    const { questionsAsked } = state.runData;
    const unansweredQuestions = questionsAsked
      .map((ques, index) => ({ ...ques, index }))
      .filter((ques) => !ques.responses.length);

    dispatch({ type: "SET_UNANSWERED_QUESTIONS", payload: { unansweredQuestions } });
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
