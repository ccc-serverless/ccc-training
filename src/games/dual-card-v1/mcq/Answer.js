import React from "react";
import style from "./Answer.module.scss";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import Lottie from "react-lottie-player";

import { useGameEngine } from "./engine/GameEngineProvider";
import clsx from "clsx";

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

export default function Answer() {
  const { state, handleChangeInput, handleShowSolution } = useGameEngine();

  const { runData, screenState } = state;

  const { questionsAll, questionIndex } = runData;
  const { showSubmitButton } = screenState;

  const currQuestion = questionsAll[questionIndex];

  const classes = useStyles();

  //ugly func
  function getCardBackground() {
    if (screenState.lottie.isActive) {
      if (screenState.lottie.isCorrect) return style.correctBackground;
      else return style.incorrectBackground;
    } else {
      return style.neutralBackground;
    }
  }

  return (
    <div className={clsx(style.wrapper, getCardBackground())}>
      {screenState.lottie.isActive ? (
        <div className={style.lottieContainer}>
          <Lottie
            loop={false}
            play
            animationData={screenState.lottie.data}
            style={{ width: 160, height: 160 }}
          />
        </div>
      ) : (
        <>
          <div className={style.title}>SELECT THE CORRECT OPTION</div>
          <div className={style.options}>
            <RadioGroup
              aria-label="answer"
              name="answer"
              value={runData.currAnswer}
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
                    disabled={
                      !screenState.showSolutionButton && !screenState.showSolution
                    }
                    value={keys[1]}
                    label={keys[1]}
                  />
                );
              })}
            </RadioGroup>
          </div>
          <div className={style.solutionDisplay}>
            {screenState.showSolution && (
              <div className={style.solution}>
                <div>Answer</div>
                <div>{currQuestion.options[currQuestion.answer]}</div>
              </div>
            )}
            {screenState.showSolutionButton && (
              <div className={style.solutionTrigger}>
                <p>stuck?</p>
                <button onClick={handleShowSolution}>see solution</button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
