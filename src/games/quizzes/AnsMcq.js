import React, { useEffect } from "react";
import style from "./Answer.module.scss";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { useSpring, animated } from "react-spring";
import { useParams } from "react-router-dom";

import Preloader from "components/shared/Preloader";

import { useUser } from "contexts/AllContexts";
import { useTags } from "./_common/TagsContext";

const useStyles = makeStyles({
  root: {
    color: "white",
  },
  label: {
    "&.Mui-disabled": {
      color: "#DCDCDC",
    },
  },
});

const CustomRadio = withStyles({
  root: {
    color: "white",
    "&$checked": {
      color: "white",
    },
    "&$disabled": {
      color: "#DCDCDC",
    },
  },
  checked: {},
  disabled: {},
})((props) => <Radio {...props} />);

export default function (props) {
  const classes = useStyles();
  const Tags = useTags();
  const { isStart: isGameStart } = props.state.gameState;
  const questions = props.questions.asked;
  const lastIndex = questions.length - 1;
  const question = questions[lastIndex];
  const {
    showNextButton,
    showSubmitButton,
    showSolutionButton,
    showIncorrect,
    showHint,
  } = props.state.screenState;

  const [currRadioSelected, setCurrRadioSelected] = React.useState(null);

  const animateSpring = useSpring({
    to: {
      opacity: showHint ? 1 : 0,
      transform: showHint ? "translateY(0px)" : "translateY(20px)",
    },
  });

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

  function handleChange(event) {
    setCurrRadioSelected(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    let currQuesAsked = [...questions];
    let currQues = currQuesAsked[currQuesAsked.length - 1];

    if (
      !currQues.resp.length ||
      (currQues.resp.length &&
        currQues.resp[currQues.resp.length - 1] !== currRadioSelected)
    ) {
      currQues.resp.push(currRadioSelected);
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
    if (currQues.options[currQues.answer] === currResp) {
      if (!props.questions.poolRem.length) handleEndGame();
      props.dispatch({
        type: "SET_STYLE_CARD_BG",
        payload: { currState: "Correct" },
      });

      props.dispatch({
        type: "SET_SCREEN_STATE",
        payload: {
          showNextButton: true,
          showIncorrect: false,
          showCorrect: true,
          showSolutionButton: false,
          showSubmitButton: false,
        },
      });
    } else {
      props.dispatch({
        type: "SET_STYLE_CARD_BG",
        payload: { currState: "Incorrect" },
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
    props.stopTimer();
    props.dispatch({
      type: "SET_GAME_STATE",
      payload: {
        isEnd: true,
      },
    });
  }

  useEffect(() => {
    checkInput();
  }, [questions]);

  return props.isLoading ? (
    <Preloader />
  ) : (
    <div
      className={style.wrapper}
      style={{ background: props.state.style.cardBackground }}
    >
      <div className={style.answer}>
        <RadioGroup
          aria-label="answer"
          name="answer"
          value={currRadioSelected}
          onChange={handleChange}
        >
          {Object.entries(question.options).map((keys, index) => {
            return (
              <FormControlLabel
                classes={{
                  root: classes.root,
                  label: classes.label,
                }}
                control={<CustomRadio />}
                disabled={!showSubmitButton}
                value={keys[1]}
                label={keys[1]}
              />
            );
          })}
        </RadioGroup>
        {showSubmitButton && (
          <div className={style.submitContainer}>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        )}
      </div>
      <div className={style.ansIndicator}>
        {showNextButton && isGameStart ? (
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
          <p>{question.options[question.answer]}</p>
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
