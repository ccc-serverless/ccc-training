import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const UserProfile = lazy(() => import("views/User"));
const UserMyCourses = lazy(() => import("views/User/MyCourses"));
const UpdatePassword = lazy(() => import("views/User/UpdatePassword"));

export default function RoutesUser() {
  return (
    <Routes>
      <Route path="profile" element={<UserProfile />} />
      <Route path="courses" element={<UserMyCourses />} />
      <Route path="reset-pass" element={<UpdatePassword />} />
    </Routes>
  );
}
