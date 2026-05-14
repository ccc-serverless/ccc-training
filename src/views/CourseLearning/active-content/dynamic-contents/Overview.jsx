import React, { useState } from "react";
import styles from "./Overview.module.scss";

import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, ChevronDown, Lock } from "react-feather";

import Preloader from "components/shared/Preloader";
import { useEngine } from "../../Engine";

export default function CourseOverview({ course }) {
  const [activeAccordion, setActiveAccordion] = useState("randomId");
  const params = useParams();
  const navigate = useNavigate();

  const { state } = useEngine();

  const { allocatedCourse } = state;

  function handleItemClick(module, item, e) {
    if (item.isLocked) return;
    navigate(`/course/learn/${params.activeCourseId}/${module.order}/${item.slNo}`);
  }

  function handleExpandAccordion(id, module) {
    if (!module.isLocked && module.items.length === 1 && !module.items[0].name) {
      navigate(`/course/learn/${params.activeCourseId}/${module.order}/${1}`);
    }

    if (module.type !== "course-post-assessment") {
      if (id === activeAccordion) setActiveAccordion(null);
      else setActiveAccordion(id);
    }
  }

  return (
    <>
      {allocatedCourse && allocatedCourse.modulesWithProgress ? (
        <div className={styles.wrapper}>
          <div className={styles.headerBox}>
            <div className={styles.courseImage}>
              <img src={course.img_url} alt="" />
            </div>
            <div className={styles.courseDetails}>
              <p className={styles.courseTitle}>{course.name}</p>
              <p className={styles.courseSummary}>{course.description.summary}</p>
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.header}>
              <h2 className={styles.title}>Course Content</h2>
              <div className={styles.meta}>
                {
                  course.modules.filter(
                    (f) =>
                      f.type !== "course-overview" && f.type !== "course-post-assessment"
                  ).length
                }{" "}
                Chapters
              </div>
            </div>

            {allocatedCourse.modulesWithProgress.slice(1).map((module, index) => (
              <div key={module.name + index} className={styles.accordionWrapper}>
                <div
                  onClick={handleExpandAccordion.bind(this, index, module)}
                  className={styles.accordion}
                >
                  <p>{module.name}</p>

                  {module.isLocked ? (
                    <Lock />
                  ) : (
                    <>
                      {module.items.reduce((acc, curr) => acc && curr.name, true) && (
                        <ChevronDown />
                      )}
                    </>
                  )}

                  {/* {module.items.reduce((acc, curr) => acc && curr.name, true) && ( */}
                  {/* <div className={styles.duration}>
                    {module.isLocked ? <Lock /> : <ChevronDown />}
                  </div> */}
                  {/* )} */}
                </div>

                <div
                  className={`${styles.accordionExpand} ${
                    activeAccordion === index ? styles.activeAccordion : null
                  }`}
                >
                  {module.items.map((item) => (
                    <div
                      key={item.name + index}
                      onClick={handleItemClick.bind(this, module, item)}
                      className={styles.accordionContent}
                    >
                      <p>{item.name}</p>

                      <p>{item.isLocked ? <Lock /> : <ChevronRight />}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Preloader />
      )}
    </>
  );
}
