import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const CourseLearning = lazy(() => import("views/CourseLearning"));
const PreCourseAssessment = lazy(() => import("views/Pre-Assessment"));
const PostCourseAssessment = lazy(() => import("views/Post-Assessment"));

const ChapterPreAssessment = lazy(() => import("views/Chapter-Pre-Assessment"));
const ChapterPostAssessment = lazy(() => import("views/Chapter-Post-Assessment"));

export default function RoutesCourseLearning() {
  return (
    <Routes>
      <Route
        path="/learn/:activeCourseId/:moduleNumber/:itemNumber"
        element={<CourseLearning />}
      />

      <Route path="/assessment/entry/:activeCourseId" element={<PreCourseAssessment />} />

      <Route
        path="/assessment/pre-chapter/:activeCourseId/:moduleUid/:itemUid"
        element={<ChapterPreAssessment />}
      />
      <Route
        path="/assessment/post-chapter/:activeCourseId/:moduleUid/:itemUid"
        element={<ChapterPostAssessment />}
      />

      <Route
        path="/assessment/exit/:activeCourseId/:moduleUid/:itemUid"
        element={<PostCourseAssessment />}
      />
    </Routes>
  );
}
