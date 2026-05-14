import React, { useEffect } from "react";
import style from "./index.module.scss";

import { useParams, useNavigate } from "react-router-dom";
import clsx from "clsx";

import Preloader from "components/shared/Preloader";
import Sidebar from "./sidebar/Sidebar";
import Breadcrumbs from "./breadcrumbs/Breadcrumbs";
import ActiveContent from "./active-content/ActiveContent";

import { useEngine, EngineProvider } from "./Engine";
import useAppStore from "stores/AppStore";

function CourseLearningIndex() {
  const urlParams = useParams();
  const navigate = useNavigate();

  const { state } = useEngine();
  const { isLoading, allocatedCourse } = state;

  function isOverview() {
    return parseInt(urlParams.moduleNumber) === 1;
  }

  useEffect(() => {
    if (!allocatedCourse || !allocatedCourse._id) return;

    const module = allocatedCourse.courseDetails.modules.find(
      (f) => f.order === parseInt(urlParams.moduleNumber)
    );
    const item = module.items.find((f) => f.slNo === parseInt(urlParams.itemNumber));

    const moduleInProgress = allocatedCourse.progressStatus.find(
      (f) => f.moduleUid === module.uid
    );
    const itemInProgress = moduleInProgress.items.find((f) => f.itemUid === item.uid);

    if (itemInProgress.isLocked) navigate(`/course/learn/${allocatedCourse._id}/1/1`);
  }, [allocatedCourse]);

  const isLearninSidebarOpen = useAppStore((state) => state.isLearninSidebarOpen);

  return !isLoading && allocatedCourse.courseDetails ? (
    <div className={clsx(style.wrapper, isOverview() && style.overview)}>
      <Breadcrumbs
        className={style.breadcrumbsWrapper}
        allocatedCourse={state.allocatedCourse}
      />

      <div className={style.body}>
        <Sidebar
          allocatedCourse={state.allocatedCourse}
          className={clsx(
            style.sidebarWrapper,
            isLearninSidebarOpen && style.sidebarOpen
          )}
        />
        <ActiveContent
          allocatedCourse={state.allocatedCourse}
          className={clsx(style.activeContentWrapper)}
        />
      </div>
    </div>
  ) : (
    <Preloader />
  );
}

export default function WithProvider() {
  /* Returns CourseLearningIndex wrapped around the Engine Provider 
     so that state can be accessed without creating a new component just for wrapping 
  */
  return (
    <EngineProvider>
      <CourseLearningIndex />
    </EngineProvider>
  );
}
