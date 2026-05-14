import React, { useRef, useEffect } from "react";
import style from "./Answer.module.scss";

import { useSpring, animated } from "react-spring";

import Preloader from "components/shared/Preloader";
import { useGameEngine } from "./engine/GameEngineProvider";

export default function AnswerWordProbs(props) {
  const inputRef = useRef();

  const { state, handleChangeInput, handleSubmitAnswer, handleClickShowSolution } =
    useGameEngine();

  const { runData, gameState, screenState } = state;

  const { questionsAsked } = runData;
  const currQuestion = questionsAsked[questionsAsked.length - 1];
  const {
    showNextButton,
    showSubmitButton,
    showSolutionButton,
    showIncorrect,
    showHint,
  } = screenState;

  const animateSpring = useSpring({
    to: {
      opacity: showHint ? 1 : 0,
      transform: showHint ? "translateY(0px)" : "translateY(20px)",
    },
  });

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.value = "";
  }, [state.runData.questionsAsked.length]);

  return !currQuestion ? (
    <Preloader />
  ) : (
    <div className={style.wrapper}>
      <p className={style.title}>Write correct answer</p>
      <div className={style.answer}>
        <form onChange={handleChangeInput} onSubmit={handleSubmitAnswer}>
          <input
            ref={inputRef}
            type="text"
            name="ans"
            placeholder="Type here..."
            required
          />
          {showSubmitButton && <button>Submit</button>}
        </form>
      </div>
      <div className={style.ansIndicator}>
        {showNextButton && gameState.isStart ? (
          <div className={style.answerDesc}>
            <span>Correct</span>
            <p>{currQuestion.answer_description}</p>
          </div>
        ) : null}
        {showIncorrect && gameState.isStart ? (
          <div className={style.answerDesc}>
            <span>Incorrect</span>
            <p>{"Please enter the right answer to continue"}</p>
          </div>
        ) : null}
      </div>

      {showHint ? (
        <animated.div className={style.solutionText} style={animateSpring}>
          <p>Answer</p>
          <p>{currQuestion.answer}</p>
        </animated.div>
      ) : null}

      {showSolutionButton && !showHint && (
        <div className={style.solution}>
          <p>
            stuck?
            <button onClick={handleClickShowSolution}>see solution</button>
          </p>
        </div>
      )}
    </div>
  );
}
