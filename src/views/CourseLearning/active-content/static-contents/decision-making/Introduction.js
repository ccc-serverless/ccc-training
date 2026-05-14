import React from "react";
import style from "./Introduction.module.scss";

import food1 from "assets/images/course-materials/decision-making/food1.png";
import food2 from "assets/images/course-materials/decision-making/food2.png";
import decision1 from "assets/images/course-materials/decision-making/decision1.png";
import decision2 from "assets/images/course-materials/decision-making/decision2.png";
import decision3 from "assets/images/course-materials/decision-making/decision3.png";
import decision4 from "assets/images/course-materials/decision-making/decision4.png";

export default function Introduction() {
  return (
    <div className={style.wrapper}>
      <p className={style.heading}>Introduction</p>
      <p className={style.block}>
        Every day, we are faced with all sorts of decisions. Sometimes the decisions are
        small, like what to wear or what to eat. And sometimes the decisions are bigger,
        like where to live or where to send your children to school.
      </p>
      <p className={style.block}>
        Decision making is not something that we get to practice very frequently. It will
        be good if we take some time to practice making small decisions now. We’ll learn
        how it’s done and have more practice going through the decision making process. As
        we get older, the decisions we make have bigger consequences and we must have the
        skills in place to make good decisions.
      </p>
      <div className={style.quesImages}>
        <div className={style.img}>
          <img src={food1} alt="" />
        </div>
        <div className={style.img}>
          <img src={food2} alt="" />
        </div>
      </div>
      <p className={style.decisionText}>
        In decision making it’s always either YES or NO. We should not say “Maybe” or
        “Don’t know”
      </p>
      <div className={style.row}>
        <div className={style.block}>
          <img src={decision1} alt="" />
        </div>
        <div className={style.block}>
          <img src={decision2} alt="" />
        </div>
      </div>
      <div className={style.row}>
        <div className={style.block}>
          <img src={decision3} alt="" />
        </div>
        <div className={style.block}>
          <img src={decision4} alt="" />
        </div>
      </div>
    </div>
  );
}
