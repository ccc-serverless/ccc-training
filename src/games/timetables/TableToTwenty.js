import React from "react";
import { PropTypes } from "prop-types";
import GameScreen from "./GameScreen";

const ARR_TABLE = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

function TableToTwenty(props) {
  return <GameScreen arrTable={ARR_TABLE} {...props} />;
}

TableToTwenty.propTypes = {
  coundtdown: PropTypes.number,
  finalResult: PropTypes.object,
  handleCloseResult: PropTypes.func,
  hanldeCountdown: PropTypes.func,
  handleGameId: PropTypes.func,
  handleGameStart: PropTypes.func,
  handleInputChange: PropTypes.func,
  handleResult: PropTypes.func,
  handleSelectedTables: PropTypes.func,
  handleTotalGameTime: PropTypes.func,
  inputCurrAns: PropTypes.func,
  isAnsRight: PropTypes.bool,
  isGameEnd: PropTypes.bool,
  isGameStart: PropTypes.bool,
  isLottie: PropTypes.bool,
  lottieSuccess: PropTypes.object,
  lottieWrong: PropTypes.object,
  nextQuestion: PropTypes.func,
  openResult: PropTypes.bool,
  question: PropTypes.array,
  selectedTables: PropTypes.array,
  timer: PropTypes.number,
};
export default TableToTwenty;
