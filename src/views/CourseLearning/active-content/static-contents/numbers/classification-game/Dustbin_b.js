import React from "react";
import style from "./Dustbin.module.scss";

import { useState } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

export default function Dustbin({ name, greedy, children }) {
  const [hasDropped, setHasDropped] = useState(false);
  const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false);
  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item, monitor) {
        const didDrop = monitor.didDrop();
        if (didDrop && !greedy) {
          return;
        }
        setHasDropped(true);
        setHasDroppedOnChild(didDrop);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    [greedy, setHasDropped, setHasDroppedOnChild]
  );
  const text = greedy ? "greedy" : "not greedy";
  let backgroundColor = "rgba(0, 0, 0, .5)";
  if (isOverCurrent || (isOver && greedy)) {
    backgroundColor = "darkgreen";
  }
  return (
    <div ref={drop} className={style.wrapper}>
      {name}
      <br />
      {hasDropped && <span>dropped {hasDroppedOnChild && " on child"}</span>}

      <div>{children}</div>
    </div>
  );
}
