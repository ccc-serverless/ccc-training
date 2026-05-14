import { useState, useEffect } from "react";
import { getRequest } from "utils/api";

const _GraphStatOptions = [
  {
    value: "avgAccuracy",
    label: "Accuracy",
  },
  {
    value: "avgSpeed",
    label: "Speed",
  },
];

const _Colors = [
  "rgba(244,108,48,0.7)",
  "rgba(255, 159, 64, 0.7)",
  "rgba(234,67,53,0.7)",
  "rgba(75, 192, 192, 0.7)",
  "rgba(106,44,112,0.7)",
];

export function usePerformanceSummary() {
  const [activeAccordions, setActiveAccordions] = useState({ 0: true, 1: true });
  const [graphSelectedStat, setGraphSelectedStat] = useState(_GraphStatOptions[0]);

  const [legendsData, setLegendsData] = useState([]);
  const [graphData, setGraphData] = useState(null);

  const [statsPerCourse, setStatsPerCourse] = useState(null);

  function getGraphData(stat, arr) {
    let data = [];
    let labels = [];
    let graphBackgroundColor = [];
    let legends = [];

    arr.forEach((course, index) => {
      data.push(parseFloat(course[stat].toFixed(2)));
      labels.push(course.courseName);
      graphBackgroundColor.push(_Colors[index % 5]);
      legends.push({
        color: _Colors[index % 5],
        courseName: course.courseName,
      });
    });

    setLegendsData(legends);
    setGraphData({
      labels: labels,
      datasets: [
        {
          label: "Percent",
          data: data,
          backgroundColor: graphBackgroundColor,
          borderWidth: 1,
        },
      ],
    });
  }

  function toggleGraphStat(stat) {
    switch (stat) {
      case "avgSpeed":
        getGraphData("avgSpeed", statsPerCourse);
        break;
      case "avgAccuracy":
        getGraphData("avgAccuracy", statsPerCourse);
        break;
      default:
        return {};
    }
  }

  function toggleAccordion(accordionId) {
    setActiveAccordions((prev) => {
      return { ...prev, [accordionId]: !activeAccordions[accordionId] };
    });
  }

  function handleChangeSelectedStat(option) {
    setGraphSelectedStat(option);
  }

  function getPerformanceData() {
    getRequest(`/user/profile/performance/practice`)
      .then((resp) => {
        setStatsPerCourse(resp.data);
        getGraphData("avgAccuracy", resp.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (graphSelectedStat && statsPerCourse && statsPerCourse.length)
      toggleGraphStat(graphSelectedStat.value);
  }, [graphSelectedStat]);

  useEffect(() => {
    getPerformanceData();
  }, []);

  // useEffect(() => {
  //   if (statsPerCourse && statsPerCourse.length) {
  //     getGraphData("avgAccuracy", statsPerCourse);
  //   }
  // }, [statsPerCourse]);

  return {
    statsPerCourse: statsPerCourse,
    activeAccordions,
    graphSelectedStat,
    toggleAccordion,
    handleChangeSelectedStat,
    graphData,
    graphStatsOptions: _GraphStatOptions,
    legendData: legendsData,
  };
}
