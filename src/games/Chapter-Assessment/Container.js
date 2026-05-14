import React from "react";

import { GameEngineProvider } from "./engine/GameEngineProvider";
import GameScreen from "./GameScreen";

export default function Container({ chapter }) {
  return (
    <GameEngineProvider>
      <GameScreen chapter={chapter} />
    </GameEngineProvider>
  );
}
