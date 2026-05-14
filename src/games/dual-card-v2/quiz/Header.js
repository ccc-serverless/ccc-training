import React from "react";
import style from "./Header.module.scss";

import { useGameEngine } from "./engine/GameEngineProvider";

import { titleCase } from "utils/helper";

export default function Header() {
  const { state } = useGameEngine();

  function getTopicFromId(ques, topicsArr) {
    let name = "";
    topicsArr.forEach((topic) => {
      if (topic._id === ques.topicId) name = topic.name;
    });

    return name;
  }

  const currQues = state.runData.questionsAsked[state.runData.questionIndex];

  return (
    <div className={style.wrapper}>
      <div className={style.heading}>TOPIC</div>
      <div className={style.tagsContainer}>
        <div className={style.topic}>
          {getTopicFromId(currQues, state.runData.topics)}
        </div>
        <div className={style.tags}>
          {currQues.tagIds.map((tag) => (
            <div className={style.tag}>{titleCase(state.tags[tag])}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
