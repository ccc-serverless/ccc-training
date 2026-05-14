import React, { useEffect, useState } from "react";
import style from "./BarChart.module.scss";

const LABELS = ["0%", "25%", "50%", "75%", "100%"];

function BarChart(props) {
  const data = props.data;
  const [widths, setWidths] = useState([]);

  function handleWidths() {
    // for allowing transitioning (from 0 to value)
    setWidths(() => {
      return props.data.map((item) => {
        return item.value;
      });
    });
  }

  useEffect(() => {
    handleWidths();
  }, []);

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.title}>{props.title}</div>
        <div className={style.innerWrapper}>
          <div className={style.chartWrapper}>
            <div className={style.labels}>
              {LABELS.map((label) => {
                return (
                  <div className={style.label} style={{ left: label }}>
                    {label}
                  </div>
                );
              })}
            </div>
            {data.map((item, i) => {
              return (
                <div className={style.lineWrapper}>
                  <div className={style.labelWrapper}>
                    <div className={style.label}>{item.name}</div>
                  </div>
                  <div className={style.barWrapper}>
                    <div className={style.bar} style={{ width: `${widths[i]}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={style.yaxis}></div>
        </div>
      </div>
    </>
  );
}

export default BarChart;
