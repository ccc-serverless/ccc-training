import React, { useEffect, useState } from "react";
import style from "./Question.module.scss";

import ReactHtmlParser from "react-html-parser";
import Preloader from "components/shared/Preloader";

import { useTags } from "./_common/TagsContext";
import { useGetTopics } from "./_common/useGetTopics";
import { useLocation } from "react-router-dom";

import GameClockV2 from "../shared/GameClockV2";

export default function (props) {
  const { topics, getTopics, setTopics, isLoading } = useGetTopics();
  const questions = props.questions.asked;
  const lastIndex = questions.length - 1;
  const question = questions[lastIndex];

  const [topic, setTopic] = useState(null);
  const [isTrial, setIsTrial] = useState(false);

  const location = useLocation();
  const Tags = useTags();

  function getTopicFromId(ques, topicsArr) {
    topicsArr.forEach((topic) => {
      if (topic._id == ques.topicId) {
        setTopic(topic.name);
      }
    });
  }

  useEffect(() => {
    let path = location.pathname.split("/");
    if (path.indexOf("trial") !== -1) {
      setIsTrial(true);
    }
  }, [location]);

  useEffect(() => {
    getTopics(props.name);
  }, [props.name]);

  useEffect(() => {
    if (question && topics) {
      getTopicFromId(question, topics);
    }
  }, [question, topic]);

  return props.isLoading ? (
    <Preloader />
  ) : (
    <div className={style.wrapper}>
      <div className={style.gameClockWrapper}>
        <GameClockV2 totTimeElapsed={props.totTimeElapsed} />
      </div>

      <p>Topic</p>
      <p>{topic}</p>
      <div className={style.topics}>
        {question.tagIds.map((tagId) => {
          return <p key={tagId}>{Tags.state[tagId]}</p>;
        })}
      </div>
      <div className={style.questionWrapper}>
        <div className={style.title}>
          <p>Question</p>
        </div>
        <div className={style.question}>{ReactHtmlParser(question.question)}</div>
      </div>

      <div className={style.controller}>
      {console.log(props)}
        <p>
          Question {props.questions.asked.length} of {isTrial ? 1 : props.questions.all.length}
        </p>
      </div>
    </div>
  );
}
