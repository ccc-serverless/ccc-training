import React from "react";
import CourseContentFooter from "./CourseContentFooter";

export default function WithFooter({ children }) {
  return (
    <>
      {children}
      <CourseContentFooter />
    </>
  );
}
