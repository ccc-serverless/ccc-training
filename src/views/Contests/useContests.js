import { useEffect, useState } from "react";
import { add, format, isAfter, isBefore } from "date-fns";

import { getRequest } from "utils/api";
import axios from "axios";

function getSiteKey(siteName) {
  switch (siteName) {
    case "AtCoder":
    case "TopCoder":
    case "CodeChef":
    case "LeetCode":
    case "CodeForces":
    case "HackerEarth":
    case "HackerRank":
    case "Kick Start":
      return siteName;

    default:
      return "Others";
  }
}

export default function useContests() {
  const [state, setState] = useState({
    allContests: [],
    contestsBySite: {},

    activeTabIndex: 0,
    activeSite: "All Platforms",

    isLoading: true,
  });

  function handleClickPlatform(siteKey) {
    setState((prev) => ({ ...prev, activeSite: siteKey }));
  }
  function handleClickTab(index) {
    setState((prev) => ({ ...prev, activeTabIndex: index }));
  }

  function getContests() {
    axios
      .get("https://api.student.ccc.training/contests/all")
      // getRequest(`/coding-contests`)
      .then((resp) => {
        const contestsBySite = {};

        function isContestLive(contest) {
          const todayEnd = format(new Date(), "yyyy-MM-dd 23:59:59");
          const currentDateTime = new Date();
          const startedBeforeToday = isBefore(new Date(contest.start_time), new Date(todayEnd));
          const endingBeforeNow = isAfter(new Date(contest.end_time), currentDateTime);

          return startedBeforeToday && endingBeforeNow;
        }

        function isContestUpcoming(contest) {
          const tomorrowDate = add(new Date(), { days: 1 });
          const tomorrowStart = format(tomorrowDate, "yyyy-MM-dd 00:00:00");

          const startsAfterToday = isAfter(new Date(contest.start_time), new Date(tomorrowStart));
          return startsAfterToday;
        }

        resp.data.data.forEach((contest) => {
          contestsBySite[getSiteKey(contest.site)] = { live: [], upcoming: [] };
        });

        resp.data.data.forEach((contest) => {
          if (isContestLive(contest))
            contestsBySite[getSiteKey(contest.site)]["live"].push(contest);
          if (isContestUpcoming(contest))
            contestsBySite[getSiteKey(contest.site)]["upcoming"].push(contest);
        });

        contestsBySite["All Platforms"] = { live: [], upcoming: [] };
        resp.data.data.forEach((contest) => {
          if (isContestLive(contest)) contestsBySite["All Platforms"]["live"].push(contest);
          if (isContestUpcoming(contest)) contestsBySite["All Platforms"]["upcoming"].push(contest);
        });

        for (const key in contestsBySite) {
          contestsBySite[key].totalCount =
            contestsBySite[key].live.length + contestsBySite[key].upcoming.length;
        }

        setState((prev) => ({
          ...prev,
          allContests: resp.data,
          contestsBySite,
          isLoading: false,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(getContests, []);

  return { state, handleClickPlatform, handleClickTab };
}
