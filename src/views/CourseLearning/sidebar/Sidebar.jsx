import React from "react";
import styles from "./Sidebar.module.scss";

import clsx from "clsx";
import { useParams } from "react-router-dom";
import { BookOpen, ChevronDown, Check, Home, Lock } from "react-feather";

import { useSidebar } from "./useSidebar";
import { useEngine } from "../Engine";
import { useUser } from "contexts/AllContexts";

import config from "config/config.js";
import userImage from "assets/images/icons/user.png";

export default function Sidebar({ className }) {
  const params = useParams();

  const User = useUser();
  const { state, dispatch } = useEngine();
  const { handleClickSidebarModule, handleClickItem, handleSidebarNavRoute } = useSidebar(
    {
      state,
      dispatch,
    }
  );

  const { allocatedCourse } = state;
  const { courseDetails, bundleDetails } = allocatedCourse;

  function getClassNameForAccordion(mod) {
    let className = styles.accordion.toString();

    if (!state.sidebar.sidebarStatus[mod.order]) return className;
    if (!state.sidebar.sidebarStatus[mod.order].isOpen) return className;

    return (className += ` ${styles.activeAccordion}`);
  }

  return (
    allocatedCourse.modulesWithProgress && (
      <div className={clsx(className, styles.wrapper)}>
        <div className={styles.desktopToMobileNavs}>
          <div
            className={styles.mobileNav}
            onClick={handleSidebarNavRoute.bind(this, "/user/profile")}
          >
            <img
              src={
                User.state.profile.profileImage
                  ? `${config.apiBaseUrl}/${User.state.profile.profileImage}`
                  : userImage
              }
              alt=""
            />
            <p>{User.state.profile.name}</p>
          </div>
          <div
            className={styles.mobileNav}
            onClick={handleSidebarNavRoute.bind(this, "/")}
          >
            <Home />
            <p>Home</p>
          </div>
          <div
            className={styles.mobileNav}
            onClick={handleSidebarNavRoute.bind(this, "/user/courses")}
          >
            <BookOpen />
            <p>My Courses</p>
          </div>
        </div>
        <div className={styles.courseLogo}>
          <p>
            {bundleDetails.name} - {courseDetails.name}
          </p>
        </div>
        <div className={styles.navigation}>
          {state.sidebar.sidebarStatus &&
            allocatedCourse.modulesWithProgress.map((mod) => (
              <div className={getClassNameForAccordion(mod)} key={mod.order}>
                <div
                  onClick={handleClickSidebarModule.bind(this, mod)}
                  className={styles.accordionController}
                >
                  {mod.name !== "Overview" && (
                    <span
                      className={clsx(
                        styles.checkIcon,
                        mod.isCompleted && styles.activeCheckIcon
                      )}
                    >
                      <Check size={12} />
                    </span>
                  )}

                  <p className={styles.modName}>{mod.name}</p>

                  {mod.isLocked ? (
                    <span className={styles.lockIcon}>
                      <Lock size={15} />
                    </span>
                  ) : (
                    mod.items.reduce((acc, curr) => acc && curr.name, true) && (
                      <p className={styles.chevronIcon}>
                        <ChevronDown size={20} />
                      </p>
                    )
                  )}
                </div>

                {mod.items &&
                  state.sidebar.sidebarStatus[mod.order] &&
                  state.sidebar.sidebarStatus[mod.order].isOpen && (
                    <div className={styles.accordionMenu}>
                      {mod.items.map(
                        (item, i) =>
                          item.name && (
                            <p
                              key={i}
                              onClick={handleClickItem.bind(this, mod, item)}
                              className={clsx(
                                params.moduleNumber == mod.order &&
                                  params.itemNumber == i + 1 &&
                                  styles.activeRoute
                              )}
                            >
                              <span
                                className={clsx(
                                  styles.check,
                                  item.isCompleted && styles.activeCheck
                                )}
                              >
                                <Check size={12} />
                              </span>

                              {item.name}

                              {item.isLocked && (
                                <span className={styles.lockIcon}>
                                  <Lock size={15} />
                                </span>
                              )}
                            </p>
                          )
                      )}
                    </div>
                  )}
              </div>
            ))}
        </div>
      </div>
    )
  );
}
