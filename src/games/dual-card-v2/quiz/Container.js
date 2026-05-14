import React from "react";

import GameScreen from "./GameScreen";
import { GameEngineProvider } from "./engine/GameEngineProvider";

export default function Container(props) {
  return (
    <GameEngineProvider>
      <GameScreen {...props} />
    </GameEngineProvider>
  );
}
