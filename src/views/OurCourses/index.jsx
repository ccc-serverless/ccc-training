import React from "react";
import styles from "./index.module.scss";

import Banner from "./Banner";
import BundlesContainer from "components/shared/BundlesContainer";
import CourseTabs from "./CourseTabs";

export default function OurCoursesIndex() {
  return (
    <div className={styles.wrapper}>
      <Banner />

      <header>
        <h2>
          Courses for Projects, Research, Internships, Startups & Placements
        </h2>
        <div>Plug and play platform for scaling up your career</div>
      </header>

      <BundlesContainer
        options={{ type: "COURSES", allowSwipe: true, showHeadingSlide: true }}
      />
      {/* <CourseTabs /> */}
    </div>
  );
}
