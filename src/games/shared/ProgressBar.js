import React, { useState, useEffect } from "react";
import style from "./ProgressBar.module.scss";

const ProgressBar = (props) => {
  const [progress, setProgress] = useState(100);
  const [color, setColor] = useState("#35bf74");
  const colorArr = ["#35bf74", "#f8df01", "#f8a401", "#ff6600", "#cc0000"];

  useEffect(() => {
    let interval = 100 / props.timePerQues;

    let newProgress = 100 - interval * (props.timePerQues - props.timer);

    if (newProgress <= 100 && newProgress > 66) {
      setColor(colorArr[0]);
    } else if (newProgress <= 66 && newProgress > 33) {
      setColor(colorArr[1]);
    } else if (newProgress <= 33) {
      setColor(colorArr[4]);
    }

    setProgress(newProgress);
  }, [props.timer]);

  const styleBar = {
    width: `${progress}%`,
    backgroundColor: color,
  };

  return (
    <div className={style.rootProgressBar}>
      <span className={style.time}>{Math.abs(props.timer.toFixed(0))} Secs Left</span>
      {progress > 0 ? (
        <div style={styleBar} className={style.bar}>
          &nbsp;
        </div>
      ) : null}
    </div>
  );
};

export default ProgressBar;
