import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const StudentRegistrations = lazy(() =>
  import("views/Registrations/StudentRegistrations")
);

export default function RoutesRegistrations() {
  return (
    <Routes>
      <Route path="students" element={<StudentRegistrations />} />
    </Routes>
  );
}
