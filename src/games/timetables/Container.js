import React, { useEffect, useState } from "react";

import TableToTen from "./TableToTen";
import TableToTwenty from "./TableToTwenty";
import lottieSuccess from "assets/lottie/success.json";
import lottieWrong from "assets/lottie/wrong.json";
import { getRandomNumber } from "utils/helper";

import useUploadResult from "views/CourseLearning/active-content/engine/useUploadResult";

let int, tim, timLottie, tim2, quesnDelayTim;
const maxNumberOfQuestion = 25;

const TimeTables = (props) => {
  const { uploadResult } = useUploadResult();

  const [isGameStart, setIsGameStart] = useState(false);
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [selectedTables, setSelectedTables] = useState([]);

  const [inputCurrAns, setInputCurrAns] = useState(null);
  const [isAnsRight, setIsAnsRight] = useState(false);
  const [isLottie, setIsLottie] = useState(false);

  const [questions, setQuestions] = useState([]);

  const [timer, setTimer] = useState(null);
  const [countdown, setCountdown] = useState(null);

  const [finalResult, setFinalResult] = useState({
    accuracy: [],
    avgSpeed: [],
  });

  const [openResult, setOpenResult] = useState(false);

  const [isShowSecondsLeft, setIsShowSecondsLeft] = useState(true);

  function handleGameReset() {
    clearTimeoutsAndIntervals();
    setTimer(null);
    setCountdown(null);
    setIsGameStart(false);
    setIsGameEnd(false);
    setSelectedTables([]);
    setInputCurrAns(null);
    setInputCurrAns(true);
    setIsLottie(false);
    setQuestions([]);
    setFinalResult({
      accuracy: [],
      avgSpeed: [],
    });
    int = tim = timLottie = tim2 = quesnDelayTim = null;
    setOpenResult(false);
  }

  function handleSelectedTables(arrTables) {
    setSelectedTables(arrTables);
  }

  function handleGameStart(bool_val) {
    setIsGameStart(bool_val);
  }

  function handleCloseResult() {
    setOpenResult(false);
  }
  function handleTotalGameTime(value) {
    // setTotalGameTime(value);
  }

  function handleCountdown(value) {
    setCountdown(value);
  }

  function clearTimeoutsAndIntervals() {
    clearTimeout(tim);
    clearTimeout(tim2);
    clearTimeout(quesnDelayTim);
    clearInterval(int);
    clearTimeout(timLottie);
  }

  function generateNextQuestion(questions) {
    let newQuestions = [...questions];

    const num1 = parseInt(selectedTables[getRandomNumber(0, selectedTables.length)]);
    const num2 = getRandomNumber(0, 10);
    newQuestions.push({
      num1,
      num2,
      ans: num1 * num2,
      resp: null,
      time: null,
    });

    setQuestions((prev) => [
      ...prev,
      {
        num1,
        num2,
        ans: num1 * num2,
        resp: null,
        time: null,
      },
    ]);
    setTimer(countdown);

    int = setInterval(() => {
      setTimer((prev) => (prev === 0 ? 0 : prev - 0.1));
    }, 100);

    tim = setTimeout(() => {
      setNextQuestion(newQuestions);
      setIsShowSecondsLeft(true);
    }, countdown * 1000);
  }

  function setNextQuestion(questions) {
    setIsGameEnd(false);
    clearTimeoutsAndIntervals();

    let newQuestions = [...questions];

    if (questions.length === 0) {
      setInputCurrAns(null);
      generateNextQuestion([]);
    } else {
      newQuestions[newQuestions.length - 1].resp = inputCurrAns;
      newQuestions[newQuestions.length - 1].time =
        countdown - timer === 0 ? 1 : countdown - timer;
      newQuestions[newQuestions.length - 1].timeUnit = "s";

      if (inputCurrAns === newQuestions[newQuestions.length - 1].ans) setIsAnsRight(true);
      else setIsAnsRight(false);

      setInputCurrAns(null);
      setIsLottie(true);

      quesnDelayTim = window.setTimeout(() => {
        setIsLottie(false);
        if (newQuestions.length === maxNumberOfQuestion) {
          endGame();
        } else {
          generateNextQuestion(newQuestions);
        }
      }, 1000);
    }
  }

  function handleInputChange(e) {
    setInputCurrAns(parseInt(e.target.value));
  }

  function handleResult() {
    setOpenResult(true);
  }

  async function endGame() {
    setIsGameEnd(true);
    let newData = {};

    function initializeResult() {
      return new Promise((resolve, reject) => {
        for (let i = 1; i <= 20; i++) {
          newData[i] = { data: [], accuracy: null, avgSpeed: null };
        }
        resolve();
      });
    }

    function populateResult() {
      return new Promise((resolve, reject) => {
        questions.forEach((item) => {
          newData[item.num1].data.push(item);
        });
        resolve();
      });
    }

    function calculateResult() {
      return new Promise((resolve, reject) => {
        for (let key in newData) {
          let totalRight = 0;
          let totalTimeTaken = 0;
          newData[key].data.forEach((item) => {
            if (item.ans === item.resp) {
              totalRight++;
              totalTimeTaken += item.time;
            }
          });

          newData[key].accuracy = newData[key].data.length
            ? parseFloat((totalRight / newData[key].data.length) * 100).toFixed(0)
            : null;
          newData[key].avgSpeed = newData[key].data.length
            ? parseFloat(totalTimeTaken / newData[key].data.length).toFixed(2)
            : null;
        }
        resolve();
      });
    }

    await initializeResult();
    await populateResult();
    await calculateResult();

    let newResult = { ...finalResult };
    for (let key in newData) {
      if (newData[key].data.length === 0) {
        newResult.accuracy.push(null);
        newResult.avgSpeed.push(null);
      } else {
        newResult.accuracy.push(newData[key].accuracy);
        newResult.avgSpeed.push(newData[key].avgSpeed);
      }
    }

    let totalAvgSpeed = 0;
    let totalAvgSpeedNotNull = 0;
    let totalAccuracyNotNull = 0;
    let totalAvgAccuracy = 0;

    newResult.accuracy.forEach((item) => {
      if (item !== null) {
        totalAvgAccuracy += parseFloat(item);
        totalAccuracyNotNull++;
      }
    });
    newResult.avgSpeed.forEach((item) => {
      if (item !== null) {
        totalAvgSpeed += parseFloat(item);
        totalAvgSpeedNotNull++;
      }
    });

    totalAvgSpeed /= totalAvgSpeedNotNull;
    totalAvgAccuracy /= totalAccuracyNotNull;

    totalAvgSpeed = parseFloat(totalAvgSpeed.toFixed(2));
    totalAvgAccuracy = parseFloat(totalAvgAccuracy.toFixed(2));

    setFinalResult(newResult);

    uploadResult({
      arrData: questions,
      result: { speed: totalAvgSpeed, accuracy: totalAvgAccuracy },
      gameId: props.id,
      gameSettings: {
        selectedTables,
        timePerQues: countdown,
      },
    });

    setOpenResult(true);
  }

  useEffect(() => {
    handleGameReset();
  }, [props.name]);

  useEffect(() => {
    if (!questions.length) return;

    window.setTimeout(() => {
      if (inputCurrAns === questions[questions.length - 1].ans) {
        setNextQuestion(questions);
      }
    }, 100);
  }, [inputCurrAns]);

  useEffect(() => {
    return () => {
      clearTimeoutsAndIntervals();
    };
  }, []);

  return (
    <GameRouter
      isShowSecondsLeft={isShowSecondsLeft}
      name={props.name}
      selectedTables={selectedTables}
      question={questions}
      isGameEnd={isGameEnd}
      timer={timer}
      countdown={countdown}
      isLottie={isLottie}
      lottieSuccess={lottieSuccess}
      lottieWrong={lottieWrong}
      inputCurrAns={inputCurrAns}
      handleGameReset={handleGameReset}
      handleTotalGameTime={handleTotalGameTime}
      handleCountdown={handleCountdown}
      handleSelectedTables={handleSelectedTables}
      handleGameStart={handleGameStart}
      handleInputChange={handleInputChange}
      nextQuestion={setNextQuestion}
      handleResult={handleResult}
      finalResult={finalResult}
      openResult={openResult}
      handleCloseResult={handleCloseResult}
      isGameStart={isGameStart}
      isAnsRight={isAnsRight}
      isGameReset={handleGameReset}
    />
  );
};

function GameRouter(props) {
  function getGame() {
    switch (props.name) {
      case "TimeTables 1-10":
        return <TableToTen {...props} />;
      case "TimeTables 10-20":
        return <TableToTwenty {...props} />;
      default:
        return null;
    }
  }

  return getGame();
}

export default TimeTables;
