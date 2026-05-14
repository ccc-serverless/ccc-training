import React, { useState } from "react";
import styles from "./Flowchart.module.scss";

import { useNavigate, useParams } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

import Block from "./Block";

import { useUser } from "contexts/AllContexts";
import arrow from "assets/images/course-materials/flowchart/arrowVerticle.webp";

import { useMarkItemCompleted } from "../../engine/useMarkItemCompleted";

const flowchart = {
  2: [
    {
      type: "pill",
      color: "#ffe495",
      text: "Start",
    },
    {
      type: "paralellogram",
      color: "#b2cfff",
      text: "Read A,B",
    },
    {
      type: "rectangle",
      color: "#68e88a",
      text: "Calculate A+B",
    },
    {
      type: "paralellogram",
      color: "#b2cfff",
      text: "Show Sum",
    },
    {
      type: "pill",
      color: "#fbb5af",
      text: "End",
    },
  ],
  3: [
    {
      type: "pill",
      color: "#ffe495",
      text: "Start ",
    },
    {
      type: "paralellogram",
      color: "#b2cfff",
      text: "Accept data from sensor",
    },
    {
      type: "rectangle",
      color: "#68e88a",
      text: "Transfer sensor data to display data format",
    },
    {
      type: "paralellogram",
      color: "#b2cfff",
      text: "Send display data to display",
    },
    {
      type: "pill",
      color: "#fbb5af",
      text: "End",
    },
  ],
  4: [
    {
      type: "pill",
      color: "#ffe495",
      text: "Start",
    },
    {
      type: "paralellogram",
      color: "#b2cfff",
      text: "Read R",
    },
    {
      type: "rectangle",
      color: "#68e88a",
      text: "Set Pi = 3.142",
    },
    {
      type: "rectangle",
      color: "#68e88a",
      text: "Area = Pi * R * R",
    },
    {
      type: "paralellogram",
      color: "#b2cfff",
      text: "Display Area",
    },
    {
      type: "pill",
      color: "#fbb5af",
      text: "End",
    },
  ],
  1: [
    {
      type: "pill",
      color: "#ffe495",
      text: "Start",
    },
    {
      type: "paralellogram",
      color: "#b2cfff",
      text: "Input",
    },
    {
      type: "rectangle",
      color: "#68e88a",
      text: "Processing",
    },
    {
      type: "paralellogram",
      color: "#b2cfff",
      text: "Output",
    },
    {
      type: "pill",
      color: "#fbb5af",
      text: "End",
    },
  ],
  5: [
    {
      type: "pill",
      color: "#ffe495",
      text: "Start",
    },
    {
      type: "rectangle",
      color: "#68e88a",
      text: "Keep bowl on stove",
    },
    {
      type: "rectangle",
      color: "#68e88a",
      text: "Pour water and milk in bowl",
    },
    {
      type: "rectangle",
      color: "#68e88a",
      text: "Light the stove",
    },
    {
      type: "rectangle",
      color: "#68e88a",
      text: "Add sugar, tea and stir",
    },
    {
      type: "pill",
      color: "#68e88a",
      text: "End",
    },
  ],
};

export default function Flowchart() {
  const [counter, setCounter] = useState(1);
  const [isFinished, setIsFinished] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const User = useUser();

  const { upload } = useMarkItemCompleted();

  const itemNo = parseInt(params.itemNumber);
  const moduleNo = parseInt(params.moduleNumber);

  function incrementCounter() {
    if (counter !== 5) {
      setCounter((prev) => prev + 1);
    } else {
      setIsFinished(true);
      upload();
    }
  }

  function resetGame() {
    setCounter(1);
    setIsFinished(false);
  }

  function getCurrCourse() {
    return User.state.activeCourses.find((f) => f._id == params.activeCourseId)
      .courseDetails[0];
  }

  function nextTopic() {
    resetGame();
    setIsFinished(false);
    let currCourse = getCurrCourse();
    let modulesCount = currCourse.modules.length;
    let totalItems = currCourse.modules[moduleNo - 1].items.length;

    if (itemNo < totalItems) {
      navigate(`/course/learn/${params.activeCourseId}/${moduleNo}/${itemNo + 1}`);
    } else if (itemNo == totalItems) {
      if (moduleNo < modulesCount)
        navigate(`/course/learn/${params.activeCourseId}/${moduleNo + 1}/${1}`);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.ques}>
          <p>Simple Process Flowchart</p>
        </div>
        {!isFinished && (
          <div className={styles.controller}>
            <button onClick={incrementCounter}>
              Next <FiChevronRight />
            </button>
          </div>
        )}
      </div>
      <div className={styles.container}>
        {!isFinished ? (
          <>
            <p className={styles.counter}>Example {counter} of 5</p>
            <div className={styles.flowchart}>
              {flowchart[counter].map((block, index) => (
                <>
                  <div className={styles.block} key={index}>
                    <Block type={block.type} bgColor={block.color} text={block.text} />
                  </div>
                  {index < flowchart[counter].length - 1 ? (
                    <img className={styles.arrow} src={arrow} alt="" />
                  ) : null}
                </>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.endgame}>
            <p>You have seen all the examples</p>
            <button onClick={resetGame}>
              View Again <FiChevronRight />
            </button>
            <button onClick={nextTopic}>
              Proceed to next section <FiChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
