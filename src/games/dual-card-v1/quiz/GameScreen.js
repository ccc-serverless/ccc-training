import React, { useEffect } from "react";
import style from "./GameScreen.module.scss";

import GameCard from "./GameCard";
import Result from "../../shared/Result";
import SelectionScreen from "../shared/SelectionScreen";

import { useGameEngine } from "./engine/GameEngineProvider";

export default function GameScreen({ gameName, gameId }) {
  const { state, dispatch, handleCloseResultModal, handleGameStart, handleResetGame } =
    useGameEngine();

  useEffect(() => {
    if (!gameName) return;

    dispatch({
      type: "UPDATE_GAME_SETTINGS",
      payload: {
        gameName,
        gameId,
      },
    });
  }, [gameName, gameId]);

  return (
    <div className={style.wrapper}>
      {!state.gameState.isStart && (
        <SelectionScreen
          state={state}
          dispatch={dispatch}
          handleGameStart={handleGameStart}
        />
      )}

      {state.gameState.isStart && <GameCard />}

      {state.gameState.isStart && !state.gameState.isEnd && (
        <div className={style.resetBtnContainer}>
          <button onClick={handleResetGame}>Reset</button>
        </div>
      )}

      {state.screenState.isOpenResultModal && (
        <Result
          result={state.runData.result}
          isOpen={state.screenState.isOpenResultModal}
          handleClose={handleCloseResultModal}
        />
      )}
    </div>
  );
}
