import React from "react";
import styles from "./ProcessHandles.module.scss";

import { AiOutlineDrag } from "react-icons/ai";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

export default function ProcessHandles({ name, id }) {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.PROCESS,
    item: { name, id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={styles.wrapper}
      id={id}
      style={isDragging ? { opacity: 0.3 } : { opacity: 1 }}
    >
      <AiOutlineDrag /> <p>{name}</p>
    </div>
  );
}
