import React, { useEffect } from "react";

import { useGameEngine } from "./engine/GameEngineProvider";

import SelectionScreen from "../shared/SelectionScreen";
import GameCard from "./GameCard";
import Result from "../../shared/Result";

export default function GameScreen({ gameName, gameId }) {
  const { state, dispatch, handleGameStart, handleCloseResultModal } = useGameEngine();

  useEffect(() => {
    dispatch({
      type: "UPDATE_GAME_SETTINGS",
      payload: {
        gameName,
        gameId,
      },
    });
  }, [gameName, gameId]);

  return (
    <div>
      {!state.gameState.isStart && (
        <SelectionScreen
          state={state}
          dispatch={dispatch}
          handleGameStart={handleGameStart}
        />
      )}

      {state.gameState.isStart && <GameCard />}

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
