export default function use({ state, dispatch }) {
  const { runData } = state;

  function getUpdateInputPayload(e) {
    switch (state.gameSettings.name) {
      case "Word Problems":
        return { textInput: e.target.value };
      case "Mcq":
        return { radioInput: e.target.value };
      default:
        return {};
    }
  }

  function getUpdateReponsePayload() {
    switch (state.gameSettings.name) {
      case "Word Problems":
        return { response: runData.currAnswer.textInput };
      case "Mcq":
        return { response: runData.currAnswer.radioInput };
      default:
        return {};
    }
  }

  function handleChangeInput(e) {
    dispatch({
      type: "UPDATE_CURRENT_INPUT",
      payload: getUpdateInputPayload(e),
    });
  }

  function handleSubmitAnswer(e) {
    e.preventDefault();
    dispatch({
      type: "UPDATE_RESPONSES",
      payload: getUpdateReponsePayload(),
    });
  }

  function handleClickShowSolution() {
    dispatch({
      type: "UPDATE_SCREEN_STATE",
      payload: {
        showHint: true,
      },
    });
  }

  return {
    handleChangeInput,
    handleSubmitAnswer,
    handleClickShowSolution,
  };
}
