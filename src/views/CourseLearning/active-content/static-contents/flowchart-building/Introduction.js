import React from "react";
import style from "./Introduction.module.scss";

import arrow from "assets/images/course-materials/flowchart/arrowHorizontal.webp";
import monitor from "assets/images/course-materials/flowchart/monitor.png";
import printer from "assets/images/course-materials/flowchart/printer.png";
import paper from "assets/images/course-materials/flowchart/paper.png";
import print1 from "assets/images/course-materials/flowchart/print1.png";
import print2 from "assets/images/course-materials/flowchart/print2.png";

export default function Introduction() {
  return (
    <div className={style.wrapper}>
      <p className={style.heading}>Introduction</p>
      <div className={style.description}>
        <p>
          <span>Input, Process & Output</span> are the fundamental building blocks of a
          system.
        </p>
        <p>
          For example, the input could be provided by a user like at an ATM machine or in
          a form online or it could data provided by an instrument like a temperature
          read. The program will have code to interpret the input and generate an output.
        </p>
        <p>
          The output could be a series of things: a message printed on the user interface
          or data handed off to another process.
        </p>
      </div>
      <div className={style.box}>
        <p className={style.heading}>Input</p>
        <img className={style.arrow} src={arrow} alt="" />
        <p className={style.heading}>Process</p>
        <img className={style.arrow} src={arrow} alt="" />
        <p className={style.heading}>Output</p>
      </div>
      <p className={style.heading}>Example 1</p>
      <div className={style.box}>
        <div className={style.block}>
          <img src={monitor} alt="" />
          <p>Computer requests for a print as input</p>
        </div>
        <img className={style.arrow} src={arrow} alt="" />
        <div className={style.block}>
          <img src={printer} alt="" />
          <p>Printer accept input from computer & process printing</p>
        </div>
        <img className={style.arrow} src={arrow} alt="" />
        <div className={style.block}>
          <img src={print1} alt="" />
          <p>We get printed paper as the output</p>
        </div>
      </div>
      <p className={style.heading}>Example 2</p>
      <div className={style.box}>
        <div className={style.block}>
          <img src={paper} alt="" />
          <p>Blank paper as an Input to the printer</p>
        </div>
        <img className={style.arrow} src={arrow} alt="" />
        <div className={style.block}>
          <img src={printer} alt="" />
          <p>Printer takes blank paper to process printing</p>
        </div>
        <img className={style.arrow} src={arrow} alt="" />
        <div className={style.block}>
          <img src={print2} alt="" />
          <p>We get printed paper as the output</p>
        </div>
      </div>

      {/* <CourseContentFooter /> */}
    </div>
  );
}
