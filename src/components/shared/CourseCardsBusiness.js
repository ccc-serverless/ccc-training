import React from "react";
import style from "./CourseCardsBusiness.module.scss";
import { Grow } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import Tooltip from "@material-ui/core/Tooltip";

import { Lock } from "react-feather";

export default function CourseCardBusiness({ course, bundle, isStaticCards }) {
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
        // disableHoverListener={course.status}
        // disableFocusListener={course.status}
        // disableTouchListener={course.status}
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
              {/* <img src={stars} alt="" /> */}
              <div
                className={style.hours}
                style={{
                  backgroundColor: bundle.backgroundColor,
                  color: bundle.colorTheme,
                }}
              >
                {course.hours} hours
              </div>
            </div>
            <div className={style.desc}>
              <p>{course.description.short}</p>
            </div>
            <div className={style.controller}>
              <button
                style={{
                  backgroundColor: bundle.colorTheme,
                  // width: course.status === 0 ? "70%" : null,
                }}
              >
                Know More
              </button>
              {course.status === 0 ? (
                <div
                  className={style.locked}
                  style={{
                    borderColor: bundle.colorTheme,
                    color: bundle.colorTheme,
                  }}
                >
                  <Lock />
                </div>
              ) : null}
            </div>
          </dir>
        </div>
      </Tooltip>
    </Grow>
  );
}
