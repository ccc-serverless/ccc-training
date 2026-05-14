import React from "react";
import { Arrow } from "react-konva";

export default function ArrowBranchLeft({ from, to }) {
  return (
    <Arrow
      points={[from.x, from.y, to.x, from.y, to.x, to.y]}
      pointerLength={4}
      pointerWidth={4}
      fill={"white"}
      stroke={"white"}
      strokeWidth={2}
    />
  );
}
