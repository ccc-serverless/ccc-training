import React from "react";
import style from "./Conditionals.module.scss";

import one from "assets/images/course-materials/decision-making/conditionals/module2_1.png";
import two from "assets/images/course-materials/decision-making/conditionals/module2_2.png";
import three from "assets/images/course-materials/decision-making/conditionals/module2_3.png";

export default function ConditionalsTwo() {
  return (
    <div className={style.wrapper}>
      <p className={style.heading}>Understanding Conditions (If, Then & Else)</p>
      <div className={style.block}>
        <div className={style.image}>
          <img src={one} alt="" />
        </div>
      </div>
      <div className={style.block}>
        <p>
          Here’s how a conditional statement could look like with an “else” consequence
          could look like in the quiz game:
        </p>
        <div className={style.image}>
          <img src={two} alt="" />
        </div>
      </div>
      <div className={style.block}>
        <p>The flowchart diagram will look like this:</p>
        <div className={style.image}>
          <img src={three} alt="" />
        </div>
      </div>
    </div>
  );
}
