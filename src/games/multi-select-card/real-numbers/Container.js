import React from "react";

import { GameEngineProvider } from "./engine/GameEngineProvider";
import GameScreen from "./GameScreen";

export default function Container({ name, id }) {
  return (
    <GameEngineProvider>
      <GameScreen gameName={name} gameId={id} />
    </GameEngineProvider>
  );
}
