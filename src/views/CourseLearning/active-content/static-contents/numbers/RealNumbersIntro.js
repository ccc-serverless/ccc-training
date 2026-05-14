import React from "react";
import style from "./RealNumbersIntro.module.scss";

import realNumbersIntro from "assets/images/course-materials/numbers/realNumbersIntro.webp";

export default function RealNumbersIntro() {
  return (
    <div className={style.wrapper}>
      <div className={style.title}>Real Numbers</div>

      <p className={style.para}>
        Any number that can be found in the real world is a real number. We find numbers
        everywhere around us. Natural numbers are used for counting objects, rational
        numbers are used for representing fractions, irrational numbers are used for
        calculating the square root of a number, integers for measuring temperature, and
        so on. These different types of numbers make a collection of real numbers.
      </p>

      <div className={style.imgContainer}>
        <img src={realNumbersIntro} alt="real_numbers_info_graphic" />
      </div>
    </div>
  );
}
