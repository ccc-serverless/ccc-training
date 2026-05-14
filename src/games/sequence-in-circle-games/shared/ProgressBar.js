import React from "react";
import style from "./ProgressBar.module.scss";

const ProgressBar = ({ quesTimeElapsed, maxTimePerQues }) => {
  const colorArr = ["#35bf74", "#f8df01", "#cc0000"];

  const timeLeft = maxTimePerQues * 1000 - quesTimeElapsed;
  const percentTimeLeft = (timeLeft / (maxTimePerQues * 1000)) * 100;

  const percentHeight = percentTimeLeft > 0 ? percentTimeLeft : 0;
  let bgColor;

  if (percentHeight <= 100 && percentHeight > 70) {
    bgColor = colorArr[0];
  } else if (percentHeight <= 70 && percentHeight > 33) {
    bgColor = colorArr[1];
  } else if (percentHeight <= 33) {
    bgColor = colorArr[2];
  }

  const timeLeftSeconds = percentHeight > 0 ? timeLeft / 1000 : 0;

  const styleBar = {
    width: `${percentHeight}%`,
    backgroundColor: bgColor,
  };

  return (
    <div className={style.rootProgressBar}>
      <span className={style.time}>{Math.abs(timeLeftSeconds.toFixed(0))} Secs Left</span>
      <div style={styleBar} className={style.bar}>
        &nbsp;
      </div>
    </div>
  );
};

export default ProgressBar;
