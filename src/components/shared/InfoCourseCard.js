import React from "react";
import style from "./InfoCourseCard.module.scss";
import { Grow } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import Tooltip from "@material-ui/core/Tooltip";
import stars from "assets/images/courses/stars.png";

export default function InfoCourseCard({ course, bundle, isStaticCards }) {
  const navigate = useNavigate();

  function getTooltipText(course) {
    if (course.status === 0) {
      return `Course is locked`;
    } else {
      return "";
    }
  }

  return (
    <Grow in={true}>
      <Tooltip
        title={getTooltipText(course)}
        placement="bottom-end"
        PopperProps={{ disablePortal: true }}
      >
        <div
          className={clsx(
            style.wrapper,
            isStaticCards && style.staticCard,
            !course.status && style.noPointer
          )}
          key={course._id}
          onClick={() => {
            if (course.status) {
              navigate(`/info/course/${course._id}`);
            }
          }}
        >
          <div
            className={`${style.cardImage} ${
              !course.img_url ? style.disabledCard : null
            }`}
          >
            {course.img_url ? <img src={course.img_url} alt="" /> : null}
          </div>
          <dir className={style.text}>
            <div className={style.cardTitle}>
              <p>{course.name}</p>
              <img src={stars} alt="" />
            </div>
            <div className={style.desc}>
              <p>{course.description.short}</p>
            </div>
          </dir>
        </div>
      </Tooltip>
    </Grow>
  );
}
