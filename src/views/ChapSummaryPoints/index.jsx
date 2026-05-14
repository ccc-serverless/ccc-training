import React from "react";
import style from "./index.module.scss";

import { CheckCircle } from "react-feather";
import CourseContentFooter from "views/CourseLearning/active-content/content-footer/CourseContentFooter";

export default function ChapSummaryPoint({ summary }) {
  return (
    <div className={style.wrapper}>
      <h3>Summary</h3>

      <section>
        {summary.map((point) => (
          <article key={point.uid}>
            <span>
              <CheckCircle size={18} />
            </span>
            {point.point}
          </article>
        ))}
      </section>

      <CourseContentFooter />
    </div>
  );
}
