import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const NumberGames = lazy(() => import("views/GameTrials/Numbers"));
const LanguageGames = lazy(() => import("views/GameTrials/Language"));
const QuizGames = lazy(() => import("views/GameTrials/LogicalReasoning"));

export default function RoutesTrial() {
  return (
    <Routes>
      <Route path="language" element={<LanguageGames name="English Alphabets" />} />
      <Route path="numbers" element={<NumberGames name="Increasing Numbers" />} />
      <Route path="logical-reasoning" element={<QuizGames />} />
    </Routes>
  );
}
