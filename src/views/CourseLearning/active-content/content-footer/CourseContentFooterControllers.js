import React, { useState, useEffect } from "react";
import style from "./CourseContentFooterControllers.module.scss";

import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "react-feather";

import useGetAllocatedCourse from "hooks/useGetAllocatedCourse";

export default function CourseContentFooterController({ marginTop = 0 }) {
  const params = useParams();
  const navigate = useNavigate();
  const { allocatedCourse } = useGetAllocatedCourse();
  const course = allocatedCourse.courseDetails;

  const [displayControllers, setDisplayControllers] = useState({
    prev: true,
    next: true,
  });
  const [data, setData] = useState({
    module: { items: [], name: "" },
    item: { slNo: 0, name: "" },
  });

  const itemNo = parseInt(params.itemNumber);
  const moduleNo = parseInt(params.moduleNumber);

  // Adjust displaying prev && next button
  function handleDisplayControllers() {
    let modulesCount = course.modules.length;
    let totalItems = course.modules[moduleNo - 1].items.length;

    if (moduleNo === 1 && itemNo === 1) {
      setDisplayControllers({ prev: false, next: true });
    } else if (moduleNo === modulesCount && itemNo === totalItems) {
      setDisplayControllers({ next: false, prev: true });
    } else {
      setDisplayControllers({ next: true, prev: true });
    }
  }

  function updateData() {
    const currentModule = course.modules.find((f) => f.order === moduleNo);
    const currentItem = currentModule.items.find((f) => f.slNo === itemNo);

    setData({
      module: currentModule,
      item: currentItem,
    });
  }

  function handleClickController(type) {
    let totalItems = data.module.items.length;
    let modulesCount = course.modules.length;

    switch (type) {
      case "next":
        if (itemNo < totalItems) {
          navigate(`/course/learn/${params.activeCourseId}/${moduleNo}/${itemNo + 1}`);
        } else if (itemNo === totalItems) {
          if (moduleNo < modulesCount)
            navigate(`/course/learn/${params.activeCourseId}/${moduleNo + 1}/${1}`);
        }
        break;

      case "prev":
        if (itemNo > 1) {
          navigate(
            `/course/learn/${params.activeCourseId}/${params.moduleNumber}/${itemNo - 1}`
          );
        } else if (itemNo === 1) {
          if (moduleNo > 1)
            navigate(
              `/course/learn/${params.activeCourseId}/${moduleNo - 1}/${
                course.modules[moduleNo - 2].items.length
              }`
            );
        }
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    if (!course) return;
    handleDisplayControllers();
    updateData();
  }, [params, course]);

  return (
    <div className={style.wrapper} style={{ marginTop: marginTop }}>
      <div className={style.controllers}>
        {displayControllers.prev && (
          <span onClick={handleClickController.bind(this, "prev")}>
            <ChevronLeft /> Prev
          </span>
        )}

        {displayControllers.next && (
          <span onClick={handleClickController.bind(this, "next")}>
            Next <ChevronRight />
          </span>
        )}
      </div>
    </div>
  );
}
