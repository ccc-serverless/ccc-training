import { useEffect } from "react";
import style from "./Contests.module.scss";

import { format, intervalToDuration, isAfter } from "date-fns";
import { BsCalendar4 } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";

import CodeForcesImg from "assets/images/coding-sites/codeforces.png";
import TopCoderImg from "assets/images/coding-sites/topcoder.png";
import CodeChefImg from "assets/images/coding-sites/codechef.png";
import HackerRankImg from "assets/images/coding-sites/hackerrank.png";
import HackerEarthImg from "assets/images/coding-sites/hackerearth.png";
import LeetCodeImg from "assets/images/coding-sites/leetcode.png";
import KickStartImg from "assets/images/coding-sites/kickstart.png";
import AtCoderImg from "assets/images/coding-sites/atcoder.png";
import OthersImg from "assets/images/coding-sites/others.png";

import useContests from "./useContests";
import clsx from "clsx";

import InlinePreloader from "components/shared/InlinePulseLoader";
import { splitArrChunks } from "utils/helper";

function makeCalendarLink(startTime, endTime, text, link) {
  return `https://calendar.google.com/calendar/u/0/r/eventedit?ctz=Asia%2FKolkata&dates=${startTime}/${endTime}&text=${text}&location=${link}/&pli=1`;
}

function getImageForSite(site) {
  switch (site) {
    case "Codeforces":
      return CodeForcesImg;
    case "TopCoder":
      return TopCoderImg;
    case "CodeChef":
      return CodeChefImg;
    case "CodeForces":
      return CodeForcesImg;
    case "HackerRank":
      return HackerRankImg;
    case "HackerEarth":
      return HackerEarthImg;
    case "LeetCode":
      return LeetCodeImg;
    case "Google":
      return KickStartImg;
    case "AtCoder":
      return AtCoderImg;
    case "Kick Start":
      return KickStartImg;
    default:
      return OthersImg;
  }
}

const Sites = [
  { name: "All Platforms", img: null, color: "#1176ae" },
  { name: "CodeForces", img: CodeForcesImg, color: "#e84033" },
  { name: "TopCoder", img: TopCoderImg, color: "#8ec546" },
  { name: "CodeChef", img: CodeChefImg, color: "#5b4638" },
  { name: "HackerRank", img: HackerRankImg, color: "#32c766" },
  { name: "HackerEarth", img: HackerEarthImg, color: "#2c3454" },
  { name: "LeetCode", img: LeetCodeImg, color: "#ffa116" },
  { name: "Kick Start", img: KickStartImg, color: "#3f7ee8" },
  { name: "AtCoder", img: AtCoderImg, color: "#1e1c1d" },
  { name: "Others", img: OthersImg, color: "#7e43ab" },
];

const SitesSplitBy3 = splitArrChunks(Sites, 3);

export default function Contests() {
  const { state, handleClickPlatform, handleClickTab } = useContests();

  const contestsByActiveSite = state.contestsBySite[state.activeSite] || { live: [], upcoming: [] };
  const tableBody = state.activeTabIndex === 0 ? contestsByActiveSite.live : contestsByActiveSite.upcoming;

  const activeContestsLiveCount = contestsByActiveSite.live.length;
  const activeContestsUpcomingCount = contestsByActiveSite.upcoming.length;

  function formatDateTime(dateTime) {
    return format(new Date(dateTime), "dd MMM yy, HH:mm");
  }

  function handleClickCalendar(contest) {
    const startTime = new Date(contest.start_time).toISOString().replace(/-/g, "").replace(/:/g, "");
    const endTime = new Date(contest.end_time).toISOString().replace(/-/g, "").replace(/:/g, "");
    const text = `Contest at ${contest.site}: ${contest.name}`;
    const calendarLink = makeCalendarLink(startTime, endTime, text, contest.url);
    window.open(calendarLink);
  }

  function getDuration(contest) {
    const startTime = new Date(contest.start_time);
    const endTime = new Date(contest.end_time);
    const duration = intervalToDuration({
      start: startTime,
      end: endTime,
    });

    let formatted = "";
    if (duration.years > 0) formatted += duration.years + (duration.years > 1 ? " yrs, " : " yr, ");
    if (duration.months > 0) formatted += duration.months + (duration.months > 1 ? " months, " : " month, ");
    if (duration.days > 0) formatted += duration.days + (duration.days > 1 ? " days, " : " day, ");
    if (duration.hours > 0) formatted += duration.hours + (duration.hours > 1 ? " hrs, " : " hr, ");

    if (formatted[formatted.length - 1] === " " && formatted[formatted.length - 2] === ",")
      formatted = formatted.substring(0, formatted.length - 2);

    return formatted;
  }

  function handleClickOpenLink(contest) {
    if (contest.site === "CodeForces") {
      if (isAfter(new Date(contest.start_time), new Date())) window.open("https://codeforces.com/contests");
      else window.open(contest.url);
    }

    window.open(contest.url);
  }

  function handleResize() {}
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.banner}>
        <div className={style.title}>Hackathons, Programming Challenges & Coding Competitions</div>
        <div className={style.subtitle}>One stop information hub for contests</div>
      </div>

      <section className={style.withPadding}>
        <div className={style.caption}>Select a platform</div>

        <div className={clsx(style.platforms, style.desktop)}>
          {Sites.map((site, index) => (
            <article
              className={style[`platform_${index}`]}
              style={
                state.activeSite === site.name
                  ? { border: `2px solid ${site.color}`, borderBottom: `4px solid ${site.color}` }
                  : {}
              }
              onClick={handleClickPlatform.bind(this, site.name)}
              key={site.name}
            >
              <div style={{ backgroundColor: site.color }} className={style.count}>
                {state.contestsBySite[site.name]?.totalCount || 0}
              </div>

              {site.name === state.activeSite && (
                <div style={{ borderTop: `10px solid ${site.color}` }} className={style.tooltipArrow}></div>
              )}

              {site.img && (
                <div className={style.image}>
                  <img src={site.img} alt="site-logo" />
                </div>
              )}
              <div className={style.name}>{site.name}</div>
            </article>
          ))}
        </div>

        <div className={clsx(style.platforms, style.mobile)}>
          {SitesSplitBy3.map((row) => (
            <div className={style.row}>
              {row.map((site) => (
                <article
                  style={
                    state.activeSite === site.name
                      ? { border: `2px solid ${site.color}`, borderBottom: `4px solid ${site.color}` }
                      : {}
                  }
                  onClick={handleClickPlatform.bind(this, site.name)}
                  key={site.name}
                >
                  <div style={{ backgroundColor: site.color }} className={style.count}>
                    {state.contestsBySite[site.name]?.totalCount || 0}
                  </div>

                  {site.name === state.activeSite && (
                    <div style={{ borderTop: `10px solid ${site.color}` }} className={style.tooltipArrow}></div>
                  )}

                  {site.img && (
                    <div className={style.image}>
                      <img src={site.img} alt="site-logo" />
                    </div>
                  )}
                  <div className={style.name}>{site.name}</div>
                </article>
              ))}
            </div>
          ))}
        </div>

        <div className={style.tableWrapper}>
          <div className={style.tabs}>
            <div
              className={clsx(style.tab, style.green, state.activeTabIndex === 0 && style.active)}
              onClick={handleClickTab.bind(this, 0)}
            >
              {state.activeTabIndex === 0 && (
                <div className={style.activeIndicator}>
                  <div className={style.whiteCircle}></div>
                </div>
              )}{" "}
              <span className={style.name}>
                Live Contests <span className={style.contestsCount}>{activeContestsLiveCount}</span>
              </span>
            </div>
            <div
              className={clsx(style.tab, style.orange, state.activeTabIndex === 1 && style.active)}
              onClick={handleClickTab.bind(this, 1)}
            >
              {state.activeTabIndex === 1 && (
                <div className={style.activeIndicator}>
                  <div className={style.whiteCircle}></div>
                </div>
              )}
              <span className={style.name}>
                Upcoming Contests <span className={style.contestsCount}>{activeContestsUpcomingCount}</span>{" "}
              </span>
            </div>
          </div>

          <div className={style.table}>
            {state.isLoading ? (
              <InlinePreloader />
            ) : (
              <>
                {!!tableBody.length ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Duration</th>
                        <th>Add Reminder</th>
                        <th>Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableBody.map((row) => (
                        <tr>
                          <td>
                            <img src={getImageForSite(row.site)} alt="logo" /> {row.name}
                          </td>
                          <td>{formatDateTime(row.start_time)}</td>
                          <td>{formatDateTime(row.end_time)}</td>
                          <td>{getDuration(row)}</td>
                          <td>
                            <button onClick={handleClickCalendar.bind(this, row)}>
                              <BsCalendar4 size={16} />
                            </button>
                          </td>
                          <td>
                            <button onClick={handleClickOpenLink.bind(this, row)}>
                              Open <FiExternalLink size={15} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className={style.nothingText}>No Contests</div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
