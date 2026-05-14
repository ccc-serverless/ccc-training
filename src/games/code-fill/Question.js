import React from "react";
import style from "./Question.module.scss";

import clsx from "clsx";

export default function Question({ className, ques }) {
  return <div className={clsx(style.wrapper, className)}>{ques.ques}</div>;
}
