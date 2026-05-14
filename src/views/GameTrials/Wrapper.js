import React from "react";
import style from "./Wrapper.module.scss";

export default function TrialWrapper({ children }) {
  return <div className={style.wrapper}>{children}</div>;
}
