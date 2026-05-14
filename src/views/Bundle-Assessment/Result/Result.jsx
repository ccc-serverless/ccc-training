import React from "react";
import style from "./Result.module.scss";

import { format } from "date-fns";

// import { FiFileText, FiRefreshCw } from "react-icons/fi";
import puzzle from "assets/images/puzzle.png";
import useResult from "./useResult";

import Preloader from "components/shared/Preloader";

import { useUser } from "contexts/AllContexts";

export default function TestReport() {
  const { result, tags, tagsByCategory } = useResult();
  const User = useUser();

  return (
    <div className={style.wrapper}>
      {!result ? (
        <Preloader />
      ) : (
        <div className={style.maxWidthWrapper}>
          {/* <div className={style.header}>
          <p>
            This test report is saved in your account under <span>Tests</span>
          </p>
          <button>
            <FiFileText /> Download PDF
          </button>
        </div> */}
          <div className={style.reportCard}>
            <div className={style.testDetails}>
              <div className={style.columnOne}>
                <div className={style.icon}>
                  <img src={puzzle} alt="" />
                </div>
                <p>{result.assessment.name}</p>
              </div>
              <div className={style.columnTwo}>
                {/* <p>Test Id: #JGPT0014</p> */}
                <p>Date: {format(new Date(result.createTime), "d MMM yyyy")}</p>
              </div>
            </div>

            <div className={style.student}>
              <p>Name: {User.state.profile.name}</p>
              <div>
                <p>
                  Score:{" "}
                  <span>
                    {result.totalCorrect}/{result.quesCount}
                  </span>
                </p>
                <p>
                  Percentage: <span>{result.accuracy}</span>
                </p>
              </div>
            </div>

            <div className={style.topics}>
              <div className={style.good}>
                <p>Topics you're good in</p>
                <div>
                  {tagsByCategory.good.map((tagId) => (
                    <span key={tagId}>{tags[tagId] && tags[tagId].name}</span>
                  ))}
                </div>
              </div>
              <div className={style.bad}>
                <p>Topics you can do better in</p>
                <div>
                  {tagsByCategory.bad.map((tagId) => (
                    <span key={tagId}>{tags[tagId] && tags[tagId].name}</span>
                  ))}
                </div>
              </div>
              <div className={style.worse}>
                <p>Topics you need to focus on</p>
                <div>
                  {tagsByCategory.worst.map((tagId) => (
                    <span key={tagId}>{tags[tagId] && tags[tagId].name}</span>
                  ))}
                </div>
              </div>
            </div>
            {/* 
          <div className={style.remarks}>
            <p>
              Remarks: <span>Shwet have clear understanding of pre-coding topics.</span>
            </p>
          </div> */}
          </div>

          {/* <div className={style.controller}>
          <button>
            <FiRefreshCw />
            Retake Test
          </button>
        </div> */}
        </div>
      )}
    </div>
  );
}
