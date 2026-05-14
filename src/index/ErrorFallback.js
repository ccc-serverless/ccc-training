import React from "react";
import style from "./ErrorFallback.module.scss";

import ErrorGraphicImg from "assets/images/error_graphic.svg";

export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className={style.wrapper}>
      <h1>Woops!</h1>
      <div>Something went wrong</div>
      <img src={ErrorGraphicImg} alt="" />
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
