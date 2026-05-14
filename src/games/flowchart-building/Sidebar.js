import React from "react";
import style from "./Sidebar.module.scss";

import Block from "./Block";

import { useGameEngine } from "./engine/GameEngineProvider";

export default function Sidebar() {
  const { state } = useGameEngine();
  const nodes = state.runState.sidebarNodes;

  function onDragStart(event, nodeType, nodeText, nodeId) {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("node-text", nodeText);
    event.dataTransfer.setData("node-id", nodeId);
    event.dataTransfer.effectAllowed = "move";
  }

  return (
    <aside className={style.wrapper}>
      <div className={style.description}>
        You can drag these nodes to the pane on the right.
      </div>

      {nodes.map((node) => (
        <div
          key={node.id}
          draggable
          onDragStart={(event) => onDragStart(event, node.type, node.text, node.id)}
        >
          <Block type={node.type} text={node.text} />
        </div>
      ))}
    </aside>
  );
}
