import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import SuspenseLoader from "components/shared/SuspenseLoader";

import RoutesUser from "./RoutesUser";
import RoutesCourse from "./RoutesCourse";
import RoutesMisc from "./RoutesMisc";
import RoutesTrial from "./RoutesTrial";

import RoutesRegistrations from "./RoutesRegistrations";

export default function RoutesAll() {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Routes>
        <Route path="user/*" element={<RoutesUser />} />
        <Route path="course/*" element={<RoutesCourse />} />
        <Route path="trial/*" element={<RoutesTrial />} />

        <Route path="registrations/*" element={<RoutesRegistrations />} />

        <Route path="*" element={<RoutesMisc />} />
      </Routes>
    </Suspense>
  );
}
