import React from "react";
import PropTypes from "prop-types";
import TimeTableSelection from "./TimeTableSelection";
import GameHeader from "../shared/GameHeader";
import ProgressBar from "../shared/ProgressBar";
import ProgressBarVertical from "../shared/ProgressBarVertical";
import Lottie from "../helpers/lazy-loading-components/Lazy-Lottie-Player";
import Button from "../shared/Button";
import ViewResult from "../shared/ViewResult";
import Result from "./Result";

import styles from "./GameScreen.module.scss";
import { Suspense } from "react";

function GameScreen(props) {
  return !props.isGameStart ? (
    <TimeTableSelection
      arrTable={props.arrTable}
      name={props.name}
      handleTotalGameTime={props.handleTotalGameTime}
      handleCountdown={props.handleCountdown}
      handleSelectedTables={props.handleSelectedTables}
      handleGameStart={props.handleGameStart}
    />
  ) : (
    <>
      <div className={styles.container}>
        <GameHeader name="Time Tables" />
        <div className={styles.tablesAndTime}>
          <div className={styles.selectedTables}>
            <h4>Tables Selected</h4>
            {props.selectedTables.map((table) => {
              return <span key={table}>{table}</span>;
            })}
          </div>
          <div className={styles.timeDropdown}></div>
        </div>
        <div className={styles.resetBtnContainer}>
          <Button
            title="Reset"
            background="orange"
            radius="25"
            onClick={props.handleGameReset}
          />
        </div>
        <div className={styles.main}>
          {props.isGameEnd === false ? (
            props.question.length === 0 ? null : (
              <>
                <ProgressBar timer={props.timer} timePerQues={props.countdown} />
                <ProgressBarVertical timer={props.timer} timePerQues={props.countdown} />
              </>
            )
          ) : null}

          <div className={styles.game}>
            {props.isGameEnd === false ? (
              props.isLottie ? (
                <Suspense fallback={<></>}>
                  <Lottie
                    loop
                    animationData={
                      props.isAnsRight ? props.lottieSuccess : props.lottieWrong
                    }
                    play
                    style={
                      props.isAnsRight
                        ? { width: "300px", height: "auto" }
                        : { width: "280px", height: "auto" }
                    }
                  />
                </Suspense>
              ) : (
                <>
                  {props.question.length === 0 ? null : (
                    <>
                      <div className={styles.question}>
                        <div className={styles.left}>
                          <h1 className={styles.questionValue}>
                            {props.question[props.question.length - 1].num1} &#215;{" "}
                            {props.question[props.question.length - 1].num2}
                          </h1>
                          <h1 className={styles.equalSign}>=</h1>
                        </div>
                        <form
                          onChange={props.handleInputChange}
                          onSubmit={(e) => {
                            e.preventDefault();
                            props.nextQuestion([...props.question]);
                          }}
                        >
                          <input
                            placeholder="Type"
                            autoFocus
                            name="response"
                            type="number"
                            value={props.inputCurrAns != null ? props.inputCurrAns : ""}
                          />
                        </form>
                      </div>
                    </>
                  )}
                  <div className={styles.controller}>
                    <Button
                      title={`${props.question.length === 0 ? "START" : "SUBMIT"}`}
                      background="orange"
                      radius="25"
                      onClick={() => {
                        props.nextQuestion(props.question);
                      }}
                    />
                  </div>
                </>
              )
            ) : (
              <>
                <ViewResult playAgain={props.isGameReset} onClick={props.handleResult} />
              </>
            )}
          </div>
          {props.isGameEnd === false ? (
            <div className={styles.questionCounter}>
              {props.question.length === 0 ? null : (
                <div>
                  Question <span> {props.question.length} of 25 </span>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
      <Result
        name={props.name}
        arrTable={props.arrTable}
        finalResult={props.finalResult}
        selectedTables={props.selectedTables}
        openResult={props.openResult}
        handleCloseResult={props.handleCloseResult}
        isGameReset={props.isGameReset}
      />
    </>
  );
}

GameScreen.propTypes = {
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

export default GameScreen;
