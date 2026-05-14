import React from "react";
import style from "./Header.module.scss";

import { HashLink } from "react-router-hash-link";
import { ArrowRightCircle } from "react-feather";
import { Helmet } from "react-helmet";

import kids from "assets/images/landing/desktop.png";
import college from "assets/images/landing/college.svg";
import schoolLeft from "assets/images/landing/schoolLeft.png";
import collegeRight from "assets/images/landing/collegeRight.png";
import mathsLogical from "assets/images/landing/mathsLogical.svg";
import codingFundamental from "assets/images/landing/codingFundamental.svg";
import competitiveCoding from "assets/images/landing/competitiveCoding.svg";
import learningPlan from "assets/images/landing/learningPlan.svg";
import interviewSpecifics from "assets/images/landing/interviewSpecifics.svg";
import placementAssistance from "assets/images/landing/placementAssistance.svg";
import codeFolder from "assets/images/landing/codeFolder.svg";
import dotsVerticle from "assets/images/landing/dotsVerticle.svg";
import dotsSquare from "assets/images/landing/dotsSquare.svg";
import code from "assets/images/landing/code.svg";
import cloud from "assets/images/landing/cloud.svg";
import dots from "assets/images/landing/dots.svg";
import headerCardYellow from "assets/images/landing/headerCardYellow.svg";
import headerCardBlue from "assets/images/landing/headerCardBlue.svg";
import roadmapDesktop from "assets/images/landing/roadmapDesktop.svg";
import roadmapOne from "assets/images/landing/roadmapOne.svg";
import roadmapOneIcon from "assets/images/landing/roadmapOneIcon.svg";
import roadmapTwo from "assets/images/landing/roadmapTwo.svg";
import roadmapTwoIcon from "assets/images/landing/roadmapTwoIcon.svg";
import roadmapThree from "assets/images/landing/roadmapThree.svg";
import roadmapThreeIcon from "assets/images/landing/roadmapThreeIcon.svg";
import roadmapFour from "assets/images/landing/roadmapFour.svg";
import roadmapFourIcon from "assets/images/landing/roadmapFourIcon.svg";
import roadmapFive from "assets/images/landing/roadmapFive.svg";
import roadmapFiveIcon from "assets/images/landing/roadmapFiveIcon.svg";
import roadmapSix from "assets/images/landing/roadmapSix.svg";
import roadmapSixIcon from "assets/images/landing/roadmapSixIcon.svg";

export default function Header() {
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  return (
    <div className={style.wrapper}>
      <img className={style.cloudIcon} src={cloud} alt="" />
      <img className={style.folderIcon} src={codeFolder} alt="" />
      <img className={style.codeIcon} src={code} alt="" />
      <img className={style.dotsSquare} src={dotsSquare} alt="" />
      <img className={style.dots} src={dots} alt="" />
      <div className={style.banner}>
        <p>Prepare Your Kid For An Extraordinary Future</p>
        <p>Faster & Better with Jayaho</p>
      </div>
      <div className={style.introCards}>
        <div className={style.card}>
          <img className={style.dotsVerticle} src={dotsVerticle} alt="" />
          <div className={style.topGradient}>
            <img className={style.cardBg} src={headerCardYellow} alt="" />
            <p>Coding For Kids</p>
            <p>
              To make you kid’s future secure in world of coding & strong in
              fundamentals
            </p>
            <HashLink to="/home#school" scroll={(el) => scrollWithOffset(el)}>
              <button>
                Know More <ArrowRightCircle />
              </button>
            </HashLink>
          </div>
          <div className={style.imgWrapper}>
            <img src={kids} alt="" />
          </div>
        </div>
        <div className={style.card}>
          <div className={style.topGradient}>
            <img className={style.cardBg} src={headerCardBlue} alt="" />
            <p>Coding For College Students</p>
            <p>
              Learn, practice & demonstrate your coding skills to excel in
              placements for top companies
            </p>
            <HashLink to="/home#college" scroll={(el) => scrollWithOffset(el)}>
              <button>
                Know More <ArrowRightCircle />
              </button>
            </HashLink>
          </div>
          <div className={style.imgWrapper}>
            <img src={college} alt="" />
          </div>
        </div>
      </div>
      <div className={style.roadmapWrapper}>
        <p className={style.roadmapTitle}>Learning Roadmap</p>
        <div className={style.roadmap}>
          <img src={roadmapDesktop} alt="" />
        </div>
        <div className={style.mobileRoadmapWrapper}>
          <div className={style.mobileRoadmap}>
            <img className={style.roadmapBackground} src={roadmapOne} alt="" />
            <img src={roadmapOneIcon} alt="" />
            <p>Maths Foundation</p>
          </div>
          <div className={style.mobileRoadmap}>
            <img className={style.roadmapBackground} src={roadmapTwo} alt="" />
            <img src={roadmapTwoIcon} alt="" />
            <p>Practice Logic</p>
          </div>
          <div className={style.mobileRoadmap}>
            <img
              className={style.roadmapBackground}
              src={roadmapThree}
              alt=""
            />
            <img src={roadmapThreeIcon} alt="" />
            <p>Coding Fundamentals</p>
          </div>
          <div className={style.mobileRoadmap}>
            <img className={style.roadmapBackground} src={roadmapFour} alt="" />
            <img src={roadmapFourIcon} alt="" />
            <p>Programming Language</p>
          </div>
          <div className={style.mobileRoadmap}>
            <img className={style.roadmapBackground} src={roadmapFive} alt="" />
            <img src={roadmapFiveIcon} alt="" />
            <p>Competitive Coding</p>
          </div>
          <div className={style.mobileRoadmap}>
            <img className={style.roadmapBackground} src={roadmapSix} alt="" />
            <img src={roadmapSixIcon} alt="" />
            <p>Real-life Projects</p>
          </div>
        </div>
      </div>
      <div className={style.infoSection} id="school">
        <img className={style.floating} src={schoolLeft} alt="" />
        <HashLink to="/home#codingSchool" scroll={(el) => scrollWithOffset(el)}>
          <div className={style.infoTitle}>
            <p>What’s in it for School Kids?</p>
          </div>
        </HashLink>
        <div className={style.infoRow}>
          <div className={style.info}>
            <div className={style.infoImage}>
              <img src={mathsLogical} alt="" />
            </div>
            <div className={style.infoText}>
              <p>Build Strong Maths & Logical Skills</p>
              <p>
                Improve critical and analytical thinking to solve real time
                problems with Jayaho.
              </p>
            </div>
          </div>
          <div className={style.info}>
            <div className={style.infoImage}>
              <img src={codingFundamental} alt="" />
            </div>
            <div className={style.infoText}>
              <p>Coding Fundamentals</p>
              <p>
                Nothing a code can’t do. Start building fundamentals of
                computers and computational thinking
              </p>
            </div>
          </div>
          <div className={style.info}>
            <div className={style.infoImage}>
              <img src={competitiveCoding} alt="" />
            </div>
            <div className={style.infoText}>
              <p>Competitive Coding & Competitions</p>
              <p>
                Learn to write optimized code and participate in competitions.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={style.infoSection} id="college">
        <img className={style.floating} src={collegeRight} alt="" />
        <HashLink
          to="/home#codingCollege"
          scroll={(el) => scrollWithOffset(el)}
        >
          <div className={style.infoTitle}>
            <p>What’s in it for College Students?</p>
          </div>
        </HashLink>
        <div className={style.infoRow}>
          <div className={style.info}>
            <div className={style.infoImage}>
              <img src={learningPlan} alt="" />
            </div>
            <div className={style.infoText}>
              <p>Customized Learning Plan</p>
              <p>
                We offer tailored action plan based on your career preparation
                and goals.
              </p>
            </div>
          </div>
          <div className={style.info}>
            <div className={style.infoImage}>
              <img src={interviewSpecifics} alt="" />
            </div>
            <div className={style.infoText}>
              <p>Interview Specifics</p>
              <p>
                Mock test, video resources and prep material for company
                specific recruitments.
              </p>
            </div>
          </div>
          <div className={style.info}>
            <div className={style.infoImage}>
              <img src={placementAssistance} alt="" />
            </div>
            <div className={style.infoText}>
              <p>Placement Assistance</p>
              <p>
                Access to mentorship , recent interview experiences and ongoing
                placement processess.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
