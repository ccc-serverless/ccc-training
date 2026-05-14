import React from "react";
import style from "./PerformanceSummary.module.scss";

import clsx from "clsx";
import { ChevronDown } from "react-feather";
import { PolarArea } from "react-chartjs-2";
import Select from "react-select";

import { usePerformanceSummary } from "./usePerformanceSummary";

export default function PerformanceSummary() {
  const {
    statsPerCourse,
    activeAccordions,
    toggleAccordion,
    graphStatsOptions,
    graphSelectedStat,
    handleChangeSelectedStat,
    graphData,
    legendData,
  } = usePerformanceSummary();

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      width: "120px",
      padding: "0px",
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0,
    }),
    option: (provided, state) => ({
      ...provided,
      cursor: "pointer !important",
      padding: "10px",
    }),
    control: () => ({
      width: 120,
      display: "flex",
      cursor: "pointer !important",
      background: "#eeeeee",
      borderRadius: "5px",
    }),
    valueContainer: (p) => ({
      ...p,
      width: "200px",
      flex: "unset",
    }),
    indicatorSeparator: (p) => ({ ...p, display: "none !important" }),
    singleValue: (provided, state) => {
      return { ...provided };
    },
  };

  return statsPerCourse && statsPerCourse.length ? (
    <div className={style.wrapper}>
      <h1>Course Performance Summary</h1>

      <div className={style.grid}>
        <div className={style.column}>
          {statsPerCourse &&
            statsPerCourse.map((item, index) => (
              <div
                key={index}
                className={clsx(
                  style.accordion,
                  activeAccordions[item.courseId] && style.accordionOpen
                )}
              >
                <div
                  onClick={toggleAccordion.bind(this, item.courseId)}
                  className={clsx(style.header)}
                >
                  <div>
                    <p>Course</p>
                    <p>{item.courseName}</p>
                  </div>
                  <div>
                    <p>Accuracy</p>
                    <p>{item.avgAccuracy?.toFixed(2)}%</p>
                  </div>
                  <div>
                    <p>Avg Speed</p>
                    <p>
                      {item.avgSpeed?.toFixed(2)}
                      secs
                    </p>
                  </div>
                  <div>
                    <ChevronDown />
                  </div>
                </div>
                <div className={style.report}>
                  <div className={style.titles}>
                    <p>Chapters</p>
                    <p>Accuracy</p>
                    <p>Speed</p>
                  </div>
                  {item.statsByChapters.map((chapter, index) => (
                    <div key={index} className={style.dataRow}>
                      <p>{chapter.name}</p>
                      <p>{chapter.avgAccuracy.toFixed(2)}%</p>
                      <p>{chapter.avgSpeed.toFixed(2)} secs</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
        {graphData && graphStatsOptions && legendData && (
          <div className={style.graphWrapper}>
            <div className={style.selectWrapper}>
              <Select
                styles={customStyles}
                options={graphStatsOptions}
                value={graphSelectedStat}
                onChange={(opt) => handleChangeSelectedStat(opt)}
              />
            </div>
            <div className={style.legendWrapper}>
              {legendData.map((item) => (
                <div className={style.legendItem}>
                  <div className={style.box} style={{ background: item.color }}></div>
                  <div className={style.course}>{item.courseName}</div>
                </div>
              ))}
            </div>
            <div className={style.chartWrapper}>
              <PolarArea
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          const unit = graphSelectedStat.value === "avgSpeed" ? "s" : "%";
                          return `${context.label} : ${
                            context.dataset.data[context.dataIndex]
                          }${unit}`;
                        },
                      },
                    },
                  },
                  maintainAspectRatio: false,
                }}
                data={graphData}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className={style.nullText}>Play games to get detailed statistics here</div>
  );
}
