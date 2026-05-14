import React, { useState, useEffect, createContext } from "react";
import styles from "./InputOutput.module.scss";

import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useUser } from "contexts/AllContexts";

import ProcessHandles from "./ProcessHandles";
import ProcessFlow from "./ProcessFlow";
import clsx from "clsx";

import { useMarkItemCompleted } from "../../engine/useMarkItemCompleted";

import { FiChevronRight } from "react-icons/fi";

import PROCESS_QUESTIONS from "./_questionsInputProcessOutput.json";
export const FlowChartContext = createContext();

export default function InputOutput({ quesType }) {
  const [droppedProcess, setDroppedProcess] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [validateAnswer, SetValidateAnswer] = useState(null);
  const [quesCounter, setQuesCounter] = useState(0);
  const [isGameEnd, setIsGameEnd] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const User = useUser();

  const { upload } = useMarkItemCompleted();

  const itemNo = parseInt(params.itemNumber);
  const moduleNo = parseInt(params.moduleNumber);

  function handleDropProcess(process) {
    setDroppedProcess({
      id: process.id,
      name: process.name,
    });

    let answer = questions.answer.toLowerCase();
    let droppedAns = process.name.toLowerCase();

    if (droppedAns === answer) {
      SetValidateAnswer({
        isCorrect: true,
        text: "Correct!",
        answer_description: questions.answer_description,
      });
    } else {
      SetValidateAnswer({
        isCorrect: false,
        text: "Incorrect!",
      });
    }
  }

  function handleNext() {
    if (quesCounter !== PROCESS_QUESTIONS[quesType].length - 1) {
      setQuesCounter((prev) => {
        setQuestions(PROCESS_QUESTIONS[quesType][prev + 1]);
        return prev + 1;
      });
      setDroppedProcess(null);
      SetValidateAnswer(null);
    } else {
      setIsGameEnd(true);
      upload();
    }
  }

  function resetGame() {
    setDroppedProcess(null);
    SetValidateAnswer(null);
    setQuesCounter(0);
    setIsGameEnd(false);
  }

  function getCurrCourse() {
    return User.state.activeCourses.find((f) => f._id == params.activeCourseId)
      .courseDetails[0];
  }

  function nextTopic() {
    resetGame();
    setIsGameEnd(false);
    let currCourse = getCurrCourse();
    let modulesCount = currCourse.modules.length;
    let totalItems = currCourse.modules[moduleNo - 1].items.length;

    if (itemNo < totalItems) {
      navigate(`/course/learn/${params.activeCourseId}/${moduleNo}/${itemNo + 1}`);
    } else if (itemNo == totalItems) {
      if (moduleNo < modulesCount)
        navigate(`/course/learn/${params.activeCourseId}/${moduleNo + 1}/${1}`);
    }
  }

  useEffect(() => {
    setQuestions(PROCESS_QUESTIONS[quesType][quesCounter]);
  }, [quesType]);

  useEffect(() => {
    resetGame();
  }, [location]);

  return (
    questions && (
      <FlowChartContext.Provider value={{ handleDropProcess }}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div className={styles.ques}>
              <p>Question: {questions.question}</p>
              <p>Drag and drop the correct block</p>
            </div>
            {!isGameEnd && (
              <div className={styles.controller}>
                <button
                  className={clsx(
                    validateAnswer && validateAnswer.isCorrect && styles.active
                  )}
                  onClick={handleNext}
                >
                  Next <FiChevronRight />
                </button>
              </div>
            )}
          </div>
          <div className={styles.flowchartDnd}>
            {!isGameEnd ? (
              <>
                <div className={styles.processWrapper}>
                  {questions.draggables.map((draggable) => (
                    <ProcessHandles
                      name={draggable.name}
                      id={draggable.id}
                      key={draggable.id}
                    />
                  ))}
                </div>
                <div className={styles.processFlowWrapper}>
                  <ProcessFlow flow={questions.flow}>
                    {droppedProcess && (
                      <ProcessHandles name={droppedProcess.name} id={droppedProcess.id} />
                    )}
                  </ProcessFlow>
                </div>
                {validateAnswer && (
                  <div className={styles.answerStatus}>
                    <p
                      className={clsx(
                        validateAnswer.isCorrect ? styles.correct : styles.incorrect
                      )}
                    >
                      {validateAnswer.text}
                    </p>
                    <p>{validateAnswer.answer_description}</p>
                  </div>
                )}
                <div className={styles.counter}>
                  Ques. {quesCounter + 1} of {PROCESS_QUESTIONS[quesType].length}
                </div>
              </>
            ) : (
              <div className={styles.endgame}>
                <p>Superb! You have answered all questions</p>
                <button onClick={resetGame}>
                  Try Again <FiChevronRight />
                </button>
                <button onClick={nextTopic}>
                  Proceed to next topic <FiChevronRight />
                </button>
              </div>
            )}
          </div>
        </div>
      </FlowChartContext.Provider>
    )
  );
}
