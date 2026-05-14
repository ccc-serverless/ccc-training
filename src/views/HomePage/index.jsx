import React from "react";
import styles from "./index.module.scss";

import HeroSection from "./HeroSection";
import CoursesPreview from "./CoursesPreview";
import Roadmap from "./Roadmap";

export default function HomePageIndex() {
  return (
    <div className={styles.wrapper}>
      <HeroSection />
      <CoursesPreview />
      <Roadmap />
    </div>
  );
}
