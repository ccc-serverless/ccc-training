import React, { useState, useEffect, useRef } from "react";
import style from "./Roadmap.module.scss";
import clsx from "clsx";
import useOnScreen from "utils/hooks/useOnScreen";

import roadmap from "assets/images/landing/home/learningRoadmap.png";
import bg from "assets/images/landing/home/roadmapbg.png";
import illustration from "assets/images/landing/home/illustration2.png";
import group1 from "assets/images/landing/home/group1.png";
import group2 from "assets/images/landing/home/group2.png";
import group3 from "assets/images/landing/home/group3.png";
import group4 from "assets/images/landing/home/group4.png";
import group5 from "assets/images/landing/home/group5.png";
import group6 from "assets/images/landing/home/group6.png";
import line from "assets/images/landing/home/line.png";
import invertedLine from "assets/images/landing/home/invertedLine.png";
import linebend from "assets/images/landing/home/linebend.png";
import arrow from "assets/images/landing/home/peacock.png";

//mobileRoadmap
import iconOne from "assets/images/landing/home/roadmap/iconOne.png";
import iconTwo from "assets/images/landing/home/roadmap/iconTwo.png";
import iconThree from "assets/images/landing/home/roadmap/iconThree.png";
import iconFour from "assets/images/landing/home/roadmap/iconFour.png";
import iconFive from "assets/images/landing/home/roadmap/iconFive.png";
import iconSix from "assets/images/landing/home/roadmap/iconSix.png";
import numOne from "assets/images/landing/home/roadmap/numOne.svg";
import numTwo from "assets/images/landing/home/roadmap/numTwo.svg";
import numThree from "assets/images/landing/home/roadmap/numThree.svg";
import numFour from "assets/images/landing/home/roadmap/numFour.svg";
import numFive from "assets/images/landing/home/roadmap/numFive.svg";
import numSix from "assets/images/landing/home/roadmap/numSix.svg";
import mobileLine from "assets/images/landing/home/roadmap/line.png";
import mobileArrow from "assets/images/landing/home/peacock.png";

const mobileRoadmap = [
  {
    icon: iconOne,
    bg: numOne,
    text: "Maths Foundation",
  },
  {
    icon: iconTwo,
    bg: numTwo,
    text: "Practice Logic",
  },
  {
    icon: iconThree,
    bg: numThree,
    text: "Coding Fundamentals",
  },
  {
    icon: iconFour,
    bg: numFour,
    text: "Programming Language",
  },
  {
    icon: iconFive,
    bg: numFive,
    text: "Competitive Coding",
  },
  {
    icon: iconSix,
    bg: numSix,
    text: "Real-life Projects",
  },
];

export default function Roadmap() {
  const [arrowPos, setArrowPos] = useState(0);
  const [arrowHorizontal, setArrowHorizontal] = useState(90);
  const [isVerticle, setIsVerticle] = useState(true);
  const [isDownward, setIsDownward] = useState(false);
  const [isLeftArrow, setIsLeftArrow] = useState(false);
  const [cycle, setCycle] = useState(1);
  const [mobileActiveBlock, setMobileActiveBlocks] = useState([0]);
  const [mobileArrowPos, setMobileArrowPos] = useState(80);

  const [activeCards, setActiveCards] = useState({
    one: true,
    two: false,
    three: false,
    four: false,
    five: false,
    six: false,
  });

  const ref = useRef();
  const isVisible = useOnScreen(ref);

  function verticleMov() {
    // let pos = arrowPos;
    // let hor = arrowHorizontal;
    // if (pos <= 25) {
    //   pos++;
    //   console.log(pos);
    //   setArrowPos(pos);
    // } else if (hor <= 310) {
    //   setIsVerticle(false);
    //   hor++;
    //   console.log(hor);
    //   setArrowHorizontal(hor);
    // }
    animateArrow();
  }

  function animateArrow() {
    let pos = arrowPos;
    let hor = arrowHorizontal;
    let updateCards = { ...activeCards };
    switch (cycle) {
      case 1:
        if (pos <= 40 && hor < 105) {
          setIsVerticle(true);
          pos++;
          setArrowPos(pos);
        } else if (hor <= 310) {
          setIsVerticle(false);
          hor++;
          setArrowHorizontal(hor);
        } else if (hor >= 310 && pos >= -80) {
          setIsDownward(true);
          pos--;
          setArrowPos(pos);
          updateCards.two = true;
          setActiveCards(updateCards);
        } else {
          setCycle((prev) => prev + 1);
        }
        break;
      case 2:
        if (hor <= 505) {
          setIsVerticle(false);
          setIsDownward(false);
          hor++;
          setArrowHorizontal(hor);
        } else if (pos <= 40) {
          setIsDownward(false);
          setIsVerticle(true);
          pos++;
          setArrowPos(pos);
          updateCards.three = true;
          setActiveCards(updateCards);
        } else {
          setCycle((prev) => prev + 1);
        }
        break;
      case 3:
        if (hor <= 730) {
          setIsVerticle(false);
          setIsDownward(false);
          hor++;
          setArrowHorizontal(hor);
        } else if (pos >= -95) {
          setIsDownward(true);
          setIsVerticle(false);
          pos--;
          setArrowPos(pos);
          updateCards.four = true;
          setActiveCards(updateCards);
        } else {
          setCycle((prev) => prev + 1);
        }
        break;
      case 4:
        if (hor >= 525) {
          setIsVerticle(false);
          setIsDownward(false);
          setIsLeftArrow(true);
          hor--;
          setArrowHorizontal(hor);
        } else if (pos >= -210) {
          setIsVerticle(false);
          setIsDownward(true);
          pos--;
          setArrowPos(pos);
          updateCards.six = true;
          setActiveCards(updateCards);
        } else {
          setCycle((prev) => prev + 1);
        }
        break;
      case 5:
        if (hor >= 312) {
          setIsVerticle(false);
          setIsDownward(false);
          setIsLeftArrow(true);
          hor--;
          setArrowHorizontal(hor);
        } else if (pos <= -205) {
          setIsVerticle(true);
          setIsDownward(false);
          pos++;
          setArrowPos(pos);
          updateCards.five = true;
          setActiveCards(updateCards);
        } else {
          setArrowPos(0);
          setArrowHorizontal(90);
          setIsVerticle(true);
          setIsDownward(false);
          setIsLeftArrow(false);
          setCycle(1);
          setActiveCards({
            one: true,
            two: false,
            three: false,
            four: false,
            five: false,
            six: false,
          });
        }
        break;
      default:
        return;
    }
  }

  function animateMobileRoadmap() {
    let update = [...mobileActiveBlock];
    let pos = mobileArrowPos;
    if (pos < 200) {
      pos++;
      update.push(1);
      setMobileActiveBlocks(update);
      setMobileArrowPos(pos);
    } else if (pos < 300) {
      pos++;
      update.push(2);
      setMobileActiveBlocks(update);
      setMobileArrowPos(pos);
    } else if (pos < 450) {
      pos++;
      update.push(3);
      setMobileActiveBlocks(update);
      setMobileArrowPos(pos);
    } else if (pos < 500) {
      pos++;
      update.push(4);
      setMobileActiveBlocks(update);
      setMobileArrowPos(pos);
    } else if (pos < 600) {
      pos++;
      update.push(5);
      setMobileActiveBlocks(update);
      setMobileArrowPos(pos);
    } else {
      setMobileArrowPos(80);
      setMobileActiveBlocks([0]);
    }
  }

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        verticleMov();
      }, 10);
    }
  }, [isVisible, arrowPos, arrowHorizontal, cycle]);

  useEffect(() => {
    setTimeout(() => {
      animateMobileRoadmap();
    }, 10);
  }, [mobileActiveBlock]);

  return (
    <div className={style.wrapper} id="roadmap">
      <img className={style.background} src={bg} alt="" />
      {/* <img className={style.illustration} src={illustration} alt="" /> */}
      <p className={style.heading}>Our learning roadmap</p>
      {/* <div className={style.roadmap}>
        <img src={roadmap} alt="" />
      </div> */}
      <div ref={ref} className={style.roadmap}>
        <div className={style.blocks}>
          <img
            className={clsx(
              style.arrow,
              // isVerticle && style.verticle,
              // isDownward && style.downward,
              isLeftArrow && style.flip
            )}
            style={{ top: `${arrowPos * -1}px`, left: `${arrowHorizontal}px` }}
            src={arrow}
            alt=""
          />
          <img className={style.line1} src={line} alt="" />
          <img className={style.line2} src={invertedLine} alt="" />
          <img className={style.line3} src={line} alt="" />
          <img src={group1} alt="" />
          <img className={clsx(!activeCards.two && style.inactive)} src={group2} alt="" />
          <img
            className={clsx(!activeCards.three && style.inactive)}
            src={group3}
            alt=""
          />
          <img
            className={clsx(!activeCards.four && style.inactive)}
            src={group4}
            alt=""
          />
        </div>
        <div className={style.blocksSecond}>
          <img className={style.line4} src={linebend} alt="" />
          <img className={style.line5} src={invertedLine} alt="" />
          <img
            className={clsx(!activeCards.five && style.inactive)}
            src={group6}
            alt=""
          />
          <img className={clsx(!activeCards.six && style.inactive)} src={group5} alt="" />
        </div>
      </div>
      <div className={style.mobileRoadmap}>
        <img className={style.mobileLine} src={mobileLine} alt="" />
        <img
          className={style.mobileArrow}
          style={{ top: mobileArrowPos }}
          src={mobileArrow}
          alt=""
        />
        {mobileRoadmap.map((item, index) => (
          <div
            key={index}
            className={clsx(
              style.block,
              mobileActiveBlock.indexOf(index) == -1 ? style.inactive : null
            )}
          >
            <img src={item.icon} alt="" />
            <p>{item.text}</p>
            <img className={style.bg} src={item.bg} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
