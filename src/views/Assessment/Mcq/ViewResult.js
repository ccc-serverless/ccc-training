import React from "react";
import style from "./ViewResult.module.scss";

import { useParams, Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

import Button from "games/shared/Button";

const ViewResult = (props) => {
  const urlParams = useParams();

  const { courseName, type } = props;

  return (
    <div className={style.result}>
      <h4 className={style.resultTitle}>Assessment Completed</h4>
      <div className={style.buttonsWrapper}>
        <div className={style.buttonWrapper}>
          <Button
            className={style.bigButton}
            title="View Result"
            background="orange"
            radius="25"
            onClick={props.onClick}
          />
        </div>
        {/* <div className={style.buttonWrapper}>
          <Button
            className={style.bigButton}
            title="Start Course"
            background="orange"
            radius="25"
            onClick={() => navigate(`/course/learn/${urlParams.activeCourseId}/1/1`)}
          />
        </div> */}
        {type === "pre" && (
          <Link
            className={style.link}
            to={`/course/learn/${urlParams.activeCourseId}/1/1`}
          >
            Proceed to {courseName} <AiOutlineArrowRight size={20} />
          </Link>
        )}

        {(type === "pre-chapter" || type === "post-chapter") && (
          <Link
            className={style.link}
            to={`/course/learn/${urlParams.activeCourseId}/1/1`}
          >
            Back to {courseName} <AiOutlineArrowRight size={20} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ViewResult;
