import React from "react";
import style from "./Conditionals.module.scss";

import one from "assets/images/course-materials/decision-making/conditionals/module4_1.png";
import two from "assets/images/course-materials/decision-making/conditionals/module4_2.png";

export default function ConditionalsFour() {
  return (
    <div className={style.wrapper}>
      <p className={style.heading}>Nested Conditionals</p>
      <p className={style.subHeading}>
        A NESTED CONDITIONAL is one conditional inside of another conditional
      </p>
      <div className={style.block}>
        <p>Example:</p>
        <div className={style.bigImage}>
          <img src={one} alt="" />
        </div>
      </div>
      <div className={style.block}>
        <p>The flowchart diagram will look like this:</p>
        <div className={style.bigImage}>
          <img src={two} alt="" />
        </div>
      </div>
    </div>
  );
}
