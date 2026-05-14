import React from "react";
import ProgressBar from "./ProgressBar";
import ProgressBarVertical from "./ProgressBarVertical";
import styles from "./GameCard.module.scss";
import GameClock from "./GameClock";

export default function GameCard(props) {
  const root = {
    position: "relative",
    border: "solid 1px #cacaca",
    borderRadius: "15px",
    width: "100%",
    padding: "15px",
    height: `${props.height}px`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  return props.isGameStart ? (
    <div className={styles.root} style={root}>
      <ProgressBar timer={props.timer} timePerQues={props.interval} />
      <ProgressBarVertical timer={props.timer} timePerQues={props.interval} />
      <GameClock totalGameTime={props.totalGameTime} />
      {props.children}
    </div>
  ) : (
    <div className={styles.root} style={root}>
      {props.children}
    </div>
  );
}
