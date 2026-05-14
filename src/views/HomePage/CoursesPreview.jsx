import React, { useState } from "react";
import style from "./CoursesPreview.module.scss";

import TypeIt from "typeit-react";
import { animated } from "@react-spring/web";
import { useTransition } from "@react-spring/core";
import { useWindowResize } from "beautiful-react-hooks";

import CourseTabs from "./CourseTabs";

import mathsandlogical from "assets/images/landing/home/mathsandlogical.png";
import codingfundamentals from "assets/images/landing/home/codingfundamentals.png";
import competitiveskills from "assets/images/landing/home/competitiveskills.png";
import problemsolving from "assets/images/landing/home/problemsolving.png";
import illustration from "assets/images/landing/home/illustration1.png";

const _TypeItImages = [
  mathsandlogical,
  codingfundamentals,
  competitiveskills,
  problemsolving,
];
const _TypeItStrings = [
  "maths & logical skills",
  "coding fundamentals",
  "competitive skills",
  "problem solving skills",
];

export default function CoursePreview() {
  const [iterator, setIterator] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);

  const transitions = useTransition(iterator, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 200,
  });

  useWindowResize(() => {
    setWidth(window.innerWidth);
  });

  return (
    <div className={style.wrapper} id="courses">
      <img className={style.illustration} src={illustration} alt="" />
      <div className={style.header}>
        <p>Our Courses Preview</p>
        <p>
          Experience game based learning modules. Go Faster & Better on problem solving
          capabilities with Jayaho
        </p>
      </div>
      <div className={style.courses}>
        <CourseTabs allowSwipe={width < 1320 ? true : false} />
        <div className={style.glassCard}>
          {transitions(({ opacity }, iterator) => (
            <animated.div
              style={{
                opacity: opacity.to({ range: [0.0, 1.0], output: [0, 1] }),
              }}
            >
              <img src={_TypeItImages[iterator]} alt="" />
            </animated.div>
          ))}
          <p>Jayaho helps you build strong</p>
          <TypeIt
            options={{
              strings: _TypeItStrings,
              cursor: false,
              speed: 150,
              loopDelay: 1000,
              waitUntilVisible: true,
              loop: true,
              breakLines: false,
              afterString: () => setTimeout(() => setIterator((prev) => (prev + 1) % 3)),
            }}
          />
        </div>
      </div>
    </div>
  );
}
