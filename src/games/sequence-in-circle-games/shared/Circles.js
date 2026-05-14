import React from "react";
import style from "./Circles.module.scss";

import Circle from "./Circle";
import clsx from "clsx";

export default function Circles({ state, handleClickCircle }) {
  const level = state.gameSettings.level;
  const data = state.runData.circleData;
  const isGameStarted = state.gameState.isStart;

  return (
    <div className={style.wrapper}>
      {state && level === 1 ? (
        <div className={style.level1Wrapper}>
          <div className={clsx(style.divider, state.gameState.isStart && style.animate)}>
            {[data[0], data[1]].map((circle, index) => (
              <Circle
                {...circle}
                isGameStarted={isGameStarted}
                key={`${index}`}
                id={`levelOne-${index + 1}`}
                index={index}
                handleClickCircle={handleClickCircle}
                className={clsx(style.circle, state.gameState.isStart && style.pulse)}
              />
            ))}
          </div>
          <div className={clsx(style.divider, state.gameState.isStart && style.animate)}>
            {[data[2], data[3]].map((circle, index) => (
              <Circle
                {...circle}
                key={`${index}`}
                isGameStarted={isGameStarted}
                id={`levelOne-${index + 1}`}
                index={index + 2}
                handleClickCircle={handleClickCircle}
                className={clsx(style.circle, state.gameState.isStart && style.pulse)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className={clsx(style.level2Wrapper, state.gameState.isStart)}>
          <div className={clsx(style.level2row1, state.gameState.isStart)}>
            <Circle
              {...data[0]}
              id={`levelTwo-1`}
              index={0}
              handleClickCircle={handleClickCircle}
              className={clsx(style.circle, state.gameState.isStart && style.pulse)}
            />
          </div>
          <div className={style.level2row2}>
            {data.map((item, i) => {
              if (i >= 1 && i <= 2) {
                return (
                  <Circle
                    key={`${i}`}
                    {...item}
                    id={`levelTwo-${i}`}
                    index={i}
                    handleClickCircle={handleClickCircle}
                    className={clsx(style.circle, state.gameState.isStart && style.pulse)}
                  />
                );
              }
            })}
          </div>
          <div className={style.level2row3}>
            {data.map((item, i) => {
              if (i >= 3 && i <= 5) {
                return (
                  <Circle
                    key={`${i}`}
                    {...item}
                    id={`levelTwo-${i}`}
                    index={i}
                    handleClickCircle={handleClickCircle}
                    className={clsx(style.circle, state.gameState.isStart && style.pulse)}
                  />
                );
              }
            })}
          </div>
          <div className={style.level2row4}>
            {data.map((item, i) => {
              if (i >= 6 && i <= 9) {
                return (
                  <Circle
                    key={`${i}`}
                    {...item}
                    id={`levelTwo-${i}`}
                    index={i}
                    handleClickCircle={handleClickCircle}
                    className={clsx(style.circle, state.gameState.isStart && style.pulse)}
                  />
                );
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
}
