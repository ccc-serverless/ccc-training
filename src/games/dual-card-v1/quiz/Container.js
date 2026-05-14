import React from "react";

import GameScreen from "./GameScreen";
import { GameEngineProvider } from "./engine/GameEngineProvider";

export default function Container({ name, id }) {
  return (
    <GameEngineProvider>
      <GameScreen gameName={name} gameId={id} />
    </GameEngineProvider>
  );
}
