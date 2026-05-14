import React, { useEffect } from "react";
import style from "./GameScreen.module.scss";

import clsx from "clsx";
import ReactFlow, { ReactFlowProvider, Controls } from "react-flow-renderer";
import ReactHtmlParser from "react-html-parser";
import { ChevronRight } from "react-feather";
import { BsArrowsFullscreen } from "react-icons/bs";

import { useGameEngine, GameEngineProvider } from "./engine/GameEngineProvider";

import GameClock from "./GameClock";
import Sidebar from "./Sidebar";
import Preloader from "components/shared/Preloader";
import Toast from "./Toast";
import ViewResult from "../shared/ViewResult";
import Result from "../shared/Result";

import CustomEdge from "./CustomEdge";
import EdgeNoButton from "./EdgeNoButton";
import StartNode from "./NodeStart";
import EndNode from "./NodeEnd";
import InputNode from "./NodeInput";
import ProcessNode from "./NodeProcess";
import DecisionNode from "./NodeDecision";
import BranchNode from "./NodeBranch";

const nodeTypes = {
  START: StartNode,
  END: EndNode,
  INPUT: InputNode,
  PROCESS: ProcessNode,
  DECISION: DecisionNode,
  BRANCH: BranchNode,
};

const edgeTypes = {
  CUSTOM: CustomEdge,
  NO_EDGE: EdgeNoButton,
};

function GameScreen({ gameName, gameId }) {
  const {
    state,
    dispatch,
    handleGameReset,
    handleGameStart,
    reactFlowRef,
    onLoad,
    onConnect,
    onDragOver,
    onDrop,
    handleSubmitAnswer,
    handleOpenResultModal,
    handleCloseResultModal,
    toggleFullScreen,
  } = useGameEngine();

  const { screenState, runState, gameState } = state;
  const questions = state.runState.questions.asked;
  const quesAllLen = state.runState.questions.all.length;

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

  return screenState.isLoading ? (
    <Preloader />
  ) : screenState.isTouchDevice ? (
    <div className={style.mobileWrapper}>
      Please open the game in a Desktop PC/Laptop for best results
    </div>
  ) : (
    <div className={style.wrapper}>
      {!gameState.isStart && (
        <div className={style.preGameWrapper}>
          <p>Flowchart Building</p>
          <p>
            You need to arrange the blocks of the flowchart in correct order to arrive at
            the solution. Good Luck!
          </p>
          <button onClick={handleGameStart}>Start</button>
        </div>
      )}

      {gameState.isStart && (
        <>
          {screenState.toast.isActive && (
            <Toast isCorrect={screenState.toast.isCorrect} />
          )}

          {/* Absolutely positioned items */}
          <div className={style.gameClock}>
            <GameClock />
          </div>
          <div className={style.btnFullscreenToggle} onClick={toggleFullScreen}>
            <BsArrowsFullscreen />
          </div>
          {/* ---------------------------- */}

          <div className={style.header}>
            <p className={style.heading}>Arrange the symbols</p>
            <div className={style.question}>
              <p>
                Q.{questions.length} of {quesAllLen}
                {ReactHtmlParser(questions[questions.length - 1].question)}
              </p>
              <button onClick={handleSubmitAnswer}>
                Submit <ChevronRight />
              </button>
            </div>
          </div>

          <div
            className={clsx(
              "dndflow",
              style.dndFlowContainer,
              state.screenState.isFullscreen && style.fullscreen
            )}
          >
            {gameState.isEnd && (
              <>
                {runState.result && (
                  <Result
                    isOpen={screenState.isOpenResultModal}
                    result={runState.result}
                    handleClose={handleCloseResultModal}
                  />
                )}

                <ViewResult playAgain={handleGameReset} onClick={handleOpenResultModal} />
              </>
            )}

            {!gameState.isEnd && (
              <ReactFlowProvider>
                <Sidebar />
                <div className="reactflow-wrapper" ref={reactFlowRef}>
                  <ReactFlow
                    elements={runState.currFlowchart}
                    onConnect={onConnect}
                    onLoad={onLoad}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    connectionMode={"loose"}
                  >
                    <Controls />
                  </ReactFlow>
                </div>
              </ReactFlowProvider>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default function WithProvider() {
  return (
    <GameEngineProvider>
      <GameScreen />
    </GameEngineProvider>
  );
}
