import React from "react";
import style from "./Answer.module.scss";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import Preloader from "components/shared/Preloader";
import { useGameEngine } from "./engine/GameEngineProvider";

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

export default function AnswerMcq(props) {
  const classes = useStyles();

  const { state, handleChangeInput } = useGameEngine();

  const { runData, screenState } = state;

  const { questionsAsked } = runData;
  const { showSubmitButton } = screenState;

  const currQuestion = questionsAsked[questionsAsked.length - 1];

  return !currQuestion || !currQuestion.options ? (
    <Preloader />
  ) : (
    <div className={style.wrapper}>
      <p className={style.title}>Select correct option</p>
      <div className={style.answer}>
        <RadioGroup
          aria-label="answer"
          name="answer"
          value={runData.currAnswer.radioInput ? runData.currAnswer.radioInput : ""}
          onChange={handleChangeInput}
        >
          {Object.entries(currQuestion.options).map((keys, index) => {
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
      </div>
      {/* <div className={style.ansIndicator}>
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
      </div> */}
    </div>
  );
}
