import React from "react";
import { PropTypes } from "prop-types";
import GameScreen from "./GameScreen";

const ARR_TABLE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function TableToTen(props) {
  return <GameScreen arrTable={ARR_TABLE} {...props} />;
}

TableToTen.propTypes = {
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

export default TableToTen;
