import React from "react";
import styles from "./MyCourses.module.scss";

import Preloader from "components/shared/Preloader";
import useMyCourses from "./useMyCourses";

export default function MyCourses() {
  const { User, allCourses, handleClickCourse } = useMyCourses();

  function getButtonText(course) {
    switch (course.status) {
      case 0:
        return "Start";
      case 1:
        return "Continue";
      case 2:
        return "Completed";
      default:
        return "";
    }
  }

  return User.state.isLoading ? (
    <Preloader />
  ) : (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <p>My Courses</p>
      </div>

      {allCourses.length ? (
        allCourses.map((bundledCourses) => (
          <div className={styles.coursesWrapper} key={bundledCourses[0].bundleName}>
            <p className={styles.courseType}>{bundledCourses[0].bundleName}</p>
            <div className={styles.courses}>
              {bundledCourses.length ? (
                <>
                  {bundledCourses.map((course) => (
                    <div className={styles.card} key={course.name}>
                      <div className={styles.image}>
                        <img src={course.img_url} alt="" />
                      </div>
                      <div className={styles.text}>
                        <p>{course.name}</p>
                      </div>
                      <div className={styles.progress}>
                        <div className={styles.progressBarBackground}>
                          <div
                            className={styles.progressBarForeground}
                            style={{
                              width: `${course.percentCompletion}%`,
                            }}
                          ></div>
                        </div>
                        <p>{course.percentCompletion}% Complete</p>
                      </div>
                      <div className={styles.controller}>
                        <button onClick={handleClickCourse.bind(this, course)}>
                          {getButtonText(course)}
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              ) : null}
            </div>
          </div>
        ))
      ) : (
        <div className={styles.noCourses}>No courses to show.</div>
      )}
    </div>
  );
}
