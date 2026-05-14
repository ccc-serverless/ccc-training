import React from "react";
import Button from "./Button";
import style from "./ViewResult.module.scss";

const ViewResult = ({ handleClickViewResult, handleClickPlayAgain }) => {
  return (
    <div className={style.result}>
      <h4 className={style.resultTitle}>Game Ended!</h4>
      <div className={style.buttonsWrapper}>
        <div className={style.buttonWrapper}>
          <Button
            className={style.bigButton}
            background="orange"
            radius="25"
            onClick={handleClickViewResult}
          >
            View Result
          </Button>
        </div>
        <div className={style.buttonWrapper}>
          <Button
            className={style.bigButton}
            background="orange"
            radius="25"
            onClick={handleClickPlayAgain}
          >
            Play Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewResult;
