import React, { useState, useEffect } from "react";
import style from "./BundlesContainer.module.scss";

import clsx from "clsx";
import { ChevronDown } from "react-feather";
import ClipLoader from "react-spinners/BarLoader";

import BundleContainer from "components/shared/BundleContainer";
import { useBundleCourses } from "contexts/AllContexts";

import { AiFillLock } from "react-icons/ai";

export default function BundlesContainer(props) {
  const { showHeadingSlide, type, allowSwipe } = props.options;
  const BundleCourses = useBundleCourses();

  const [tabs] = useState([
    { key: "precoding", name: "Pre-Coding & Coding" },
    { key: "skills", name: "21st Century Skills" },
    { key: "company", name: "Company Specfic Modules", isLocked: true },
    { key: "internships", name: "Internships & Projects", isLocked: true },
  ]);

  const [bundlesByCat, setBundlesByCat] = useState(null);
  const [activeTab, setActiveTab] = useState("precoding");
  const [tabColor, setTabColor] = useState(null);

  function getBundles() {
    if (!BundleCourses) return;

    let obj = {
      precoding: [],
      skills: [],
      company: [],
      internships: [],
    };

    BundleCourses.state.bundles.forEach((bundle) => {
      let name = bundle.name;
      switch (name) {
        case "Strengthening Basics":
        case "Pre-Coding":
        case "Coding":
        case "Problem Solving":
        case "Domain Subjects":
          obj["precoding"].push(bundle);
          break;

        case "Full Stack Web Development":
        case "Mobile App Development":
        case "Data Science":
        case "Future Skills":
        case "Cloud Infrastructure":
          obj["skills"].push(bundle);
          break;

        // case "Class 9":
        // case "Class 10":
        //   obj["9-10"].push(bundle);
        //   break;

        // case "Class 11":
        // case "Class 12":
        //   obj["11-12"].push(bundle);
        //   break;

        default:
          console.log("");
      }
    });

    setBundlesByCat(obj);
  }

  useEffect(getBundles, [BundleCourses]);
  useEffect(() => {
    if (bundlesByCat && bundlesByCat[activeTab]) {
      setTabColor(bundlesByCat[activeTab][0]?.colorTheme);
    }
  }, [bundlesByCat, activeTab]);

  return !BundleCourses.state.isLoading.courses ? (
    <>
      <div className={style.tabsContainer}>
        {tabs.map((tab) => (
          <button
            className={clsx(style.tab, activeTab === tab.key && style.activeTab)}
            key={tab.key}
            onClick={() => {
              if (tab.isLocked) return;
              setActiveTab(tab.key);
            }}
            style={{ backgroundColor: activeTab === tab.key && tabColor }}
          >
            {tab.name}
            {tab.isLocked && (
              <span className={style.lock}>
                <AiFillLock size={15} />
              </span>
            )}

            <span className={style.tooltip}>
              <ChevronDown style={{ fill: activeTab === tab.key && tabColor }} />
            </span>
          </button>
        ))}
      </div>
      {bundlesByCat &&
        bundlesByCat[activeTab] &&
        bundlesByCat[activeTab].map(
          (bundle) =>
            bundle &&
            bundle.courses && (
              <div className={style.wrapper} key={bundle._id}>
                <BundleContainer
                  options={{ allowSwipe, type, showHeadingSlide }}
                  key={bundle._id}
                  bundle={bundle}
                />
              </div>
            )
        )}
    </>
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
      <ClipLoader color={"#1176ae"} size={10} />
    </div>
  );
}
