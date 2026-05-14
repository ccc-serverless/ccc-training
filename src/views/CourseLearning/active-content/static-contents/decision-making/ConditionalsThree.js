import React from "react";
import style from "./Conditionals.module.scss";

import one from "assets/images/course-materials/decision-making/conditionals/module3_1.png";
import two from "assets/images/course-materials/decision-making/conditionals/module3_2.png";

export default function ConditionalsThree() {
  return (
    <div className={style.wrapper}>
      <p className={style.heading}>Understanding Conditions (If, Else If & Else)</p>
      <div className={style.block}>
        <div className={style.image}>
          <img src={one} alt="" />
        </div>
      </div>
      <div className={style.block}>
        <p>The flowchart diagram for a quiz game will look like this:</p>
        <div className={style.image}>
          <img src={two} alt="" />
        </div>
      </div>
    </div>
  );
}
