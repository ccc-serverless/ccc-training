import React from "react";
import style from "./CourseCardsBusiness.module.scss";
import { Grow } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import Tooltip from "@material-ui/core/Tooltip";

// import stars from "assets/images/courses/stars.png";

import { Lock } from "react-feather";

export default function AssessmentCard({ assessment, bundle }) {
  const navigate = useNavigate();

  function getTooltipText() {
    if (true) {
      return `Course is locked`;
    } else {
      return "";
    }
  }

  return (
    <Grow in={true}>
      <Tooltip
        title={getTooltipText()}
        placement="bottom-end"
        PopperProps={{ disablePortal: true }}
      >
        <div
          className={clsx(style.wrapper)}
          key={assessment._id}
          onClick={() => {
            if (localStorage.getItem("authToken"))
              navigate(`/assessment/${assessment._id}}`);
          }}
        >
          <div className={style.cardImage}>
            {assessment.image && <img src={assessment.image} alt="" />}
          </div>
          <dir className={style.text}>
            <div className={style.cardTitle}>
              <p>{assessment.name}</p>
              <div
                className={style.hours}
                style={{
                  backgroundColor: bundle.backgroundColor,
                  color: bundle.colorTheme,
                }}
              >
                {assessment.timeAlloted} {assessment.timeUnit}s
              </div>
            </div>
            <div className={style.desc}>
              <p>{assessment.description}</p>
            </div>
            <div className={style.controller}>
              {!localStorage.getItem("authToken") ? (
                <>
                  <button
                    style={{
                      color: bundle.colorTheme,
                      fontWeight: 600,
                      pointerEvents: "none",
                    }}
                  >
                    Assessment
                  </button>
                  <div
                    className={style.locked}
                    style={{ borderColor: bundle.colorTheme, color: bundle.colorTheme }}
                  >
                    <Lock />
                  </div>
                </>
              ) : (
                <button
                  onClick={() => {
                    navigate("/user/courses");
                  }}
                  style={{
                    backgroundColor: bundle.colorTheme,
                  }}
                >
                  View Assessment
                </button>
              )}
            </div>
          </dir>
        </div>
      </Tooltip>
    </Grow>
  );
}
