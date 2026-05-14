import React from "react";
import style from "./Header.module.scss";

import Button from "../shared/Button";
import CustomSlider from "../shared/CustomSlider";

import { useGameEngine } from "./engine/GameEngineProvider";

export default function GameSettings() {
  const { state, handleClickLevel, handleChangeMaxTimePerQues, handleChangeLastNumber } =
    useGameEngine();

  const { gameSettings } = state;
  const isGameStart = state.gameState.isStart;

  return (
    <div className={style.wrapper}>
      {!isGameStart ? (
        <>
          <div className={style.levels}>
            <p>Select Level</p>
            <div className={style.selectors}>
              <Button
                className={style.buttonLevel}
                onClick={handleClickLevel.bind(this, 1)}
                background={gameSettings.level === 1 ? "maroon" : "white-maroon"}
              >
                1
              </Button>
              <Button
                className={style.buttonLevel}
                onClick={handleClickLevel.bind(this, 2)}
                background={gameSettings.level === 2 ? "maroon" : "white-maroon"}
              >
                2
              </Button>
            </div>
          </div>
          <div className={style.sliders}>
            <div className={`${style.sliderContainer}`}>
              <span>Speed</span>
              <CustomSlider
                handleChange={handleChangeMaxTimePerQues}
                label={{ 0: "2s", 100: "6s" }}
                value={gameSettings.maxTimePerQues}
                min={2}
                max={6}
              />
            </div>

            <div className={style.sliderContainer}>
              <span>{gameSettings.sliderCaption}</span>
              <CustomSlider
                handleChange={handleChangeLastNumber}
                label={{ 0: gameSettings.range.min, 100: gameSettings.range.max }}
                value={gameSettings.lastNumber}
                min={gameSettings.range.min}
                max={gameSettings.range.max}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={style.levels}>
            <p>Selected Level</p>
            <div className={style.selectedLevel}> {gameSettings.level}</div>
          </div>
          <div className={style.sliders}>
            <div>
              <span className={style.selectedLabel}>Speed</span> : &nbsp;
              <span style={{ color: "#b83b5e" }}>{gameSettings.maxTimePerQues} sec</span>
            </div>
            <div>
              <span className={style.selectedLabel}>{gameSettings.sliderCountCaption}</span> :
              &nbsp;
              <span style={{ color: "#b83b5e" }}>{gameSettings.range.max}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
