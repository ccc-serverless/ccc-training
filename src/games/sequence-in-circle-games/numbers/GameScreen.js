import React, { useEffect } from "react";

import Header from "./Header";

import Footer from "../shared/Footer";
import Title from "../shared/GameTitle";
import GameCard from "../shared/GameCard";
import Result from "../shared/Result";

import { useGameEngine } from "./engine/GameEngineProvider";

export default function GameScreen({ name, gameId }) {
  const {
    state,
    dispatch,
    handleClickCircle,
    handleGameStart,
    handleGameReset,
    handleOpenResultModal,
    handleCloseResultModal,
  } = useGameEngine();

  useEffect(() => {
    if (!name) return;

    dispatch({
      type: "SET_GAME_SETTINGS",
      payload: { name, gameId },
    });
  }, [name, gameId]);

  return (
    <>
      <Title title={state.gameSettings.name} />
      <Header />
      <GameCard
        state={state}
        handleClickCircle={handleClickCircle}
        handleClickViewResult={handleOpenResultModal}
        handleClickPlayAgain={handleGameReset}
      />

      {!state.gameState.isEnd && (
        <Footer
          state={state}
          handleGameStart={handleGameStart}
          handleGameReset={handleGameReset}
        />
      )}

      {state.screenState.isOpenResultModal && (
        <Result state={state} handleCloseResultModal={handleCloseResultModal} />
      )}
    </>
  );
}
