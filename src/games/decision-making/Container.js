import React, { useState, useEffect } from "react";
import style from "./Container.module.scss";

import KonvaCanvas from "./KonvaCanvas";
import HTMLReactParser from "html-react-parser";

import useTree from "./helpers/_hook_useTree";
import { useGetQuestions } from "./helpers/_hook_useGetQuestions";
import useUploadResult from "views/CourseLearning/active-content/engine/useUploadResult";

import GameClockV2 from "../shared/GameClockV2";
import ResultOnlySpeed from "../shared/ResultOnlySpeed";

let gameTimer = null;

export default function Container({ name, id }) {
  const [canvasDrawings, setCanvasDrawings] = useState([]);
  const { questions, getQuestions, setNextQuestion, isPoolRem, resetQuestions } =
    useGetQuestions();
  const { getCanvasDrawings } = useTree();

  const { uploadResult } = useUploadResult();

  const [isGameStart, setIsGameStart] = useState(false);
  const [isGameEnd, setIsGameEnd] = useState(false);

  const [isOpenResultModal, setIsOpenResultModal] = useState(false);
  const [totTimeElapsed, setTotTimeElapsed] = useState(0);

  const [result, setResult] = useState(null);

  function handleStartGame() {
    getQuestions();
    startTimer();
    setIsGameStart(true);
  }

  useEffect(() => {
    if (questions.length) {
      setCanvasDrawings(getCanvasDrawings(questions[questions.length - 1].flowchart));
    }
  }, [questions.length]);

  function startTimer() {
    gameTimer = window.setInterval(() => {
      setTotTimeElapsed((prev) => prev + 10);
    }, 10);
  }

  function stopTimer() {
    window.clearInterval(gameTimer);
    gameTimer = null;
  }

  function calculateResult() {
    setResult({
      speed: parseFloat(parseFloat(totTimeElapsed / 1000 / questions.length).toFixed(2)),
    });
  }

  function nextQuestion() {
    if (isPoolRem()) setNextQuestion();
    else {
      setIsGameEnd(true);
      stopTimer();
      calculateResult();
    }
  }

  function handleResultModal() {
    setIsOpenResultModal((prev) => !prev);
  }

  function resetGame() {
    resetQuestions();
    setIsGameStart(false);
    setIsGameEnd(false);
    setTotTimeElapsed(0);
    setResult(null);
  }

  useEffect(() => {
    if (result !== null && result !== undefined) {
      handleResultModal();
      uploadResult({
        gameId: id,
        arrData: [],
        result: { speed: result.speed, accuracy: null },
      });
    }
  }, [result]);

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div className={style.title}>Decision Making</div>
        {isGameStart && (
          <div className={style.subtitle}>
            <p>
              {questions.length
                ? HTMLReactParser(questions[questions.length - 1].question)
                : ""}
            </p>
          </div>
        )}
      </div>
      <div className={style.konvaWrapper}>
        <div className={style.gameClockWrapper}>
          <GameClockV2 totTimeElapsed={totTimeElapsed} />
        </div>

        {isOpenResultModal && (
          <ResultOnlySpeed
            isOpen={isOpenResultModal}
            handleClose={handleResultModal}
            result={result}
          />
        )}

        <KonvaCanvas
          isGameStart={isGameStart}
          isGameEnd={isGameEnd}
          canvasDrawings={canvasDrawings}
          checkEndGame={nextQuestion}
          handleStartGame={handleStartGame}
          resetGame={resetGame}
          handleResultModal={handleResultModal}
          stopTimer={stopTimer}
          startTimer={startTimer}
        />
      </div>
    </div>
  );
}
