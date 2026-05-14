import React from "react";
import { GameEngineProvider } from "./engine/GameEngineProvider";
import GameScreen from "./GameScreen";

export default function Container(props) {
  return (
    <GameEngineProvider>
      <GameScreen {...props} />
    </GameEngineProvider>
  );
}
