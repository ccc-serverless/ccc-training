import React, { useState } from "react";
import style from "./DecisionGame.module.scss";

import ReactSpeedometer from "react-d3-speedometer";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper/core";

import { RotateCw } from "react-feather";
import { useMarkItemCompleted } from "../../engine/useMarkItemCompleted";

const _questions = [
  {
    id: "1",
    question: "Do you wanna play in rain?",
    options: ["Yes", "Maybe", "No", "Don't Know"],
  },
  {
    id: "2",
    question: "Are you hungry?",
    options: ["Yes", "Maybe", "No", "Don't Know"],
  },
  {
    id: "3",
    question: "Are you happy?",
    options: ["Yes", "Maybe", "No", "Don't Know"],
  },
  {
    id: "4",
    question: "Do you want to go out today?",
    options: ["Yes", "Maybe", "No", "Don't Know"],
  },
];

SwiperCore.use([Pagination, Autoplay]);

export default function DecisionGame() {
  const [currQuesIndex, setCurrQuesIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [result, setResult] = useState(0);

  const [swiper, setSwiper] = useState(null);

  const { upload } = useMarkItemCompleted();

  function handleClickCircle(ans) {
    let updateAns = [...answers];
    if (ans === "Yes" || ans === "No") {
      updateAns.push(1);
    } else {
      updateAns.push(0);
    }
    setAnswers(updateAns);
    if (currQuesIndex < _questions.length - 1) {
      swiper.slideNext();
      setCurrQuesIndex((prev) => prev + 1);
    } else {
      calculateResult(updateAns);
      setIsGameEnd(true);
      upload();
    }
  }

  function calculateResult(ansArr) {
    let correctCount = 0;
    ansArr.forEach((ans) => {
      if (ans == 1) {
        correctCount++;
      }
    });
    let correctPercent = (correctCount / ansArr.length) * 100;
    setResult(correctPercent);
  }

  function retry() {
    setAnswers([]);
    setResult(0);
    setCurrQuesIndex(0);
    setIsGameEnd(false);
  }

  function highlightQuadrant(type) {
    switch (type) {
      case "average":
        if (result <= 70) {
          return style.active;
        }
        break;
      case "good":
        if (result <= 80 && result > 70) {
          return style.active;
        }
        break;
      case "great":
        if (result <= 90 && result > 80) {
          return style.active;
        }
        break;
      case "excellent":
        if (result <= 100 && result > 90) {
          return style.active;
        }
        break;
      default:
        break;
    }
  }

  return (
    <div className={style.wrapper}>
      <div className={style.maxWidthContainer}>
        {!isGameEnd ? (
          <Swiper
            className={style.swiperContainer}
            spaceBetween={20}
            slidesPerView={1}
            allowTouchMove={false}
            speed={500}
            onSwiper={(swiper) => {
              setSwiper(swiper);
            }}
          >
            {_questions.map((quesn, index) => (
              <SwiperSlide className={style.slide} key={`quesn${index}`}>
                <div>
                  <div className={style.header}>
                    <p>Question: {_questions[index].question}</p>
                    <div className={style.controller}>
                      <p>Select your answer</p>
                    </div>
                  </div>
                  <div className={style.container}>
                    <div className={style.top}>
                      <p>
                        Ques. {index + 1} of {_questions.length}
                      </p>
                    </div>
                    <div className={style.circleRow}>
                      <div className={style.circles}>
                        {_questions[currQuesIndex].options.slice(0, 2).map((item) => (
                          <div
                            key={item}
                            className={style.circle}
                            onClick={handleClickCircle.bind(this, item)}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                      <div className={style.circles}>
                        {_questions[currQuesIndex].options.slice(2, 4).map((item) => (
                          <div
                            key={item}
                            className={style.circle}
                            onClick={handleClickCircle.bind(this, item)}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={style.result}>
            <div className={style.header}>
              <p>Result</p>
              <div className={style.controller}>
                <p>Below is your decision making score</p>
                <button onClick={retry}>
                  <RotateCw />
                  Retry
                </button>
              </div>
            </div>

            <div className={style.graphs}>
              <div className={style.speedometerContainer}>
                <div className={style.speedometer}>
                  <p className={style.start}>0</p>
                  <p className={style.current}>{result}%</p>
                  <p className={style.end}>100%</p>
                  <ReactSpeedometer
                    ringWidth={25}
                    needleHeightRatio={0.8}
                    width={200}
                    height={130}
                    maxSegmentLabels={0}
                    segments={1}
                    maxValue={100}
                    minValue={0}
                    value={result}
                    needleColor="#f08a5d"
                    startColor={"#6a2c70"}
                    endColor={"#6a2c70"}
                  />
                </div>
                <p className={style.speedometerCaption}>Score</p>
              </div>
              <div className={style.quadrant}>
                <div className={style.arrow}></div>
                <div className={style.arrow}></div>
                <div className={style.row}>
                  <div className={style.quad}>
                    <p className={highlightQuadrant("great")}>Great</p>
                    <p>81-90</p>
                  </div>
                  <div className={style.quad}>
                    <p className={highlightQuadrant("excellent")}>Excellent 😎</p>
                    <p>91-100</p>
                  </div>
                </div>
                <div className={style.row}>
                  <div className={style.quad}>
                    <p className={highlightQuadrant("average")}>Average</p>
                    <p>0-70</p>
                  </div>
                  <div className={style.quad}>
                    <p className={highlightQuadrant("good")}>Good</p>
                    <p>71-80</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
