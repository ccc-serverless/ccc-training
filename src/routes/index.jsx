import React, { useState, useEffect, Suspense } from "react";

import { useLocation } from "react-router-dom";
import { DndProvider } from "react-dnd";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";
import MultiBackend from "react-dnd-multi-backend";

import SuspenseLoader from "components/shared/SuspenseLoader";
import Navbar from "views/layout/Navbar";
import Footer from "views/layout/Footer";
import Headers from "./Headers";
import RoutesAll from "./RoutesAll";

import useRedirects from "./useRedirects";
import useTracking from "./useTracking";

export default function AppRouter() {
  const location = useLocation();

  useRedirects();
  useTracking();

  const [pageTitle, setPageTitle] = useState("CCC");
  const [showFooter, setShowFooter] = useState(false);

  function getPageTitle() {
    let pathname = location.pathname;
    let pathnameSplit = pathname.split("/");

    if (pathnameSplit[1] === "info" && pathnameSplit[2] === "course")
      return "CCC | Course";
    if (pathnameSplit[1] === "course" && pathnameSplit[2] === "learn")
      return "CCC | Learn";
    if (pathnameSplit[1] === "user" && pathnameSplit[2] === "reset-pass")
      return "CCC | Reset Password";

    switch (pathname) {
      case "/home":
        return "CCC | Home";
      case "/offerings":
        return "CCC | Offerings";
      case "/courses":
        return "CCC | Courses";
      case "/user/profile":
        return "CCC | Profile";
      case "/user/courses":
        return "CCC | My Courses";
      case "/terms-and-conditions":
        return "CCC | Terms & Conditions";
      default:
        return "CCC";
    }
  }

  function handleFooterDisplay() {
    let pathname = location.pathname;
    let pathnameSplit = pathname.split("/");

    if (
      pathnameSplit[1] === "course" &&
      (pathnameSplit[2] === "learn" || pathnameSplit[2] === "assessment")
    )
      setShowFooter(false);
    else setShowFooter(true);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    setPageTitle(getPageTitle());
    handleFooterDisplay();
  }, [location]);

  return (
    <React.Fragment>
      <Navbar />

      <Suspense fallback={<SuspenseLoader />}>
        <DndProvider backend={MultiBackend} options={HTML5toTouch}>
          <Headers pageTitle={pageTitle} />
          <RoutesAll />
        </DndProvider>
      </Suspense>

      {pageTitle !== "CCC | Learn" &&
        pageTitle !== "CCC | Reset Password" &&
        showFooter && <Footer />}
    </React.Fragment>
  );
}
