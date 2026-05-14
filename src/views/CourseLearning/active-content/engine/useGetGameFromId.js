import React, { lazy } from "react";
import SuspenseWrapper from "components/shared/SuspenseWrapper";

import { useGames } from "contexts/AllContexts";

const RootNumbers = lazy(() =>
  import("games/sequence-in-circle-games/numbers/Container")
);
const ArithmeticGames = lazy(() => import("games/mixed-arithmetic/Container"));
const RootTimeTable = lazy(() => import("games/timetables/Container"));
const RootLanguage = lazy(() =>
  import("games/sequence-in-circle-games/alphabets/Container")
);

const FlowchartGames = lazy(() => import("games/flowchart-building/Container"));

const DecisionMakingGames = lazy(() => import("games/decision-making/Container"));

const DualCardContainer = lazy(() => import("games/dual-card-games/Container"));
const CodeFillContainer = lazy(() => import("games/code-fill/Container"));
const MultiSelectContainer = lazy(() =>
  import("games/multi-select-card/real-numbers/Container")
);

const QuizGames = lazy(() => import("games/quizzes/Container"));
const DualCardV1Quiz = lazy(() => import("games/dual-card-v1/quiz/Container"));
const DualCardV1Mcq = lazy(() => import("games/dual-card-v1/mcq/Container"));

export default function useGetGameFromId() {
  const Games = useGames();

  function getGameFromId(gameId) {
    let currGame = Games.state.games.find((game) => game._id === gameId);

    //fail safe for some reason game not found
    if (!currGame) return null;

    switch (currGame.type) {
      case "Number Games":
        return (
          <SuspenseWrapper>
            <RootNumbers name={currGame.name} id={gameId} />
          </SuspenseWrapper>
        );
      case "TimeTable Games":
        return (
          <SuspenseWrapper>
            <RootTimeTable name={currGame.name} id={gameId} />
          </SuspenseWrapper>
        );
      case "Arithmetic Games":
        return (
          <SuspenseWrapper>
            <ArithmeticGames name={currGame.name} id={gameId} />
          </SuspenseWrapper>
        );
      case "Language Games":
        return (
          <SuspenseWrapper>
            <RootLanguage name={currGame.name} id={gameId} />
          </SuspenseWrapper>
        );
      case "Quiz Games":
        if (currGame.name === "Word Problems") {
          return (
            <SuspenseWrapper>
              <DualCardV1Quiz name={currGame.name} id={gameId} />
            </SuspenseWrapper>
          );
        } else if (currGame.name === "Mcq") {
          return (
            <SuspenseWrapper>
              <DualCardV1Mcq name={currGame.name} id={gameId} />
            </SuspenseWrapper>
          );
        } else
          return (
            <SuspenseWrapper>
              <QuizGames name={currGame.name} id={gameId} />
            </SuspenseWrapper>
          );

      case "Flowchart Games":
        return (
          <SuspenseWrapper>
            <FlowchartGames name={currGame.name} id={gameId} />
          </SuspenseWrapper>
        );
      case "Decision Making Games":
        return (
          <SuspenseWrapper>
            <DecisionMakingGames name={currGame.name} id={gameId} />
          </SuspenseWrapper>
        );
      case "Dual Card Games":
        return (
          <SuspenseWrapper>
            <DualCardContainer name={currGame.name} id={gameId} />
          </SuspenseWrapper>
        );
      case "Code Fill Games":
        return (
          <SuspenseWrapper>
            <CodeFillContainer name={currGame.name} id={gameId} />
          </SuspenseWrapper>
        );
      case "Multi Select Games":
        return (
          <SuspenseWrapper>
            <MultiSelectContainer name={currGame.name} id={gameId} />
          </SuspenseWrapper>
        );
      default:
        break;
    }
  }

  return { getGameFromId };
}
