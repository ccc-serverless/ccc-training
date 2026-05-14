import React from "react";
import { Shape, Text, Group } from "react-konva";

import nodeSizes from "../helpers/_data_nodeSizes.json";

export default function Diamond({ x, y, text }) {
  const { width, height } = nodeSizes.diamond;

  return (
    <Group>
      <Shape
        sceneFunc={(ctx, shape) => {
          ctx.beginPath();
          ctx.moveTo(x, y - height / 2);

          ctx.lineTo(x + width / 2, y);
          ctx.lineTo(x - width / 2, y);

          ctx.moveTo(x, y + height / 2);
          ctx.lineTo(x - width / 2, y);
          ctx.lineTo(x + width / 2, y);

          ctx.closePath();
          ctx.fillStrokeShape(shape);
        }}
        fill="#6a2c70"
        globalCompositeOperation={"destination-over"}
      />
      <Text
        text={text}
        x={x - width / 2}
        y={y - height / 2}
        width={width}
        verticalAlign="middle"
        align="center"
        height={height}
        fill="white"
        fontSize={15}
        fontStyle={"bold"}
      />
    </Group>
  );
}
