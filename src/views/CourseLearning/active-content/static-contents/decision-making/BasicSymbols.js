import React from "react";
import style from "./BasicSymbols.module.scss";

import clsx from "clsx";
import arrow from "assets/images/course-materials/flowchart/arrowHorizontal.webp";

export default function BasicSymbols() {
  return (
    <div className={style.wrapper}>
      <p className={style.heading}>Basic Symbols involved in decision making</p>
      <div className={style.row}>
        <div className={style.block}>
          <div className={clsx(style.symbol, style.pill)}>
            <p>Start/End</p>
          </div>
          <p>
            The terminator symbol marks the starting or ending point of the system. It
            usually contains the word "Start" or "End."
          </p>
        </div>
        <div className={style.block}>
          <div className={clsx(style.symbol, style.paralellogram)}>
            <p>Input/Output</p>
          </div>
          <p>
            Represents material or information entering or leaving the system, such as
            customer order (input) or a product (output).
          </p>
        </div>
      </div>
      <div className={style.row}>
        <div className={style.block}>
          <div className={clsx(style.symbol, style.rectangle)}>
            <p>Action or Process</p>
          </div>
          <p>
            A box can represent a single step ("add two cups of flour"), or and entire
            sub-process ("make bread") within a larger process.
          </p>
        </div>
        <div className={style.block}>
          <div className={clsx(style.symbol, style.diamond)}>
            <p>Decision</p>
          </div>
          <p>
            A decision or branching point. Lines representing different decisions emerge
            from different points of the diamond.
          </p>
        </div>
      </div>
      <div className={style.row}>
        <div className={style.block}>
          <div className={clsx(style.symbol, style.arrow)}>
            <img src={arrow} alt="" />
          </div>
          <p>
            A line is a connector that shows relationships between the representative
            shapes
          </p>
        </div>
      </div>
    </div>
  );
}
