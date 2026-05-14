import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Home = lazy(() => import("views/HomePage"));
const OurCourses = lazy(() => import("views/OurCourses"));
const ForSchools = lazy(() => import("views/ForSchools"));
const Offerings = lazy(() => import("views/Offerings"));

const TermsAndConditions = lazy(() => import("views/layout/Terms&Conditions"));
const Disclaimer = lazy(() => import("views/layout/Disclaimer/Disclaimer"));
const RefundPolicy = lazy(() =>
  import("views/layout/RefundPolicy/RefundPolicy")
);
const PrivacyPolicy = lazy(() =>
  import("views/layout/PrivacyPolicy/PrivacyPolicy")
);
const BundleAssessment = lazy(() =>
  import("views/Bundle-Assessment/Mcq/Container")
);
const BundleAssessmentResult = lazy(() =>
  import("views/Bundle-Assessment/Result/Result")
);
const KnowMore = lazy(() => import("views/CourseInfo"));
const Internships = lazy(() => import("views/Internships"));
const Contests = lazy(() => import("views/Contests"));
const TpoAgenda = lazy(() => import("views/Tpo-Agenda/TpoAgenda"));

export default function RoutesMisc() {
  return (
    <Routes>
      <Route path="/" element={<OurCourses />} />
      <Route path="tpoagenda" element={<TpoAgenda />} />
      <Route path="courses" element={<OurCourses />} />
      <Route path="schools" exact element={<ForSchools />} />
      <Route path="offerings" element={<Offerings />} />

      <Route path="info/course/:courseId" element={<KnowMore />} />

      <Route path="terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="disclaimer" element={<Disclaimer />} />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
      <Route path="refund-policy" element={<RefundPolicy />} />

      <Route
        path="/assessment/:bundleId"
        element={
          localStorage.getItem("authToken") ? (
            <BundleAssessment />
          ) : (
            <Navigate to="/ " />
          )
        }
      />
      <Route
        path="/assessment/result/:assessmentId"
        element={
          localStorage.getItem("authToken") ? (
            <BundleAssessmentResult />
          ) : (
            <Navigate to="/ " />
          )
        }
      />

      <Route path="/intern" element={<Internships />} />

      <Route path="/contests" element={<Contests />} />
    </Routes>
  );
}
