import React from "react";
import style from "./CourseContentFooter.module.scss";

import ItemCompleteButton from "./ItemCompleteButton";
import CourseContentFooterController from "./CourseContentFooterControllers";

export default function CouseContentFooter(props) {
  return (
    <div className={style.wrapper}>
      <ItemCompleteButton {...props} />
      <CourseContentFooterController />
    </div>
  );
}
