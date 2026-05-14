import React from "react";
import style from "./ActiveContent.module.scss";

import clsx from "clsx";
import useActiveContent from "./engine/useActiveContent";

export default function ActiveContentIndex({ allocatedCourse, className }) {
  const { currCourseContentBody } = useActiveContent(allocatedCourse.courseDetails);

  return <div className={clsx(className, style.wrapper)}>{currCourseContentBody}</div>;
}
