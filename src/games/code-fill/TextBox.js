import React from "react";
import style from "./TextBox.module.scss";

import clsx from "clsx";

export default function TextBox({ className, text, onClick }) {
  return (
    <div className={clsx(style.wrapper, className)} onClick={onClick}>
      {text}
    </div>
  );
}
