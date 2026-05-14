import React from "react";
import Button from "./Button";
import style from "./ViewResult.module.scss";
const ViewResult = (props) => {
  return (
    <div className={style.result}>
      <h4 className={style.resultTitle}>Game Ended!</h4>
      <div className={style.buttonsWrapper}>
        <div className={style.buttonWrapper}>
          <Button
            className={style.bigButton}
            title="View Result"
            background="orange"
            radius="25"
            onClick={props.onClick}
          />
        </div>
        <div className={style.buttonWrapper}>
          <Button
            className={style.bigButton}
            title="Play Again"
            background="orange"
            radius="25"
            onClick={props.playAgain}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewResult;
