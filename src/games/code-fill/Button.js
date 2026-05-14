import React from "react";
import style from "./Button.module.scss";

import clsx from "clsx";

export default function Button({ className, text, onClick }) {
  return (
    <button className={clsx(style.wrapper, className)} onClick={onClick}>
      {text}
    </button>
  );
}
