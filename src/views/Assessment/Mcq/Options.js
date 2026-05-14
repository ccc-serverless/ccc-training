import React, { useState, useEffect } from "react";
import style from "./Options.module.scss";

import clsx from "clsx";
import ReactHTMLParser from "react-html-parser";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import { useGameEngine } from "./engine/GameEngineProvider";

const Label = ({ label }) => {
  if (label.substring(0, 2) === "<p")
    return <span className={style.choiceLabel}>{ReactHTMLParser(label)}</span>;
  else return <span className={style.choiceLabel}>{label}</span>;
};

const useStyles = makeStyles({
  root: {
    color: "white !important",
    minWidth: "150px",
  },
  selected: {
    color: "#6a2c70",
  },
  label: {
    color: "white !important",
    "&.Mui-disabled": {
      color: "#DCDCDC",
    },
  },
});

const CustomRadio = withStyles({
  root: {
    color: "white !important",
    "&$checked": {
      color: "#6a2c70",
    },
    "&$disabled": {
      color: "#DCDCDC",
    },
  },
  checked: {},
  disabled: {},
})((props) => <Radio {...props} />);

export default function Options({ question }) {
  const classes = useStyles();

  const [localState, setLocalState] = useState({
    currAns: "",
    options: [],
    isOptionParsed: false,
  });
  const { state, handleChangeInput } = useGameEngine();

  function parseOptions() {
    let arr = [];
    for (const key in question.options) {
      arr.push({ key: key, value: question.options[key] });
    }

    const currAns = question.responses[question.responses.length - 1];
    setLocalState({ currAns, options: arr });
  }

  useEffect(() => {
    parseOptions();
  }, [state.runData.activeQuestionNumber]);

  useEffect(() => {
    const currAns = question.responses[question.responses.length - 1];
    setLocalState((prev) => ({ ...prev, currAns }));
  }, [state.runData.currResponse]);

  return (
    <div className={style.wrapper}>
      <RadioGroup name={"answer"} value={localState.currAns} onChange={handleChangeInput}>
        {localState.options.map((item) => (
          <div
            key={item.value}
            className={clsx(localState.currAns === item.value && style.radioWrapper)}
          >
            {console.log(item)}
            <FormControlLabel
              classes={{
                root: localState.currAns === item.value ? classes.selected : classes.root,
                label: classes.label,
              }}
              control={<CustomRadio />}
              value={item.key}
              label={<Label label={item.value} />}
            />
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
