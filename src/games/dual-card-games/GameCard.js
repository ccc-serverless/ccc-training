import React from "react";

import style from "./GameCard.module.scss";

import { useGameEngine } from "./engine/GameEngineProvider";

import GameClock from "./shared/GameClock";
import Question from "./Question";
import AnswerMcq from "./AnswerMcq";
import AnswerWordProbs from "./AnswerWordProbs";
import ResultScreen from "./ResultScreen";
import WelcomeCard from "./WelcomeCard";

export default function GameCard() {
  const { state } = useGameEngine();

  const game = state.gameSettings.name;
  const { questionsAsked } = state.runData;
  const { isStart, isEnd } = state.gameState;

  return (
    <div className={style.wrapper}>
      {isStart && game === "Mcq" && (
        <div className={style.timer}>
          <GameClock totalTimeElapsed={state.runData.totTimeElapsed} />
        </div>
      )}
      {!isStart && <WelcomeCard />}
      {questionsAsked.length > 0 && !isEnd && (
        <>
          <Question />
          {getAnswerComponent(game)}
        </>
      )}
      {isEnd && <ResultScreen />}
    </div>
  );
}

function getAnswerComponent(name) {
  switch (name) {
    case "Mcq":
      return <AnswerMcq />;
    case "Word Problems":
      return <AnswerWordProbs />;
    default:
      return null;
  }
}
