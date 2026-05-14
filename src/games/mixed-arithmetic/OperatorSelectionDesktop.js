import React, { useState, useEffect, useRef } from "react";
import styles from "./OperatorSelectionDesktop.module.scss";

import clsx from "clsx";
import { FiArrowRightCircle, FiX } from "react-icons/fi";

import useWindowDimensions from "utils/hooks/useWindowDimensions";

export default function OperatorSelectionMobile({
  operatorsArr,
  maxQuesArr,
  levelsArr,
  screen,
  state,
  startGame,
  handleSelectOperator,
  handleDeselectOperator,
  handleClickDiffBox,
  getImageForOperator,
}) {
  const [isOverflow, setIsOverflow] = useState(false);

  const wrapperRef = useRef();
  const { height, width } = useWindowDimensions();

  return (
    <div ref={wrapperRef} className={clsx(styles.wrapper)}>
      <div className={styles.heading}>
        <p>Arithmetic Games</p>
        <p>Select arithmetic operator to continue</p>
      </div>

      {/* Operator Screeen  */}
      <div className={styles.operators}>
        {operatorsArr.map((row) => (
          <div className={styles.operatorsRow}>
            {row.map((op) => (
              <div
                key={op}
                className={clsx(
                  styles.operator,
                  screen.difficulty && styles.selected,
                  !(state.gameSettings.operator === op) && screen.difficulty && styles.hidden
                )}
                onClick={handleSelectOperator.bind(this, op)}
              >
                <button
                  className={clsx(styles.close, !screen.difficulty && styles.hidden)}
                  onClick={handleDeselectOperator}
                >
                  <FiX />
                </button>
                <div className={styles.icon}>
                  <img src={getImageForOperator(op)} alt="" />
                </div>
                <p>{op}</p>
              </div>
            ))}
          </div>
        ))}

        {/* Difficulty Selection Screen  */}
        <div className={clsx(styles.difficultyWrapper, !screen.difficulty && styles.hidden)}>
          <div className={styles.difficultySection}>
            <p>Select Level</p>
            <div className={styles.difficultyBoxes}>
              {levelsArr.map((lvl) => (
                <div
                  key={lvl}
                  className={clsx(
                    styles.difficulty,
                    state.gameSettings.level === lvl && styles.selectedDifficulty
                  )}
                  onClick={handleClickDiffBox.bind(this, "level", lvl)}
                >
                  {lvl}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.difficultySection}>
            <p>Select Number of questions</p>
            <div className={styles.difficultyBoxes}>
              {maxQuesArr.map((ques) => (
                <div
                  key={ques}
                  className={clsx(
                    styles.difficulty,
                    state.gameSettings.maxQuestions === ques && styles.selectedDifficulty
                  )}
                  onClick={handleClickDiffBox.bind(this, "questions", ques)}
                >
                  {ques}
                </div>
              ))}
            </div>
          </div>

          {/* Start Button  */}
          <button onClick={startGame} className={styles.difficultyController}>
            START <FiArrowRightCircle />
          </button>
        </div>
      </div>
    </div>
  );
}
