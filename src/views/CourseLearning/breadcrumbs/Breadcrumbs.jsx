import React, { useState, useEffect } from "react";
import styles from "./Breadcrumbs.module.scss";

import clsx from "clsx";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "react-feather";

export default function Breadcrumbs({ allocatedCourse, className }) {
  const params = useParams();

  const navigate = useNavigate();

  const { courseDetails, bundleDetails } = allocatedCourse;

  const [data, setData] = useState({
    module: { items: [], name: "" },
    item: { slNo: 0, name: "" },
  });
  const [displayControllers, setDisplayControllers] = useState({
    prev: true,
    next: true,
  });

  const itemNo = parseInt(params.itemNumber);
  const moduleNo = parseInt(params.moduleNumber);

  // Adjust displaying prev && next button
  function handleDisplayControllers() {
    let modulesCount = courseDetails.modules.length;
    let totalItems = courseDetails.modules[moduleNo - 1].items.length;

    if (moduleNo === 1 && itemNo === 1) {
      setDisplayControllers({ prev: false, next: true });
    } else if (moduleNo === modulesCount && itemNo === totalItems) {
      setDisplayControllers({ next: false, prev: true });
    } else {
      setDisplayControllers({ next: true, prev: true });
    }
  }

  // Handler for click on prev && next button
  function handleClickController(type) {
    let totalItems = data.module.items.length;
    let modulesCount = courseDetails.modules.length;

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
                courseDetails.modules[moduleNo - 2].items.length
              }`
            );
        }
        break;

      default:
        break;
    }
  }

  function updateData() {
    const currentModule = courseDetails.modules.find((f) => f.order === moduleNo);
    const currentItem = currentModule.items.find((f) => f.slNo === itemNo);

    setData({
      module: currentModule,
      item: currentItem,
    });
  }

  function handleClickBack() {
    navigate(`/course/learn/${params.activeCourseId}/1/1`);
  }

  useEffect(() => {
    handleDisplayControllers();
    updateData();
  }, [params]);

  return (
    <div className={clsx(className, styles.wrapper)}>
      <div className={clsx(styles.container, styles.desktop)}>
        <div className={styles.breadcrumbs}>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/course/learn/${params.activeCourseId}/1/1`)}
          >
            {bundleDetails.name} - {courseDetails.name}
          </p>
          <ChevronRight />

          {itemNo === 1 && parseInt(params.moduleNumber) === 1 ? (
            <p className={styles.last}>Overview</p>
          ) : (
            <>
              <p>{data.module.name}</p>
              <ChevronRight />
              <p>{data.item.name}</p>
            </>
          )}
        </div>
        <div className={styles.controllers}>
          {displayControllers.prev && (
            <button
              className={styles.prev}
              onClick={handleClickController.bind(this, "prev")}
            >
              <ChevronLeft /> Prev
            </button>
          )}
          {displayControllers.next && (
            <button onClick={handleClickController.bind(this, "next")}>
              Next <ChevronRight />
            </button>
          )}
        </div>
      </div>
      {
        <div className={clsx(styles.container, styles.mobile)}>
          <span onClick={handleClickBack}>
            <ChevronLeft />
          </span>
          <span>{courseDetails.name}</span>
        </div>
      }
    </div>
  );
}
