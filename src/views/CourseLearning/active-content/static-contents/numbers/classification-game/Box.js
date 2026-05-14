import React from "react";
import style from "./Box.module.scss";
import { useDrag } from "react-dnd";

export const Box = ({ text, itemType }) => {
  const [collected, drag] = useDrag({ type: itemType, item: { text } });
  return (
    <div ref={drag} {...collected} className={style.wrapper}>
      {text}
    </div>
  );
};
