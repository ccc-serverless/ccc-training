import React from "react";
import style from "./Header.module.scss";

export default function Header() {
  return (
    <div className={style.wrapper}>
      <p>Classify the numbers</p>
      <p>Drag and drop the numbers in the most accurate category.</p>
    </div>
  );
}
