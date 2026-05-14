import React, { useEffect } from "react";
import styles from "./Circle.module.scss";

import parse from "html-react-parser";

import clsx from "clsx";

function parseSvg(value) {
  if (typeof value !== "string") return value;

  if (!value) return null;
  return parse(value);
}

export default function Circle(props) {
  const { index, value, showNudge, style, handleClickCircle, isGameStarted } = props;

  return (
    <div
      className={clsx(
        props.className,
        styles.wrapper,
        showNudge && styles.nudgeAndPulse,
        isGameStarted && styles.pulse
      )}
      style={style}
      onClick={handleClickCircle.bind(this, { index, value })}
    >
      <span
        className={clsx(
          style &&
            (style.background === "#f08a5d" || style.background === "#b83b5e") &&
            styles.whitePath
        )}
      >
        {parseSvg(value)}
      </span>
    </div>
  );
}
