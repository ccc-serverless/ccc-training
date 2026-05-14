import React from "react";
import style from "./GameCard.module.scss";

import { ChevronRight, ChevronLeft, Lock } from "react-feather";

import Question from "./Question";
import Options from "./Options";
import Button from "./Button";
import GameClock from "./GameClock";

import { useGameEngine } from "./engine/GameEngineProvider";
import Welcome from "./Welcome";
import ViewResult from "games/shared/ViewResult";
import PrevResults from "./PrevResults";
import PreGame from "./PreGame";

export default function GameCard() {
  const {
    state,
    handleActiveQuesChange,
    handleClickSubmit,
    handleOpenResultModal,
    handleGameReset,
  } = useGameEngine();

  const currQues = state.runData.questionsAsked[state.runData.activeQuestionNumber];
  const currLevelStatus = state.gameSettings.attemptsStatus[state.gameSettings.level - 1];

  return (
    <div className={style.wrapper}>
      {!state.gameState.isStart && <PreGame />}

      {state.gameState.isStart && (
        <>
          {/* Game Clock  */}
          {state.gameState.isStart && !state.gameState.isEnd && (
            <div className={style.clockContainer}>
              <GameClock totTimeElapsed={state.runData.totTimeElapsed} />
            </div>
          )}

          {/* Pre Game Start  */}
          {!state.gameState.isStart && !state.gameState.isEnd && <Welcome />}

          {/* In Game  */}
          {state.gameState.isStart && !state.gameState.isEnd && (
            <>
              {currQues ? (
                <>
                  <Question
                    question={currQues}
                    activeQuesNumber={state.runData.activeQuestionNumber}
                  />
                  <Options question={currQues} />
                </>
              ) : null}

              <div className={style.btnContainer}>
                {state.runData.activeQuestionNumber !== 0 && (
                  <Button
                    className={style.btnNav}
                    onClick={handleActiveQuesChange.bind(this, "prev")}
                  >
                    <ChevronLeft size={16} />
                  </Button>
                )}
                {state.runData.activeQuestionNumber <
                  state.runData.questionsAsked.length - 1 && (
                  <Button
                    className={style.btnNav}
                    onClick={handleActiveQuesChange.bind(this, "next")}
                  >
                    <ChevronRight size={16} />
                  </Button>
                )}

                {state.runData.activeQuestionNumber ===
                  state.runData.questionsAsked.length - 1 && (
                  <Button onClick={handleClickSubmit}>Submit</Button>
                )}
              </div>
            </>
          )}

          {/* Post Game End */}
          {state.gameState.isStart && state.gameState.isEnd && (
            <PrevResults />
            // <div className={style.viewResultContainer}>
            //   <ViewResult onClick={handleOpenResultModal} playAgain={handleGameReset} />
            // </div>
          )}
        </>
      )}
    </div>
  );
}
