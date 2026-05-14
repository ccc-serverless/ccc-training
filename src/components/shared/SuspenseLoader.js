import React from "react";
import style from "./SuspenseLoader.module.scss";
import ClipLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/react";

export default function SuspenseLoader() {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div className={style.wrapper}>
      <ClipLoader color={"#6a2c70"} css={override} size={10} />
    </div>
  );
}
