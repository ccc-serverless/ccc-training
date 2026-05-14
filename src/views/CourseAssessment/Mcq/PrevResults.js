import React, { useEffect, useState } from "react";
import style from "./PrevResults.module.scss";

import clsx from "clsx";
import { format } from "date-fns";
// import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";

import Button from "./Button";

import { useGameEngine } from "./engine/GameEngineProvider";

export default function PrevResults() {
  const { state, handleGameStart } = useGameEngine();

  const level = parseInt(state.gameSettings.level);

  const [chartData, setChartData] = useState({ keys: [], data: [], colors: [] });

  function parseChartData() {
    let updateChartData = { ...chartData };

    state.gameSettings.attempts
      .slice(Math.max(state.gameSettings.attempts.length - 10, 0))
      .reverse()
      .forEach((attempt) => {
        const key = format(new Date(attempt.createTime), "Do MMM,hh:mm aa");
        updateChartData.colors.push("white");
        updateChartData.keys.push(key);
        updateChartData.data.push({
          attempt: key,
          score: attempt.result.accuracy,
        });
        setChartData(updateChartData);
      });
  }

  useEffect(parseChartData, [state.gameSettings.attempts]);

  useEffect(() => {
    console.log(chartData);
  }, [chartData]);

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div className={style.content}>
          <div className={style.caption}>
            <h3> Assessment - Level {state.gameSettings.level}</h3>
            <div className={style.desc}>
              There are multiple choice questions. Select the one right option for each
              question and submit
            </div>
          </div>
          <div className={style.button}>
            <Button
              onClick={() => {
                handleGameStart();
              }}
            >
              Try Again
            </Button>
            <div>Unlimited Attempts</div>
          </div>
        </div>
        <div className={style.border}></div>
      </div>

      <div className={style.body}>
        <section className={style.attemptsSection}>
          <header>Level {level} Attempts</header>
          <div className={style.attempts}>
            {state.gameSettings.attempts
              .filter((attempt) => attempt.itemSlNo === level)
              .map((attempt) => (
                <article>
                  <div className={style.time}>
                    Attempted on{" "}
                    {format(new Date(attempt.createTime), "dd MMM yy, hh:mm aa")}
                  </div>
                  <div
                    className={clsx(
                      style.score,
                      attempt.result.accuracy > attempt.result.threshold
                        ? style.pass
                        : style.fail
                    )}
                  >
                    <span> Score: {attempt.result.accuracy.toFixed(2)}%</span> |{" "}
                    <span>
                      {attempt.result.accuracy > attempt.result.threshold
                        ? "PASS"
                        : "FAIL"}
                    </span>
                  </div>
                </article>
              ))}
          </div>
        </section>

        <section className={style.chartSection}>
          <header>Recent Attempts</header>

          <div className={style.chart}>
            <ResponsiveBar
              theme={{
                axis: {
                  ticks: {
                    text: {
                      fill: "#FFFFFF",
                    },
                  },
                  legend: {
                    text: {
                      fill: "white",
                    },
                  },
                  domain: {
                    line: {
                      stroke: "white",
                      strokeWidth: 2,
                    },
                  },
                },
              }}
              data={chartData.data}
              keys={["score"]}
              colors={chartData.colors}
              indexBy="attempt"
              margin={{ top: 50, right: 50, bottom: 50, left: 150 }}
              padding={0.7}
              valueScale={{ type: "linear" }}
              indexScale={{ type: "band", round: true }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 0,
                tickPadding: 5,
                tickRotation: 45,
                format: () => "",

                legend: "Attempt",
                legendPosition: "middle",
                legendOffset: 20,
              }}
              axisLeft={{
                tickSize: 0,
                tickPadding: 15,
                tickRotation: 0,
                format: (data) => (data % 20 ? "" : data),

                legend: "Score (%)",
                legendPosition: "middle",
                legendOffset: -90,
              }}
              label={null}
              isInteractive={false}
              enableGridX={false}
              enableGridY={false}
              role="application"
              ariaLabel="Attempts Trend Bar Chart"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
