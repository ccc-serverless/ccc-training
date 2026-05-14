import React, { useState, useEffect } from "react";
import style from "./CodingSection.module.scss";

import Grow from "@material-ui/core/Grow";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import ccc from "assets/images/landing/ccc.png";
import codingBlue from "assets/images/offerings/codingBlue.svg";
import codingGreen from "assets/images/offerings/codingGreen.svg";
import codingRed from "assets/images/offerings/codingRed.svg";
import collegeGreen from "assets/images/offerings/collegeGreen.svg";
import collegePurple from "assets/images/offerings/collegePurple.svg";
import collegeYellow from "assets/images/offerings/collegeYellow.svg";
import info from "assets/images/landing/info.png";
import mathsToCode from "assets/images/landing/mathsToCode.png";
import maths1 from "assets/images/landing/maths1.svg";
import maths2 from "assets/images/landing/maths2.svg";
import maths3 from "assets/images/landing/maths3.svg";
import maths4 from "assets/images/landing/maths4.svg";
import figuresSkills from "assets/images/landing/figuresSkills.png";
import figuresCompany from "assets/images/landing/figuresCompany.png";

import links from "utils/links.json";
import COLLEGE_DATA from "./data/college_subscription.json";
import SCHOOL_DATA from "./data/school_subscription.json";

export default function CodingSection() {
  const [schoolBundlePrice, setSchoolBundlePrice] = useState({
    crossed: null,
    price: null,
    avg: null,
  });
  const [collegeBundlePrice, setCollegeBundlePrice] = useState({
    crossed: null,
    price: null,
    avg: null,
  });
  const [activeCollegeTab, setActiveCollegeTab] = useState({
    beginner: true,
    intermediate: false,
    advanced: false,
  });
  const [activeSchoolTab, setActiveSchoolTab] = useState({
    beginner: true,
    intermediate: false,
    advanced: false,
  });

  function handleChangeBundlePrice(type, stage) {
    let crossed = 0;
    let price = 0;
    let avg = 0;
    let totalClasses = 0;
    for (let i = 0; i < stage.length; i++) {
      crossed += stage[i].price1;
      price += stage[i].price2;
      totalClasses += stage[i].classCount;
    }
    avg = Math.ceil(price / totalClasses);
    let newBundle = {
      crossed: crossed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      price: price,
      avg: "95",
    };
    if (type === "COLLEGE_DATA" && stage === COLLEGE_DATA.beginner) {
      newBundle.price = "5,999";
      setCollegeBundlePrice(newBundle);
    } else if (type === "COLLEGE_DATA" && stage === COLLEGE_DATA.intermediate) {
      newBundle.price = "9,999";
      setCollegeBundlePrice(newBundle);
    } else if (type === "COLLEGE_DATA" && stage === COLLEGE_DATA.advanced) {
      newBundle.price = "10,999";
      setCollegeBundlePrice(newBundle);
    } else if (type === "SCHOOL_DATA" && stage === SCHOOL_DATA.beginner) {
      newBundle.price = "3,999";
      setSchoolBundlePrice(newBundle);
    } else if (type === "SCHOOL_DATA" && stage === SCHOOL_DATA.intermediate) {
      newBundle.price = "5,999";
      setSchoolBundlePrice(newBundle);
    } else if (type === "SCHOOL_DATA" && stage === SCHOOL_DATA.advanced) {
      newBundle.price = "7,999";
      setSchoolBundlePrice(newBundle);
    }
  }

  function handleTabChange(type, stage) {
    if (type === "COLLEGE_DATA") {
      let toggle = { ...activeCollegeTab };
      for (const [key, value] of Object.entries(toggle)) {
        if (key === stage) {
          toggle[`${stage}`] = true;
        } else {
          toggle[`${key}`] = false;
        }
      }

      handleChangeBundlePrice(type, COLLEGE_DATA[stage]);
      setActiveCollegeTab(toggle);
    } else if (type === "SCHOOL_DATA") {
      let toggle = { ...activeSchoolTab };
      for (const [key, value] of Object.entries(toggle)) {
        if (key === stage) {
          toggle[`${stage}`] = true;
        } else {
          toggle[`${key}`] = false;
        }
      }

      handleChangeBundlePrice(type, SCHOOL_DATA[stage]);
      setActiveSchoolTab(toggle);
    }
  }

  function handleEnroll() {
    // window.open("https://rzp.io/l/jc101");
  }

  function handleEnrollTop() {
    // window.open("https://rzp.io/l/jc102");
  }

  function redirectToMathsToCode() {
    window.open(links.m2c);
  }
  useEffect(() => {
    handleChangeBundlePrice("COLLEGE_DATA", COLLEGE_DATA.beginner);
    handleChangeBundlePrice("SCHOOL_DATA", SCHOOL_DATA.beginner);
  }, []);

  return (
    <>
      <div className={style.container}>
        <div className={style.cardsWrapper}>
          <div className={style.header}>
            <div className={style.headerImage}>
              <img src={ccc} alt="" />
              <span>Powered by</span>
            </div>
            <div className={style.headerMain} id="codingSchool">
              <p className={style.title}>Coding for School Kids</p>
              <p className={style.subTitle}>
                To make your kid's future secured in the world of Coding
              </p>
              <div className={style.controller}>
                <button
                  className={`${style.gradeButton} ${
                    activeSchoolTab.beginner ? style.active : null
                  }`}
                  onClick={handleTabChange.bind(this, "SCHOOL_DATA", "beginner")}
                >
                  <span>Grade</span>
                  <p>3 to 5</p>
                  <span className={style.arrow}></span>
                </button>
                <button
                  className={`${style.gradeButton} ${
                    activeSchoolTab.intermediate ? style.active : null
                  }`}
                  onClick={handleTabChange.bind(this, "SCHOOL_DATA", "intermediate")}
                >
                  <span>Grade</span>
                  <p>6 to 8</p>
                  <span className={style.arrow}></span>
                </button>
                <button
                  className={`${style.gradeButton} ${
                    activeSchoolTab.advanced ? style.active : null
                  }`}
                  onClick={handleTabChange.bind(this, "SCHOOL_DATA", "advanced")}
                >
                  <span>Grade</span>
                  <p>9 to 12</p>
                  <span className={style.arrow}></span>
                </button>
              </div>
            </div>
            <div className={style.headerButton}>
              <button onClick={handleEnrollTop}>Enroll Now</button>
            </div>
          </div>

          <div className={style.cards}>
            {activeSchoolTab.beginner ? (
              <>
                {SCHOOL_DATA.beginner.map((card) => {
                  return (
                    <Grow
                      in={activeSchoolTab.beginner}
                      style={{ transformOrigin: "0 0 0" }}
                      {...(activeSchoolTab.beginner ? { timeout: card.timeout } : {})}
                    >
                      <div className={style.card}>
                        <img src={getImageForCard(card.image)} alt="" />
                        <div className={style.text}>
                          <p className={style.cardClass}>{card.classCount} Classes</p>
                          <p className={style.cardTitle}>{card.title}</p>
                          <p className={style.cardInfo}>{card.info}</p>
                        </div>
                        <div className={style.bottom}>
                          <div className={style.price}>
                            <span>
                              &#8377;{" "}
                              {card.price1
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </span>
                            <p>
                              &#8377;{" "}
                              {card.price2
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </p>
                          </div>
                        </div>
                        <div className={style.footer}>
                          <p>Learning Outcomes</p>
                          <button>
                            <img src={info} alt="" />
                          </button>
                        </div>
                      </div>
                    </Grow>
                  );
                })}
              </>
            ) : null}
            {activeSchoolTab.intermediate ? (
              <>
                {SCHOOL_DATA.intermediate.map((card) => {
                  return (
                    <Grow
                      in={activeSchoolTab.intermediate}
                      style={{ transformOrigin: "0 0 0" }}
                      {...(activeSchoolTab.intermediate ? { timeout: card.timeout } : {})}
                    >
                      <div className={style.card}>
                        <img src={getImageForCard(card.image)} alt="" />
                        <div className={style.text}>
                          <p className={style.cardClass}>{card.classCount} Classes</p>
                          <p className={style.cardTitle}>{card.title}</p>
                          <p className={style.cardInfo}>{card.info}</p>
                        </div>
                        <div className={style.bottom}>
                          <div className={style.price}>
                            <span>
                              &#8377;
                              {card.price1
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </span>
                            <p>
                              &#8377;
                              {card.price2
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </p>
                          </div>
                        </div>
                        <div className={style.footer}>
                          <p>Learning Outcomes</p>
                          <button>
                            <img src={info} alt="" />
                          </button>
                        </div>
                      </div>
                    </Grow>
                  );
                })}
              </>
            ) : null}
            {activeSchoolTab.advanced ? (
              <>
                {SCHOOL_DATA.advanced.map((card) => {
                  return (
                    <Grow
                      in={activeSchoolTab.advanced}
                      style={{ transformOrigin: "0 0 0" }}
                      {...(activeSchoolTab.advanced ? { timeout: card.timeout } : {})}
                    >
                      <div className={style.card}>
                        <img src={getImageForCard(card.image)} alt="" />
                        <div className={style.text}>
                          <p className={style.cardClass}>{card.classCount} Classes</p>
                          <p className={style.cardTitle}>{card.title}</p>
                          <p className={style.cardInfo}>{card.info}</p>
                        </div>
                        <div className={style.bottom}>
                          <div className={style.price}>
                            <span>
                              &#8377;{" "}
                              {card.price1
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </span>
                            <p>
                              &#8377;{" "}
                              {card.price2
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </p>
                          </div>
                        </div>
                        <div className={style.footer}>
                          <p>Learning Outcomes</p>
                          <button>
                            <img src={info} alt="" />
                          </button>
                        </div>
                      </div>
                    </Grow>
                  );
                })}
              </>
            ) : null}
          </div>
          <div className={style.postCard}>
            <p>
              All above course levels can be enrolled in a bundle of the respective grade.
            </p>
            <button onClick={handleEnroll}>
              <span className={style.crossed}>&#8377; {schoolBundlePrice.crossed}</span>
              <span className={style.bundlePrice}>&#8377; {schoolBundlePrice.price}</span>
              <span className={style.enrollText}>Enroll Now</span>
            </button>
            <p className={style.topText}>
              Includes recorded sessions and live Q & A sessions
            </p>
          </div>
        </div>
      </div>
      <div className={style.carouselWrapper}>
        <div className={style.logo}>
          <img src={ccc} alt="" />
        </div>
        <div className={style.carousel}>
          <Carousel showThumbs={false} showArrows={false} autoPlay infiniteLoop={true}>
            <div className={style.carouselText}>
              <p>Enabling students to become Competitive Coders since 2012</p>
            </div>
            <div className={style.carouselText}>
              <p>CCC conducted 15,646+ online classes in 2020</p>
            </div>
            <div className={style.carouselText}>
              <p>CCC trained 50,000+ students in 2020.</p>
            </div>
            <div className={style.carouselText}>
              <p>
                Students trained by CCC have been placed in companies like Google,
                Microsoft, Amazon, Adobe, Uber & more.
              </p>
            </div>
          </Carousel>
        </div>
      </div>

      <div className={`${style.container} ${style.collegeContainer}`}>
        <div className={style.cardsWrapper}>
          <div className={style.header}>
            <div className={style.headerImage}>
              <img src={ccc} alt="" />
              <span>Powered by</span>
            </div>
            <div className={style.headerMain} id="codingCollege">
              <p className={style.title}>Coding for College Students</p>
              <p className={style.subTitle}>
                Get into top companies with our courses & mentoring
              </p>
              <div className={style.controller}>
                <button
                  className={`${style.gradeButton} ${
                    activeCollegeTab.beginner ? style.active : null
                  }`}
                  onClick={handleTabChange.bind(this, "COLLEGE_DATA", "beginner")}
                >
                  <span>Beginner</span>
                  <p>Course</p>
                  <span className={style.arrow}></span>
                </button>
                <button
                  className={`${style.gradeButton} ${
                    activeCollegeTab.intermediate ? style.active : null
                  }`}
                  onClick={handleTabChange.bind(this, "COLLEGE_DATA", "intermediate")}
                >
                  <span>Intermediate</span>
                  <p>Course</p>
                  <span className={style.arrow}></span>
                </button>
                <button
                  className={`${style.gradeButton} ${
                    activeCollegeTab.advanced ? style.active : null
                  }`}
                  onClick={handleTabChange.bind(this, "COLLEGE_DATA", "advanced")}
                >
                  <span>Advanced</span>
                  <p>Course</p>
                  <span className={style.arrow}></span>
                </button>
              </div>
            </div>
            <div className={style.headerButton}>
              <button onClick={handleEnrollTop}>Enroll Now</button>
            </div>
          </div>

          <div className={style.cards}>
            {activeCollegeTab.beginner ? (
              <>
                {COLLEGE_DATA.beginner.map((card) => {
                  return (
                    <Grow
                      in={activeCollegeTab.beginner}
                      style={{ transformOrigin: "0 0 0" }}
                      {...(activeCollegeTab.beginner ? { timeout: card.timeout } : {})}
                    >
                      <div className={style.card}>
                        <img src={getImageForCard(card.image)} alt="" />
                        <div className={style.text}>
                          <p className={style.cardClass}>{card.hours} HOURS</p>
                          <p className={style.cardTitle}>{card.title}</p>
                          <p className={style.cardInfo}>{card.info}</p>
                        </div>
                        <div className={style.bottom}>
                          <div className={style.price}>
                            <span>
                              &#8377;{" "}
                              {card.price1
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </span>
                            <p>
                              &#8377;{" "}
                              {card.price2
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </p>
                          </div>
                        </div>
                        <div className={style.footer}>
                          <p>Learning Outcomes</p>
                          <button>
                            <img src={info} alt="" />
                          </button>
                        </div>
                      </div>
                    </Grow>
                  );
                })}
              </>
            ) : null}

            {activeCollegeTab.intermediate ? (
              <>
                {COLLEGE_DATA.intermediate.map((card) => {
                  return (
                    <Grow
                      in={activeCollegeTab.intermediate}
                      style={{ transformOrigin: "0 0 0" }}
                      {...(activeCollegeTab.intermediate
                        ? { timeout: card.timeout }
                        : {})}
                    >
                      <div className={style.card}>
                        <img src={getImageForCard(card.image)} alt="" />
                        <div className={style.text}>
                          <p className={style.cardClass}>{card.hours} HOURS</p>
                          <p className={style.cardTitle}>{card.title}</p>
                          <p className={style.cardInfo}>{card.info}</p>
                        </div>
                        <div className={style.bottom}>
                          <div className={style.price}>
                            <span>
                              &#8377;{" "}
                              {card.price1
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </span>
                            <p>
                              &#8377;{" "}
                              {card.price2
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </p>
                          </div>
                        </div>
                        <div className={style.footer}>
                          <p>Learning Outcomes</p>
                          <button>
                            <img src={info} alt="" />
                          </button>
                        </div>
                      </div>
                    </Grow>
                  );
                })}
              </>
            ) : null}

            {activeCollegeTab.advanced ? (
              <>
                {COLLEGE_DATA.advanced.map((card) => {
                  return (
                    <Grow
                      in={activeCollegeTab.advanced}
                      style={{ transformOrigin: "0 0 0" }}
                      {...(activeCollegeTab.advanced ? { timeout: card.timeout } : {})}
                    >
                      <div className={style.card}>
                        <img src={getImageForCard(card.image)} alt="" />
                        <div className={style.text}>
                          <p className={style.cardClass}>{card.hours} HOURS</p>
                          <p className={style.cardTitle}>{card.title}</p>
                          <p className={style.cardInfo}>{card.info}</p>
                        </div>
                        <div className={style.bottom}>
                          <div className={style.price}>
                            <span>
                              &#8377;{" "}
                              {card.price1
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </span>
                            <p>
                              &#8377;{" "}
                              {card.price2
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </p>
                          </div>
                        </div>
                        <div className={style.footer}>
                          <p>Learning Outcomes</p>
                          <button>
                            <img src={info} alt="" />
                          </button>
                        </div>
                      </div>
                    </Grow>
                  );
                })}
              </>
            ) : null}
          </div>
          <div className={style.postCard}>
            <p>
              All above course levels can be enrolled in a bundle of the respective grade.
            </p>
            <button onClick={handleEnroll}>
              <span className={style.crossed}>&#8377; {collegeBundlePrice.crossed}</span>
              <span className={style.bundlePrice}>
                &#8377; {collegeBundlePrice.price}
              </span>
              <span className={style.enrollText}>Enroll Now</span>
            </button>
            <p className={style.topText}>
              Includes recorded sessions and live Q & A sessions
            </p>
          </div>
        </div>
      </div>

      <div className={style.figuresWrapper}>
        <div className={style.figuresSkills}>
          <img src={figuresSkills} alt="" />
        </div>
        <div className={style.innerWrapper}>
          <div className={style.figures}>
            <div className={style.top}>
              <div className={style.figure}>
                <p>562,500+</p>
                <p>Happy Coders</p>
              </div>
              <div className={style.figure}>
                <p>33.7M+</p>
                <p>Hours of Learning</p>
              </div>
            </div>
            <div className={style.bottom}>
              <div className={style.figure}>
                <p>4.7+</p>
                <p>Avg Teacher Rating</p>
              </div>
              <div className={style.figure}>
                <p>105+</p>
                <p>Months experience in training</p>
              </div>
            </div>
          </div>
        </div>
        <div className={style.figuresCompany}>
          <img src={figuresCompany} alt="" />
        </div>
      </div>

      <div className={style.preFooterWrapper}>
        <div className={style.preFooter}>
          <img className={style.maths1} src={maths1} alt="" />
          <img className={style.maths2} src={maths2} alt="" />
          <img className={style.maths3} src={maths3} alt="" />
          <img className={style.maths4} src={maths4} alt="" />
          <img className={style.mathsToCode} src={mathsToCode} alt="" />
          <div className={style.text}>
            <p>
              Find coding resources for <span>FREE</span> on
            </p>
            <p>
              Maths<span>to</span>Code<span>.com</span>
            </p>
            <p>powered by Jayaho</p>
            <button onClick={redirectToMathsToCode} style={{ cursor: "pointer" }}>
              Visit Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function getImageForCard(type) {
  switch (type) {
    case "collegeYellow":
      return collegeYellow;
    case "collegePurple":
      return collegePurple;
    case "collegeGreen":
      return collegeGreen;
    case "codingGreen":
      return codingGreen;
    case "codingRed":
      return codingRed;
    case "codingBlue":
      return codingBlue;
    default:
      return codingBlue;
  }
}
