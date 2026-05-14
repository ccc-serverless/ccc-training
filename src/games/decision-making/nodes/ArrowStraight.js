import React from "react";
import { Arrow } from "react-konva";

export default function ({ from, to }) {
  return (
    <Arrow
      points={[from.x, from.y, to.x, to.y]}
      pointerLength={5}
      pointerWidth={8}
      fill={"white"}
      stroke={"white"}
      strokeWidth={2}
    />
  );
}
