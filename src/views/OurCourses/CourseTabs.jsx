import React, { useEffect, useState } from "react";
import style from "./CourseTabs.module.scss";

import ClipLoader from "react-spinners/BarLoader";
import clsx from "clsx";

import BundleContainer from "components/shared/BundleContainer";
import Preloader from "components/shared/Preloader";

import { useBundleCourses } from "contexts/AllContexts";

export default function CourseTabs({ allowSwipe }) {
  const [allBundles, setAllBundles] = useState(null);
  const [selectedBundle, setSelectedBundle] = useState(null);

  const BundleCourses = useBundleCourses();

  function toggleBundle(bundle) {
    setSelectedBundle(bundle);
  }

  useEffect(() => {
    if (
      !BundleCourses.state.isLoading.bundle &&
      !BundleCourses.state.isLoading.courses &&
      BundleCourses.state.bundles.length
    ) {
      setAllBundles(BundleCourses.state.bundles);
      setSelectedBundle(BundleCourses.state.bundles[0]);
    }
  }, [BundleCourses]);

  return (
    <div className={style.wrapper}>
      <p className={style.heading}>Technical Skill Courses</p>
      <p className={style.subHeading}>
        A plug and play platform for CBSE schools to implement 21st century technical
        skills as per NEP 2020
      </p>
      {allBundles && (
        <div className={style.tabs}>
          {allBundles.map((bundle, index) => (
            <button
              key={index}
              className={clsx(
                style.tab,
                bundle._id === selectedBundle._id ? style.activeTab : null
              )}
              onClick={toggleBundle.bind(this, bundle)}
            >
              {bundle.name}
            </button>
          ))}
        </div>
      )}
      {BundleCourses.state.bundles.length && BundleCourses.state.isLoading.bundle ? (
        <Preloader />
      ) : (
        <>
          {allBundles && selectedBundle ? (
            selectedBundle &&
            selectedBundle.isLoaded && (
              <BundleContainer
                options={{
                  type: "HOME",
                  allowSwipe: allowSwipe,
                  showHeadingSlide: false,
                }}
                key={selectedBundle._id}
                bundle={selectedBundle}
              />
            )
          ) : (
            <div
              style={{
                display: "flex",
                height: "250px",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ClipLoader color={"#6a2c70"} size={10} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
