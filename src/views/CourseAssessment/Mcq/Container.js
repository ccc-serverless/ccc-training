import React from "react";

import { GameEngineProvider } from "./engine/GameEngineProvider";
import GameScreen from "./GameScreen";

export default function Container({ level }) {
  return (
    <GameEngineProvider>
      <GameScreen level={level} />
    </GameEngineProvider>
  );
}
