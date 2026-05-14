import React from "react";
import style from "./Sidebar.module.scss";

import { useNavigate, useParams } from "react-router-dom";
import { BiCheckCircle } from "react-icons/bi";
import { ChevronLeft } from "react-feather";

import clsx from "clsx";

export default function Sidebar({ state, dispatch, handleClickHam }) {
  const { questionsAsked, activeQuestionNumber } = state.runData;
  const { isStart, isEnd } = state.gameState;

  const navigate = useNavigate();
  const params = useParams();

  function navigateBack() {
    navigate(`/course/learn/${params.activeCourseId}/1/1`);
  }

  return (
    <div className={style.wrapper}>
      <div className={style.questions}>
        <div className={style.navigation} onClick={navigateBack}>
          <span>
            <ChevronLeft size={20} />
          </span>
          <span>back to course</span>
        </div>
        <h4>Assessment Questions</h4>

        <div onClick={handleClickHam} className={style.crossBtn}>
          &times;
        </div>
        {questionsAsked.map((ques, index) => (
          <article
            key={ques._id}
            className={clsx(
              activeQuestionNumber === index && style.active,
              (!isStart || isEnd) && style.noPointer
            )}
            onClick={() =>
              dispatch({
                type: "NAV_QUES_NUMBER",
                payload: { quesNumber: index },
              })
            }
          >
            {questionsAsked[index].responses.length ? <BiCheckCircle size={19} /> : null}
            Question {index + 1}
          </article>
        ))}
      </div>
    </div>
  );
}
