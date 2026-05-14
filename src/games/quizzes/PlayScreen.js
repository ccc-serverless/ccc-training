import React from "react";
import style from "./PlayScreen.module.scss";

import Question from "./Question";
import Mcq from "./AnsMcq";
import Sequence from "./AnsSequence";
import WordProblems from "./AnsWordProblems";
import ResultModal from "./ResultModal";

export default function (props) {
  return (
    <div className={style.wrapper}>
      <div className={style.cardWrapper}>
        <Question {...props} />
        <Router {...props} />
        {props.state.screenState.showNextButton && (
          <button onClick={props.handleClickNext} className={style.nextButton}>
            {props.state.gameState.isEnd ? "View Result" : "Next"}
          </button>
        )}
      </div>
      <div className={style.resetContainer}>
        <button onClick={props.reset}>Reset</button>
      </div>
      <ResultModal {...props} />
    </div>
  );
}

function Router(props) {
  function renderGame(name) {
    switch (name) {
      case "Word Problems":
        return <WordProblems {...props} />;
      case "Mcq":
        return <Mcq {...props} />;
      case "Sequence":
      case "Flowchart Sequencing":
        return <Sequence {...props} />;
      default:
        return null;
    }
  }

  return renderGame(props.name);
}
