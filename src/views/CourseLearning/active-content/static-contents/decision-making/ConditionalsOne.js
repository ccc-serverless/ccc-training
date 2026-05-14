import React from "react";
import style from "./Conditionals.module.scss";

import one from "assets/images/course-materials/decision-making/conditionals/module1_1.png";
import two from "assets/images/course-materials/decision-making/conditionals/module1_2.png";
import three from "assets/images/course-materials/decision-making/conditionals/module1_3.png";

export default function ConditionalsOne() {
  return (
    <div className={style.wrapper}>
      <p className={style.heading}>Understanding Conditions (If & Then)</p>
      <div className={style.block}>
        <p>For example:</p>
        <p>If you touch the enemy, then your character dies. .</p>
        <p>If you cross the finish line first, then you win. </p>
        <p>If you score a goal, then your score increases by one point.</p>
      </div>
      <div className={style.block}>
        <p>Here’s how a basic conditional statement looks like</p>
        <div className={style.image}>
          <img src={one} alt="" />
        </div>
      </div>
      <div className={style.block}>
        <p>Here’s how a conditional statement could look like in a quiz game:</p>
        <div className={style.bigImage}>
          <img src={two} alt="" />
        </div>
      </div>
      <div className={style.block}>
        <p>
          For example, in the quiz game where a correct answer earns the player 100 points
        </p>
        <div className={style.scaledImage}>
          <img src={three} alt="" />
        </div>
      </div>
    </div>
  );
}
