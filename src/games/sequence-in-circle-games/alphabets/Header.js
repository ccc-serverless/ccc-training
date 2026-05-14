import React from "react";
import style from "./Header.module.scss";

import clsx from "clsx";

import Button from "../shared/Button";
import { useGameEngine } from "./engine/GameEngineProvider";

export default function GameSettings() {
  const { state, handleClickLevel, handleClickOrder, handleClickSplitType } = useGameEngine();

  const { gameSettings } = state;
  const isGameStart = state.gameState.isStart;

  return (
    <div className={style.wrapper}>
      {!isGameStart ? (
        <>
          <div className={clsx(style.row, style.levels)}>
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
          {state.gameSettings.isSplit && (
            <div className={clsx(style.row, style.orders)}>
              <p>Select Order</p>
              <div className={style.selectors}>
                <Button
                  className={style.buttonLevel}
                  onClick={handleClickSplitType.bind(this, "vowels")}
                  background={gameSettings.splitType === "vowels" ? "maroon" : "white-maroon"}
                >
                  Vowels
                </Button>
                <Button
                  className={style.buttonLevel}
                  onClick={handleClickSplitType.bind(this, "consonants")}
                  background={gameSettings.splitType === "consonants" ? "maroon" : "white-maroon"}
                >
                  Consonants
                </Button>
              </div>
            </div>
          )}

          <div className={clsx(style.row, style.orders)}>
            <p>Select Order</p>
            <div className={style.selectors}>
              <Button
                className={style.buttonLevel}
                onClick={handleClickOrder.bind(this, "inc")}
                background={gameSettings.order === "inc" ? "maroon" : "white-maroon"}
              >
                Ascending
              </Button>
              <Button
                className={style.buttonLevel}
                onClick={handleClickOrder.bind(this, "dec")}
                background={gameSettings.order === "dec" ? "maroon" : "white-maroon"}
              >
                Descending
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className={style.selected}>
          <div className={style.row}>
            <p> Level</p>
            <div> {gameSettings.level}</div>
          </div>
          <div className={style.row}>
            <p>Type</p>
            <div>{gameSettings.splitType === "vowels" ? "Vowels" : "Consonants"} </div>
          </div>
          <div className={style.row}>
            <p>Order</p>
            <div>{gameSettings.order === "inc" ? "Ascending" : "Descending"} </div>
          </div>
        </div>
      )}
    </div>
  );
}
