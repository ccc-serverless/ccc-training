import React, { useState, useRef, useEffect } from "react";
import style from "./Answer.module.scss";

import { useSpring, animated } from "react-spring";

import Preloader from "components/shared/Preloader";
import { useTags } from "./_common/TagsContext";

export default function (props) {
  const Tags = useTags();
  const flipQuizForm = useRef();
  const inputRef = useRef();
  const [input, setInput] = useState({ ans: "" });

  //Props derived variables
  const { isStart: isGameStart } = props.state.gameState;
  const questions = props.questions.asked;
  const lastIndex = questions.length - 1;
  const question = questions[lastIndex];
  const { showSubmitButton, showSolutionButton, showCorrect, showIncorrect, showHint } =
    props.state.screenState;
  const lastIndexQues = questions.length - 1;
  const animateSpring = useSpring({
    to: {
      opacity: showHint ? 1 : 0,
      transform: showHint ? "translateY(0px)" : "translateY(10px)",
    },
  });

  function handleChangeInput(e) {
    const { name, value } = e.target;
    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    let currQuesAsked = [...questions];
    let currQues = currQuesAsked[lastIndexQues];

    if (
      !currQues.resp.length ||
      (currQues.resp.length &&
        currQues.resp[currQues.resp.length - 1].toString().toLowerCase() !==
          input.ans.toString().toLowerCase())
    ) {
      currQues.resp.push(input.ans);
      inputRef.current.focus();
    }

    props.setQuestions((prev) => {
      return { ...prev, asked: currQuesAsked };
    });
  }

  function checkInput() {
    if (questions.length < 1) return;

    let currQues = question;
    if (!currQues.resp.length) return;

    let currResp = currQues.resp[currQues.resp.length - 1];

    if (currQues.answer.toString().toLowerCase() === currResp.toString().toLowerCase()) {
      if (!props.questions.poolRem.length) handleEndGame();

      inputRef.current.disabled = true;
      props.dispatch({
        type: "SET_STYLE_CARD_BG",
        payload: {
          currState: "Correct",
        },
      });
      props.dispatch({
        type: "SET_SCREEN_STATE",
        payload: {
          showNextButton: true,
          showIncorrect: false,
          showCorrect: true,
          showHint: false,
          showSubmitButton: false,
          showSolutionButton: false,
        },
      });
    } else {
      props.dispatch({
        type: "SET_STYLE_CARD_BG",
        payload: {
          currState: "Incorrect",
        },
      });
      props.dispatch({
        type: "SET_SCREEN_STATE",
        payload: {
          showNextButton: false,
          showIncorrect: true,
          showCorrect: false,
        },
      });
    }
  }

  function handleEndGame() {
    props.calculateResult(Tags);
    props.dispatch({
      type: "SET_GAME_STATE",
      payload: {
        isEnd: true,
      },
    });
  }

  function handleClickShowSolution() {
    props.dispatch({
      type: "SET_SCREEN_STATE",
      payload: {
        showHint: true,
      },
    });
    let currQuesAsked = [...questions];
    let currQues = currQuesAsked[currQuesAsked.length - 1];
    currQues.isHintTaken = true;
    props.setQuestions((prev) => {
      return { ...prev, asked: currQuesAsked };
    });
  }

  useEffect(() => {
    if (questions.length >= 1) {
      inputRef.current.disabled = false;
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }, [questions.length]);

  useEffect(() => {
    checkInput();
  }, [questions]);

  return !props.isLoading ? (
    <div style={{ background: props.state.style.cardBackground }} className={style.wrapper}>
      <div className={style.answer}>
        <form onChange={handleChangeInput} onSubmit={handleSubmit} ref={flipQuizForm}>
          <label>Type Answer</label>
          <input ref={inputRef} type="text" name="ans" placeholder="Type here..." />
          {showSubmitButton && <button>Submit</button>}
        </form>
      </div>
      <div className={style.ansIndicator}>
        {showCorrect && isGameStart ? (
          <div className={style.answerDesc}>
            <span>Correct</span>
            <p>{question.answer_description}</p>
          </div>
        ) : null}
        {showIncorrect && isGameStart ? (
          <div className={style.answerDesc}>
            <span>Incorrect</span>
            <p>{"Please enter the right answer to continue"}</p>
          </div>
        ) : null}
      </div>

      {showHint ? (
        <animated.div className={style.solutionText} style={animateSpring}>
          <p>Answer</p>
          <p>{question.answer}</p>
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
  ) : (
    <Preloader />
  );
}
