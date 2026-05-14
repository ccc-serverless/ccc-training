import React from "react";
import style from "./ResultIndicator.module.scss";
import clsx from "clsx";

import Lottie from "react-lottie-player";

import rightLottie from "assets/lottie/right_arithmetic.json";
import wrongLottie from "assets/lottie/wrong_arithmetic.json";

export default function ResultIndicator({ isCorrect }) {
  return (
    <div className={clsx(style.wrapper, isCorrect ? style.rightBackground : style.wrongBackground)}>
      <div className={style.lottie}>
        <Lottie loop={false} play animationData={isCorrect ? rightLottie : wrongLottie} />
      </div>
      <p>You have reached the target!</p>
    </div>
  );
}
